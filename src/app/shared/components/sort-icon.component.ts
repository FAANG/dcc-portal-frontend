import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
    selector: 'sort-icon',
    templateUrl: './sort-icon.component.html'
})

export class SortIconComponent implements OnInit, OnChanges{
  @Input() key: string;
  @Input() orders: {[key:string]: string}[];
  @Output() sort: EventEmitter<{[key:string]: string}[]> = new EventEmitter();// {[key:string]: string} is a hash, which maps to elasticsearch data structure in Params in Fireforx network monitor 
  flags = new Map(); 

  constructor(){ };
  ngOnInit() {
    this.flags = new Map();
    this.flags.set("biosampleId",-1);
  }


  ngOnChanges(changes: SimpleChanges){
    if (changes.orders){//when content of orders changes, must match to the field name
      this.flags = new Map();
      var orderLength : number = this.orders.length;
      for (var i = 0; i < orderLength; i++) {
        for (var property in this.orders[i]) { //each element is {[key:string]:string}
          var curr = this.orders[i][property];
          if (curr == "asc"){
            this.flags.set(property,1);
          }else{
            this.flags.set(property,-1);
          }
        }
      }
    }
  }

  toggleSort(){
//    alert(this.key);
    var found : boolean = false;
    var orderLength : number = this.orders.length;
    for (var i = 0; i < orderLength; i++) {
//      var output = '';
      for (var property in this.orders[i]) { //each element is {[key:string]:string}
//        output += "KEY:<"+ property + '>: VALUE:<' + this.orders[i][property]+'>; ';
//        alert(typeof(property) + " " + property);
        if (property == this.key){ //found the key
          found = true;
          var curr = this.orders[i][property];
          if (curr == "asc") {
            this.orders[i][property] = "desc";
            this.flags.set(this.key,-1);
          }else{
            this.orders[i][property] = "asc";
            this.flags.set(this.key,1);
          }
          i = this.orders.length; //the break statement below only breaks the inner loop (current), so set to this value to break the outer loop
          break;
        }
      }
//      console.log(output);
    }

    if (!found){ //not found, so not sorted before
      var entry: {[key:string]: string} = {};
      var property: string = this.key;
      entry[property] = "desc";
      this.flags.set(this.key,-1);
      //var entry: map{[x: string]: any}.  search for this, this allows the notation of entry['key']
      //always put biosampleId order to the end of orders
      this.orders.splice(orderLength-1,0,entry);
//      alert("not found, add new sort term "+this.key+" now there are "+this.orders.length+ " orders");
    }
    
    this.sort.emit(this.orders);
  }

  getFlag(){
    if(this.flags.has(this.key)){
      return this.flags.get(this.key);
    }else{
      return 0;
    }
  }
}

/*notes of using event emitter
https://stackoverflow.com/questions/36076700/what-is-the-proper-use-of-an-eventemitter
https://angular.io/api/core/EventEmitter
1. import Output, EventEmitter
2. define @Output() variable
3. this.variable.emit(the thing to emit)
4. in html add (variable)="function_receiving"
5. in the receiver component, define function_receiving
*/
