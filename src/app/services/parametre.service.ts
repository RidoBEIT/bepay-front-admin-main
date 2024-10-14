import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametre } from '@app/models/parametre.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http: HttpClient,
    private authService : AuthService
    ) { }


  getAll():Observable<any>{
      let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      
  
      return this.http.get<any>( host+"/parametres/list", {headers: headers});
  }

  getApiParam(id:any):Observable<any>{
    let host = environment.host;
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    

    return this.http.get<any>( host+"/parametres/apiParams/"+id, {headers: headers});
  }


getParam(id:any):Observable<any>{
  let host = environment.host;
let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  

  return this.http.get<any>( host+"/parametres/"+id, {headers: headers});
}
  
  Add(parametre:Parametre):Observable<Parametre>{
          
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
            
    return this.http.post<Parametre>(host+"/parametres/save",parametre, {headers: headers});
  }
  
  delete(id:number):Observable<void>{
    
    // return this.http.delete<void>("/axes/"+id, {headers: headers});
  
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.delete<void>(host+"/parametres/"+id, {headers: headers});
  }
  
  
  update(id:number, parametre:any):Observable<Parametre>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.put<Parametre>(host+"/parametres/update/"+id, parametre, {headers: headers});
  }
  }
