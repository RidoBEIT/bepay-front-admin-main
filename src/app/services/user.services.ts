import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { User } from "../models/user.models";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService{

   /* private backEndUrl = 'http://localhost:8080/user';

    constructor(private http: HttpClient ,private authService: AuthService){

    }

    tokenType = 'Bearer '; 
    getAllUsers():Observable<any>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
                
        return this.http.get<any>( "/users", {headers: headers});
    
   //return this.http.get('${this.backEndUrl}');
   }

    getUsers(id:number):Observable<any>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
        return this.http.get<any>("/users/"+id, {headers: headers});
    }

    AddUser(user:User):Observable<User>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
                
        return this.http.post<User>("/users",user, {headers: headers});
    }


    updateUsers(id:number, user:User):Observable<User>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

        return this.http.put<User>("/users/"+id, user, {headers: headers});
    }


    deleteUser(id:number):Observable<void>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        
        return this.http.delete<void>("/users/"+id, {headers: headers});
    }*/


    private baseURL = 'http://localhost:8081/api/nosUsers';

    constructor(private httpClient: HttpClient,
     private authService: AuthService) { }
    
    getUsersList(): Observable<User[]>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      // console.log("this.authService.getJwtToken");
      console.log(this.authService.getJwtToken());
      return this.httpClient.get<User[]>(host+ "/nosUsers/list", {headers: headers});
    }
  
    createUser(user: User): Observable<Object>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      return this.httpClient.post(host+"/nosUsers/save", user, {headers: headers});
    }
  
    getUserById(id: number): Observable<User>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

      let host = environment.host;

      return this.httpClient.get<User>(host+"/nosUsers/"+id, {headers: headers});
      
    }
  
    updateUser(id: number, user: User): Observable<Object>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

      let host = environment.host;

      return this.httpClient.put(host+"/nosUsers/update/"+id, user, {headers: headers});
    }
  
    deleteUser(id: number): Observable<Object>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

      let host = environment.host;

      return this.httpClient.delete(host+"/nosUsers/"+id, {headers: headers});
    }

    getUsernameCount(username: string): Observable<number>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});

      let host = environment.host;

      return this.httpClient.get<number>(host+"/nosUsers/user/"+username, {headers: headers});
    }
    
}