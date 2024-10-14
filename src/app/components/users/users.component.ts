import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@app/models/profile.models';
import { User } from '@app/models/user.models';
import { ProfileService } from '@app/services/profile.services';
import { UserService } from '@app/services/user.services';
import { Ville } from '@app/models/ville.models';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'sb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users?: User[];
    usernames?: String[];
    closeResult = '';
    profiles? : Profile[]; 
    villes? : Ville[];
    userExist?: boolean; 
    nombreUsername?: number = 0;
    event: EventEmitter<any>=new EventEmitter();
    public currentUser?: User;
   public id:any = 0;
   mesVide = "";
   term = "";
  placeHol = "Chercher un UTILISATEUR"

   
 modalReference?: NgbModalRef;
 submitted: boolean = false;


    addUserFormGroup = new FormGroup({
        id_user: new FormControl(''),
        nom: new FormControl(''),
        prenom: new FormControl(''),
        email: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        profile_user: new FormControl(''),
      });

      updateUserFormGroup = new FormGroup({
        id_user: new FormControl(''),
        nom: new FormControl(''),
        prenom: new FormControl(''),
        email: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        profile_user: new FormControl(''),
      });

    constructor(
        private usersService: UserService,
        private router: Router,
        private modalService: NgbModal,
        private profileService : ProfileService,
        private fb : FormBuilder,  private authService : AuthService,
        private route : Router
        
    ) {

       
    }

    ngOnInit(): void {

        this.addUserFormGroup = this.fb.group({
            id_user:[0],
            username:["",Validators.required],
            nom:[""],
            prenom:[""],
            email:[""],
            profile_user:["",Validators.required],
            ville_user:[""],
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
          });

        this.getUsers();
        this.onGetAllProfiles();
        this.initForm();
    }

    initForm() {
        if (this.currentUser) {
          this.updateUserFormGroup = this.fb.group({
            id_user:[this.currentUser.idUser,Validators.required],
            username:[this.currentUser.username,Validators.required],
            password:[this.currentUser.password,Validators.required],
            nom:[this.currentUser.nom,Validators.required],
            prenom:[this.currentUser.prenom,Validators.required],
            email:[this.currentUser.email,Validators.required],
            profile_user:[this.currentUser.profile_user,Validators.required],
          })
        }
      }

    getUsers() {
        this.usersService.getUsersList().subscribe(data => {
            this.users = data;
            console.log(this.users);
        });
    }

    // getUsernames(event: any) {
    //     // console.log("event");
    //     // console.log(event);
    //     let nusername = event.target.value;
    //     // console.log("username");

    //      console.log(nusername);
    //      console.log("userExist");
    //      console.log(this.userExist);

    //     this.usersService.getUsernames().subscribe(data => {
    //         this.usernames = data;
    //         console.log(this.usernames);

            
    //      for(let username of this.usernames){
    //          if (username == nusername)
    //          {
    //              this.userExist=true;
    //              alert('Username exist déjà!');
    //          }
             
    //   }
    //   this.userExist=false;
    //     });
      
    // }

    getUsernameCount(event: any)
    {
        let nUsername = event.target.value;
        this.usersService.getUsernameCount(nUsername).subscribe(data=>{
            this.nombreUsername = data;
            console.log(this.nombreUsername);
            
         })
    }

    onAddUser() {
        console.log("this.addUserFormGroup?.value");
        
        this.submitted = true;

        if(this.addUserFormGroup?.value.nom!="" && this.addUserFormGroup?.value.prenom!="" && this.addUserFormGroup?.value.telephone_user!="" && this.addUserFormGroup?.value.profile_user!=""  && this.addUserFormGroup?.value.username!="" && this.addUserFormGroup?.value.password!="")
          {
            this.modalReference?.close();
          }

      //  let user = new User();
      //  user.nom = this.addUserFormGroup.value.nom;
      //  user.prenom = this.addUserFormGroup.value.age_user;
      //  user.username = this.addUserFormGroup.value.age_user;
      //  user.password = this.addUserFormGroup.value.age_user;
      //  user.email = this.addUserFormGroup.value.age_user;
      //  user.profile_user = this.addUserFormGroup.value.age_user;
      // console.log("user = "+ user);
    //   if(user.age_user==null || user.nom == null || user.prenom==null || user.username ==null || user.password ==null || user.telephone_user ==null || user.profile_user ==null || user.ville_user ==null){
    //     this.mesVide = "Veillez remplir tout les champs svp"
    //   }
    //   else{
        if(this.nombreUsername==0){
            this.usersService.createUser(this.addUserFormGroup?.value).subscribe(data => {
                console.log("data");
                console.log(data);
                if(data!=null && data>0){
                    alert("Utilisateur ajouté avec succès!");
                    this.ngOnInit();
    
                  }
                  
    
            });
        } else{
            alert("username existe déja");

        }
    //   }
        
        return
    
        
  }

    UsersDetails(id: number) {
        this.router.navigate(['Users-details', id]);
    }

    onUpdateUser() {

        console.log("this.updateUserFormGroup");
        console.log(this.updateUserFormGroup.value);
      this.usersService.updateUser(this.id, this.updateUserFormGroup?.value)
      .subscribe(data => {
       alert("Mise à jour effectuée avec Succès");
       this.getUsers();
    

    },err=>{

    });
    }

    deleteUser(user: any) {
        const res = confirm('Vous voulez vraiment supprimer ? ');
        if (res === true)
            this.usersService.deleteUser(user.idUser).subscribe(data => {
                // console.log(data);

                this.getUsers();
            });
    }

    onGetAllProfiles() {
        
        this.profileService.getProfilesList()
         .subscribe(response => {
        //  console.log("response");
        //  console.log(response);
         this.profiles = response//._embedded.profiles;
          
        });
        //  console.log(this.profiles);
      }

      logout()
    {
        this.authService.logout();
        this.route.navigateByUrl("/authenticate");

    }

     

    open(content: any, item : any = null, size : any = 'lg') {
        if(item!=null){
            this.currentUser = item;
            this.initForm();
            this.id = this.currentUser?.idUser;
            // console.log("data");
            // console.log(this.currentUser);
        }
     this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size });
     this.modalReference.result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
