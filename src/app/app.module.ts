import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StompConnectComponent } from './stomp-connect/stomp-connect.component';
import { StompMessageComponent } from './stomp-message/stomp-message.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { StompResponseComponent } from './stomp-response/stomp-response.component';
import { StompCollectionComponent } from './header/stomp-collection/stomp-collection.component';
import { GlobalErrorHandlerService } from './service/global-error-handler.service';

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
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
