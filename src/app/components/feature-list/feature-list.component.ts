import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/model/Feature';
import { DataSetService } from 'src/app/services/data-set.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
})
export class FeatureListComponent implements OnInit {
  public features: Feature[] = [];

  constructor(
    private networkService: NetworkService,
    private dataSetService: DataSetService
  ) {}

  ngOnInit(): void {
    this.networkService.getFeatures().subscribe();
    this.dataSetService.features$.subscribe((res: Feature[]) => {
      this.features = res;
    });
  }

  updateFeature(feature: Feature) {
    this.dataSetService.selectFeature(feature);
    this.networkService.getSurveyRules(feature.resource).subscribe();
  }

  deleteFeature(feature: Feature) {
    this.networkService.deleteFeature(feature.id).subscribe();
  }
}
