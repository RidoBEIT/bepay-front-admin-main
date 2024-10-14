import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Clients } from "../models/clients.models";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
@Injectable({providedIn: 'root'})
export class ClientService{

    
    constructor(private http: HttpClient ,
        private authService : AuthService
        ){

    }

    tokenType = 'Bearer '; 
    getClientsList():Observable<Clients[]>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
        return this.http.get<Clients[]>( host+"/clients/list", {headers: headers});
    }

    getClient(id:number):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
        
        return this.http.get<any>(host+"/clients/"+id, {headers: headers});
    }

    createClient(client:Clients):Observable<Clients>{

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
        return this.http.post<Clients>(host+"/clients/save",client, {headers: headers});
    }


    updateClient(id:any, client:Clients):Observable<Clients>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
        return this.http.put<Clients>(host+"/clients/update/"+id, client, {headers: headers});
    }


    deleteClient(id:number):Observable<void>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
        return this.http.delete<void>(host+"/clients/"+id, {headers: headers});
    }

    getClientByNumber(telephone: string): Observable<Clients>{
  
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
  
        return this.http.get<Clients>(host+"/clients/client/"+telephone, {headers: headers});
      }
}