export const getTodayDateWithTime = (hour: number, minute: number): Date => {
  const d = new Date();
  d.setHours(hour);
  d.setMinutes(minute);
  d.setSeconds(0);
  d.setMilliseconds(0);
  // console.log("created", d);
  // let ye = d.getFullYear();
  // const mo = d.getMonth() + 1;
  // let da = d.getDate();
  // // if (24 - d.getHours() < 3) d.setDate(da + 1);

  // // da = d.getDay();

  // console.log(ye, mo, da, hour + 3, minute);
  // const utcDate = new Date(Date.UTC(ye, mo, da, hour + 3, minute));
  // console.log(utcDate);
  return d;
};

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export function getNow(): Date {
  const nowTime = new Date();
  const nowUTC = getTodayDateWithTime(nowTime.getHours(), nowTime.getMinutes());
  return nowUTC;
}
