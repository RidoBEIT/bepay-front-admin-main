import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BilletService } from '@app/services/billets.services';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    nbrBillet?:any;
    constructor(
        private bs : BilletService,
    ) {}
    ngOnInit() {
        this.getNbrBillet();
    }

    getNbrBillet(){
        this.bs.getNbrBillet().subscribe(data=>
            {
                this.nbrBillet = data;
                console.log(data)
            });
    }
}
