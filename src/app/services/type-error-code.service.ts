import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeErrorCodeService {
  constructor(private http: HttpClient,private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     /* return this.http.get<any>("/rp");*/
     let host = environment.host;

     
      return this.http.get<any>(host+"/errorCodeType/list", {headers: headers});
      

  }



  get(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/errorCodeType/"+id, {headers: headers});
  }

  createTypeCode(rp:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<any>(host+"/errorCodeType/save",rp, {headers: headers});
  }

  createCode(rp:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
            
    return this.http.post<any>(host+"/errorCode/save",rp, {headers: headers});
}


  updateTypeCode(id:any, rp:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<any>(host+"/errorCodeType/update/"+id, rp, {headers: headers});
  }

  
  updateCode(id:any, rp:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.put<any>(host+"/errorCode/update/"+id, rp, {headers: headers});
}

  deleteTypeCode(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/errorCodeType/delete/"+id, {headers: headers});
  }

  deleteCode(id:number):Observable<void>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    
    return this.http.delete<void>(host+"/errorCode/delete/"+id, {headers: headers});
}

}
