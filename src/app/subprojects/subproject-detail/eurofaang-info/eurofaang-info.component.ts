import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalDataTableComponent } from '../../../shared/portal-data-table/portal-data-table.component';
import { EnsemblAnnotationComponent } from '../../../shared/ensembl-annotation/ensembl-annotation.component';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import {ActiveFilterComponent} from '../../../shared/active-filter/active-filter.component';

@Component({
  selector: 'app-eurofaang-info',
  templateUrl: './eurofaang-info.component.html',
  styleUrls: ['./eurofaang-info.component.css'],
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, FormsModule, ReactiveFormsModule, MatOption, MatError, EnsemblAnnotationComponent,
    PortalDataTableComponent, ActiveFilterComponent]
})
export class EurofaangInfoComponent implements OnInit {
  imageHost: string = environment.relatedProjectsHost;
  projectList: string[] = ['GENE-SWitCH', 'AQUA-FAANG', 'BovReg', 'GEroNIMO', 'RUMIGEN'];
  projects = new FormControl(this.projectList, {nonNullable: true});
  projectSelectionErr = false;

  constructor() { }

  ngOnInit() {
  }

  imgUrl(relative_path: string) {
    return (this.imageHost + 'eurofaang/' + relative_path);
  }

  checkSelectedProjects(selectedProjects: string[]) {
    if (!selectedProjects.length) {
      this.projectSelectionErr = true;
    } else {
      this.projectSelectionErr = false;
    }

  }

}
