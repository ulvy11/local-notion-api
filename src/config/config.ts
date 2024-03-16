export class Config {
  private constructor() {}

  public static readonly PORT: string = "PORT";
  public static readonly NOTION_DATABASE_ID: string = "NOTION_DATABASE_ID";
  public static readonly NOTION_API_KEY: string = "NOTION_API_KEY";

  public static getConfigEnv(): NodeJS.ProcessEnv {
    return process.env;
  }

  public static getProperty(property: string): string {
    return process.env[property] ?? "";
  }
}
