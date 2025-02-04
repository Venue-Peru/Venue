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
import {HostVisitorComponent} from "./host/pages/host-visitor/host-visitor.component";
import {HostDashboardComponent} from "./host/pages/host-dashboard/host-dashboard.component";
import {CreateSessionComponent} from "./host/pages/create-session/create-session.component";
import {MySessionsComponent} from "./host/pages/my-sessions/my-sessions.component";
import {SearchFilterComponent} from "./sessions/pages/search-filter/search-filter.component";
import {ForgotPasswordComponent} from "./iam/pages/forgot-password/forgot-password.component";
import {authenticationGuard} from "./iam/services/auth.guard";
import {hostGuard} from "./iam/services/host.guard";
import {userGuard} from "./iam/services/user.guard";
import {authenticatedGuard} from "./iam/services/authenticated.guard";

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [authenticatedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authenticatedGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authenticatedGuard] },
  // EventViewComponent is the old SessionVisitorComponent and must be deleted
  { path: 'tickets-and-sessions', component: MainPagesComponent, children: [
      { path: '', pathMatch: "full", component: ItMainPageComponent },
      { path: 'events/:eventId', component: SessionVisitorComponent },
      { path: 'host/:hostId', component: HostVisitorComponent },
      { path: 'view/:eventId', component: ProfileVisitorComponent },
      { path: 'promoter-checklist/:code', component: PromoterChecklistComponent },
      { path: 'ask-promoter', component: PromoterChecklistComponent },
      // search and filter
      { path: 'search', component: SearchFilterComponent },
      // user-only routes
      { path: 'my-wristbands', component: MyWristbandsComponent, canActivate: [userGuard] },
      { path: 'my-wristbands/:wristbandId', component: SessionTicketComponent, canActivate: [userGuard] },
      // host-only routes
      { path: 'work/dashboard', component: HostDashboardComponent, canActivate: [hostGuard] },
      { path: 'work/dashboard/create-session', component: CreateSessionComponent, canActivate: [hostGuard] },
      { path: 'work/dashboard/my-sessions', component: MySessionsComponent, canActivate: [hostGuard] },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
