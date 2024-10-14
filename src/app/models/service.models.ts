import { Fournisseur } from "./fournisseur.models";

export class ServicePayement{
    idService?: number;
    libelle?: string;
    url?: string;
    fournisseur?:Fournisseur;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date; 
}