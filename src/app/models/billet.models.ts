import { Time } from "@angular/common";
import { Clients } from "./clients.models";
import { Partenaire } from "./partenairee.model";
import { Payement } from "./payement.models";

export class Billet{
    idBillet?: number;
    idOrigine?: number;
    idAgence?: number;
    idAxe?: number;
    idDepart?: number;
    idArrive?: number;
    tarif?: number;
    dateVoyage?: Date;
    heureDepart?: string;
    payement?:Payement;
    partenaire? : Partenaire;
    client? : Clients;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }