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
    templateUrl: './export.component.html',
//    styleUrls: ['./busy.css']
})

export class ExportComponent{
  @Input() query: {[term: string]: any};
  @Input() type: string;
  @Input() count: number;  
  disabled: boolean = false;
  CSVLabel: string = "Export as CSV file";
  TSVLabel: string = "Export as Tabular file";
  result:Array<Array<string>> = new Array<Array<string>>();
  private pageSize = 100;
  busy: Promise<any>;    
  
  constructor(
    private apiOrganismService: ApiOrganismService,
    private apiSpecimenService: ApiSpecimenService
  ){};

//it utilizes the existing library Angular2Csv which is described at https://www.npmjs.com/package/angular2-csv
  export(format: string){
    this.disabled = true;
    //remove the pagination to return the full list
    delete this.query['from'];
    delete this.query['aggs'];
    this.query['size']=this.count;
//    this.query['size'] = this.pageSize;
//    console.log("Total number:"+this.count);
//    var pages: number = Math.floor(this.count/this.pageSize)+1;
//    console.log("page count:"+pages);

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
      this.TSVLabel = "Exporting ...";
    }else{
      this.CSVLabel = "Exporting ...";
    }
//pagination to solve long list of records, at the moment only deal with specimen
//    var downloaded = false;
//    var totalResult:Array<Array<string>> = new Array<Array<string>>();
//    if(this.type == "specimen"){
//      totalResult.push(this.apiSpecimenService.getHeader());
//    }
//    for(var i=0;i<pages;i++){
//      this.query['from'] = i*this.pageSize;
//      console.log ((i*this.pageSize+1)+" to "+((i+1)*this.pageSize));
//      console.log(this.query);
//      if (this.type == "organism"){
//        this.apiOrganismService.getAllInArray(this.query).subscribe((response)=>{
//          for(let one of response){
//            totalResult.push(one);
//          }
//        });
//      }else if(this.type == "specimen"){
//        this.apiSpecimenService.getAllInArray(this.query).subscribe((response)=>{
//          for(let one of response){
//            totalResult.push(one);
//          }
//          if (i==pages || pages == 1){
//            if(!downloaded && totalResult.length >= this.count){
//              new Angular2Csv(JSON.stringify(totalResult), filename ,options);  
//              downloaded = true;
//            }
//         }
//        });
//      }
    this.busy = new Observable(observable => {
      if (this.type == "organism"){
        this.apiOrganismService.getAllInArray(this.query,(this.count*2+1000)).subscribe((response)=>{
          new Angular2Csv(JSON.stringify(response), filename ,options);
          this.default();
        });
      }else if(this.type == "specimen"){
        this.apiSpecimenService.getAllInArray(this.query,(this.count*2+1000)).subscribe((response)=>{
          new Angular2Csv(JSON.stringify(response), filename ,options);
          this.default();
        });
      }
    }).toPromise();
  }

  default(){
    this.disabled = false;
    this.CSVLabel = "Export as CSV file";
    this.TSVLabel = "Export as Tabular file";
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

