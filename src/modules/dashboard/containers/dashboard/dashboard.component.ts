import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilletService } from '@app/services/billets.services';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    profileAdmin? : boolean;
    nbrBillet : any;

    constructor(
        private billetService : BilletService,
    ) {}
    ngOnInit() {
        this.getNbrBillet();
    }

    getNbrBillet(){
      this.billetService.getNbrBillet().subscribe(data=>
        {
          this.nbrBillet= data;
          console.log(data);
        })
    }

   
}
