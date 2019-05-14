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
import { CreateImageComponent } from './create-image/create-image.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { TagComponent } from './tag/tag.component';
import {ImageService} from './create-image/Image.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    CollectionComponent,
    UserComponent,
    SearchComponent,
    CreateCollectionComponent,
    ManageCollectionComponent,
    CreateImageComponent,
    ManageImageComponent,
    RegisterUserComponent,
    ManageUserComponent,
    TagComponent,

    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
