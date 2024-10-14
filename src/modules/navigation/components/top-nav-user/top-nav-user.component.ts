import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
   // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {

    public connectedUser: any; 
    constructor(public userService: UserService,  private route : Router) {}
    ngOnInit() {
    

    }

    onLogout()
    {
        this.route.navigateByUrl("/connexion");

    }
}

