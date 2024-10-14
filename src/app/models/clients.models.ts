import { Billet } from "./billet.models";
import { User } from "./user.models";

export class Clients{
    id?: number;
    nom?: string;
    nom_entreprise?: string;
    numero_entreprise?: string;
    nom_representant?: string;
    numero_representant?: string;
    user?: User;
    email_entreprise?:string;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }