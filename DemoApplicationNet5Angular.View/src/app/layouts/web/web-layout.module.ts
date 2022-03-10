import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ],
  exports: [
    SideMenuComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class WebLayoutModule { }
