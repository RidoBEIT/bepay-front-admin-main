import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisbursementApiService } from '@app/services/disbursement-api.service';
import { PartenaireService } from '@app/services/partenaire.service';
import { TransactionService } from '@app/services/transaction.service';
import { TypeTransactionService } from '@app/services/type-transaction.service';
import { AuthService } from '@modules/auth/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-disbursement-api',
  templateUrl: './disbursement-api.component.html',
  styleUrls: ['./disbursement-api.component.scss']
})
export class DisbursementApiComponent implements OnInit {
  @ViewChild('decaisserResponseModal') modalViewData: TemplateRef<any> | undefined;

  decaissers?:any[];
  partenaires?:any[];
  typeT?:any[];
  id?:any;
  idPartenaire?:any;
  currentTrans?:any;
  closeResult = '';
  term = '';
  placeHol = "Rechercher ..."





  adddecaisserFormGroup = new FormGroup({
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    libelle_decaisser: new FormControl(''),
    montant: new FormControl(''),
    partenaire: new FormControl(''),
   
  });

  updatedecaisserFormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''), 
    libelle_decaisser: new FormControl(''),
    
  });
  decaisserResponse: any;
  decaisserStatus: any;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private fb : FormBuilder,
    private partenaireService : PartenaireService,
    private route : Router,
    private decaisserService : DisbursementApiService,
  ) { }

  ngOnInit(): void {
    this.initAddForm();
    this.getAlldecaissers();
    this.onGetAllPartenaire();
  }

  initAddForm(){
    this.adddecaisserFormGroup = this.fb.group({
    code:["",Validators.required],
    nom: ["",Validators.required],
    prenom:["",Validators.required],
    numero: ["",Validators.required],
    libelle_decaisser: ["",Validators.required],
    montant: ["",Validators.required],
    partenaire: ["",Validators.required],
    });
  }

  initUpdateForm(){
    this.updatedecaisserFormGroup = this.fb.group({
    nom: [this.currentTrans.nom,Validators.required],
    prenom:[this.currentTrans.prenom,Validators.required],
    numero: [this.currentTrans.numero,Validators.required],
    libelle_decaisser: [this.currentTrans.libelle_decaisser,Validators.required],
    });
  }

  getAlldecaissers(){
    this.decaisserService.getList().subscribe(data=>
      {
        this.decaissers=data;
       console.log(data);
      })
  }


  onGetAllPartenaire(){
    this.partenaireService.getAllPartenaire().subscribe(data=>{
      this.partenaires = data;
    //  console.log(data);
    })
  }

  logout()
  {
      this.authService.logout();
      this.route.navigateByUrl("/authenticate");

  }
  getIdP(){
    this.idPartenaire =  this.adddecaisserFormGroup.get('partenaire')?.value.idPartenaire;
    // console.log(this.idPartenaire);
  }

  onAdd(){
    //  console.log(this.adddecaisserFormGroup.value);
    this.decaisserService.create(this.idPartenaire, this.adddecaisserFormGroup.value).subscribe(data=>{
      if(data!=null)
      {
        this.decaisserResponse = data;
        this.open(this.modalViewData, 'lg');
        console.log(data);
        // alert("decaisser ajoutée avec succes!");
        this.ngOnInit();
      }
    })
   
  }

  onCheckStatusTxn(){
    if(this.decaisserResponse){
      this.decaisserService.checkTxnStatus(this.decaisserResponse.decaisser.iddecaisser)
      .subscribe(response => {     
        console.log(response); 
        this.decaisserStatus = response;
      })
    }
  }

  onUpdate(){
    // console.log(this.updateApiFormGroup.value)
    // console.log(this.id)

    this.decaisserService.update(this.id,this.updatedecaisserFormGroup.value).subscribe(data=>
      {
        
        if(data!=null){
          alert("Mise à jour effectuée avec succès!");
          this.ngOnInit();
        }
      },err=>
      {

      })
  }

  onDelete(trans:any){
    const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true){
    this.decaisserService.delete(trans.iddecaisser).subscribe(data=>{
      alert("Api supprimée!");
      this.ngOnInit();
    })
    this.ngOnInit();
  }
  }

  open(content: any, item:any=null, size:any='lg') {
    this.ngOnInit();
    if(item!=null){
      // console.log("item");
      //console.log(item);
      this.currentTrans = item;
      this.id = item.iddecaisser;
      this.initUpdateForm();
    }
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size : size }).result.then(
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
