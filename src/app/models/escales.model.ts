import { Axe } from "./axe.models";
import { Ville } from "./ville.models";

export class Escales{
    id?: number;
    tarif?: number;
    axe? : Axe;
    ville? : Ville;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;
}