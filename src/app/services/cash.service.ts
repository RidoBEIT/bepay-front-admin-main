import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(
    private http: HttpClient,
    private authService : AuthService
    ) { }


getAllCashIn():Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    

    return this.http.get<any>( host+"/cash/getAllCashIn", {headers: headers});
}

getAllCashOut():Observable<any>{
  let host = environment.host;
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  

  return this.http.get<any>( host+"/cash/getAllCashOut", {headers: headers});
}

get(id:any):Observable<any>{
  let host = environment.host;
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  

  return this.http.get<any>( host+"/cash/"+id, {headers: headers});
}



delete(id:number):Observable<void>{
  
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

  let host = environment.host;
  return this.http.delete<void>(host+"/cash/delete/"+id, {headers: headers});
}

update(id:number, cash:any):Observable<any>{
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

  let host = environment.host;
  return this.http.put<any>(host+"/cash/update/"+id, cash, {headers: headers});
}

AddCash(id:any,trans:any):Observable<any>{
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
  let host = environment.host;
          
  return this.http.post<any>(host+"/transaction/saveCash/"+id,trans, {headers: headers});
}


}
