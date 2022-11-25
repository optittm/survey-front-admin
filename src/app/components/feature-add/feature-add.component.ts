import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { FeatureDto } from 'src/app/model/FeatureDto';
import { DataSetService } from 'src/app/services/data-set.service';
import { NetworkService } from 'src/app/services/network.service';
import { Utils } from './../../shared/utils';

@Component({
  selector: 'app-feature-add',
  templateUrl: './feature-add.component.html',
  styleUrls: ['./feature-add.component.css'],
})
export class FeatureAddComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    resource: new FormControl(),
  });

  constructor(
    private networkService: NetworkService,
    public dataSetService: DataSetService
  ) {}

  ngOnInit(): void {}

  createFeature() {
    if (this.dataSetService.selectedProject == null || this.form.invalid) {
      return;
    }
    let feature: FeatureDto = {
      id: Utils.getRanHex(24),
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      payload: {},
      synced: moment().format('YYYY-MM-DDThh:mm:ss.SSSSSS'),
      project_id: this.dataSetService.selectedProject.id,
      resource: this.form.get('resource')?.value,
      requirement_ids: [],
    };
    this.networkService.createFeature([feature]).subscribe();
  }
}
