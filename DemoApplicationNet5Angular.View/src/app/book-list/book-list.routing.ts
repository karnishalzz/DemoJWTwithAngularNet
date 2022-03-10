
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list.component';


export const BookListRoutes: Routes = [{
  path: '',
  component: BookListComponent,
  data: {
    breadcrumb: 'BookList',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
