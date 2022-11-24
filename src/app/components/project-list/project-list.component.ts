import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/Project';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private readonly network: NetworkService) { }

  ngOnInit(): void {
    this.network.getProjects().subscribe((res: Project[]) => {
      this.projects = res;
    });
  }

}
