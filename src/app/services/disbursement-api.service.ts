import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisbursementApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     let host = environment.host;

     
      return this.http.get<any>(host+"/decaisser/list", {headers: headers});
      

  }

  get(id:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/decaisser/"+id, {headers: headers});
  }

  create(id:any,trans:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<any>(host+"/decaisser/sendMoney/"+id,trans, {headers: headers});
  }


  update(id:any, profile:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<any>(host+"/decaisser/"+id, profile, {headers: headers});
  }


  delete(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/decaisser/"+id, {headers: headers});
  }

  checkTxnStatus(iddecaisser: number){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/decaisser/getResponse/"+iddecaisser, {headers: headers});
  }

  
}
