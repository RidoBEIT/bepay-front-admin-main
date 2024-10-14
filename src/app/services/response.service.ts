import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '@app/models/profile.models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient,private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     /* return this.http.get<any>("/profile");*/
     let host = environment.host;

     
      return this.http.get<any>(host+"/response/list", {headers: headers});
      

  }

  get(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/response/"+id, {headers: headers});
  }

  create(profile:Profile):Observable<Profile>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<Profile>(host+"/response/save",profile, {headers: headers});
  }


  update(id:number, profile:Profile):Observable<Profile>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<Profile>(host+"/response/update/"+id, profile, {headers: headers});
  }


  delete(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/response/delete/"+id, {headers: headers});
  }

}
