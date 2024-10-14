import { TypeAction } from "./typeAction.models";
import { Partenaire } from "./partenairee.model";
import { Parametre } from "./parametre.model";
import { ResponseParam } from "./responseParam.models";

export class Api{
    idApi?: number;
    libelle?: string;
    description?: string;
    url?: string;
    typeRetour?: string;
    methode?: string;
    managedEntity?: string;
    action?:TypeAction;
    partenaire?:Partenaire;
    parametres?:Parametre[];
    responseParams?:ResponseParam[];
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date; 
}