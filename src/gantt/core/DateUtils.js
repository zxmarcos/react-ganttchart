
export default class DateUtils {

  static daysBetween(d1, d2) {
    const a = d1.getTime();
    const b = d2.getTime();
    return Math.ceil(Math.abs(a - b) / (1000 * 3600 * 24));
  }

  static floor(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
  }

  static ceil(date) {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    if (month >= 12) {
      month = 1;
      year++;
    }
    return new Date(year, month, 1);
  }

  static addDays(date, days) {
    const ndate = new Date(date.valueOf());
    ndate.setDate(ndate.getDate() + days);
    return ndate;
  }

  static randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}