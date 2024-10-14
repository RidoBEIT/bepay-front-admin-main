import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient,private authService: AuthService){

  }
  getList():Observable<any>{
     let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
      
     let host = environment.host;

     
      return this.http.get<any>(host+"/transaction/list", {headers: headers});
      

  }

  findByTransactionTypePaiement():Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
     
    let host = environment.host;

    
     return this.http.get<any>(host+"/transaction/paiement", {headers: headers});
     

 }

 findByTransactionTypeRemboursement():Observable<any>{
  let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
   
  let host = environment.host;

  
   return this.http.get<any>(host+"/transaction/remboursement", {headers: headers});
   

}

  get(id:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/transaction/"+id, {headers: headers});
  }

  create(id:any,trans:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<any>(host+"/transaction/saveTransaction/"+id,trans, {headers: headers});
  }

  getRembourser(id:any):Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
            
    return this.http.get<any>(host+"/transaction/refundTransaction/"+id, {headers: headers});
}

  update(id:any, profile:any):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.put<any>(host+"/transaction/"+id, profile, {headers: headers});
  }


  delete(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/transaction/"+id, {headers: headers});
  }

  checkTxnStatus(idTransaction: number){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/transaction/getResponse/"+idTransaction, {headers: headers});
  }

  
}
