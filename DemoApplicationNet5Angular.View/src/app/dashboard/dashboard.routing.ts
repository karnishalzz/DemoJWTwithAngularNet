
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    breadcrumb: 'Dashboard',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
