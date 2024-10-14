import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@app/models/profile.models';
import { AuthService } from '@app/services/auth.service';
import { ProfileService } from '@app/services/profile.services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profiles?: Profile[];
  closeResult = '';
  term = '';
  placeHol = "Chercher un PROFILE";
  sm="sm"

 
  event: EventEmitter<any>=new EventEmitter();
  public currentProfile?: Profile;
 public id:any = 0;

  addProfileFormGroup = new FormGroup({
      // id_profile: new FormControl(''),
      nom_profile: new FormControl(''),
      
     
      
    });

    updateProfileFormGroup = new FormGroup({
      id_profile: new FormControl(''),
      nom_profile: new FormControl(''),
     
     
    });

  constructor(
      private profileService: ProfileService,
      private router: Router,
      private modalService: NgbModal,
      private fb : FormBuilder,
      private authService : AuthService
      
  ) {

     
  }

  ngOnInit(): void {

      this.addProfileFormGroup = this.fb.group({
          // id_profile:["",Validators.required],
          nom_profile:["",Validators.required],
          
        });

      this.getProfiles();
      this.initForm();
  }

  initForm() {
      if (this.currentProfile) {
        this.updateProfileFormGroup = this.fb.group({
          id_profile:[this.currentProfile.id_profile,Validators.required],
          nom_profile:[this.currentProfile.nom_profile,Validators.required],
         
        })
      }
    }

  getProfiles() {
      this.profileService.getProfilesList().subscribe(data => {
          this.profiles = data;
          // console.log(this.profiles);
      });
  }

  logout()
  {
      this.authService.logout();
      this.router.navigateByUrl("/authenticate");

  }

  onAddProfile() {
      // console.log("this.addProfilesFormGroup?.value");
      // console.log(this.addProfileFormGroup?.value);
      
      if (this.addProfileFormGroup?.invalid) return;
  
      this.profileService.createProfile(this.addProfileFormGroup?.value).subscribe(data => {
          // console.log("data");
          // console.log(data);
          if(data!=null ){
              alert("Utilisateur ajouté avec succès!");
              this.getProfiles();
            }

  });
}

 

  onUpdateProfile() {

      // console.log("this.updateProfilesFormGroup");
      // console.log(this.updateProfileFormGroup.value);
    this.profileService.updateProfile(this.id, this.updateProfileFormGroup?.value)
    .subscribe(data => {
     alert("Mise à jour effectuée avec Succès");
     this.getProfiles();

  },err=>{

  });
  }

  deleteProfile(Profile: any) {
      const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true)
          this.profileService.deleteProfile(Profile.id_profile).subscribe(data => {
              // console.log(data);

              this.getProfiles();
          });
  }

 

  open(content: any, item : any = null) {
      if(item!=null){
          this.currentProfile = item;
          this.initForm();
          this.id = this.currentProfile?.id_profile;
          // console.log("data");
          // console.log(this.currentProfile);
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:'sm' }).result.then(
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
