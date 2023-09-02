import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PerfilComponent, ProposalsComponent, CreateProposalComponent, ProposalDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
