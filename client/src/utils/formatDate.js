function formatDate(date) {
  return !date ? "" : new Intl.DateTimeFormat().format(new Date(date));
}

function formatDateCHN(date) {
  return !date
    ? ""
    : new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour12: false,
      }).format(new Date(date));
}

function formatDateV2(date) {
  if (!date) {
    return "";
  } else {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}年${
      dateObj.getMonth() + 1
    }月${dateObj.getDate()}日`;
  }
}
export { formatDate, formatDateCHN, formatDateV2 };
