const FormatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};

export default FormatDate;
