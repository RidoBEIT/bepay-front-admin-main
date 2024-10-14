import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseParamService {

  constructor(private http: HttpClient,private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     /* return this.http.get<any>("/rp");*/
     let host = environment.host;

     
      return this.http.get<any>(host+"/responseParam/list", {headers: headers});
      

  }

  getListByApi(id:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
     
    /* return this.http.get<any>("/rp");*/
    let host = environment.host;

    
     return this.http.get<any>(host+"/responseParam/list/"+id, {headers: headers});
     

 }

  get(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/responseParam/"+id, {headers: headers});
  }

  create(rp:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<any>(host+"/responseParam/save",rp, {headers: headers});
  }


  update(id:any, rp:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<any>(host+"/responseParam/update/"+id, rp, {headers: headers});
  }


  delete(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/responseParam/delete/"+id, {headers: headers});
  }
}
