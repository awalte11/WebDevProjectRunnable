import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ImageComponent } from './image/image.component';
import { TagComponent } from './tag/tag.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';

const routes: Routes = [
  { path: '', redirectTo : 'frontpage', pathMatch: 'full' },
  { path: 'frontpage',  component: FrontPageComponent },
  { path: 'image/:id', component: ImageComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'managecollection/:id', component: ManageCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
