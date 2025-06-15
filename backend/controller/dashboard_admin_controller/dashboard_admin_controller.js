const db = require("../../db/db");
const bcrypt = require("bcrypt");
const getAllUser = async (req, res) => {
  try {
    const query = `select id , full_name_ar ,national_id , phone , birth_date , address , created_at , activity_status , role from users where role != 'doctor'`;
    const [get_users] = await db.query(query);

    return res.status(200).json({
      success: true,
      data: get_users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const add_user = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    national_id,
    birth_date,
    gender,
    addres,
    password,
    role,
  } = req.body;


  try {
    const query = `insert into users (full_name_ar, email , phone , national_id , birth_date , gender , address , password , role) values (? , ? , ? , ? , ? , ? , ? , ? , ?)`;
    const passwordHash = await bcrypt.hash(password, 10);
    const [add_user] = await db.query(query, [
      full_name,
      email,
      phone,
      national_id,
      birth_date,
      gender,
      addres,
      passwordHash,
      role,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم اضافة اليوزر بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const activity_status = async (req, res) => {
  const { user_id, activity_status } = req.body;

  try {
    if (activity_status != 0 && activity_status != 1) {
      return res.status(200).json({
        success: false,
        message: "يوجد مشكلة يرجى المحاولة!!",
      });
    }
    const query = `update users set activity_status = ? where id = ?`;
    const [change_status] = await db.query(query, [activity_status, user_id]);
    return res.status(200).json({
      success: true,
      message: "تم تغير الحالة بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const update_user = async (req, res) => {
  const { id, national_id, birth_date, role } = req.body;
  try {
    const query = `update users set national_id = ? , birth_date = ? , role = ? where id = ?`;
    const [UpdataUser] = await db.query(query, [
      national_id,
      birth_date,
      role,
      id,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم تحديث البيانات بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const query = `
                SELECT 
        users.id, 
        users.full_name_ar,
        users.national_id, 
        users.phone, 
        users.created_at, 
        users.activity_status, 
        users.role,
        d.specialty, 
        d.service_type,
        d.years_of_experience,
        ser.id as service_id,
        ser.title
      FROM 
        users
      JOIN 
        doctors d ON users.id = d.user_id
      JOIN 
        services ser ON d.service_id = ser.id
      WHERE 
        users.role = 'doctor'
      ORDER BY 
        users.created_at ASC;
    `;
    const [get_doctors] = await db.query(query);

    return res.status(200).json({
      success: true,
      data: get_doctors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const add_doctor = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    national_id,
    birth_date,
    gender,
    addres,
    password,
    service,
    specialty,
    service_type,
    years_of_experience,
  } = req.body;

  try {
    const query = `insert into users (full_name_ar, email , phone , national_id , birth_date , gender , address , password , role) values (? , ? , ? , ? , ? , ? , ? , ? , ?)`;
    const passwordHash = await bcrypt.hash(password, 10);
    const [addDoctor] = await db.query(query, [
      full_name,
      email,
      phone,
      national_id,
      birth_date,
      gender,
      addres,
      passwordHash,
      "doctor",
    ]);
    const user_id = addDoctor.insertId;
    const query2 = `insert into doctors (user_id , service_id , specialty , service_type , years_of_experience) values (? , ? , ? , ? ,?)`;
    const [add_specialty_doctor] = await db.query(query2, [
      user_id,
      service,
      specialty,
      service_type,
      Number(years_of_experience),
    ]);
    return res.status(200).json({
      success: true,
      message: "تم اضافة الدكتور بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const update_data_doctor = async (req, res) => {
  const { id, service, specialty, service_type, years_of_experience } =
    req.body;

  try {
    const query = `update doctors set service_id = ? , specialty = ? , service_type = ? , years_of_experience = ? where id = ?`;
    const [update_data] = await db.query(query, [
      service,
      specialty,
      service_type,
      Number(years_of_experience),
      id,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم تحديث بيانات الدكتور بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getAllMD = async (req, res) => {
  try {
    const query = `
    select medical_points.* ,
      u.full_name_ar as pharmaceutical_name,
      u.phone as pharmaceutical_phone,
      u.national_id as pharmaceutical_national_id
      from medical_points 
      join users u on medical_points.pharmacist_id = u.id
      order by medical_points.created_at ASC;
    `;
    const [get_data] = await db.query(query);
    return res.status(200).json({
      success: true,
      data: get_data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const activity_status_Md = async (req, res) => {
  const { md_id, activity_status } = req.body;

  try {
    if (activity_status != 0 && activity_status != 1) {
      return res.status(200).json({
        success: false,
        message: "يوجد مشكلة يرجى المحاولة!!",
      });
    }
    const query = `update medical_points set activity_status = ? where id = ?`;
    const [change_status] = await db.query(query, [activity_status, md_id]);
    return res.status(200).json({
      success: true,
      message: "تم تغير الحالة بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const get_pharmacists = async (req, res) => {
  try {
    const query = `select id , full_name_ar from users where role = 'pharmacist'`;
    const [get_pharmacists] = await db.query(query);

    return res.status(200).json({
      success: true,
      data: get_pharmacists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const add_medical_point = async (req, res) => {
  const { name, address, pharmacist_id } = req.body;
  try {
    const query = `insert into medical_points (pharmacist_id , name , address) values ( ? , ? , ?)`;
    const [add_medical_point] = await db.query(query, [
      pharmacist_id,
      name,
      address,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم اضافة النقطة الطبية بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const update_medical_point = async (req, res) => {
  const { id, name, address, pharmacist_id } = req.body;

  try {
    const query = `update medical_points set pharmacist_id = ? , name = ? , address = ? where id = ?`;
    const [add_medical_point] = await db.query(query, [
      pharmacist_id,
      name,
      address,
      id,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم تحديث النقطة الطبية بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const dashboard_stats = async (req, res) => {
  try {
    const query = `
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM users WHERE role = 'doctor') AS total_doctors,
      (SELECT COUNT(*) FROM medical_points) AS total_medical_points,
      (SELECT COUNT(*) FROM consultations WHERE DATE(created_at) = CURDATE()) AS daily_consultations;
  `;
    const [data] = await db.query(query);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  getAllUser,
  add_user,
  activity_status,
  update_user,
  getAllDoctors,
  add_doctor,
  update_data_doctor,
  getAllMD,
  activity_status_Md,
  get_pharmacists,
  add_medical_point,
  update_medical_point,
  dashboard_stats,
};
