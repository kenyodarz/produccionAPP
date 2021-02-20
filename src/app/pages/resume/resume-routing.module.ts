import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Guards */
import { LoginGuard } from 'src/app/guards/login.guard';
/* Components */
import { ResumeComponent } from './resume.component';
import { HomeComponent } from './components/home/home.component';
import { DesignComponent } from './components/design/design.component';
import { ModelosComponent } from './components/modelos/modelos.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: ResumeComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'design',
        component: DesignComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'modelos',
        component: ModelosComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
