export const indexDetails = {
    'analysis' : {
        primaryKeys : ['accession'],
        queryMultipleDocumentsResolverName : 'allAnalysis',
        possibleRightIndicesForJoin : ['experiment','specimen'],
        fields : ['accession','project']
    },
    'article' : {
        primaryKeys : ['pmcId','pubmedId'],
        queryMultipleDocumentsResolverName : 'allArticles',
    },
    'experiment' : {
        primaryKeys : ['accession'],
        queryMultipleDocumentsResolverName : 'allExperiments',
        possibleRightIndicesForJoin : ['analysis','dataset']
    },
    'dataset' : {
        primaryKeys : ['accession'],
        queryMultipleDocumentsResolverName : 'allDatasets',
    },
    'file' : {
        primaryKeys : ['_id'],
        queryMultipleDocumentsResolverName : 'allFiles',
    },
    'organism' : {
        primaryKeys : ['biosampleId'],
        queryMultipleDocumentsResolverName : 'allOrganisms',
    },
    'specimen' : {
        primaryKeys : ['biosampleId'],
        queryMultipleDocumentsResolverName : 'allSpecimens',
    },
    'protocol_analysis' : {
        primaryKeys : ['key'],
        queryMultipleDocumentsResolverName : 'allProtocolAnalysis',
    },
    'protocol_samples' : {
        primaryKeys : ['key'],
        queryMultipleDocumentsResolverName : 'allProtocolSamples',
    },
    'protocol_files' : {
        primaryKeys : ['key'],
        queryMultipleDocumentsResolverName : 'allProtocolFiles',
    },
}