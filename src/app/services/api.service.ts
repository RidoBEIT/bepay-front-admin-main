import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@app/models/api.models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private authService : AuthService
    ) { }


getAllApi():Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    

    return this.http.get<any>( host+"/apis/list", {headers: headers});
}

getApi(id:any):Observable<any>{
  let host = environment.host;
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  

  return this.http.get<any>( host+"/apis/"+id, {headers: headers});
}


AddApi(api:any):Observable<Api>{
        
  let host = environment.host;
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

          
  return this.http.post<Api>(host+"/apis/save",api, {headers: headers});
}

deleteApi(id:number):Observable<void>{
  
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

  let host = environment.host;
  return this.http.delete<void>(host+"/apis/delete/"+id, {headers: headers});
}

update(id:number, api:Api):Observable<Api>{
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

  let host = environment.host;
  return this.http.put<Api>(host+"/apis/update/"+id, api, {headers: headers});
}
}
