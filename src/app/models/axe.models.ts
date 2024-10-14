import { Escales } from "./escales.model";
import { Ville } from "./ville.models";

export class Axe{
    id_axe?: number;
    tarif_axe?: number;
    depart?: Ville;
    arrive?: Ville;
    escales?: Escales[]=[];
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }