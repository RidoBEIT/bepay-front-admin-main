import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '@app/models/api.models';
import { ActionService } from '@app/services/action.service';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { PartenaireService } from '@app/services/partenaire.service';
import { ParametreService } from '@app/services/parametre.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { TypeReponseService } from '@app/services/type-reponse.service';

@Component({
  selector: 'sb-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  partenaires?:any[];
  apiParams?:any[];
  actions?:any[];
  reponses?:any[];
  apis?:any[];
  closeResult = '';
  methodes = ["GET","POST","PUT"];
  types = ["Header","RequestBody","RequestParam","PathVariable","Response"];
  currentApi:any;
  currentParam:any;
  id:any;
  idParam:any;
  manageds =  ['PAIEMENT', 'DECAISSEMENT','AUTHENTIFICATION', 'REMBOURSEMENT', 'CASHIN'];
  billetAlert='';
  me:any;
  action:any;
  meth : any;
  term:string='';
  placeHol = "Chercher une API ";
  md='lg';
  idPar?:any;
  param?:any;


  

  addApiFormGroup = new FormGroup({
    libelle: new FormControl(''),
    description: new FormControl(''),
    url: new FormControl(''),
    typeRetour: new FormControl(''),
    methode: new FormControl(''),
    managedEntity: new FormControl(''),
    action: new FormControl(''),
    reponse: new FormControl(''),
    partenaire: new FormControl(''),
  });

  updateApiFormGroup = new FormGroup({
    idApi: new FormControl(''),
    libelle: new FormControl(''),
    description: new FormControl(''),
    url: new FormControl(''),
    typeRetour: new FormControl(''),
    methode: new FormControl(''),
    managedEntity: new FormControl(''),
    action: new FormControl(''),
    reponse: new FormControl(''),
    partenaire: new FormControl(''),
    
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
      })

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
    private reponseService : TypeReponseService,
  ) { }

  ngOnInit(): void {
    
  this.addApiFormGroup = this.fb.group({
    libelle:["",Validators.required],
    description:["",Validators.required],
    url:["",Validators.required],
    typeRetour:["",Validators.required],
    managedEntity:["",Validators.required],
    action:["",Validators.required],
    reponse:["",Validators.required],
    methode:["",Validators.required],
    partenaire:["",Validators.required],
    parametres: this.fb.array([]),
    
  });

  this.onGetAllActions();
  this.onGetAllpartenaires();
  this.getAllApis();
  this.onGetAllReponses();
  }

  logout()
  {
      this.authService.logout();
      this.route.navigateByUrl("/authenticate");

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

  initParam(){
    this.updateParamFormGroup = this.fb.group({
      idParametre:[this.currentParam.idParametre,Validators.required],
      key:[this.currentParam.key,Validators.required],
      value:[this.currentParam.value,Validators.required],
      ordre:[this.currentParam.ordre,Validators.required],
      niveau:[this.currentParam.niveau,Validators.required],
      type:[this.currentParam.type,Validators.required],
      parent:[this.currentParam.parent_id,Validators.required],
      description:[this.currentParam.description,Validators.required],
      api:[this.currentApi,Validators.required]
    });
  }

  initUpdateApi(){
    this.updateApiFormGroup = this.fb.group({
      idApi:[this.currentApi.idApi,Validators.required],
      libelle:[this.currentApi.libelle,Validators.required],
      description:[this.currentApi.description,Validators.required],
      url:[this.currentApi.url,Validators.required],
      typeRetour:[this.currentApi.typeRetour,Validators.required],
      managedEntity:[this.currentApi.managedEntity,Validators.required],
      action:[this.currentApi.action,Validators.required],
      reponse:[this.currentApi.reponse,Validators.required],
      methode:[this.currentApi.methode,Validators.required],
      partenaire:[this.currentApi.partenaire,Validators.required],
      parametres: this.fb.array([this.currentApi.parametres]),
      
    });
  }

  getAllApis(){
    this.apiService.getAllApi().subscribe(data=>{

      this.apis=data

    //  console.log(data);

    }
      )
  }

  goToDetails(api:any){
    let id = api.idApi;
    this.route.navigateByUrl('/api/details/'+btoa(id));
  }

  getApiParam(id:any){
    this.paramService.getApiParam(id).subscribe(data=>
      {
        this.apiParams = data;
        // console.log(data);
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

  onGetAllActions()
  {
    this.actionService.getAllAction().subscribe(data=>{
      this.actions=data;
      // console.log("action");
      // console.log(data);
    })
  }

  onGetAllReponses()
  {
    this.reponseService.getAll().subscribe(data=>{
      this.reponses=data;
      // console.log("reponse");
      // console.log(data);
    })
  }

  onUpdateParam(){
    // console.log(this.updateParamFormGroup.value);
    this.idPar = this.updateParamFormGroup.value.parent;


    this.paramService.update(this.idParam,this.updateParamFormGroup.value).subscribe(data=>
      {
        if(data!=null){
          console.log("data");
          // console.log(data);
          this.idPar = data.parent;
          alert("Parametre mis à jour!");
          if(this.idPar!=null){
            this.paramService.getParam(this.idPar).subscribe(data=>
              {
                this.param = data
                this.param.has_children = true;
                this.param.api = this.currentApi;
                // console.log(this.param);
                this.paramService.update(this.idPar,data).subscribe(data=>
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
    //  console.log(this.addParamFormGroup.value);
    // this.idPar = this.addParamFormGroup.value.parent;
    //  console.log(this.idPar)

   

    this.paramService.Add(this.addParamFormGroup.value).subscribe(data=>
      {
        alert("Paramètre ajoutée avec succès:" );
        this.idPar = data.parent;
          alert("Parametre mis à jour!");
          if(this.idPar!=null){
            this.paramService.getParam(this.idPar).subscribe(data=>
              {
                this.param = data
                this.param.has_children = true;
                this.param.api = this.currentApi;
                // console.log(this.param);
                this.paramService.update(this.idPar,data).subscribe(data=>
                  {
                    console.log("data");
                    // console.log(data);
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

  onUpdateApi(){
    // console.log(this.updateApiFormGroup.value)
    // console.log(this.id)

    this.apiService.update(this.id,this.updateApiFormGroup.value).subscribe(data=>
      {
        
        if(data!=null){
          alert("Mise à jour effectuée avec succès!");
          this.ngOnInit();
        }
      },err=>
      {

      })
  }

  onAddApi(){
   
    this.apiService.AddApi(this.addApiFormGroup.value).subscribe(data=>{
      if(data!=null)
      {
        alert("Api ajoutée avec succes!");
        this.ngOnInit();
      }
    })
   
  }

   parametres() : FormArray {
    return this.addApiFormGroup.controls["parametres"] as FormArray;
  }

  addParametre() {
    const parametreForm : FormGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      ordre: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.parametres().push(parametreForm);
  }

  deleteParametre(index: number) {
    this.parametres().removeAt(index);
  }

  deleteApi(api:any){
    const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true){
    this.apiService.deleteApi(api.idApi).subscribe(data=>{
      alert("Api supprimée!");
    })
    this.ngOnInit();
  }
  }
showBillet(){
  this.router.navigateByUrl("/listBillets");
}

  getAction(){
    this.billetAlert="";

    this.action = this.addApiFormGroup.get('action')?.value.libelle_typeAction;
    
    // console.log(this.me,this.meth,this.action);

    if(this.me=="BILLET" && this.action=="PostOne" && this.meth=="POST"){
      this.billetAlert = "Les ordres des parametres sont prédéfinie comme suit: numero = 1 , nom = 2, prenom = 3, idvilleDepart = 4,idvilleArrive=5,tarif =6,date=7,heure=8"

    }

  }
  getMethode(){
    this.billetAlert="";

    this.meth = this.addApiFormGroup.get('methode')?.value;
    // console.log(this.me,this.meth,this.action);

    if(this.me=="BILLET" && this.action=="PostOne" && this.meth=="POST"){
      this.billetAlert = "Les ordres des parametres sont prédéfinie comme suit: numero = 1 , nom = 2, prenom = 3, idvilleDepart = 4,idvilleArrive=5,tarif =6,date=7,heure=8"

    }

  }

  getManagedEntity(){
    this.billetAlert="";

    this.me = this.addApiFormGroup.get('managedEntity')?.value;
    // console.log(this.me,this.meth,this.action);
    if(this.me=="BILLET"  && this.action=="PostOne" && this.meth=="POST"){
      this.billetAlert = "Les ordres des parametres sont prédéfinie comme suit: numero = 1 , nom = 2, prenom = 3, idvilleDepart = 4,idvilleArrive=5,tarif =6,date=7,heure=8"

    }
  }

  open(content: any, item:any=null, param:any=null) {
    this.ngOnInit();
    if(item!=null){
     // console.log("item");
      //console.log(item);
      this.currentApi = item;
      this.id = item.idApi;
      this.initUpdateApi();
      this.initAddParam();
      this.getApiParam(this.id);
    }
    if(param!=null){
      this.currentParam = param;
      this.idParam = param.idParametre;
      this.initParam();
    }
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',size:"xl" }).result.then(
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

