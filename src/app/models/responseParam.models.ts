 import { Api } from "./api.models";
import { PossibleValue } from "./possibleValue.models";
 export class ResponseParam{
    idReponseParam?: number;
    value?: string;
    key?: string;
    idApi?: number;
    possible_values?:PossibleValue[];
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date; 
}