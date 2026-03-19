const startOfMonth = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );
}

const startOfWeek = () => {
  const now = new Date();

  const start = new Date(
    now.setUTCDate(now.getUTCDate() - now.getUTCDay())
  );

  start.setUTCHours(0, 0, 0);

  return start;
}


export { startOfMonth, startOfWeek };