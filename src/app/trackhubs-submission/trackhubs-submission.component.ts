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
  textFileUploadUrl;
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

  startUploads(genome: string, directory: string) {
    this.stage = 'upload';
    this.tracksUploadUrl = `${validation_service_url}/trackhubs/upload/${genome}/${directory}`;
    this.textFileUploadUrl = `${validation_service_url}/trackhubs/upload/${genome}`;
  }

  registerTrackHub(genome: string, genome_accession: string) {
    const url = `${validation_service_url}/trackhubs/register/`;
    this.loading = true;
    return this.http.post(url, {
      'genome_id': genome_accession, 'genome_name': genome
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
