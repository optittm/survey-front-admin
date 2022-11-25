import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';
import { DataSetService } from 'src/app/services/data-set.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  public projects: Project[] = [];

  constructor(
    private networkService: NetworkService,
    private dataSetService: DataSetService
  ) {}

  ngOnInit(): void {
    this.networkService.getProjects().subscribe();
    this.dataSetService.projects$.subscribe((res: Project[]) => {
      this.projects = res;
    });
  }

  updateProject(project: Project) {
    this.dataSetService.selectProject(project);
    this.networkService.getFeatureByProjectId(project.id).subscribe();
  }

  deleteProject(project: Project) {
    this.networkService.deleteProject(project.id).subscribe();
  }
}
