const verifyAge = (date: Date | null, targetAge: number): boolean => {
  if (!date) return true;
  const ageDifference = Date.now() - date.getTime();
  const ageDate = new Date(ageDifference);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= targetAge;
};

export default verifyAge;
