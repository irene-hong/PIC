function formatDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

function formatDateCHN(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export { formatDate, formatDateCHN };
