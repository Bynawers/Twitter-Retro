function DateConverter(createdAt) {
  const date = new Date(createdAt);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Obtenez le mois et le jour
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  const formattedDate = `${formattedHours}:${
    (minutes < 10 ? "0" : "") + minutes
  } ${amOrPm} · ${month} ${day}, ${date.getFullYear()}`;

  return formattedDate;
}

export default DateConverter;
