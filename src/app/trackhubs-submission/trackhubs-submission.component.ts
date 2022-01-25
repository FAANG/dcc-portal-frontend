import { Component, OnInit } from '@angular/core';
import { validation_service_url } from '../shared/constants';
import { Title } from '@angular/platform-browser';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-trackhubs-submission',
  templateUrl: './trackhubs-submission.component.html',
  styleUrls: ['./trackhubs-submission.component.css']
})
export class TrackhubsSubmissionComponent implements OnInit {
  fileid;
  tracksUploadUrl;
  hubFileUploadUrl;
  trackDbUploadUrl;
  trackhub = {};
  stage;
  error;
  registration_success_msg;
  registration_failed_msg;
  loading = false;

  constructor(private titleService: Title,
              private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG upload track hubs');
    this.stage = 'form';
  }

  startUploads(dir:string, genome: string, subdir: string) {
    this.stage = 'upload';
    this.tracksUploadUrl = `${validation_service_url}/trackhub/upload/${dir}/${genome}/${subdir}`;
    this.trackDbUploadUrl = `${validation_service_url}/trackhub/upload/${dir}/${genome}`;
    // this uploads hub files at /${dir} but backend needs {genome} for validations
    this.hubFileUploadUrl = `${validation_service_url}/trackhub/upload/${dir}/${genome}`; 
  }

  registerTrackHub(dir: string, genome_name: string, genome_accession: string) {
    const url = `${validation_service_url}/trackhub/register/`;
    this.loading = true;
    return this.http.post(url, {
      'hub_dir': dir,
      'genome_name': genome_name,
      'genome_id': genome_accession
    }).subscribe(
      data => {
        console.log(data);
        this.registration_failed_msg = '';
        this.registration_success_msg = data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.registration_success_msg = '';
        this.registration_failed_msg = error.error;
        this.loading = false;
      }
    );
  }

}
