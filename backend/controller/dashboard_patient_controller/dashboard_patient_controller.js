const db = require("../../db/db");
const { fileUploadUtil } = require("../../lib/cloudinary/cloudinary");

const getDoctorsdashboard = async (req, res) => {
  try {
    query = `
  SELECT 
    doctors.id AS doctor_id, 
    users.id AS user_id,
    users.full_name_ar, 
    users.full_name_en,
    users.image_url As image_url, 
    doctors.average_rating, 
    doctors.created_at
  FROM doctors
  JOIN users ON doctors.user_id = users.id

`;
    const [data_doctors] = await db.query(query);
    if (data_doctors.length <= 0) {
      return res.json({ masseg: "Not Found", success: false });
    }
    return res.json({
      data: data_doctors,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const consultation_create = async (req, res) => {
  const { patient_id, mainservice, subservices, doctor, question } = req.body;

  try {

    let fileUrl = null;

    if (req.file) {
      // تحويل الملف إلى base64 ثم رفعه إلى Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await fileUploadUtil(url);
      fileUrl = result.secure_url;
    }

    const values = [
      patient_id,
      doctor,
      mainservice,
      subservices,
      question,
      fileUrl,
    ];

    const query = `
      INSERT INTO consultations (patient_id, doctor_id, main_service, sub_service, question, attachment_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [cons] = await db.query(query, values);

    return res.status(201).json({
      message: "تم إنشاء الاستشارة بنجاح",
      success: true,
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getConsultations = async (req, res) => {
  const userId = req.user.id; // استخراج userId من الـ request بعد التوثيق
  try {
    const query = `
    SELECT 
      consultations.*, 
      users.full_name_ar AS doctor_name_ar
      FROM consultations
      JOIN users ON consultations.doctor_id = users.id
      WHERE consultations.patient_id = ?
      ORDER BY consultations.created_at DESC;
    `;
    const [consultations] = await db.query(query, [userId]); // استرجاع الاستشارات من قاعدة البيانات
    

    return res.status(200).json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getConsultationId = async (req, res) => {
  const userId = req.user.id;
  const consultationid = req.params.consultationid;
  try {
    const query = `
    SELECT 
      consultations.*, 
      doctors.specialty As doctor_specialty,
      users.full_name_ar AS doctor_name_ar,
      users.phone As doctor_phone,
      users.image_url As doctor_img,
      consultation_replies.message AS consultation_reply,
      prescriptions.pdf_url as prescriptions_pdf,
      prescriptions.pdf_name as prescriptions_pdf_name,
            (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', m.name,
            'dosage', pi.dosage,
            'instructions', pi.instructions
          )
        )
        FROM prescription_items pi
        JOIN medicines m ON pi.medicine_id = m.id
        WHERE pi.prescription_id = prescriptions.id
      ) AS prescription_items
      FROM consultations
      JOIN users ON consultations.doctor_id = users.id
      JOIN doctors ON consultations.doctor_id = doctors.id
      LEFT JOIN consultation_replies ON consultations.id = consultation_replies.consultation_id 
      LEFT JOIN prescriptions ON consultations.id = prescriptions.consultation_id
      WHERE consultations.id = ? and consultations.patient_id = ?
    `;
    const [consultation_data] = await db.query(query, [consultationid, userId]); // استرجاع الاستشارات من قاعدة البيانات
    if (!consultation_data) {
      return res.json({
        success: false,
        message: "لا يوجد لدي استشارة بهذا الرقم",
      });
    }

    return res.status(200).json({
      success: true,
      data: consultation_data,
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const Book_appointment = async (req, res) => {
  const { consultation_id, appointment } = req.body;

  try {
    const query1 = `
      select id from consultations where id = ?
    `;
    const [consultation_check] = await db.query(query1, [consultation_id]); // استرجاع الاستشارات من قاعدة البيانات
    if (consultation_check.length == 0) {
      return res.json({
        success: false,
        message: "لا يوجد لدي استشارة بهذا الرقم",
      });
    }

    const query2 = `insert into appointments (consultation_id , appointment_time ) values (? , ?)`;
    const [add_appointment] = await db.query(query2, [
      consultation_id,
      appointment,
    ]); // استرجاع الاستشارات من قاعدة البيانات
    await db.query(
      `update consultations set status = ? where consultations.id = ?`,
      ["مجدولة", consultation_id]
    );

    return res.status(200).json({
      success: true,
      message: "تم اضافة موعد للاستشارة",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const medical_points = async (req, res) => {
  try {
    const query = `select * from medical_points`;
    const [medical_points] = await db.query(query);
    return res.status(200).json({
      success: true,
      data: medical_points,
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const get_patient_med = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
    select 
	  prescription_items.* ,
    medicines.name as medicines_name,
    medicines.price as medicines_price,
    medicines.description as medicines_description,
    prescriptions.patient_id as prescriptions_patient_id,
    prescriptions.id as prescriptions_id
    from prescription_items
    join medicines on prescription_items.medicine_id = medicines.id
    join prescriptions on prescription_items.prescription_id = prescriptions.id
    where prescriptions.patient_id = ?
    ORDER BY prescriptions.created_at DESC
    `;
    const [medicines] = await db.query(query, [userId]);
    return res.status(200).json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const order_medicine = async (req, res) => {
  const userId = req.user.id;
  const {
    pharmacy_id,
    prescription_id,
    total_price,
    payment_method,
    notes,
    prescription_items_id,
    quantity,
    unit_price,
  } = req.body;

  try {
    const query1 = `insert into orders (patient_id , pharmacy_id , prescription_id , total_price , payment_method , notes) values (? , ? , ? , ? , ? , ?)`;

    const [add_order] = await db.query(query1, [
      userId,
      pharmacy_id,
      prescription_id,
      total_price,
      payment_method,
      notes,
    ]);

    const order_id = add_order.insertId;
    const query2 = `insert into order_items (order_id , prescription_items_id , quantity , unit_price , total_price) values (? , ? , ? , ? , ?)`;
    await db.query(query2, [
      order_id,
      prescription_items_id,
      quantity,
      unit_price,
      total_price,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم اضافة الطلب بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const get_patient_medical_points = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `select patient_medical_points.* ,
      medical_points.name as medical_point_name,
      medical_points.address as medical_point_address
      from patient_medical_points 
      join medical_points on patient_medical_points.medical_point_id = medical_points.id
      where patient_medical_points.user_id = ?`;
    const [patient_medical_points] = await db.query(query, [userId]);
    return res.status(200).json({
      success: true,
      data: patient_medical_points,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const add_patient_medical_points = async (req, res) => {
  const { medical_point_id, is_default } = req.body;
  const userId = req.user.id;
  try {
    const query = `insert into patient_medical_points (user_id , medical_point_id , is_default ) values (? , ? , ?)`;
    const [add_patient_medical_points] = await db.query(query, [
      userId,
      medical_point_id,
      is_default,
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

module.exports = {
  getDoctorsdashboard,
  consultation_create,
  getConsultations,
  getConsultationId,
  Book_appointment,
  medical_points,
  get_patient_med,
  order_medicine,
  get_patient_medical_points,
  add_patient_medical_points,
};
