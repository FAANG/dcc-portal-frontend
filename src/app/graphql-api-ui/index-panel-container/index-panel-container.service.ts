import { Injectable } from "@angular/core";
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class IndexPanelContainerService{
    public fieldsQueryData = {};
    public filtersQueryData = {};

    private isSingleDocument = true;
    
    
    updateFieldsQueryData(indexName:string,updatedFieldsQueryData:any,indexPath:string[]=[]){
        
        let fieldQueryDataToUpdate = this.fieldsQueryData;
        
            for(let i = 0; i< indexPath.length - 1;i ++ ){
                fieldQueryDataToUpdate = fieldQueryDataToUpdate[indexPath[i]]['join'];
            }
            fieldQueryDataToUpdate[indexName] = {...updatedFieldsQueryData};
            
       
        
    }

    toggleSingleDocument(){
        this.isSingleDocument = !this.isSingleDocument;
    }

    print(index:string){
        console.log('I work ',index)
    }

}