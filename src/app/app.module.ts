import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandlerService } from './service/global-error-handler.service';
import { StompConnectComponent } from './components/stomp-connect/stomp-connect.component';
import { StompMessageComponent } from './components/stomp-message/stomp-message.component';
import { HeaderComponent } from './components/header/header.component';
import { StompCollectionComponent } from './components/header/stomp-collection/stomp-collection.component';
import { StompResponseComponent } from './components/stomp-response/stomp-response.component';
import { FilterByDestinationPipe } from './pipes/filter-by-destination.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StompConnectComponent,
    StompMessageComponent,
    HeaderComponent,
    StompResponseComponent,
    StompCollectionComponent,
    FilterByDestinationPipe,
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
