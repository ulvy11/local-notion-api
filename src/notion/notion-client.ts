import { Client } from "@notionhq/client";
import { Apartment } from "./entities/apartment";
import {
  CreatePageResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ParentDatabase, Properties } from "./entities/properties";

export class NotionClient {
  private _databadeId: string;
  private _apiKey: string;
  private notion: Client;

  public get databaseId(): string {
    return this._databadeId;
  }

  public set databaseId(pageId: string) {
    this._databadeId = pageId;
  }

  public get apiKey(): string {
    return this._apiKey;
  }

  public get parentDatabase(): ParentDatabase {
    return {
      type: "database_id",
      database_id: this.databaseId,
    };
  }

  constructor(apiKey: string, databaseId?: string) {
    this._databadeId = databaseId ?? "";
    this._apiKey = apiKey;
    this.notion = new Client({ auth: this.apiKey });
  }

  public async addApartmentPage(
    apartment: Apartment
  ): Promise<PageObjectResponse | null> {
    const res: CreatePageResponse = await this.notion.pages.create(apartment);
    let createdPage: PageObjectResponse;
    try {
      createdPage = <PageObjectResponse>res;
    } catch (e) {
      console.error(e);
      return null;
    }

    console.log(`Url : ${createdPage.url}`);

    return createdPage;
  }

  public async addComment(pageId: string, comment: string) {
    try {
      await this.notion.comments.create({
        parent: {
          page_id: pageId,
          type: "page_id",
        },
        rich_text: Properties.createSimpleRichText(comment),
      });
    } catch (e) {
      console.error(`Error with ${pageId} : ${comment}`);
      console.error(e);
      await this.addComment(pageId, comment);
    }
  }
}
