import { ServicePayement } from "./service.models";

export class Payement{
    idPayement?: number;
    numero_payement?: number;
    nom_payement?: string;
    prenom_payement?: string;
    code?: string;
    password?: string;
    servicePayement?: ServicePayement;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
}