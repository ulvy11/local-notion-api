import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import {
  CheckboxProperty,
  DateProperty,
  DateResponse,
  FilesProperty,
  MultiSelectProperty,
  NumberProperty,
  ParentDatabase,
  ParentPage,
  Properties,
  RichTextProperty,
  TitleProperty,
  UrlProperty,
} from "./properties";

export interface Apartment extends CreatePageParameters {
  properties: {
    Prix: NumberProperty;
    Lieu: RichTextProperty;
    Date: DateProperty;
    Image: FilesProperty;
    Étiquettes: MultiSelectProperty;
    URL: UrlProperty;
    Préférés: CheckboxProperty;
    Taille: NumberProperty;
    Supprimée: CheckboxProperty;
    Nom: TitleProperty;
  };
}

export interface PartialApartmentConfig {
  Nom?: string;
  Prix?: number;
  Lieu?: string;
  Image?: { name: string; url: string }[];
  URL?: string;
  Préféré?: boolean;
  Taille?: number;
}

export class Apartment implements Apartment {
  constructor(
    parent: ParentPage | ParentDatabase,
    apartmentConfig?: PartialApartmentConfig
  ) {
    apartmentConfig = apartmentConfig ?? {};
    this.parent = parent;
    this.properties = {
      Prix: {
        id: "",
        type: "number",
        number: apartmentConfig.Prix ?? null,
      },
      Lieu: {
        id: "",
        type: "rich_text",
        rich_text:
          apartmentConfig.Lieu != null
            ? Properties.createSimpleRichText(apartmentConfig.Lieu)
            : [],
      },
      Date: {
        id: "",
        type: "date",
        date: Properties.getDateResponse(),
      },
      Image: {
        id: "",
        type: "files",
        files: [],
      },
      Étiquettes: {
        id: "",
        type: "multi_select",
        multi_select: [],
      },
      URL: {
        id: "",
        type: "url",
        url: apartmentConfig.URL ?? null,
      },
      Préférés: {
        id: "",
        type: "checkbox",
        checkbox: apartmentConfig.Préféré ?? false,
      },
      Taille: {
        id: "",
        type: "number",
        number: apartmentConfig.Taille ?? null,
      },
      Supprimée: {
        id: "",
        type: "checkbox",
        checkbox: false,
      },
      Nom: {
        id: "",
        type: "title",
        title:
          apartmentConfig.Nom != null
            ? Properties.createSimpleRichText(apartmentConfig.Nom)
            : [],
      },
    };

    if (!apartmentConfig.Image) return;
    apartmentConfig.Image.forEach((value) =>
      this.addExternalImage(value.url, value.name)
    );
  }

  public set url(url: string) {
    this.properties.URL.url = url;
  }

  public set prix(prix: number | null) {
    this.properties.Prix.number = prix;
  }

  public set taille(taille: number | null) {
    this.properties.Taille.number = taille;
  }

  public set date(date: DateResponse | null) {
    this.properties.Date.date = date;
  }

  public set preferes(checkbox: boolean) {
    this.properties.Préférés.checkbox = checkbox;
  }

  public set supprimee(checkbox: boolean) {
    this.properties.Supprimée.checkbox = checkbox;
  }

  public set nom(nom: string) {
    this.properties.Nom.title = Properties.createSimpleRichText(nom);
  }

  public set lieu(lieu: string) {
    this.properties.Lieu.rich_text = Properties.createSimpleRichText(lieu);
  }

  public setDate(date?: DateResponse) {
    this.date = date ?? Properties.getDateResponse();
  }

  public addExternalImage(url: string, name: string) {
    this.properties.Image.files.push({
      type: "external",
      external: {
        url,
      },
      name,
    });
  }
}
