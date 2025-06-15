const db = require("../../db/db");
const { fileUploadUtil } = require("../../lib/cloudinary/cloudinary");

const get_prescriptions = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT
        o.id AS order_id,
        o.order_status AS prescription_status,
        mi.id AS invoice_id,
        p.id AS prescription_id,
        p.pdf_url,
        p.pdf_name,
        c.main_service,
        c.sub_service,
        u.full_name_ar AS patient_name
      FROM orders o
      JOIN medical_points mp ON o.pharmacy_id = mp.id
      JOIN users pharmacist ON mp.pharmacist_id = pharmacist.id
      JOIN prescriptions p ON o.prescription_id = p.id
      JOIN consultations c ON p.consultation_id = c.id
      JOIN users u ON p.patient_id = u.id
      LEFT JOIN medicine_invoices mi ON mi.order_id = o.id
      WHERE pharmacist.id = ?;
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

const get_prescriptions_details = async (req, res) => {
  const userId = req.user.id;

  const prescriptionid = req.params.prescriptionid;
  try {
    const query = `
      SELECT 
        pre.id,
        pre.doctor_id,
        pre.pdf_url,
        pre.pdf_name,
        pre.created_at,
        patient.full_name_ar AS patient_name,
        con.sub_service AS sub_service,
        doctor.full_name_ar AS doctor_name,
        o.order_status as prescription_status,
        o.id as order_id,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', m.name,
              'description' , m.description,
              'dosage', pi.dosage,
              'instructions', pi.instructions
            )
          )
          FROM prescription_items pi
          JOIN medicines m ON pi.medicine_id = m.id
        JOIN order_items oi2 ON pi.id = oi2.prescription_items_id
          WHERE pi.prescription_id = pre.id AND pi.id = oi2.prescription_items_id
        ) AS prescription_items
      FROM prescriptions pre
      JOIN users patient ON pre.patient_id = patient.id
      JOIN consultations con ON pre.consultation_id = con.id
      JOIN users doctor ON con.doctor_id = doctor.id
      JOIN orders o ON o.prescription_id = pre.id
      JOIN medical_points mp ON o.pharmacy_id = mp.id
      JOIN order_items oi ON o.id = oi.order_id
      WHERE pre.id = ? AND mp.pharmacist_id = ?;
    `;
    const [get_data] = await db.query(query, [prescriptionid, userId]);
    if (get_data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "لا يوجد استشارة بها الرقم",
      });
    }
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
const get_order_details = async (req, res) => {
  const userId = req.user.id;

  const prescriptionid = req.params.prescriptionid;
  try {
    const query = `
      SELECT 
        pre.id AS prescription_id,
        pre.doctor_id,
        pre.pdf_url,
        pre.pdf_name,
        pre.created_at,
        patient.full_name_ar AS patient_name,
        con.sub_service AS sub_service,
        doctor.full_name_ar AS doctor_name,
        o.order_status AS prescription_status,
        o.id AS order_id,
        mi.id AS invoice_id,
        mi.invoice_url,
        mi.invoice_name,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', m.name,
              'description', m.description,
              'dosage', pi.dosage,
              'instructions', pi.instructions
            )
          )
          FROM prescription_items pi
          JOIN medicines m ON pi.medicine_id = m.id
          JOIN order_items oi2 ON pi.id = oi2.prescription_items_id
          WHERE pi.prescription_id = pre.id AND oi2.order_id = o.id
        ) AS prescription_items
      FROM prescriptions pre
      JOIN users patient ON pre.patient_id = patient.id
      JOIN consultations con ON pre.consultation_id = con.id
      JOIN users doctor ON con.doctor_id = doctor.id
      JOIN orders o ON o.prescription_id = pre.id
      LEFT JOIN medicine_invoices mi ON mi.order_id = o.id
      JOIN medical_points mp ON o.pharmacy_id = mp.id
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ? AND mp.pharmacist_id = ?;
    `;
    const [get_data] = await db.query(query, [prescriptionid, userId]);
    if (get_data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "لا يوجد طلب بها الرقم",
      });
    }
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

const add_order_status = async (req, res) => {
  const { order_status, order_id } = req.body;
  
  

  try {
    const query = `UPDATE orders SET order_status = ? where orders.id = ?`;
    const [add_order_status] = await db.query(query, [order_status, order_id]);
    if (!add_order_status) {
      return res.status(200).json({
        success: false,
        message: "حدث مشكلة بالطلب يرجى المحاولة ...",
      });
    }
    return res.status(200).json({
      success: true,
      message: "تم تنفيذ الطلب بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const uploadInvoice = async (req, res) => {
  const { order_id, file_name } = req.body;
  
  

  try {
    let fileUrl = null;

    if (req.file) {
      // تحويل الملف إلى base64 ثم رفعه إلى Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await fileUploadUtil(url);
      fileUrl = result.secure_url;
      
    }
    if (!fileUrl) {
      return res.status(404).json({
        success: true,
        message: "حدث خطا اتناء الرفع يرجع المحاولة مرة اخرى",
      });
    }
    const query =
      "INSERT INTO medicine_invoices (order_id , invoice_url , invoice_name) values (? , ? , ?)";
    const [add_db] = await db.query(query, [order_id, fileUrl, file_name]);
    return res.status(200).json({
      success: true,
      message: "تم رفع الفاتورة بنجاح",
    });
  } catch (error) {
    

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
module.exports = {
  get_prescriptions,
  get_prescriptions_details,
  add_order_status,
  get_order_details,
  get_order_details,
  uploadInvoice,
};
