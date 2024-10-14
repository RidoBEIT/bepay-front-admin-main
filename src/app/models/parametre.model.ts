 import { Api } from "./api.models";

export class Parametre{
    idParametre?: number;
    parent?: number;
    niveau?: number;
    has_children?:boolean;
    value?: string;
    key?: string;
    type?: string;
    ordre?: number;
    api?: Api;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date; 
}