import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() content:any;
  @Input() term:any;
  @Input() size:any;
  @Input() placeHol="chercher";
  closeResult = '';



  constructor(
    private authService : AuthService,
    private router: Router,
    private modalService: NgbModal,


  ) { }

  ngOnInit(): void {
  }
  logout()
  {
      this.authService.logout();
      this.router.navigateByUrl("/authenticate");

  }

  open(content: any, size: any = "lg") {
    
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then(
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
