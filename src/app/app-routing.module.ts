import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, 
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, 
  { path: 'phrases', loadChildren: () => import('./phrases/phrases.module').then(m => m.PhrasesModule) }, 
  { path: 'quotes', loadChildren: () => import('./quotes/quotes.module').then(m => m.QuotesModule) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
