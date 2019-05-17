import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ImageComponent } from './image/image.component';
import { TagComponent } from './tag/tag.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { ViewAllCollectionsComponent } from './view-all-collections/view-all-collections.component';

const routes: Routes = [
  { path: '', redirectTo : 'allcollections', pathMatch: 'full' },
  { path: 'frontpage',  component: FrontPageComponent },
  { path: 'allcollections',  component: ViewAllCollectionsComponent }, 
  { path: 'image/:id', component: ImageComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'managecollection/:id', component: ManageCollectionComponent },
  { path: 'manageimage/:id', component: ManageImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
