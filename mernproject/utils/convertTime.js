export const convertTime = (objString) => {
    let time = new Date(objString);

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return time.toLocaleString("en-US", options);
  };