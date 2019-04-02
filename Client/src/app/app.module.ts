import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { CollectionComponent } from './collection/collection.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { ManageCollectionComponent } from './manage-collection/manage-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    CollectionComponent,
    UserComponent,
    SearchComponent,
    CreateCollectionComponent,
    ManageCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
