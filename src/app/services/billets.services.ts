import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { Billet } from "../models/billet.models";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
@Injectable({providedIn: 'root'})
export class BilletService{

    private backEndUrl = 'http://localhost:8081/api/billets';

    constructor(private http: HttpClient,
      private authService : AuthService
      ){

    }
    getAll(page:any,size:any):Observable<any>{
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
    
        return this.http.get<any>( host+"/rest/billets/list?page="+page+"&size="+size, {headers: headers});
    }

    getHeureDeparts(idC:any,idD:any,idA:any):Observable<any>{
      let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      
  
      return this.http.get<any>( host+"/rest/billets/distant/heureDepart/"+idC+"/"+idD+"/"+idA, {headers: headers});
  }
    
    Add(billet:Billet):Observable<Billet>{
            
      let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
              
      return this.http.post<Billet>(host+"/rest/billets/save",billet, {headers: headers});
    }

    create(id:any,billet:any):Observable<Billet>{
            
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
                
        return this.http.post<Billet>(host+"/rest/billets/saveBillet/"+id,billet, {headers: headers});
      }

      createFailedBillet(id:any,billet:any):Observable<Billet>{
            
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
                
        return this.http.post<Billet>(host+"/rest/billets/saveFailedBillet/"+id,billet, {headers: headers});
      }

      getAgences(idC:any):Observable<any>{
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
    
        return this.http.get<any>( host+"/rest/billets/distant/agences/"+idC, {headers: headers});
    }
    
    delete(id:number):Observable<void>{
      
      // return this.http.delete<void>("/axes/"+id, {headers: headers});
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    
      let host = environment.host;
      return this.http.delete<void>(host+"/rest/billets/delete/"+id, {headers: headers});
    }
    
    
    update(id:number, billet:Billet):Observable<Billet>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      return this.http.put<Billet>(host+"/rest/billets/update/"+id, billet, {headers: headers});
    }

    getAllAxes():Observable<any>{
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
    
        return this.http.get<any>( host+"/rest/billets/axes", {headers: headers});
    }

    getDeparts(id:any):Observable<any>{
        let host = environment.host;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    
        return this.http.get<any>( host+"/rest/billets/distant/depart/"+id, {headers: headers});
    }
    getArrives(id:any,idD:any):Observable<any>{
        let host = environment.host;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    
        return this.http.get<any>( host+"/rest/billets/distant/arrive/"+id+"/"+idD, {headers: headers});
    }

    getTarif(id:any,depart:any, arrive:any):Observable<number>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

        let host = environment.host;
        
        return this.http.get<number>(host+"/rest/billets/tarif/"+id+"?depart="+depart+"&arrive="+arrive, {headers: headers});
    }

    getAxe(id:any,depart:any, arrive:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

        let host = environment.host;
        
        return this.http.get<any>(host+"/rest/billets/axeExisted/"+id+"?depart="+depart+"&arrive="+arrive, {headers: headers});
    }

    getAxeById(idCo:any,id:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;

        return this.http.get<any>(host+"/rest/billets/axes/"+idCo+"/"+id, {headers: headers});
    }

    getAllServices():Observable<any>{
        let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
    
        return this.http.get<any>( host+"/service", {headers: headers});
    }

}