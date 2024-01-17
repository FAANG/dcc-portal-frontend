import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-eurofaang-info',
  templateUrl: './eurofaang-info.component.html',
  styleUrls: ['./eurofaang-info.component.css']
})
export class EurofaangInfoComponent implements OnInit {
  imageHost: string = environment.relatedProjectsHost;
  projectList: string[] = ["GENE-SWitCH","AQUA-FAANG","BovReg","GEroNIMO","RUMIGEN"];
  projects = new FormControl(this.projectList, {nonNullable: true});
  projectSelectionErr: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.projects['value'])

  }

  imgUrl(relative_path) {
    return (this.imageHost + 'eurofaang/' + relative_path);
  }

  // to delete
  checkSelectedProjects(selectedProjects: string[]){
    if (!selectedProjects.length){
      this.projectSelectionErr = true;
    } else{
      this.projectSelectionErr = false;
    }

  }

}
