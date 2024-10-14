import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CashService } from '@app/services/cash.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';

@Component({
  selector: 'sb-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private cashService: CashService,
    private modalService: NgbModal,
  ) { }

  currentCash:any;
  selectedOption: string = '';
  options = ['CASH IN', 'CASH OUT'];
  cashs:any;
  id:any;
  closeResult = '';
  isVisible: boolean = false; 
  idPartenaire:any;

  addCashFormGroup = new FormGroup({
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    libelle: new FormControl(''),
    montant: new FormControl(''),
    typeCash: new FormControl(''),
   
  });

  updateCashFormGroup = new FormGroup({
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    libelle: new FormControl(''),
  });

  initAddForm(){
    this.addCashFormGroup = this.fb.group({
    code:["",Validators.required],
    nom: ["",Validators.required],
    prenom:["",Validators.required],
    numero: ["",Validators.required],
    libelle: ["",Validators.required],
    montant: ["",Validators.required],
    typeCash: [this.selectedOption,Validators.required],
    });
  }

  initUpdateForm(){
    this.updateCashFormGroup = this.fb.group({
    code: [this.currentCash.nom,Validators.required],
    nom: [this.currentCash.nom,Validators.required],
    prenom:[this.currentCash.prenom,Validators.required],
    numero: [this.currentCash.numero,Validators.required],
    libelle: [this.currentCash.libelle,Validators.required],
    });
  }


  ngOnInit(): void {
    this.initAddForm();
  }


  onOptionChange(option: string): void {
    if (option === 'CASH IN') {
      this.onGetAllCashIn();
      this.selectedOption="CASH IN";
    } else {
      this.onGetAllCashOut();
      this.selectedOption="CASH OUT";
    }
  }


  onGetAllCashIn(){
    this.cashService.getAllCashIn().subscribe(data=>{
      this.cashs = data;
      console.log(data);
    })
  }

  onGetAllCashOut(){
    this.cashService.getAllCashOut().subscribe(data=>{
      this.cashs = data;
      console.log(data);
    })
  }

  addCash(){
    this.cashService.AddCash(this.idPartenaire,this.addCashFormGroup).subscribe(data=>{
      //console.log(data);
      alert('Ajout success');
    })
  }

  onUpdate(){
    // console.log(this.updateApiFormGroup.value)
    // console.log(this.id)

    this.cashService.update(this.id,this.updateCashFormGroup.value).subscribe(data=>
      {
        
        if(data!=null){
          alert("Mise à jour effectuée avec succès!");
          this.ngOnInit();
        }
      },err=>
      {

      })
  }
  open(content: any, item:any=null, size:any='lg') {
    this.ngOnInit();
    if(item!=null){
      // console.log("item");
      //console.log(item);
      this.currentCash = item;
      this.id = item.idCash;
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
  onDelete(cash:any){
    const res = confirm('Vous voulez vraiment supprimer ? ');
      if (res === true){
    this.cashService.delete(cash.idCash).subscribe(data=>{
      alert("La transaction a été supprimée!");
      this.ngOnInit();
    })
  }
  }


}

