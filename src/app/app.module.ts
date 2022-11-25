import { SurveyAddComponent } from './components/survey-add/survey-add.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NetworkService } from './services/network.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { FeatureAddComponent } from './components/feature-add/feature-add.component';
import { DataSetService } from './services/data-set.service';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

@NgModule({
  declarations: [AppComponent, ProjectListComponent, FeatureListComponent, FeatureAddComponent, SurveyListComponent, SurveyAddComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    NgbModule,
  ],
  providers: [NetworkService, DataSetService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
