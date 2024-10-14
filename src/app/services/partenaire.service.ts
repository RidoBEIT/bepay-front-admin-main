import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partenaire } from '@app/models/partenairee.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  constructor(private http: HttpClient,
              private authService : AuthService
    ) { }


getAllPartenaire():Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

    return this.http.get<any>( host+"/partenaires/list", {headers: headers});
}

getPhoto(photo:any):Observable<any>{
  let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    

    return this.http.get<any>( host + "/partenaires/getPhoto/"+photo, {headers: headers});

}

Add(partenaire:Partenaire):Observable<Partenaire>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
  let host = environment.host;
          
  return this.http.post<Partenaire>(host+"/partenaires/save",partenaire, {headers:headers});
}

delete(id:number):Observable<void>{
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  
  // return this.http.delete<void>("/axes/"+id, {headers: headers});

  let host = environment.host;
  return this.http.delete<void>(host+"/partenaires/"+id, {headers: headers});
}


update(id:number, compagnie:any):Observable<Partenaire>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
  return this.http.put<Partenaire>(host+"/partenaires/update/"+id, compagnie, {headers: headers});
}

}
