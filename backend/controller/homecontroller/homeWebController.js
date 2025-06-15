const db = require("../../db/db");

const getService = async (req, res) => {
  const serviceParam = req.params.service;

  try {
    const [service] = await db.query("select * from services where path = ?", [
      serviceParam,
    ]);
    // 

    if (service.length <= 0) {
      return res.json({ masseg: "Not Found" });
    }
    const [subservices] = await db.query(
      "SELECT * FROM sub_services WHERE service_id = ?",
      [service[0].id]
    );
    // 

    return res.json({
      service: service,
      subServices: subservices,
    });
  } catch (error) {
    
    return res.json({ masseg: "Internal server error" });
  }
};

const getDoctors = async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const offset = (page - 1) * limit;
  try {
    let query = `
  SELECT 
    doctors.id AS doctor_id, 
    users.id AS user_id,
    users.full_name_ar, 
    users.full_name_en,
    users.address,
    users.image_url As image_url,
    doctors.specialty, 
    doctors.service_type, 
    doctors.years_of_experience, 
    doctors.my_services, 
    doctors.bio,
    doctors.total_patients,
    doctors.average_rating
  FROM doctors
  JOIN users ON doctors.user_id = users.id
  WHERE 1
`;

    const [data_doctors] = await db.query(query);
    if (data_doctors.length <= 0) {
      return res.json({ masseg: "Not Found" });
    }
    return res.json({
      data: data_doctors,
    });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getDoctor = async (req, res) => {
  const doctorname = req.params.doctorname;
  try {
    const query = `
WITH ratings AS (
  SELECT 1 AS rating UNION ALL
  SELECT 2 UNION ALL
  SELECT 3 UNION ALL
  SELECT 4 UNION ALL
  SELECT 5
),
rating_counts AS (
  SELECT doctor_id, rating, COUNT(*) AS count
  FROM reviews
  GROUP BY doctor_id, rating
),
joined_ratings AS (
  SELECT
    d.id AS doctor_id,
    r.rating,
    COALESCE(rc.count, 0) AS count
  FROM doctors d
  CROSS JOIN ratings r
  LEFT JOIN rating_counts rc ON rc.doctor_id = d.id AND rc.rating = r.rating
)
SELECT 
  d.id AS doctor_id, 
  u.id AS user_id,
  u.full_name_ar, 
  u.full_name_en,
  u.address,
  u.image_url, 
  d.specialty, 
  d.service_type, 
  d.years_of_experience, 
  d.my_services, 
  d.bio,
  d.total_patients,
  COALESCE(AVG(r.rating), 0) AS average_rating,
  JSON_OBJECTAGG(jr.rating, jr.count) AS rating_distribution,
  COUNT(r.id) AS total_reviews,
  COALESCE(GROUP_CONCAT(r.rating ORDER BY r.id SEPARATOR ', '), '') AS ratings,  
  COALESCE(GROUP_CONCAT(ru.full_name_ar ORDER BY r.id SEPARATOR ', '), '') AS reviewers_names_ar,  
  COALESCE(GROUP_CONCAT(ru.full_name_en ORDER BY r.id SEPARATOR ', '), '') AS reviewers_names_en
FROM doctors d
JOIN users u ON d.user_id = u.id
LEFT JOIN reviews r ON d.id = r.doctor_id  
LEFT JOIN users ru ON r.user_id = ru.id
JOIN joined_ratings jr ON jr.doctor_id = d.id
WHERE u.full_name_en = ?
GROUP BY d.id, u.id;

    `;
    const query2 = `
    SELECT 
    r.doctor_id As id_comment,
    r.comment, 
    u.full_name_ar AS reviewer_name_ar, 
    u.full_name_en AS reviewer_name_en, 
    r.created_at 
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN doctors d ON r.doctor_id = d.id
    JOIN users du ON d.user_id = du.id 
    WHERE du.full_name_en = ? 
    ORDER BY r.created_at DESC;
    `;
    const [doctor] = await db.query(query, [doctorname.split("-").join(" ")]);
    if (doctor.length <= 0) {
      return res.json({ masseg: "Doctor Not Found" });
    }
    const [comments_doctor] = await db.query(query2, [
      doctorname.split("-").join(" "),
    ]);

    if (doctor.length <= 0) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }

    return res.json({ doctor: doctor, comments_doctor: comments_doctor });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getresources = async (req, res) => {
  try {
    let query = `
    SELECT 
    articles.*,
    users.full_name_ar AS doctor_name_ar,
    users.full_name_en AS doctor_name_en
    FROM articles
    JOIN doctors ON articles.doctor_id = doctors.id
    JOIN users ON doctors.user_id = users.id;
    `;
    let query2 = `select * from videos`;
    let query3 = `select * from instructions`;
    let query4 = `select * from medicalguide`;

    const [articles] = await db.query(query);
    const [videos] = await db.query(query2);
    const [instructions] = await db.query(query3);
    const [medicalguide] = await db.query(query4);

    if (articles.length <= 0) {
      return res.json({ masseg: "Not Found articles" });
    }
    if (videos.length <= 0) {
      return res.json({ masseg: "Not Found videos" });
    }
    // 
    return res.json({
      articles: articles,
      videos: videos,
      instructions: instructions,
      Medical_Guide: medicalguide,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getArticle = async (req, res) => {
  const article_id = req.params.articleid;
  try {
    let query = `
    SELECT 
    articles.*,
    users.full_name_ar AS doctor_name_ar,
    users.full_name_en AS doctor_name_en,
    users.image_url AS doctor_image_url,
    doctors.specialty
    FROM articles
    JOIN doctors ON articles.doctor_id = doctors.id
    JOIN users ON doctors.user_id = users.id
    where articles.id = ?
    `;

    const [article] = await db.query(query, [article_id]);

    if (article.length <= 0) {
      return res.json({ masseg: "Not Found article" });
    }

    return res.json({
      data: article,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getVideo = async (req, res) => {
  const video_id = req.params.videoid;
  try {
    let query = `select * from videos where id = ?`;
    const [video] = await db.query(query, [video_id]);

    if (video.length <= 0) {
      return res.json({ masseg: "Not Found video" });
    }
    return res.json({
      data: video,
    });
  } catch (error) {
    

    return res.status(500).json({ message: "Internal server error" });
  }
};
const getGuide = async (req, res) => {
  const guide_id = req.params.guideid;
  try {
    let query = `select * from medicalguide where id = ?`;
    const [guide] = await db.query(query, [guide_id]);

    if (guide.length <= 0) {
      return res.json({ masseg: "Not Found guide" });
    }
    return res.json({
      data: guide,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSearch = async (req, res) => {
  const { query } = req.query;
  try {
    const querysql = `
        SELECT 
        a.id,
        a.title,
        NULL AS title_en,
        a.image_url,
        users.full_name_en AS doctor_name_en,
        'article' AS type
    FROM
        articles a
            JOIN
        doctors ON a.doctor_id = doctors.id
            JOIN
        users ON doctors.user_id = users.id
    WHERE
        a.title LIKE ?
    UNION SELECT 
        v.id,
        v.title,
        v.title_en,
        v.image_url,
        NULL AS doctor_name_en,
        'video' AS type
    FROM
        videos v
    WHERE
        v.title LIKE ?
    UNION SELECT 
        mg.id,
        mg.title,
        mg.title_en,
        mg.image_url,
        NULL AS doctor_name_en,
        'medical_guide' AS type
    FROM
        medicalguide mg
    WHERE
        mg.title LIKE ?
    UNION SELECT 
        ins.id,
        ins.title,
        null as title_en,
        ins.image_url,
        null AS doctor_name_en,
        'instruction' AS type
    FROM
        instructions ins
    WHERE
        ins.title LIKE ?
    LIMIT 20;
    `;
    if (!query) {
      return res.status(400).json({ error: "يجب توفير قيمة للبحث!" });
    }
    const searchValue = `%${query}%`;
    const [result] = await db.query(querysql, [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ]);
    

    if (result.length <= 0) {
      return res.json({ masseg: "Not Found result", success: false });
    }
    return res.json({
      data: result,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  getService,
  getDoctors,
  getDoctor,
  getresources,
  getArticle,
  getVideo,
  getGuide,
  getSearch,
};
