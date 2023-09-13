import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'proposals', component: ProposalsComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'tracking/:address', component: TrackingDetailComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:address', component: UsersDetailComponent },
  { path: 'create-proposal', component: CreateProposalComponent },
  { path: 'proposal-details/:address', component: ProposalDetailsComponent },
  { path: '', redirectTo: '/proposals', pathMatch: 'full' },
  { path: '**', redirectTo: '/proposals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }