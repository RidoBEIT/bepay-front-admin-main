import { Partenaire } from "./partenairee.model";
import { TypeTransaction } from "./typeTransaction.model";

export class Transaction{
    idTransaction?: number;
    numero?: string;
    libelle_transaction?: string;
    montant?: string;
    nom?: string;
    prenom?: string;
    code?: string;
    partenaire?:Partenaire;
    typeTransaction?:TypeTransaction
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;
}