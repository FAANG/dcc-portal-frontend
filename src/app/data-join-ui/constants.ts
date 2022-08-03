export const indexData = {
    'analysis':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['article','dataset','experiment','specimen'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allAnalysis',
    },
    'article':{
        primaryKeys : ['pmcId','pubmedId'],
        possibleRightJoinIndices : ['analysis','dataset','file','specimen'],
        fields : ['pmcId', 'pubmedId'],
        multipleRecordsResolverFieldName : 'allArticles',
    },
    'dataset':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','article','experiment','file','organism','specimen'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allDatasets',
    },
    'experiment':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','dataset','file'],
        fields : ['accession', 'libraryName'],
        multipleRecordsResolverFieldName : 'allExperiments', 
    },
    'file':{
        primaryKeys : ['_id'],
        possibleRightJoinIndices : ['article','dataset','experiment','organism','specimen','protocol_files','protocol_samples'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allFiles',
    },
    'organism':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['file','specimen','protocol_samples'],
        fields : ['accession', 'alias', 'project','organism.some.text','organism.some.unit'],
        multipleRecordsResolverFieldName : 'allOrganisms',
    },
    'specimen':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['analysis', 'article', 'dataset', 'file', 'protocol_samples', 'derived_from_organism', 'derived_from_specimen', 'derives_specimen_sample'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allSpecimens',
    },
    'protocol_analysis':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['analysis'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allProtocolAnalysis',
    },
    'protocol_files':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allProtocolFiles',
    },
    'protocol_samples':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file','organism','specimen'],
        fields : ['accession', 'alias', 'project'],
        multipleRecordsResolverFieldName : 'allProtocolSamples',
    },
}

indexData['derives_specimen_sample'] = {...indexData['specimen']};
indexData['derived_from_specimen'] = {...indexData['specimen']};
indexData['derived_from_organism'] = {...indexData['organism']};


export const getObjectValueFromPath = (obj:Record<any,any>,path:string[])=>{
    let value = {...obj};
    for(let key of path){
        value =  value[key]
    }
    return value;
}

export const makeNestedObjectFromStringPath = (path:string,value:any)=>{
    const obj = {};
    let prevKey = '';
    for(let key of path.split('.').reverse()){
        obj[key] = value;
        if(prevKey){
            delete obj[prevKey];
        }
        value = {...obj};
        prevKey = key;
    }

    return value;
}

export const cleanObject=(object) =>{
    Object
        .entries(object)
        .forEach(([k, v]:[any,any]) => {
            if (v && typeof v === 'object')
                cleanObject(v);
            if (
                v && 
                typeof v === 'object' && 
                !Object.keys(v).length || 
                v === null || 
                v === undefined ||
                v === false ||
                v.length === 0
            ) {
                if (Array.isArray(object))
                    object.splice(Number(k), 1);
                else if (!(v instanceof Date))
                    delete object[k];
            }
        });
    return object;
}