import { Axe } from "./axe.models";

export class Ville{
    id_ville?: number;
    nom_ville?: string;
    axes?: Axe[] = [];
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }