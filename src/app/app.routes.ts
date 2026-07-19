import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { LoginComponent } from './features/auth/login/login.component/login.component';
import { UnauthorizedComponent } from './features/auth/unauthorized/unauthorizad.component/unauthorized.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { 
        path: 'dashboard', 
        //loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'member-eligibility', 
        canActivate: [roleGuard(['PBM_Admin', 'Pharmacist'])],
        //loadComponent: () => import('./features/member/member.component').then(m => m.MemberComponent) 
      },
      { 
        path: 'formulary', 
        canActivate: [roleGuard(['PBM_Admin', 'Pharmacist', 'Patient'])],
        //loadComponent: () => import('./features/formulary/formulary.component').then(m => m.FormularyComponent) 
      },
      { 
        path: 'prior-auth', 
        canActivate: [roleGuard(['PBM_Admin', 'Pharmacist'])],
        //loadComponent: () => import('./features/prior-auth/prior-auth.component').then(m => m.PriorAuthComponent) 
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
