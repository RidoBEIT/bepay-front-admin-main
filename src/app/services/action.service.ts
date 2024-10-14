import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeAction } from '@app/models/typeAction.models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

              constructor(private http: HttpClient,
              private authService : AuthService,
              ) { }


  getAllAction():Observable<any>{
      let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      
  
      return this.http.get<any>( host+"/rest/actions/list", {headers: headers});
  }
  
  AddAction(action:TypeAction):Observable<TypeAction>{
          
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
            
    return this.http.post<TypeAction>(host+"/rest/compagnie/save",action, {headers: headers});
  }}
