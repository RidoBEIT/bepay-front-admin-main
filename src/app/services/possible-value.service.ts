import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PossibleValueService {

  constructor(private http: HttpClient,private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     /* return this.http.get<any>("/profile");*/
     let host = environment.host;

     
      return this.http.get<any>(host+"/possibleValue/list", {headers: headers});
      

  }

  get(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/possibleValue/"+id, {headers: headers});
  }

  create(profile:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<any>(host+"/possibleValue/save",profile, {headers: headers});
  }


  update(id:number, profile:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<any>(host+"/possibleValue/update/"+id, profile, {headers: headers});
  }


  delete(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/possibleValue/delete/"+id, {headers: headers});
  }}
