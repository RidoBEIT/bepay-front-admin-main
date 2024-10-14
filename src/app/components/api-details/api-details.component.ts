import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PossibleValue } from '@app/models/possibleValue.models';
import { ResponseParam } from '@app/models/responseParam.models';
import { ActionService } from '@app/services/action.service';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { ParametreService } from '@app/services/parametre.service';
import { PartenaireService } from '@app/services/partenaire.service';
import { PossibleValueService } from '@app/services/possible-value.service';
import { ResponseParamService } from '@app/services/response-param.service';
import { TypeReponseService } from '@app/services/type-reponse.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.scss']
})
export class ApiDetailsComponent implements OnInit {
  term:string='';
  placeHol = "Chercher un PARAMETRE ";
  md='sm';
  idApi?:any;
  closeResult = '';
  methodes = ["GET","POST","PUT"];
  types = ["Header","RequestBody","RequestParam","PathVariable","Response"];
  currentApi:any;
  currentParam:any;
  currentResponseParam:any;
  currentpv?:PossibleValue;
  idParam:any;
  idPv:any;
  idResponseParam:any;
  manageds =  ['PAIEMENT','AUTHENTIFICATION'];
  apiParams?:any;
  param?:any;
  idParent?:any;
  responseParam?:any[];
  ShowDetails?:boolean;

  addParamFormGroup = new FormGroup({
    idParametre: new FormControl(''),
    key: new FormControl(''),
    value: new FormControl(''),
    ordre: new FormControl(''),
    niveau: new FormControl(''),
    type: new FormControl(''),
    parent: new FormControl(''),
    description: new FormControl(''),
    api: new FormControl(''),
    });
  updateParamFormGroup = new FormGroup({
      idParametre: new FormControl(''),
      key: new FormControl(''),
      value: new FormControl(''),
      ordre: new FormControl(''),
      niveau: new FormControl(''),
      type: new FormControl(''),
      parent: new FormControl(''),
      description: new FormControl(''),
      api: new FormControl(''),
    });

   
    addResponseParamFormGroup = new FormGroup({
      idReponseParam: new FormControl(''),
      key: new FormControl(''),
      value: new FormControl(''),
      api: new FormControl(''),
      });
    updateResponseParamFormGroup = new FormGroup({
      idReponseParam: new FormControl(''),
      key: new FormControl(''),
      value: new FormControl(''),
      api: new FormControl(''),
      });

      addPVFormGroup = new FormGroup({
        idPossibleValue: new FormControl(''),
        message: new FormControl(''),
        value: new FormControl(''),
        response_param: new FormControl(''),
        });
      updatePVFormGroup = new FormGroup({
        idPossibleValue: new FormControl(''),
        message: new FormControl(''),
        value: new FormControl(''),
        response_param: new FormControl(''),
        });

  constructor(
    private apiService : ApiService,
    private fb : FormBuilder,
    private partenaireService : PartenaireService,
    private actionService : ActionService,
    private modalService: NgbModal,
    private router: Router,
    private paramService: ParametreService,
    private authService: AuthService,
    private route : Router,
    private activatedRoute: ActivatedRoute,
    private reponseService : TypeReponseService,
    private rpService : ResponseParamService,
    private psService : PossibleValueService,
  ) { }
  

 

  ngOnInit(): void {
    this.idApi = atob(this.activatedRoute.snapshot.params['id']);
    // console.log(this.idApi);
    this.getCurrentApi();
    this.getApiParam();
    this.initAddParam();
    this.initAddResponse();
    this.initAddPV();
    this.onGetAllResponseParam();
    
  }

  onGetAllResponseParam(){
    this.rpService.getListByApi(this.idApi).subscribe(data=>{
      this.responseParam = data;
      console.log(data);
    })
  }

  getCurrentApi()
  {
    this.apiService.getApi(this.idApi).subscribe(data=>
      {
        this.currentApi=data;
        //console.log(this.currentApi);
      })
  }

  getApiParam(){
    this.paramService.getApiParam(this.idApi).subscribe(data=>
      {
        this.apiParams = data;
        // console.log(data);
      })
  }
  initAddParam(){
    this.addParamFormGroup = this.fb.group({
      idParametre:["",Validators.required],
      key:[,Validators.required],
      value:[,Validators.required],
      ordre:[,Validators.required],
      niveau:[,Validators.required],
      type:[,Validators.required],
      parent:[,Validators.required],
      description:[,Validators.required],
      api:[this.currentApi,Validators.required]
    });
  }
  initUpdateParam(){
    this.updateParamFormGroup = this.fb.group({
      idParametre:[this.currentParam.idParametre,Validators.required],
      key:[this.currentParam.key,Validators.required],
      value:[this.currentParam.value,Validators.required],
      ordre:[this.currentParam.ordre,Validators.required],
      niveau:[this.currentParam.niveau,Validators.required],
      type:[this.currentParam.type,Validators.required],
      parent:[this.currentParam.parent,Validators.required],
      description:[this.currentParam.description,Validators.required],
      api:[this.currentApi,Validators.required]
    });
  }

  initUpdateResponse(){
    this.updateResponseParamFormGroup = this.fb.group({
      idReponseParam:[this.currentResponseParam.idReponseParam,Validators.required],
      key:[this.currentResponseParam.key,Validators.required],
      value:[this.currentResponseParam.value,Validators.required],
      posValues: this.fb.array([this.currentResponseParam.possible_values]),
    });
  }

  initAddResponse(){
    this.addResponseParamFormGroup = this.fb.group({
      idReponseParam:[""],
      key: ["",Validators.required],
      value: ["",Validators.required],
      id_api: [this.idApi],
      posValues: this.fb.array([]),
    })
  }

  initAddPV(){
    this.addPVFormGroup  = this.fb.group({
      idPossibleValue:[""],
      value:["",Validators.required],
      message:["",Validators.required],
      response_param : [this.currentResponseParam],
    })
  }

  initUpdatePV(){
    this.updatePVFormGroup  = this.fb.group({
      idPossibleValue:[this.currentpv?.idPossibleValue],
      value:[this.currentpv?.value,Validators.required],
      message:[this.currentpv?.message,Validators.required],
      response_param : [this.currentResponseParam],
    });
  }

  posValues() : FormArray {
    return this.addResponseParamFormGroup.controls["posValues"] as FormArray;
  }

  addPossibleValues() {
    const possibleValuesForm : FormGroup = this.fb.group({
      message: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.posValues()?.push(possibleValuesForm);
  }

  deletePossibleValues(index: number) {
    this.posValues().removeAt(index);
  }

  onUpdateResponseParam(){
    this.rpService.update(this.idResponseParam,this.updateResponseParamFormGroup.value).subscribe(data=>
      {
        alert("Mise à jour effectué!");
        this.ngOnInit();
      })
  }

  onUpdatePv(){
   
    this.psService.update(this.idPv,this.updatePVFormGroup.value).subscribe(data=>
      {
        alert("Mise à jour effectué!");
        this.ngOnInit();
      })
  }

  onUpdateParam(){
    // console.log(this.updateParamFormGroup.value);
    this.idParent= this.updateParamFormGroup.value.parent;


    this.paramService.update(this.idParam,this.updateParamFormGroup.value).subscribe(data=>
      {
        if(data!=null){
          console.log("data");
          // console.log(data);
          this.idParent = data.parent;
          alert("Parametre mis à jour!");
          if(this.idParent!=null){
            this.paramService.getParam(this.idParent).subscribe(data=>
              {
                this.param = data
                this.param.has_children = true;
                this.param.api = this.currentApi;
                // console.log(this.param);
                this.paramService.update(this.idParent,data).subscribe(data=>
                  {
                    console.log("data");
                    // console.log(data);
                  })
              })
          }
          this.ngOnInit();
        }
      })
  }
  onAddParam(){
    // console.log(this.addParamFormGroup.value);
   
   this.paramService.Add(this.addParamFormGroup.value).subscribe(data=>
     {
       alert("Paramètre ajoutée avec succès:" );
       this.idParent = data.parent;
         alert("Parametre mis à jour!");
         if(this.idParent!=null){
           this.paramService.getParam(this.idParent).subscribe(data=>
             {
               this.param = data
               this.param.has_children = true;
               this.param.api = this.currentApi;
              //  console.log(this.param);
               this.paramService.update(this.idParent,data).subscribe(data=>
                 {
                   console.log("data");
                  //  console.log(data);
                 })
             })
         }
       this.ngOnInit();
     });
 }
  onDeleteParam(param:any){
    const res = confirm('Vous voulez vraiment supprimer ? ');
    if (res === true){
    this.paramService.delete(param.idParametre).subscribe(data=>
      {
        if(data!=null){
          alert("Parametre supprimé!");
          this.ngOnInit();
        }
      });
    }
    this.ngOnInit();

  }

  onDeleteResponseParam(rp:any){
    // console.log(rp);
    const res = confirm('Vous voulez vraiment supprimer ? ');
    if (res === true){
    this.rpService.delete(rp.idReponseParam).subscribe(data=>
      {
        if(data!=null){
          alert("Parametre supprimé!");
          this.ngOnInit();
        }
      });
    }
    this.ngOnInit();

  }

  onDeletePV(pv:any){
    // console.log(pv);
    const res = confirm('Vous voulez vraiment supprimer ? ');
    if (res === true){
    this.psService.delete(pv.idPossibleValue).subscribe(data=>
      {
      
          alert("Parametre supprimé!");
          this.ngOnInit();
        
      });
    }
    this.ngOnInit();

  }

  onAddResponse(){
    // console.log(this.addResponseParamFormGroup.value);
   let rp  = new ResponseParam();
   rp.idApi = this.idApi;
   rp.key = this.addResponseParamFormGroup.value.key;
   rp.value = this.addResponseParamFormGroup.value.value;
   rp.possible_values = this.addResponseParamFormGroup.value.posValues;
   let ps = this.addResponseParamFormGroup.value.posValues;
  //  console.log(rp);
   this.rpService.create(rp).subscribe(data=>
  {
      let id = data.idReponseParam;
      for(let i = 0; i < ps.length; i++)
      {
        let p = new PossibleValue();
        p.message = ps[i].message;
        p.value = ps[i].value;
        p.response_param = data;
        this.psService.create(p).subscribe(data=>
          {
            // console.log(p);
          })
        
      }
     alert("Succees");
     this.ngOnInit();
    })
      
  }

  onAddPV(){
    // console.log(this.addPVFormGroup);
    this.psService.create(this.addPVFormGroup.value).subscribe(data=>
      {
        alert("Valeur ajoutée avec succès!");
        this.ngOnInit();
      })
  }
  logout()
  {
      this.authService.logout();
      this.route.navigateByUrl("/authenticate");

  }

  openDetails(rp :any){
    this.ShowDetails=true;
    this.currentResponseParam = rp;
    console.log("ShowDetails");
    // console.log(this.ShowDetails);
    // console.log(this.currentResponseParam);
  }
 
  open(content: any, size:any="md", item:any=null) {
    this.ngOnInit();
    if(item!=null){
    this.currentParam=item;
    this.currentResponseParam = item;
    this.currentpv = item;
    this.idParam = item.idParametre;
    this.idResponseParam = item.idReponseParam;
    this.idPv = item.idPossibleValue;
    console.log("currentParam");
    // console.log(this.currentParam);
    this.initUpdateParam();
    this.initUpdateResponse();
    this.initUpdatePV();
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
 
  this.currentpv = item;
  this.idPv = item.idPossibleValue;

 
  this.initUpdatePV();
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
 

}
