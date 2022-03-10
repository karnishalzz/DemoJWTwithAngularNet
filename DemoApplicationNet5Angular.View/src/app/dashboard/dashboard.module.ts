import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from './../shared/shared.module';
import { WebLayoutModule } from '../layouts/web/web-layout.module';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(DashboardRoutes),
      SharedModule,
      WebLayoutModule,
      TabsModule.forRoot(),
  ],
  declarations: [DashboardComponent],

})

export class DashboardModule {}
