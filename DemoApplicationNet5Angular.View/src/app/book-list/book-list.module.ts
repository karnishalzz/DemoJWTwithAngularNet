import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { WebLayoutModule } from '../layouts/web/web-layout.module';
import { BookListRoutes } from './book-list.routing';
import { BookListComponent } from './book-list.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(BookListRoutes),
      SharedModule,
      WebLayoutModule,
      NgbTooltipModule,
      NgxExtendedPdfViewerModule,
  ],
  declarations: [BookListComponent],

})

export class BookListModule {}
