import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StompConnectComponent } from './stomp-connect/stomp-connect.component';
import { StompMessageComponent } from './stomp-message/stomp-message.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { StompResponseComponent } from './stomp-response/stomp-response.component';
import { StompCollectionComponent } from './stomp-connect/stomp-collection/stomp-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    StompConnectComponent,
    StompMessageComponent,
    HeaderComponent,
    StompResponseComponent,
    StompCollectionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
