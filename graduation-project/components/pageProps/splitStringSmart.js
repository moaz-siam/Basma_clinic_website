export function SplitStringSmart(text) {
  const lines = text.split("\n"); // تقسيم النص إلى أسطر
  let result = [];
  let currentSection = { title: "", content: "" };

  lines.forEach((line) => {
    if (line.trim().endsWith("؟")) {
      // إذا وُجد عنوان جديد، احفظ القسم السابق (إن وجد)
      if (currentSection.title) {
        result.push(currentSection);
      }
      // أنشئ قسمًا جديدًا بالعنوان الحالي
      currentSection = { title: line.trim(), content: "" };
    } else {
      // أضف المحتوى إلى القسم الحالي
      currentSection.content +=
        (currentSection.content ? "\n" : "") + line.trim();
    }
  });

  // إضافة آخر قسم إذا كان هناك بيانات متبقية
  if (currentSection.title) {
    result.push(currentSection);
  }

  return result;
}
