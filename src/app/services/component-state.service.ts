import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentStateService {
  currentPaginationIndex = 0; // default to first page
  currentFilterTerm = '';
  componentsHistory = {
    previousComponent: '',
    currentComponent: ''
  };
  resetPageBool:boolean = false;
  

  constructor() { }

  setPaginationState(currentPageIndex){
    this.currentPaginationIndex = currentPageIndex;
  }
  getPaginationState(){
    return this.currentPaginationIndex;
  }

  setFilterState(searchTerm){
    this.currentFilterTerm = searchTerm;
  }
  getFilterState(){
    return this.currentFilterTerm;
  }
  
  setComponentHistory(currentComponent){
    if (currentComponent === 'TableServerSideComponent'){
      this.componentsHistory.currentComponent = currentComponent;
    } else {
      this.componentsHistory.previousComponent = this.componentsHistory.currentComponent;
      this.componentsHistory.currentComponent = currentComponent;
    }
  }
  getComponentHistory(){
    return this.componentsHistory;
  }

  // for emitting boolean value to determine whether to reset page based on state
  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  emitResetValue(val: boolean) {
    this.messageSource.next(val)
  }

  setResetPageBool(val){
    this.resetPageBool = val;
  }
  getResetPageBool(){
    return this.resetPageBool;
  }
}
