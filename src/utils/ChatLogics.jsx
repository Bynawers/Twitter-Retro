export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (m, userId) => {
  return m.sender._id === userId;
};

export const getSender = (loggedUser, users) => {
  if (users.length >= 2 && users[0] && users[1]) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  } else {
    // Handle the case where there are not enough users
    return "Unknown";
  }
};

export const getSenderid = (loggedUser, users) => {
  if (users.length >= 2 && users[0] && users[1]) {
    return users[0]._id === loggedUser._id ? users[1]._id : users[0]._id;
  } else {
    // Handle the case where there are not enough users
    return "Unknown";
  }
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
