function DateUser(createdAt) {
  const date = new Date(createdAt);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Obtenez le mois et le jour
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  const formattedDate = `${day} ${month}, ${date.getFullYear()}`;

  return formattedDate;
}

export default DateUser;
