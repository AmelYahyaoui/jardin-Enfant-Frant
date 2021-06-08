import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import {PostsComponent} from './views/posts/posts.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationDropdownComponent} from './components/dropdowns/notification-dropdown/notification-dropdown.component';

const routes: Routes = [
  // admin views
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "posts", component: PostsComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "notif", component: NotificationDropdownComponent },
      { path: "profile", component: ProfileComponent },
      { path: "", redirectTo: "posts", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views


  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
