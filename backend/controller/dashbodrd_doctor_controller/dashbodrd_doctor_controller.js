const db = require("../../db/db");
const { fileUploadUtil } = require("../../lib/cloudinary/cloudinary");

const getConsultationsDoctor = async (req, res) => {
  const user_doc = req.user.id;
  try {
    const query = `
    SELECT 
      consultations.*, 
      users.full_name_ar AS patient_name_ar,
      appointments.appointment_time As appointment_time
      FROM consultations
      JOIN users ON consultations.patient_id = users.id
      LEFT JOIN appointments ON consultations.id = appointments.consultation_id
      WHERE consultations.doctor_id = ?
      ORDER BY consultations.created_at DESC;
    `;
    const [consultations] = await db.query(query, [user_doc]); // استرجاع الاستشارات من قاعدة البيانات
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

const getConsultationIdDoctor = async (req, res) => {
  const userId = req.user.id;
  const consultationid = req.params.consultationid;

  try {
    const query = `
    SELECT 
      consultations.*, 
      users.full_name_ar AS patient_name_ar
      FROM consultations
      JOIN users ON consultations.patient_id = users.id
      WHERE consultations.id = ? and consultations.doctor_id = ?
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

const getMedicines = async (req, res) => {
  try {
    const query = `select * from medicines`;
    const [medicines] = await db.query(query);
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

const consultation_replie = async (req, res) => {
  const {
    consultation_id,
    doctor_id,
    patient_id,
    reply_text,
    file_name,
    medicines,
  } = req.body;

  try {
    

    const [replyResult] = await db.query(
      `INSERT INTO consultation_replies (consultation_id, sender_id, message) VALUES (?, ?, ?)`,
      [consultation_id, doctor_id, reply_text]
    );
    let fileUrl = null;

    if (req.file) {

      // تحويل الملف إلى base64 ثم رفعه إلى Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await fileUploadUtil(url);
      fileUrl = result.secure_url;
    }
    const [prescriptionResult] = await db.query(
      `INSERT INTO prescriptions (consultation_id, doctor_id , patient_id , notes , pdf_url , pdf_name) VALUES (?, ? ,? ,? ,? , ?)`,
      [consultation_id, doctor_id, patient_id, reply_text, fileUrl, file_name]
    );
    const prescriptionId = prescriptionResult.insertId;
    if (medicines.length > 0) {
      for (const item of JSON.parse(medicines)) {
        await db.query(
          `INSERT INTO prescription_items (prescription_id, medicine_id, dosage, instructions) VALUES (?, ?, ?, ?)`,
          [prescriptionId, item.medicine_id, item.dosage, item.duration]
        );
      }
    }
    await db.query(
      `update consultations set status = ? where consultations.id = ?`,
      ["مكتملة", consultation_id]
    );
    res
      .status(201)
      .json({ success: true, message: "تمت إضافة البيانات بنجاح" });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const getConsultationIdDetilesDoc = async (req, res) => {
  const userId = req.user.id;
  const consultationid = req.params.consultationid;

  try {
    const query = `
    SELECT 
      c.*, 
      u.full_name_ar AS patient_name_ar,
      p.pdf_url AS prescription_url, 
      p.pdf_name AS prescription_name,
      cr.message AS consultation_reply_doctor,
      app.appointment_time As appointment_time,
      app.appointment_status As appointment_status,
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
        WHERE pi.prescription_id = p.id
      ) AS prescription_items
    FROM consultations c
    JOIN users u ON c.patient_id = u.id
    left JOIN prescriptions p ON c.id = p.consultation_id
    left JOIN consultation_replies cr ON c.id = cr.consultation_id
    left JOIN appointments app ON c.id = app.consultation_id
    WHERE c.id = ? AND c.doctor_id = ?

    `;
    const [consultation_data] = await db.query(query, [consultationid, userId]); // استرجاع الاستشارات من قاعدة البيانات
    
    

    if (consultation_data.length == 0) {
      return res.json({
        success: false,
        message: "لا يوجد لديك استشارة بهذا الرقم",
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

const appointment_status_doc = async (req, res) => {
  const { appointment_status, consultation_id } = req.body;

  try {
    const query1 = `update appointments set appointment_status = ? where appointments.consultation_id = ?`;
    const [update_appointment_status] = await db.query(query1, [
      appointment_status,
      consultation_id,
    ]);

    if (appointment_status == "cancelled") {
      await db.query(
        `update consultations set status = ? where consultations.id = ?`,
        ["ملغية", consultation_id]
      );
    }

    return res.json({
      success: true,
      message: "تم القبول",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const Reschedule_Doc = async (req, res) => {
  const { consultation_id, appointment_time, appointment_status } = req.body;

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
    const query2 = `update appointments set appointment_time = ? , appointment_status = ? where appointments.consultation_id = ?`;
    await db.query(query2, [
      appointment_time,
      appointment_status,
      consultation_id,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم اعادة الجدولة بنجاح",
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const get_status_prescriptions = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
select 
      prescriptions.id as id,
      prescriptions.pdf_url as pdf_url,
      prescriptions.pdf_name as pdf_name,
      consultations.main_service as main_service,
      consultations.sub_service as sub_service,
      users.full_name_ar as patinet_name,
      orders.order_status as prescription_status
      from prescriptions
      join consultations on prescriptions.consultation_id = consultations.id
      join users on prescriptions.patient_id = users.id
      join orders on users.id = orders.patient_id
      where prescriptions.doctor_id = ?
    `;
    const [get_data] = await db.query(query, [userId]);
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
module.exports = {
  getConsultationsDoctor,
  getConsultationIdDoctor,
  getMedicines,
  consultation_replie,
  getConsultationIdDetilesDoc,
  appointment_status_doc,
  Reschedule_Doc,
  get_status_prescriptions,
};
