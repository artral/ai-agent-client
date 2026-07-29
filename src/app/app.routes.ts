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
    
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard.component/dashboard.component').then(m => m.DashboardComponent) 
        },
      { 
        path: 'member-eligibility', 
        loadComponent: () => import('./features/member/member.component/member.component').then(m => m.MemberComponent) 
      },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
