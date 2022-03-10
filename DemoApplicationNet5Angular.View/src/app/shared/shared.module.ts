import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericDirective } from '../_helpers/numbers-only';
import { BlockUIModule } from 'ng-block-ui';
import { UploadService } from './../_services/upload.service';
import { MomentModule } from 'ngx-moment';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        NumericDirective,
    ],
    entryComponents: [],
    exports: [
        NumericDirective,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        BlockUIModule
    ],
    providers: [
        UploadService
    ]
})
export class SharedModule { }
