export function formatFullArabicDate(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} - الساعة ${formattedTime}`;
}
export function formatDate(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}
