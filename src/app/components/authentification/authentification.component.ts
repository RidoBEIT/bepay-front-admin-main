import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'sb-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  loginForm: FormGroup;
  message: any;
 submitted: boolean = false;


 // @ViewChild('nameRef') nameElementRef?: ElementRef;
  
  constructor(private authService: AuthService,
     private formBuilder: FormBuilder,
     private router: Router, 
     private activatedRoute: ActivatedRoute) {
    this.loginForm = this.formBuilder.group( {
      username:[ '' , Validators.required] ,
      password: ['', Validators.required]
    });
    
   }

  ngOnInit(): void {
   this.submitted = false;

    let mes = Number(this.activatedRoute.snapshot.paramMap.get('message')); 
    if(mes == 1){
      this.message = mes;
    }
      
    this.loginForm = this.formBuilder.group( {
      username:[ '' , Validators.required] ,
      password:['',Validators.required]
    }) ;
  }

  // ngAfterViewInit() {
  //   this.nameElementRef?.nativeElement.focus();
  //   //console.log(this.nameElementRef);
  // }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    let token:any;
    let data = {
      login: this.f['username'].value,
      password: this.f['password'].value
    }
   
    //console.log(data);
    this.authService.login(data) 
      .subscribe(response => {
      
        token = response.body;
       
        
      this.authService.doLoginUser(data.login, token);
     

      this.router.navigateByUrl("/partenaires");
      
    });
    
 
  }

}
