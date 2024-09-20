export const formatTimeRemaining = (deadline: string): `${string}:${string}:${string}` => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeDifference = deadlineDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return '00:00:00';
  }

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const getIsBusinessOpen = (startTime: `${string}:${string}`, endTime: `${string}:${string}`): boolean => {
  const now = new Date();

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDate = new Date(now);
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date(now);
  endDate.setHours(endHour, endMinute, 0, 0);

  return now >= startDate && now <= endDate;
};

export const formatTimeToAMPM = (time: `${string}:${string}` | undefined) => {
  if (!time) {
    return 'Invalid time';
  }

  const [hourString] = time.split(':');
  let hour = parseInt(hourString, 10);
  const suffix = hour >= 12 ? 'pm' : 'am';

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  return `${hour}${suffix}`;
};
