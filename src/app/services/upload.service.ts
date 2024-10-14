import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  /**
 * Upload file
 * @param id 
 * @returns 
 */
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    let host = environment.host;
    // let headers = new HttpHeaders({ 
    //   'Authorization': this.tokenType +this.authService.getJwtToken()
    // });
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});


    const req = new HttpRequest('POST', host+ "/evenement/savefile", formData, {headers: headers});

    // return this.http.post<any>(host+"/nosModeles/save",formData, {headers: headers});
    return this.http.request(req);
  }

  replaceFile(file: File, idPartenaire: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getJwtToken()});
    // let params = new HttpParams();
    // params.set('oldFileName', oldFileName);
    const req = new HttpRequest('POST', host+ "/partenaires/updateFile/"+ idPartenaire, formData, {headers: headers});
    // return this.http.post<any>(host+"/nosModeles/save",formData, {headers: headers});
    return this.http.request(req);
  }
}
