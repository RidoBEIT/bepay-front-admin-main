import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partenaire } from '@app/models/partenairee.model';
import { AuthService } from '@app/services/auth.service';
import { PartenaireService } from '@app/services/partenaire.service';
import { UploadService } from '@app/services/upload.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss']
})
export class PartenaireComponent implements OnInit {

  partenaires?:any[];
  actions?:any[];
  apis?:any[];
  closeResult = '';
  currentPartenaire : Partenaire = new Partenaire();
  id?:any;
  term:string='';
  photoBaseUrl:string = environment.photoBaseUrl;
  placeHol = "Chercher un PARTENAIRE";
  md="md"

  addPartenaireFormGroup = new FormGroup({
    idPartenaire: new FormControl(''),
    nom_partenaire: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
    baseUrl: new FormControl(''),
    adressePhysique: new FormControl(''),
    rccm: new FormControl(''),
    nif: new FormControl(''),
    logo: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
      
  });

  updatePartenaireFormGroup = new FormGroup({
    idPartenaire: new FormControl(''),
    nom_partenaire: new FormControl(''),
    telephone: new FormControl(''),
    baseUrl: new FormControl(''),
    email: new FormControl(''),
    adressePhysique: new FormControl(''),
    rccm: new FormControl(''),
    nif: new FormControl(''),
    logo: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
   
    
  });
  imagePath: any;
  url: any;
  selectedFile: any;

  constructor(
    private fb : FormBuilder,
    private partenaireService : PartenaireService,
    private modalService: NgbModal,
    private uploadService : UploadService,
    private authService : AuthService,
    private route : Router
    
  ) { }

  ngOnInit(): void {
    console.log(this.authService.getJwtToken());
    
    this.addPartenaireFormGroup = this.fb.group({
      idPartenaire:["",Validators.required],
      nom_partenaire:["",Validators.required],
      telephone:["",Validators.required],
      email:["",Validators.required],
      baseUrl:["",Validators.required],
      adressePhysique:["",Validators.required],
      rccm:[""],
      nif:[""],
      logo:[""],
      login:["",Validators.required],
      password:["",Validators.required],
    });

    this.onGetAllPartenaires();
  
  }


  init()
  {
    this.updatePartenaireFormGroup = this.fb.group({
      nom_partenaire:[this.currentPartenaire?.nom_partenaire,Validators.required],
      telephone:[this.currentPartenaire?.telephone,Validators.required],
      email:[this.currentPartenaire?.email,Validators.required],
      baseUrl:[this.currentPartenaire?.baseUrl,Validators.required],
      logo:[this.currentPartenaire?.logo],
      adressePhysique:[this.currentPartenaire?.adressePhysique,Validators.required],
      rccm:[this.currentPartenaire?.rccm,Validators.required],
      nif:[this.currentPartenaire?.nif,Validators.required],
      login:[this.currentPartenaire?.login,Validators.required],
      password:[this.currentPartenaire?.password,Validators.required],
  });
  }
 
  onGetAllPartenaires()
  {
    this.partenaireService.getAllPartenaire().subscribe(data=>{
      this.partenaires=data;
       //console.log(data);
    })
  }

  getPhoto(photo:any){
    this.partenaireService.getPhoto(photo).subscribe(data=>
      {
        // console.log(data);
      })
  }

  // onFileChange(event:any){
  //   const files = event.target.files;
  //   if (files.length === 0)
  //       return;
  
  //   const mimeType = files[0].type;
  //   // //console.log(mimeType);
  //   if (mimeType.match(/image\/*/) == null) {
  //      // //console.log("Only images are supported.");
  //       return;
  //   }
  
  //   const reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //       this.url = reader.result; 
  //        ////console.log(this.url);
  //   }
  //   this.selectedFile = files;
  //  // //console.log(reader);
  // }


  onAddPartenaire(){
    this.uploadService.upload(this.selectedFile[0]).subscribe(
      (event:any) => { 
        let message = event.body;
        // //console.log(" message = ");
        // //console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          ////console.log(Math.round(100 * event.loaded / event.total));
        } else if (event instanceof HttpResponse) {
         
          let partenaire = this.addPartenaireFormGroup?.value
          partenaire.logo =  message?.fileURL;

          this.partenaireService.Add(partenaire).subscribe(data=>{
            if(data!=null)
            {
              alert("Partenaire ajoutée avec succes!");
              this.ngOnInit();
            }
          });
        }
      })     
  }

  onFileChange(event:any){
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    // console.log(mimeType);
    if (mimeType.match(/image\/*/) == null) {
       // console.log("Only images are supported.");
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
         //console.log(this.url);
    }
    this.selectedFile = files;
   // console.log(reader);
  }

  //  parametres() : FormArray {
  //   return this.addPartenaireFormGroup.controls["parametres"] as FormArray;
  // }

  // addParametre() {
  //   const parametreForm : FormGroup = this.fb.group({
  //     key: ['', Validators.required],
  //     value: ['', Validators.required],
  //     ordre: ['', Validators.required],
  //     type: ['', Validators.required],
  //   });
  //   this.parametres().push(parametreForm);
  // }

  // deleteParametre(index: number) {
  //   this.parametres().removeAt(index);
  // }

  deletePartenaire(api:any){
    const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true){
    this.partenaireService.delete(api.idPartenaire).subscribe(data=>{
      alert("Partenaire supprimée!");
    this.ngOnInit();

    })
  }
  }

  onUpdatePartenaire(){
    // return;
    if(this.selectedFile != undefined){
      let obs: Observable<any> = new Observable<any>();
      if(this.currentPartenaire.logo != ''){      
        obs = this.uploadService.replaceFile(this.selectedFile[0], this.currentPartenaire.idPartenaire);
      }
      else{        
        obs = this.uploadService.upload(this.selectedFile[0]);
      }
      obs.subscribe(
        (event:any) => { 
        let message = event.body;
        // //console.log(" message = ");
        // //console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          ////console.log(Math.round(100 * event.loaded / event.total));
        } else if (event instanceof HttpResponse) {
         console.log("message");
         console.log(message);
         
          let partenaire = this.updatePartenaireFormGroup?.value
          partenaire.logo =  message?.fileURL;

          this.partenaireService.update(this.id, partenaire).subscribe(data=>{
            if(data!=null){
              alert("Mise à jour reussie !")
              this.ngOnInit();
            }
          })
        }
      })
    }
    else{
      let partenaire = this.updatePartenaireFormGroup?.value;

      this.partenaireService.update(this.id, partenaire).subscribe(data=>{
        if(data!=null){
          alert("Mise à jour reussie !")
          this.ngOnInit();
        }
      })
    }
     
    // this.partenaireService.update(this.id,this.updatePartenaireFormGroup.value).subscribe(data=>{
    //   if(data!=null){
    //     alert("Mise à jour reussie !")
    //     this.ngOnInit();
    //   }
    // })
  }
  logout()
    {
        this.authService.logout();
        this.route.navigateByUrl("/authenticate");

    }

  open(content: any, item:any=null) {
    if(item!=null)
    {
      this.currentPartenaire = item;
      this.id = item.idPartenaire;
      this.init();
    }
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,size:'lg'}).result.then(
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
