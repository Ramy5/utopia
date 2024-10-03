export function getDateFromTimestamp(timestamp) {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes.toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return formattedTime;
}
