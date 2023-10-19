export const getDateTimeNow = () => {
  // Create a new Date object
  const currentDate = new Date();

  // Define the date and time format
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  // Format the date and time
  const formattedDateTime = dateTimeFormat.format(currentDate);

  return formattedDateTime
}
