export const formatTimeRemaining = (deadline: string): `${string}:${string}:${string}` => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeDifference = deadlineDate.getTime() - now.getTime();

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
