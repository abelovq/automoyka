export const getTodayDateWithTime = (hour: number, minute: number): Date => {
  const d = new Date();
  let ye = d.getFullYear();
  const mo = d.getMonth();
  let da = d.getDay();

  return new Date(Date.UTC(ye, mo, da, hour, minute));
};

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}
