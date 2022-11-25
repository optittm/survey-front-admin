import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feature } from '../model/Feature';
import { Project } from '../model/Project';
import { SurveyRule } from './../model/SurveyRule';

@Injectable({
  providedIn: 'root',
})
export class DataSetService {
  public selectedProject: Project | null = null;
  public selectedFeature: Feature | null = null;
  public projects$ = new Subject<Project[]>();
  public features$ = new Subject<Feature[]>();
  public surveyRules$ = new Subject<SurveyRule[]>();

  constructor() {}

  public selectProject(project: Project) {
    this.selectedProject = project;
  }

  public selectFeature(feature: Feature) {
    this.selectedFeature = feature;
  }

  public setProjects(projects: Project[]) {
    this.projects$.next(projects);
  }

  public setFeatures(features: Feature[]) {
    this.features$.next(features);
  }

  public setSurveyRules(surveyRules: SurveyRule[]) {
    this.surveyRules$.next(surveyRules);
  }
}
