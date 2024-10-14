import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeReponseService {

  constructor(private http: HttpClient,
    private authService : AuthService,
    ) { }


getAll():Observable<any>{
let host = environment.host;
let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});


return this.http.get<any>( host+"/rest/reponses/list", {headers: headers});
}

Add(action:any):Observable<any>{

let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
let host = environment.host;
  
return this.http.post<any>(host+"/rest/reponses/save",action, {headers: headers});
}

get(id:any):Observable<any>{
  let host = environment.host;
let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  

  return this.http.get<any>( host+"rest/reponses/"+id, {headers: headers});
}
  

  delete(id:number):Observable<void>{
    
    // return this.http.delete<void>("/axes/"+id, {headers: headers});
  
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.delete<void>(host+"rest/reponses/"+id, {headers: headers});
  }
  
  
  update(id:number, parametre:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.put<any>(host+"rest/reponses/update/"+id, parametre, {headers: headers});
  }

}

