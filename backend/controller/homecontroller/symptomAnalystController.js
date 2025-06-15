const db = require("../../db/db");
const axios = require("axios");
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SymptomAnalyst = async (req, res) => {
  const { message } = req.body; // الأعراض من المستخدم  
  
  
  if (!message) {
    return res.status(400).json({ message: "يرجى إرسال الأعراض لتحليلها." });
  }

  try {
    const prompt = `
أنت مساعد طبي ذكي متخصص فقط في المجال الطبي. لا تجب على أي سؤال خارج الطب.
يُمنع تماماً تقديم أي نصيحة قانونية أو مالية أو دينية أو خارج نطاق الصحة العامة.

المطلوب منك الآن:
- تحليل الأعراض التالية المقدمة من المستخدم: "${message}"

ثم عرض الرد منسقاً بالتالي:
1. التحليل المبدئي لحالتك:
2. التشخيص المحتمل:
3. التوصيات:
4. موارد قد تفيدك:

الرجاء استخدام لغة بسيطة وسهلة الفهم، وتذكير المستخدم أن هذا التحليل لا يغني عن زيارة الطبيب.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // النموذج المناسب
    });

    const response =
      chatCompletion.choices[0]?.message?.content || "لا يوجد رد";
      

    return res.status(200).json({ result: response , sucsses : true });
  } catch (error) {
    console.error("خطأ في تحليل الأعراض:", error);
    return res.status(500).json({ message: "حدث خطأ أثناء تحليل الأعراض." , sucsses : false });
  }
};

module.exports = {
  SymptomAnalyst,
};