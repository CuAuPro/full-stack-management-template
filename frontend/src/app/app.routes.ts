import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
// import { DashboardComponent } from './pages/secure/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/public/welcome/welcome.component';
import { SignupComponent } from './pages/public/signup/signup.component';

import { FormsComponent } from './pages/secure/forms/forms.component';
import { TablesComponent } from './pages/secure/tables/tables.component';
import { TypographyComponent } from './pages/secure/typography/typography.component';
import { MapsComponent } from './pages/secure/maps/maps.component';
import { NotificationsComponent } from './pages/secure/notifications/notifications.component';
import { DashboardComponent } from './pages/secure/dashboard/dashboard.component';
import { SignInComponent } from './pages/public/signin/signin.component';
import { ChangePasswordComponent } from './pages/secure/change-password/change-password.component';

// export const routes: Routes = [
//     { path: 'welcome', component: WelcomeComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'signup', component: SignupComponent },

//     { path: 'change-password', component: ChangePasswordComponent},
//     // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
//     { path: 'dashboard', component: DashboardComponent},
//     { path: '**', redirectTo: 'welcome' }

// ];

export const routes: Routes = [
    {path: '',   redirectTo: '/welcome', pathMatch: 'full'},

    { path: 'welcome', component: WelcomeComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },


    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'forms', component: FormsComponent, canActivate: [authGuard]},
    {path: 'tables', component: TablesComponent, canActivate: [authGuard]},
    {path: 'typography', component: TypographyComponent, canActivate: [authGuard]},
    {path: 'maps', component: MapsComponent, canActivate: [authGuard]},
    {path: 'notifications', component: NotificationsComponent, canActivate: [authGuard]}
  ];