import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartenaireService } from '@app/services/partenaire.service';
import { TypeErrorCodeService } from '@app/services/type-error-code.service';
import { AuthService } from '@modules/auth/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-type-error-code',
  templateUrl: './type-error-code.component.html',
  styleUrls: ['./type-error-code.component.scss']
})
export class TypeErrorCodeComponent implements OnInit {


  responseType:any;
  currentResponseType:any;
  ShowDetails:boolean=true;
  closeResult = '';
  currentResponseCode:any;
  idErrorCode:any;
  idErrorCodeType:any;
  currentRespType:any;
  partenaires:any;

  addTypeErrorFormGroup = new FormGroup({
    libelle_type_error: new FormControl(''),
    description: new FormControl(''),
    partenaire: new FormControl('')
    });
    updateTypeErrorFormGroup = new FormGroup({
      libelle_type_error: new FormControl(''),
      description: new FormControl(''),
      partenaire: new FormControl(''),
      });
  addErrorFormGroup = new FormGroup({
    code: new FormControl(''),
    description: new FormControl(''),
    errorCodeType: new FormControl(''),
    });

    updateErrorFormGroup = new FormGroup({
      code: new FormControl(''),
      description: new FormControl(''),
      });

      initUpdateTypeError(){
        this.updateTypeErrorFormGroup = this.fb.group({
          libelle_type_error:[this.currentResponseType.libelle_type_error,Validators.required],
          description:[this.currentResponseType.description,Validators.required],
          partenaire:[this.currentResponseType.partenaire,Validators.required],
        });
      }

      initUpdateError(){
        this.updateErrorFormGroup = this.fb.group({
          code:[this.currentResponseCode.code,Validators.required],
          description:[this.currentResponseCode.description,Validators.required],
        });
      }

    initAddTypeError(){
      this.addTypeErrorFormGroup  = this.fb.group({
        libelle_type_error:["",Validators.required],
        description:["",Validators.required],
        partenaire:["",Validators.required]
      });
    }

    initAddError(){
      this.addErrorFormGroup  = this.fb.group({
        code:["",Validators.required],
        description:["",Validators.required],
        errorCodeType:[this.currentRespType],
      });
    }

  constructor(
    private typeErrorService : TypeErrorCodeService,
    private fb : FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private route : Router,
    private activatedRoute: ActivatedRoute,
    private partenaireService : PartenaireService,
  ) { }

  ngOnInit(): void {
    this.initAddTypeError();
    this.onGetAllTypeError();
    this.onGetAllpartenaires();
  }

  onGetAllTypeError(){
    this.typeErrorService.getList().subscribe(data=>{
      this.responseType = data;
    })
  }
  values:any;
  openDetails(rp :any){
    this.ShowDetails=true;
    this.currentRespType = rp;
    this.values = rp.possible_values;
    console.log("ShowDetails");
    this.initAddError();
    // console.log(this.ShowDetails);
    // console.log(this.currentResponseParam);
  }

  open(content: any, size:any="md", item:any=null) {
    if(item!=null){
    this.currentResponseType = item;
    this.initUpdateTypeError();
    this.idErrorCodeType = item.idErrorCodeType;
    }
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:size }).result.then(
        result => {
            this.closeResult = `Closed with: ${result}`;
        },
        reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
}

open2(content: any, size:any="md", item:any=null) {
  this.ngOnInit();
  if(item!=null){
  this.currentResponseCode = item;
  this.initUpdateError();
  }
  
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:size }).result.then(
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

logout()
  {
      this.authService.logout();
      this.route.navigateByUrl("/authenticate");

  }

  onAddTypeError(){
    // console.log(this.addPVFormGroup);
    this.typeErrorService.createTypeCode(this.addTypeErrorFormGroup.value).subscribe(data=>
      {
        alert("Type code ajouté avec succès!");
        this.ngOnInit();
      })
  }


  onAddCode(){
    // console.log(this.addPVFormGroup);
    this.typeErrorService.createCode(this.addErrorFormGroup.value).subscribe(data=>
      {
        alert("Type code ajouté avec succès!");
        this.ngOnInit();
      })
  }

  onDeleteCode(pv:any){
    // console.log(pv);
    const res = confirm('Vous voulez vraiment supprimer ? ');
    if (res === true){
    this.typeErrorService.deleteCode(pv.idErrorCode).subscribe(data=>
      {
      
          alert("Code supprimé !");
          this.ngOnInit();
        
      });
    }
  }

  onDeleteResponseType(rp:any){
    // console.log(rp);
    const res = confirm('Vous voulez vraiment supprimer ? ');
    if (res === true){
    this.typeErrorService.deleteTypeCode(rp.idErrorCodeType).subscribe(data=>
      {
        if(data!=null){
          alert("Type code supprimé !");
          this.ngOnInit();
        }
      });
    }
  }

  onUpdateResponseTypeCode(){
    this.typeErrorService.updateTypeCode(this.idErrorCodeType,this.updateTypeErrorFormGroup.value).subscribe(data=>
      {
        alert("Mise à jour effectué!");
        this.ngOnInit();
      })
  }


  onUpdateCode(){
   
    this.typeErrorService.updateCode(this.idErrorCode,this.updateErrorFormGroup.value).subscribe(data=>
      {
        alert("Mise à jour effectué!");
        this.ngOnInit();
      })
  }

  onGetAllpartenaires()
  {
    this.partenaireService.getAllPartenaire().subscribe(data=>{
      this.partenaires=data;
      // console.log("partenaire");
      // console.log(data);
    })
  }


}
