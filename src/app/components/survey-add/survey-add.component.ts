import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyRuleDto } from 'src/app/model/SurveyRuleDto';
import { DataSetService } from 'src/app/services/data-set.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-survey-add',
  templateUrl: './survey-add.component.html',
  styleUrls: ['./survey-add.component.css'],
})
export class SurveyAddComponent implements OnInit {
  public form = new FormGroup({
    ratio: new FormControl(),
    delay_before_new_proposition: new FormControl(),
    delay_to_answer: new FormControl(),
  });

  constructor(
    private networkService: NetworkService,
    public dataSetService: DataSetService
  ) {}

  ngOnInit(): void {}

  createSurveyRule() {
    if (
      this.dataSetService.selectedProject == null ||
      this.dataSetService.selectedFeature == null ||
      this.form.invalid
    ) {
      return;
    }
    let surveyRule: SurveyRuleDto = {
      project_id: this.dataSetService.selectedProject.id,
      is_activated: true,
      delay_to_answer: this.form.get('delay_to_answer')?.value,
      feature_rules: [
        {
          url: this.dataSetService.selectedFeature?.resource,
          ratio: this.form.get('ratio')?.value,
          delay_before_new_proposition: this.form.get(
            'delay_before_new_proposition'
          )?.value,
        },
      ],
    };
    this.networkService.createSurveyRule(surveyRule).subscribe();
  }
}
