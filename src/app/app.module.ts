import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/appClient/client.component';
import {NgxPrintModule} from 'ngx-print';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { MatGridListModule }  from  '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatCardModule} from '@angular/material/card';
import { ChartsBarComponent } from '@modules/charts/components/charts-bar/charts-bar.component';
import { ApiComponent } from './components/api/api.component';
import { PartenaireComponent } from './components/partenaire/partenaire.component';
import { ListBilletsComponent } from './components/list-billets/list-billets.component';
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { QrCodeModule } from 'ng-qrcode';
import { UsersComponent } from './components/users/users.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiDetailsComponent } from './components/api-details/api-details.component';
import { DisbursementApiComponent } from './components/disbursement-api/disbursement-api.component';
import { TypeErrorCodeComponent } from './components/type-error-code/type-error-code.component';
import { CashComponent } from './components/cash/cash.component';





@NgModule({
    declarations: [AppComponent,
        ClientComponent,
        TestComponent,
        ChartsBarComponent,
        ApiComponent,
        PartenaireComponent,
        ListBilletsComponent,
        UsersComponent,
        ProfilesComponent,
        AuthentificationComponent,
        TransactionComponent,
        NavbarComponent,
        ApiDetailsComponent,
        DisbursementApiComponent,
        TypeErrorCodeComponent,
        CashComponent,
    
        ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,  
        ReactiveFormsModule, 
        FormsModule,
        NgxPrintModule, 
        BrowserAnimationsModule,
        Ng2SearchPipeModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule, 
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        QrCodeModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        ToastrModule.forRoot(),
        AppCommonModule,
        NavigationModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
