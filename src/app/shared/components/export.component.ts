import { Component, Input } from '@angular/core';
import { OrganismList } from '../organism-list';
import { Organism } from '../organism';
import { ApiOrganismService }  from '../../core/services/api-organism.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SpecimenList } from '../specimen-list';
import { ApiSpecimenService }  from '../../core/services/api-specimen.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
    selector: 'export-button',
    templateUrl: './export.component.html'
})

export class ExportComponent{
  @Input() query: {[term: string]: any};
  @Input() type: string;
  private organismSource: Subject<Observable<Array<Array<string>>>>;
  private organismSubscription: Subscription = null;
//  organismList: OrganismList;
  result:Array<Array<string>> = new Array<Array<string>>();

  constructor(
    private apiOrganismService: ApiOrganismService,
    private apiSpecimenService: ApiSpecimenService
  ){};

  ngOnInit() {
//    this.organismSource = new Subject<Observable<Array<Array<string>>>>();
//    this.organismSource.switchMap((o: Observable<Array<Array<string>>>):Observable<Array<Array<string>>> => o) //first Observable is the type of the parameter, second is the expected type of the output. 
//        .subscribe((response) => { 
//          this.result = response;
//        });
//    this.organismSource.next(this.apiOrganismService.getAllInArray(this.query));
  }

  export(format: string){


    console.log(format);
    console.log(this.type);
    //remove the pagination to return the full list
    delete this.query['from'];
    this.query['size'] = 10;
    this.apiOrganismService.getAllInArray(this.query).subscribe((response)=>{
      new Angular2Csv(JSON.stringify(response), 'My Report');
    });
    
//    console.log("in the export before next");
//    this.organismSource.next(this.apiOrganismService.getAllInArray(this.query));
//    console.log(this.result);
//    console.log("in the export after next: "+this.result.length);
//    var header:string;
//    var str: string;
//    if (format == "tsv"){
//      header = "text/tab-separated-values;charset=utf-8;";
//      str = this.convertIntoFormat(this.result,format);
//    }else{
//      header = "text/csv;charset=utf-8;";
//      str = this.convertIntoFormat(this.result,format);
//    }
//    console.log("in the export result");
//    console.log(str);
  }

  convertIntoFormat(result:Array<Array<string>>,format: string){
    var value = "";
    var row = "";
    for (var i in result) {
      var line = '';
      for (var index in result[i]) {
        if (format == "tsv"){
          line += result[i][index]+"\t";
         }else{
          line += '"'+result[i][index]+'",';
        }
      }
      line = line.slice(0,-1);
      value += line + '\n';
    }
    return value;
  }

}

