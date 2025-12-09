function getDateForDay(day) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  // Sunday of current week + day (0 => this week's Sunday, 7 => next week's Sunday)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + day);
  return startOfWeek.toISOString().split('T')[0];
}

export { getDateForDay };
