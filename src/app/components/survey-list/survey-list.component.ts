import { Component, OnInit } from '@angular/core';
import { DataSetService } from 'src/app/services/data-set.service';
import { SurveyRule } from './../../model/SurveyRule';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  public surveyRules: SurveyRule[] = [];

  constructor(public dataSetService: DataSetService) {}

  ngOnInit(): void {
    this.dataSetService.surveyRules$.subscribe((res: SurveyRule[]) => {
      this.surveyRules = res;
    });
  }
}
