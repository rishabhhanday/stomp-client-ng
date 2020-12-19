export class JSONUtil {
  static beautify(message: string): string {
    return JSON.stringify(JSON.parse(message), null, 4);
  }
}
