import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeTransaction } from '@app/models/typeTransaction.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeTransactionService {

  constructor(private http: HttpClient,
    private authService : AuthService,
    ) { }


getAllAction():Observable<any>{
let host = environment.host;
let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});


return this.http.get<any>( host+"/typeTransactions/list", {headers: headers});
}

AddAction(action:TypeTransaction):Observable<TypeTransaction>{

let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
let host = environment.host;
  
return this.http.post<TypeTransaction>(host+"/typeTransactions/save",action, {headers: headers});
}

}


