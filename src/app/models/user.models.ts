import { Profile } from "./profile.models";

export class User{
    idUser?: number;
    username?: string;
    nom?: string;
    email?: string;
    password?: string;
    prenom?: string;
    profile_user?: Profile;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
  }