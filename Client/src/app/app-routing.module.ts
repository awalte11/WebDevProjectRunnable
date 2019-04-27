import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  { path: '', redirectTo : 'frontpage', pathMatch: 'full' },
  { path: 'frontpage',  component: FrontPageComponent },
  { path: 'collection/:id', component: CollectionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
