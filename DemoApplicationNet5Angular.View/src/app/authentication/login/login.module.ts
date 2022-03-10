import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginRoutes} from './login.routing';
import { ReactiveFormsModule } from '@angular/forms';
//import {SharedModule} from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(LoginRoutes),

    ],
    declarations: [LoginComponent]
})

export class LoginModule {}
