import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-eurofaang-info',
  templateUrl: './eurofaang-info.component.html',
  styleUrls: ['./eurofaang-info.component.css']
})
export class EurofaangInfoComponent implements OnInit {
  imageHost: string = environment.relatedProjectsHost;

  constructor() { }

  ngOnInit() {
  }

  imgUrl(relative_path) {
    return (this.imageHost + 'eurofaang/' + relative_path);
  }
}
