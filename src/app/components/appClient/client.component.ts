import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '@app/models/profile.models';
import { User } from '@app/models/user.models';
import { AuthService } from '@app/services/auth.service';
import { ProfileService } from '@app/services/profile.services';
import { ModalDismissReasons,  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clients } from '../../models/clients.models';
import { ClientService } from '../../services/clients.services';
// import { UpdateClientComponent } from '../../../update-client/update-client.component';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients?: Clients[];
  closeResult = '';
  term = '';
  submitted: boolean = false;
  profiles? : Profile[]; 
  placeHol = "Chercher un CLIENT"


 
  event: EventEmitter<any>=new EventEmitter();
  public currentClient?: Clients;
 public id:any = 0;

  addClientFormGroup = new FormGroup({
    id: new FormControl(''),
    nom:new FormControl(''),
    nom_entreprise:new FormControl(''),
    numero_entreprise:new FormControl(''),
    numero_representant:new FormControl(''),
    nom_representant:new FormControl(''),
    email_entreprise:new FormControl(''),
    id_user: new FormControl(''),
    nom_user: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    profile_user: new FormControl(''),     
      
    });

    updateClientFormGroup = new FormGroup({
      id: new FormControl(''),
      nom:new FormControl(''),
      nom_entreprise:new FormControl(''),
      numero_entreprise:new FormControl(''),
      numero_representant:new FormControl(''),
      nom_representant:new FormControl(''),
      email_entreprise:new FormControl(''),
      id_user: new FormControl(''),
      nom_user: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      profile_user: new FormControl(''),      
     
    });

  constructor(
      private clientService: ClientService,
      private router: Router,
      private modalService: NgbModal,
      private authService : AuthService,
      private fb : FormBuilder,
      private profileService : ProfileService,
      
  ) {

     
  }

  ngOnInit(): void {

      this.addClientFormGroup = this.fb.group({
          id: [0,Validators.required],
          nom:["",Validators.required],
          nom_entreprise:["",Validators.required],
          numero_entreprise:["",Validators.required],
          numero_representant:["",Validators.required],
          nom_representant:["",Validators.required],
          email_entreprise:["",Validators.required],
          id_user: ["",Validators.required],
          nom_user: ["",Validators.required],
          prenom: ["",Validators.required],
          email: ["",Validators.required],
          username: ["",Validators.required],
          profile_user: ["",Validators.required],
          password: ["",Validators.required],

        });

      this.getClients();
      this.onGetAllProfiles();
      this.initForm();
  }

  initForm() {
      if (this.currentClient) {
        this.updateClientFormGroup = this.fb.group({
       

        id:[this.currentClient.id,Validators.required],
        nom:[this.currentClient.nom,Validators.required],
        nom_entreprise:[this.currentClient.nom_entreprise ,Validators.required],
        numero_entreprise:[this.currentClient.numero_entreprise ,Validators.required],
        email_entreprise:[this.currentClient.email_entreprise ,Validators.required],
        nom_representant:[this.currentClient.nom_representant ,Validators.required],
        numero_representant:[this.currentClient.numero_representant ,Validators.required],
        id_user: [this.currentClient.user?.idUser,Validators.required],
        nom_user: [this.currentClient.user?.nom,Validators.required],
        prenom: [this.currentClient.user?.prenom,Validators.required],
        email: [this.currentClient.user?.email,Validators.required],
        username: [this.currentClient.user?.username,Validators.required],
        profile_user: [this.currentClient.user?.profile_user,Validators.required],       
         
        })
      }
    }

    onGetAllProfiles() {
        
        this.profileService.getProfilesList()
         .subscribe(response => {
        
         this.profiles = response
          
        });
         console.log(this.profiles);
      }

    logout()
    {
        this.authService.logout();
        this.router.navigateByUrl("/authenticate");
  
    }

  getClients() {
      this.clientService.getClientsList().subscribe(data => {
          this.clients = data;
          console.log(this.clients);
      });
  }

  onAddClient() {
    //   console.log("this.addClientsFormGroup?.value");
    //   console.log(this.addClientFormGroup?.value);
      

      let client = new Clients();
      let user = new User();
      user.email = this.addClientFormGroup.value.email;
      user.nom =  this.addClientFormGroup.value.nom_user;
      user.prenom =  this.addClientFormGroup.value.prenom;
      user.username =  this.addClientFormGroup.value.username;
      user.password =  this.addClientFormGroup.value.password;
      user.profile_user =  this.addClientFormGroup.value.profile_user;

      client.user = user;
      client.email_entreprise =  this.addClientFormGroup.value.email_entreprise;
      client.nom =  this.addClientFormGroup.value.nom;
      client.nom_entreprise =  this.addClientFormGroup.value.nom_entreprise;
      client.numero_entreprise =  this.addClientFormGroup.value.numero_entreprise;
      client.nom_representant =  this.addClientFormGroup.value.nom_representant;
      client.numero_representant =  this.addClientFormGroup.value.numero_representant;
      console.log(client);
  
      this.clientService.createClient(client).subscribe(data => {
      console.log("data");
      console.log(data);
        
          alert("Client ajouté avec succès!");
          this.ngOnInit() ;       


  });

}

onUpdateClient() {

      console.log("this.updateClientsFormGroup");
    
      console.log(this.updateClientFormGroup.value);

    let client = new Clients();
    let user = new User();
    user.idUser = this.updateClientFormGroup.value.id_user;
    user.email = this.updateClientFormGroup.value.email;
    user.nom =  this.updateClientFormGroup.value.nom_user;
    user.prenom =  this.updateClientFormGroup.value.prenom;
    user.username =  this.updateClientFormGroup.value.username;
    user.profile_user =  this.updateClientFormGroup.value.profile_user;

    client.user = user;
    client.email_entreprise =  this.updateClientFormGroup.value.email_entreprise;
    client.id =  this.updateClientFormGroup.value.id;
    client.nom =  this.updateClientFormGroup.value.nom;
    client.nom_entreprise =  this.updateClientFormGroup.value.nom_entreprise;
    client.numero_entreprise =  this.updateClientFormGroup.value.numero_entreprise;
    client.nom_representant =  this.updateClientFormGroup.value.nom_representant;
    client.numero_representant =  this.updateClientFormGroup.value.numero_representant;

   console.log(client)
    this.clientService.updateClient(this.id, client)
    .subscribe(data => {
     alert("Mise à jour effectuée avec Succès");
        this.ngOnInit();
  },err=>{

  });
  }

  clientsDetails(id: number) {
      this.router.navigate(['clients-details', id]);
  }

  

  deleteClient(client: any) {
      const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true)
          this.clientService.deleteClient(client.id).subscribe(data => {
            //   console.log(data);

              this.ngOnInit();
          });
  }

 

  open(content: any, item : any = null) {
      if(item!=null){
          this.currentClient = item;
          this.initForm();
          this.id = this.currentClient?.id;
        //   console.log("data");
        //   console.log(this.currentClient);
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
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
