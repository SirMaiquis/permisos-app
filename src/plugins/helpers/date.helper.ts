export class DateHelper {
  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  static isFutureDate(date: string): boolean {
    return new Date(date) > new Date();
  }
}
