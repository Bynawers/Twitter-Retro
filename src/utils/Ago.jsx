import moment from "moment";

const Ago = (createdAt) => {
  const createdDate = moment(createdAt);
  const now = moment();
  const duration = moment.duration(now.diff(createdDate));

  if (duration.asMinutes() < 1) {
    const seconds = Math.floor(duration.asSeconds());
    return `${seconds}s`;
  } else if (duration.asHours() < 1) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes}m`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  } else {
    return createdDate.format("D MMMM");
  }
};

export default Ago;
