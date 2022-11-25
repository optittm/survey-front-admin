import { DataSetService } from 'src/app/services/data-set.service';
import { SurveyRuleDto } from './../model/SurveyRuleDto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';
import { Feature } from '../model/Feature';
import { SurveyRule } from '../model/SurveyRule';
import { SurveyComment } from '../model/SurveyComment';
import { FeatureDto } from '../model/FeatureDto';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private static PROJECTS_URI = '/projects';
  private static FEATURES_URI = '/features';
  private static SURVEY_URI = '/survey';

  constructor(private http: HttpClient, private dataSetService: DataSetService) { }

  getProjects(name?: string, fulltext?: string): Observable<Project[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (fulltext) {
      params = params.set('fulltext', fulltext);
    }
    return this.http.get<Project[]>(environment.apiUrl + NetworkService.PROJECTS_URI, {params})
      .pipe(tap((res) => {
        this.dataSetService.projects$.next(res);
      }));
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl + NetworkService.PROJECTS_URI + '/' + id);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.patch<Project>(environment.apiUrl + NetworkService.PROJECTS_URI + '/' + id, project)
      .pipe(tap(() => {
        this.getProjects();
      }));
  }

  deleteProject(id: string): Observable<Feature> {
    return this.http.delete<any>(environment.apiUrl + NetworkService.PROJECTS_URI + '/' + id)
      .pipe(tap(() => {
        this.getProjects();
      }));
  }

  getFeatures(name?: string): Observable<Feature[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<Feature[]>(environment.apiUrl + NetworkService.FEATURES_URI, {params})
      .pipe(tap((res) => {
        this.dataSetService.features$.next(res);
      }));
  }

  createFeature(feature: FeatureDto[]): Observable<Feature> {
    return this.http.post<Feature>(environment.apiUrl + NetworkService.FEATURES_URI, feature)
      .pipe(tap(() => {
        this.getFeatures();
      }));
  }

  getFeature(id: string): Observable<Feature> {
    return this.http.get<Feature>(environment.apiUrl + NetworkService.FEATURES_URI + '/' + id);
  }

  getFeatureByProjectId(id: string): Observable<Feature[]> {
    return this.http.get<Feature[]>(environment.apiUrl + NetworkService.FEATURES_URI + '/project/' + id)
    .pipe(tap((res) => {
      this.dataSetService.features$.next(res);
    }));
  }

  deleteFeature(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + NetworkService.FEATURES_URI + '/' + id)
      .pipe(tap(() => {
        this.getFeatures();
      }));
  }

  createSurveyRule(surveyRule: SurveyRuleDto): Observable<SurveyRule[]> {
    return this.http.post<SurveyRule[]>(environment.apiUrl + NetworkService.SURVEY_URI, surveyRule)
      .pipe(tap(() => {
        this.getSurveyRules(surveyRule.feature_rules[0].url);
      }));
  }

  getSurveyRules(featureUrl: string): Observable<SurveyRule> {
    let params = new HttpParams();
    if (featureUrl) {
      params = params.set('feature_url', featureUrl);
    }
    return this.http.get<SurveyRule>(environment.apiUrl + NetworkService.SURVEY_URI + '/rules', {params})
      .pipe(tap((res) => {
        this.dataSetService.surveyRules$.next([res]);
      }),
      catchError(error => {
        this.dataSetService.surveyRules$.next([]);
        return throwError(() => error);
      }));
  }

  createSurveyComment(surveyComment: SurveyComment): Observable<SurveyComment> {
    return this.http.post<SurveyComment>(environment.apiUrl + NetworkService.SURVEY_URI + '/comments', surveyComment);
  }

  getSurveyComments(id: string): Observable<SurveyComment[]> {
    return this.http.get<SurveyComment[]>(environment.apiUrl + NetworkService.SURVEY_URI + '/projects/' + id + '/comments');
  }

  getSurveyTimes(): Observable<SurveyRule[]> {
    return this.http.get<SurveyRule[]>(environment.apiUrl + NetworkService.SURVEY_URI + '/times');
  }

  getSurveyTimestamps(): Observable<SurveyRule[]> {
    return this.http.get<SurveyRule[]>(environment.apiUrl + NetworkService.SURVEY_URI + '/timestamps');
  }
}
