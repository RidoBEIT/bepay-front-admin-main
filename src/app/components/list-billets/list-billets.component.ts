import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Billet } from '@app/models/billet.models';
import { AuthService } from '@app/services/auth.service';
import { BilletService } from '@app/services/billets.services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'sb-list-billets',
  templateUrl: './list-billets.component.html',
  styleUrls: ['./list-billets.component.scss']
})
export class ListBilletsComponent implements OnInit{
  @ViewChild(MatPaginator)
  paginator !: MatPaginator;
  billets?:any;
  axes?:any;
  closeResult = '';
  currentBillet? : Billet;
  currentAxe?:any;
  failedBilet?: any;
  term:string='';

  public currentPage:number = 0;
  public size:number=10;
  public totalPages:number = 0;
  public pages?: Array<number>;

  length?:number =100;
  pageSize?:number =10;
  pageSizeOptions: number[] = [10, 25, 50, 75, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;


  constructor(
      private billetService: BilletService,
      private modalService: NgbModal,
      private router : Router,
      private authService: AuthService

  ) { }
 

  ngOnInit(): void {
    this.getBillet();
    console.log("this.pageEvent");
    console.log(this.pageEvent);
  }

  firstPageLabel = $localize`première page`;
  itemsPerPageLabel = $localize`elements par page:`;
  lastPageLabel = $localize`dernière page`;

 
  nextPageLabel = 'Suivante';
  previousPageLabel = 'Precedante';

  getBillet() {
    this.billetService.getAll(this.currentPage,this.size).subscribe(data => {
        this.billets= data.content;
        this.length = data.totalElements;
      
         console.log(data);
    });
}

getValues(event : any){
 this.size = event.pageSize;
 this.currentPage = event.pageIndex;
 this.getBillet();
}

Create(currentBillet : any)
{
     
    
    let idCo = currentBillet.compagnie.idCompagnie;
   
  
      this.billetService.createFailedBillet(idCo,currentBillet).subscribe(data => {
        // console.log("data");
        // console.log(data);
          //  alert("Billet ajouté avec succès!");
            this.ngOnInit();
       });
  
  
        
  
}


getAxe(){
  this.axes=[]
  for(let i=0;i< this.billets.length;i++)
  {
    let idAxe = this.billets[i].idAxe;
    let idC = this.billets[i].compagnie.idCompagnie;
    // console.log(i+": idC="+idC+" et idA = "+idAxe);
    let axe:any;
    this.billetService.getAxeById(idC,idAxe).subscribe(data=>{
      axe=data;
      //  console.log(axe);

    }
      );
    this.axes.push(axe);
  }
  // console.log(this.axes);
  
}
logout()
{
    this.authService.logout();
    this.router.navigateByUrl("/authenticate");

}
showApis(){
  this.router.navigateByUrl("/listApi");
}
deleteBillet(billet: any) {
  const res = confirm('Vous voulez vraiment supprimer ? ');
  if (res === true)
      this.billetService.delete(billet.idBillet).subscribe(data => {
          // console.log(data);

          // this.getBillet();
          this.ngOnInit();
      });
}

open(content: any, item : any = null) {
  
  if(item!=null){
      this.currentBillet = item;
      let idAxe = item.idAxe;
      let idC = item.compagnie.idCompagnie;
      // console.log("idAxe= "+ idAxe);
      // console.log("idC= "+ idC);

      this.billetService.getAxeById(idC,idAxe).subscribe(data=>{
        this.currentAxe=data;
         //console.log(this.currentAxe);
        //console.log("Axe= "+ data);
  
      }
        );
     
  }
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      result => {
          this.closeResult = `Closed with: ${result}`;
      },
      reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
  );
  this.ngOnInit();
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
