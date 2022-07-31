export const indexData = {
    'analysis':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'article':{
        primaryKeys : ['pmcId','pubmedId'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'dataset':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'experiment':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','specimen'],
    },
    'file':{
        primaryKeys : ['_id'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'organism':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'specimen':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'protocol_analysis':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'protocol_files':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
    'protocol_samples':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['experiment','specimen'],
    },
}