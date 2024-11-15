import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { EventsListComponent } from './sessions/pages/events-list/events-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MainPagesComponent } from './public/pages/main-pages/main-pages.component';
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import { EventViewComponent } from './sessions/pages/event-view/event-view.component';
import { MainDiscriminatorsWidgetComponent } from './sessions/components/main-discriminators-widget/main-discriminators-widget.component';
import { EventHeroWidgetComponent } from './sessions/components/event-hero-widget/event-hero-widget.component';
import { MyWristbandsComponent } from './ticketing/pages/my-wristbands/my-wristbands.component';
import {NgOptimizedImage} from "@angular/common";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {HostsApiService} from "./ticketing/services/hosts-api.service";
import { ProfileVisitorComponent } from './profiles/pages/profile-vistor/profile-visitor.component';
import { ProfileHeaderComponent } from './profiles/components/profile-header/profile-header.component';
import { SessionVisitorComponent } from './sessions/pages/session-visitor/session-visitor.component';
import { SessionTicketComponent } from './ticketing/pages/session-ticket/session-ticket.component';
import { PromoterChecklistComponent } from './promoter/pages/promoter-checklist/promoter-checklist.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './iam/pages/login/login.component';
import { RegisterComponent } from './iam/pages/register/register.component';
import { ItMainPageComponent } from './shared/pages/it-main-page/it-main-page.component';
import { NoInternetComponent } from './shared/components/no-internet/no-internet.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { LoadingComponent } from './shared/components/loading/loading.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {AuthInterceptor} from "./iam/services/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    NavbarComponent,
    MainPagesComponent,
    EventViewComponent,
    MainDiscriminatorsWidgetComponent,
    EventHeroWidgetComponent,
    MyWristbandsComponent,
    ProfileVisitorComponent,
    ProfileHeaderComponent,
    SessionVisitorComponent,
    SessionTicketComponent,
    PromoterChecklistComponent,
    LoginComponent,
    RegisterComponent,
    ItMainPageComponent,
    NoInternetComponent,
    LoadingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        InputTextModule,
        StyleClassModule,
        ToolbarModule,
        NgOptimizedImage,
        CheckboxModule,
        CardModule,
        ImageModule,
        FormsModule,
        DialogModule,
        PaginatorModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        RadioButtonModule
    ],
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
