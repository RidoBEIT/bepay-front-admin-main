import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './components/api/api.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { PartenaireComponent } from './components/partenaire/partenaire.component';
import { ListBilletsComponent } from './components/list-billets/list-billets.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientComponent } from './components/appClient/client.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiDetailsComponent } from './components/api-details/api-details.component';
import { DisbursementApiComponent } from './components/disbursement-api/disbursement-api.component';
import { TypeErrorCodeComponent } from './components/type-error-code/type-error-code.component';
import { CashComponent } from './components/cash/cash.component';


const routes: Routes = [
  
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/authenticate',
    },
    {
        path: 'authenticate',
        component: AuthentificationComponent
    },
    {
        path: 'authenticate/:message',
        component: AuthentificationComponent,
       
    },
  
  
    {
        path: 'listBillets',
        component: ListBilletsComponent,
        canActivate: [AuthGuard]

    },

    {
        path: 'transactions',
        component: TransactionComponent,
        canActivate : [AuthGuard]
    },

    {
        path: 'cash',
        component: CashComponent,
        canActivate : [AuthGuard]
    },

    {
        path: 'decaisser',
        component: DisbursementApiComponent,
        canActivate : [AuthGuard]
    },

    {
        path: 'TypeErrorCode',
        component: TypeErrorCodeComponent,
        canActivate : [AuthGuard]
    },

 
    {
        path: 'listApi',
        component: ApiComponent,
        canActivate: [AuthGuard]

    },
    
    {
        path: 'partenaires',
        component: PartenaireComponent,
        canActivate: [AuthGuard]

    },
    
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'clients',
        component: ClientComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'profiles',
        component: ProfilesComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'navbar',
        component:NavbarComponent,
    },{
        path: 'api/details/:id',
        component: ApiDetailsComponent,
        canActivate: [AuthGuard]

    },
  
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
