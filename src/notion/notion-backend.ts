import { Request, Response } from "express";
import { Config } from "../config/config";
import { Apartment, PartialApartmentConfig } from "./entities/apartment";
import { NotionClient } from "./notion-client";

export class NotionBackend {
  private constructor() {}

  private static readonly notionClient = new NotionClient(
    Config.getProperty(Config.NOTION_API_KEY),
    Config.getProperty(Config.NOTION_DATABASE_ID)
  );

  public static async addApartment(req: Request, resp: Response) {
    try {
      const apartmentConfiguration = <PartialApartmentConfig>req.body.apartment;
      const apartment: Apartment = new Apartment(
        NotionBackend.notionClient.parentDatabase,
        apartmentConfiguration
      );

      const comments = <Array<string>>req.body.comments ?? [];

      const apartmentPage =
        await NotionBackend.notionClient.addApartmentPage(apartment);

      if (apartmentPage == null) {
        resp.statusCode = 500;
        resp.json({ error: "No apartment was created" });
        return;
      }

      for (const comment of comments) {
        await NotionBackend.notionClient.addComment(apartmentPage.id, comment);
      }

      resp.json({
        pageId: apartmentPage.id,
        url: apartmentPage.url,
      });
    } catch (e) {
      resp.statusCode = 400;
      resp.json({ error: e });
    }
  }
}
