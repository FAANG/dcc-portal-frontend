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
  result:Array<Array<string>> = new Array<Array<string>>();

  constructor(
    private apiOrganismService: ApiOrganismService,
    private apiSpecimenService: ApiSpecimenService
  ){};

//it utilizes the existing library Angular2Csv which is described at https://www.npmjs.com/package/angular2-csv
  export(format: string){
    //remove the pagination to return the full list
    delete this.query['from'];
    this.query['size'] = 10;
    //options for Angular2csv to export
    var options = { 
      fieldSeparator: ','
    };
    var filename:string = "Export result of "+this.type;
    if (format == "tsv"){
      options = {
        fieldSeparator: '\t'
      };
      filename = filename + ".tsv";
    }

    this.apiOrganismService.getAllInArray(this.query).subscribe((response)=>{
      new Angular2Csv(JSON.stringify(response), filename ,options);
    });
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

