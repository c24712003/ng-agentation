import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// ng-agentation library
import { NgAgentationModule } from 'ng-agentation';

// App
import { AppComponent } from './app.component';

// Demo components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    SubmitButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgAgentationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
