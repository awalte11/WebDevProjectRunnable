import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ImageComponent } from './image/image.component';
import { TagComponent } from './tag/tag.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { CreateImageComponent } from './create-image/create-image.component';
import { ViewAllCollectionsComponent } from './view-all-collections/view-all-collections.component';
import { SearchComponent } from './search/search.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';


const routes: Routes = [
  { path: '', redirectTo : 'frontpage', pathMatch: 'full' },
  { path: 'COSC484Project', redirectTo : 'frontpage', pathMatch: 'full'},
  { path: 'frontpage',  component: FrontPageComponent },
  { path: 'newImage',  component: CreateImageComponent },
  { path: 'newCollection',  component: CreateCollectionComponent },
  { path: 'allCollections',  component: ViewAllCollectionsComponent }, 
  { path: 'search',  component: SearchComponent }, 
  { path: 'image/:id', component: ImageComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'managecollection/:id', component: ManageCollectionComponent },
  { path: 'manageimage/:id', component: ManageImageComponent },
  { path: 'upload', component: CreateImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
