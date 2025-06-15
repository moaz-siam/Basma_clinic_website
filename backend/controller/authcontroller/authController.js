const jwt = require("jsonwebtoken");
const db = require("../../db/db");
const bcrypt = require("bcrypt");
const { fileUploadUtil } = require("../../lib/cloudinary/cloudinary");
const nodemailer = require("nodemailer");
const register = async (req, res) => {
  const { full_name, national_id, email, gender, phone, birth_date, password } =
    req.body;
  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE national_id = ?",
      [national_id]
    );

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "يوجد بالفعل حساب برقم الهوية", success: false });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const values = [
      full_name,
      null,
      email,
      phone,
      national_id,
      birth_date,
      gender,
      null,
      passwordHashed,
    ];

    const q =
      "INSERT INTO users (`full_name_ar` , `full_name_en` , `email`, `phone` , `national_id` , `birth_date` , `gender` , `image_url` , `password`) VALUES(?)";
    const [dataReg] = await db.query(q, [values]);

    const token = await jwt.sign(
      {
        id: dataReg.insertId,
        full_name,
        national_id,
        email,
        role: "patient",
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    return res
      .status(201)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        message: "تم التسجيل بنجاح",
        user: {
          id: dataReg.insertId,
          full_name,
          national_id,
          email,
        },
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  const { national_id, password } = req.body;
  try {
    const query = "select * from users where national_id = ?";
    const [existingUser] = await db.query(query, [national_id]);
    if (existingUser.length == 0) {
      return res.status(401).json({
        success: false,
        message: "لا يوجد حساب برقم الهوية الذي ادخلته",
      });
    }
    const user = existingUser[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      // Password does not match
      return res
        .status(401)
        .json({ success: false, message: "رقم المرور خاطئ" });
    }
    if (user.activity_status != 1) {
      return res
        .status(401)
        .json({ success: false, message: "حسابك غير نشط!!" });
    }
    const token = await jwt.sign(
      {
        id: user.id,
        full_name: user.full_name_ar,
        national_id: user.national_id,
        email: user.email,
        image: user.image_url,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    return res
      .status(201)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        message: "تم تسجيل الدخول بنجاح",
        user: {
          id: user.id,
          full_name: user.full_name_ar,
          national_id: user.national_id,
          email: user.email,
          image: user.image_url,
          role: user.role,
        },
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//profile

const personal_information_update = async (req, res) => {
  const userId = req.user.id;
  const { full_name, full_name_en, phone, email, address } = req.body;

  try {
    let fileUrl = null;

    if (req.file) {

      // تحويل الملف إلى base64 ثم رفعه إلى Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await fileUploadUtil(url);
      fileUrl = result.secure_url;
    }

    const query = `update users set full_name_ar = ? , full_name_en = ? , phone = ? , email = ? , address = ? , image_url = ? where users.id = ?`;
    const [update_data] = await db.query(query, [
      full_name,
      full_name_en,
      phone,
      email,
      address,
      fileUrl,
      userId,
    ]);
    return res.status(200).json({
      success: true,
      message: "تم تحديث بيانات بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const change_password = async (req, res) => {
  const { old_password, new_password } = req.body;
  const userId = req.user.id;
  try {
    const query1 = `select password from users where users.id = ?`;
    const [get_pass] = await db.query(query1, [userId]);
    const password = get_pass[0].password;
    const compare_password = await bcrypt.compare(old_password, password);
    if (!compare_password) {
      return res.status(404).json({
        success: false,
        message: "كلمة السر القديمة خاطئ",
      });
    }
    const hash_new_password = await bcrypt.hash(new_password, 10);
    const query2 = `update users set password = ? where users.id = ?`;
    const [update_password] = await db.query(query2, [
      hash_new_password,
      userId,
    ]);

    return res.status(200).json({
      success: true,
      message: "تم تغيير كلمة السر بنجاح",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const forget_password = async (req, res) => {
  const { email } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [user] = await db.query(query, [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: "البريد الإلكتروني غير موجود" });
    }
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await db.query(
      "update users set reset_password_token = ? , reset_token_expires_at = ? where users.email = ?",
      [code, expiresAt, email]
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "moazsiam2003@gmail.com",
        pass: "wzij thfk uxvw pzgk",
      },
    });

    await transporter.sendMail({
      from: `"Support Basma Clinic" ${email}`,
      to: email,
      subject: "رمز إعادة تعيين كلمة المرور",
      text: `رمز التحقق الخاص بك هو: ${code}`,
    });
    res
      .status(200)
      .json({ success: true, message: "تم إرسال الرمز إلى البريد الإلكتروني" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const verify_code = async (req, res) => {
  const { code, email } = req.body;
  try {
    const query = `select * from users where reset_password_token = ? and email = ?`;
    const existingCode = await db.query(query, [code, email]);
    if (!existingCode) {
      return res.status(400).json({
        message: "الكود غير صحيح أو غير موجود",
        success: false,
      });
    }
    if (new Date() > existingCode.reset_token_expires_at) {
      return res.status(400).json({
        message: "انتهت صلاحية الكود",
        success: false,
      });
    }
    await db.query(
      "update users set reset_password_token = null , reset_token_expires_at = null where users.email = ?",
      [email]
    );
    return res.status(200).json({
      message: "تم التحقق من الكود بنجاح",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const reset_password = async (req, res) => {
  const { NewPassword, ConfirmaPassword, email } = req.body;
  try {
    if (NewPassword != ConfirmaPassword) {
      return res.status(400).json({
        message: "يرجى تاكيد كلمة المرور",
        success: false,
      });
    }
    const hash_new_password = await bcrypt.hash(NewPassword, 10);
    const query = `UPDATE users SET password = ? WHERE email = ?`;
    const [update_password] = await db.query(query, [hash_new_password, email]);
    return res
      .status(200)
      .json({ message: "تم تغيير كلمة السر بنجاح", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  personal_information_update,
  change_password,
  forget_password,
  reset_password,
  verify_code,
};
