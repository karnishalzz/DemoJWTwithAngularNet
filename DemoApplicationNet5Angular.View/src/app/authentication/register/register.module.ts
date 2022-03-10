import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RegisterRoutes} from './register.routing';
import { ReactiveFormsModule } from '@angular/forms';
//import {SharedModule} from '../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(RegisterRoutes),

    ],
    declarations: [RegisterComponent]
})

export class RegisterModule {}
