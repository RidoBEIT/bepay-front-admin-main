import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Profile } from "../models/profile.models";
import { environment } from "environments/environment";

@Injectable({providedIn: 'root'})
export class ProfileService{
    
    private baseURL = 'http://localhost:8092/api/profiles';

    constructor(private http: HttpClient,private authService: AuthService){

    }
    tokenType = 'Bearer ';
    getProfilesList():Observable<any>{
       let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
        
       /* return this.http.get<any>("/profile");*/
       let host = environment.host;

       
        return this.http.get<any>(host+"/listProfile", {headers: headers});
        

    }

    getProfile(id:number):Observable<any>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.get<any>(host+"/profiles/"+id, {headers: headers});
    }

    createProfile(profile:Profile):Observable<Profile>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
                
        return this.http.post<Profile>(host+"/profiles",profile, {headers: headers});
    }


    updateProfile(id:number, profile:Profile):Observable<Profile>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        return this.http.put<Profile>(host+"/profiles/"+id, profile, {headers: headers});
    }


    deleteProfile(id:number):Observable<void>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.delete<void>(host+"/profiles/"+id, {headers: headers});
    }

    
}