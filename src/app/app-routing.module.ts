import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListComponent} from "./sessions/pages/events-list/events-list.component";
import {MainPagesComponent} from "./public/pages/main-pages/main-pages.component";
import {EventViewComponent} from "./sessions/pages/event-view/event-view.component";
import {MyWristbandsComponent} from "./ticketing/pages/my-wristbands/my-wristbands.component";
import {ProfileVisitorComponent} from "./profiles/pages/profile-vistor/profile-visitor.component";
import {SessionVisitorComponent} from "./sessions/pages/session-visitor/session-visitor.component";
import {SessionTicketComponent} from "./ticketing/pages/session-ticket/session-ticket.component";
import {PromoterChecklistComponent} from "./promoter/pages/promoter-checklist/promoter-checklist.component";
import {LoginComponent} from "./iam/pages/login/login.component";
import {RegisterComponent} from "./iam/pages/register/register.component";
import {ItMainPageComponent} from "./shared/pages/it-main-page/it-main-page.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // EventViewComponent is the old SessionVisitorComponent and must be deleted
  { path: 'tickets-and-sessions', component: MainPagesComponent, children: [
      { path: '', pathMatch: "full", component: ItMainPageComponent },
      { path: 'events', component: SessionVisitorComponent },
      { path: 'view/:eventId', component: ProfileVisitorComponent },
      { path: 'tickets-tracking', component: MyWristbandsComponent },
      { path: 'qr-code/:wristbandId', component: SessionTicketComponent },
      { path: 'promoter-checklist', component: PromoterChecklistComponent },
      { path: 'ask-promoter', component: PromoterChecklistComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
