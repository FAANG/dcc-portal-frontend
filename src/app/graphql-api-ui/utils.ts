import { indexDetails } from "./constants"

export const buildFormBuilderFromIndexDetails = (indexName:string)=>{
    const {fields} = indexDetails[indexName];

    return fields.reduce((formBuilderObject,field)=>({
        ...formBuilderObject,
        [field] : [''],
    }),{})
}