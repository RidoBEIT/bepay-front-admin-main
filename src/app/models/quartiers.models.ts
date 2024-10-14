import { Ville } from "./ville.models";

export class Quartiers{
    id?: number;
    nom?: string;
    ville?: Ville;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }