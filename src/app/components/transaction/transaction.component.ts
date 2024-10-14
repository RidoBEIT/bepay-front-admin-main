import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '@app/models/transaction.models';
import { AuthService } from '@app/services/auth.service';
import { PartenaireService } from '@app/services/partenaire.service';
import { TransactionService } from '@app/services/transaction.service';
import { TypeTransactionService } from '@app/services/type-transaction.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @ViewChild('transactionResponseModal') modalViewData: TemplateRef<any> | undefined;

  transactions?:any[];
  partenaires?:any[];
  typeT?:any[];
  id?:any;
  idPartenaire?:any;
  currentTrans?:any;
  closeResult = '';
  term = '';
  placeHol = "Chercher une TRANSACTION";
  options: string[] = ['PAIEMENT', 'REMBOURSEMENT'];
  selectedOption: string = 'PAIEMENT';

  isVisible: boolean = true; 

  addTransactionFormGroup = new FormGroup({
    idTransaction: new FormControl(''),
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    typeTransaction: new FormControl(''),
    libelle_transaction: new FormControl(''),
    montant: new FormControl(''),
    partenaire: new FormControl(''),
   
  });

  updateTransactionFormGroup = new FormGroup({
    idApi: new FormControl(''),
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''), 
    libelle_transaction: new FormControl(''),
    montant: new FormControl(''),
    typeTransaction: new FormControl(''),
    partenaire: new FormControl(''),
   
    
  });
  transactionResponse: any;
  transactionStatus: any;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private fb : FormBuilder,
    private partenaireService : PartenaireService,
    private route : Router,
    private typeService : TypeTransactionService,
    private transService : TransactionService,
  ) { }

  ngOnInit(): void {
    this.initAddForm();
    //this.getAllTransactions();
    this.onGetAllPartenaire();
    this.onGetAllType();
    this.onOptionChange();
  }
  onOptionChange(): void {
    if (this.selectedOption === 'PAIEMENT') {
      this.getAllTransactionsPaiement();
    } else {
      this.isVisible = false; 
      this.getAllTransactionsRefund();
    }
  }
  

  initAddForm(){
    this.addTransactionFormGroup = this.fb.group({
    idTransaction:[0,Validators.required],
    code:["",Validators.required],
    nom: ["",Validators.required],
    prenom:["",Validators.required],
    numero: ["",Validators.required],
    typeTransaction: ["",Validators.required],
    libelle_transaction: ["",Validators.required],
    montant: ["",Validators.required],
    partenaire: ["",Validators.required],
    });
  }

  initUpdateForm(){
    this.updateTransactionFormGroup = this.fb.group({
    idTransaction:[this.currentTrans.idTransaction,Validators.required],
    code:[this.currentTrans.code,Validators.required],
    nom: [this.currentTrans.nom,Validators.required],
    prenom:[this.currentTrans.prenom,Validators.required],
    numero: [this.currentTrans.numero,Validators.required],
    typeTransaction: [this.currentTrans.typeTransaction,Validators.required],
    libelle_transaction: [this.currentTrans.libelle_transaction,Validators.required],
    montant: [this.currentTrans.montant,Validators.required],
    partenaire: [this.currentTrans.partenaire,Validators.required],
    });
  }

  getAllTransactions(){
    this.transService.getList().subscribe(data=>
      {
        this.transactions=data;
       //console.log(data);
      })
  }

  getAllTransactionsPaiement(){
    this.transService.findByTransactionTypePaiement().subscribe(data=>
      {
        this.transactions=data;
      })
  }

  getAllTransactionsRefund(){
    this.transService.findByTransactionTypeRemboursement().subscribe(data=>
      {
        this.transactions=data;
      //  console.log(data);
      //  console.log('rien de refund aussi');
      })
  }

  onGetAllType(){
    this.typeService.getAllAction().subscribe(data=>{
      this.typeT = data;
     // console.log(data);
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
    this.idPartenaire =  this.addTransactionFormGroup.get('partenaire')?.value.idPartenaire;
    // console.log(this.idPartenaire);
  }

  onAdd(){
    //  console.log(this.addTransactionFormGroup.value);
    this.transService.create(this.idPartenaire, this.addTransactionFormGroup.value).subscribe(data=>{
      console.log(data);
      if(data!=null)
      {
        this.transactionResponse = data;
        this.open(this.modalViewData, 'lg');
        // alert("Transaction ajoutée avec succes!");
        this.ngOnInit();
      }
    })
   
  }

  onCheckStatusTxn(){
    if(this.transactionResponse){
      this.transService.checkTxnStatus(this.transactionResponse.idTransaction)
      .subscribe(response => {     
        console.log(response); 
        this.transactionStatus = response;
      })
    }
  }

  onUpdate(){
    // console.log(this.updateApiFormGroup.value)
    // console.log(this.id)

    this.transService.update(this.id,this.updateTransactionFormGroup.value).subscribe(data=>
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
    this.transService.delete(trans.idTransaction).subscribe(data=>{
      alert("La transaction a été supprimée!");
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
      this.id = item.idTransaction;
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



  getRembourser(){
    alert("(Service remboursement) Etes vous sur de vouloir continuer ?");
    this.transService.getRembourser(this.id).subscribe(data=>
      {
        alert("Remboursement effectué !");
        this.ngOnInit();
      });
  }


  
}
