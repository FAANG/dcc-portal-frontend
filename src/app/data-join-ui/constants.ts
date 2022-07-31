export const indexData = {
    'analysis':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['article','dataset','experiment','specimen'],
    },
    'article':{
        primaryKeys : ['pmcId','pubmedId'],
        possibleRightJoinIndices : ['analysis','dataset','file','specimen'],
    },
    'dataset':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','article','experiment','file','organism','specimen'],
    },
    'experiment':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','dataset','file'],    
    },
    'file':{
        primaryKeys : ['_id'],
        possibleRightJoinIndices : ['article','dataset','experiment','organism','specimen','protocol_files','protocol_samples'],
    },
    'organism':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['file','specimen','protocol_samples'],
    },
    'specimen':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['analysis', 'article', 'dataset', 'file', 'protocol_samples', 'derived_from_organism', 'derived_from_specimen', 'derives_specimen_sample'],
    },
    'protocol_analysis':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['analysis'],
    },
    'protocol_files':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file'],
    },
    'protocol_samples':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file','organism','specimen'],
    },
}