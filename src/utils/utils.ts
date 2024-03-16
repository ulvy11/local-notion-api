export class Utils {
  private constructor() {}

  public static logJsonStringified(object: any) {
    console.log(JSON.stringify(object, null, 5));
  }
}
