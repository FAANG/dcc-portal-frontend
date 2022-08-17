export const indexData = {
    'analysis':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['article','dataset','experiment','specimen'],
        fields : [
            "accession",
            "project",
            "secondaryProject",
            "title",
            "alias",
            "description",
            "standardMet",
            "versionLastStandardMet",
            "releaseDate",
            "updateDate",
            "organism.text",
            "organism.ontologyTerms",
            "type",
            "datasetAccession",
            "datasetInPortal",
            "sampleAccessions",
            "experimentAccessions",
            "runAccessions",
            "analysisAccessions",
            "files.name",
            "files.url",
            "files.type",
            "files.size",
            "files.checksumMethod",
            "files.checksum",
            "analysisDate.text",
            "analysisDate.unit",
            "assayType",
            "analysisProtocol.url",
            "analysisProtocol.filename",
            "analysisType",
            "referenceGenome",
            "analysisCenter",
            "analysisCodeRepository",
            "experimentType",
            "program",
            "platform",
            "imputation"
        ],
        multipleRecordsResolverFieldName : 'allAnalysis',
    },
    'article':{
        primaryKeys : ['pmcId','pubmedId'],
        possibleRightJoinIndices : ['analysis','dataset','file','specimen'],
        fields : [
            'pmcId', 'pubmedId',
            "pmcId",
            "pubmedId",
            "doi",
            "title",
            "authorString",
            "journal",
            "issue",
            "volume",
            "year",
            "pages",
            "isOpenAccess",
            "datasetSource",
            "relatedDatasets.accession",
            "relatedDatasets.standardMet",
            "relatedDatasets.species",
            "secondaryProject"
        
        ],
        multipleRecordsResolverFieldName : 'allArticles',
    },
    'dataset':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','article','experiment','file','organism','specimen'],
        fields : [
            'accession', 'alias', 'project',
            "accession",
            "standardMet",
            "secondaryProject",
            "title",
            "alias",
            "assayType",
            "tech",
            "secondaryAccession",
            "archive",
            "specimen.biosampleId",
            "specimen.material.text",
            "specimen.material.ontologyTerms",
            "specimen.cellType.text",
            "specimen.cellType.ontologyTerms",
            "specimen.organism.text",
            "specimen.organism.ontologyTerms",
            "specimen.sex.text",
            "specimen.sex.ontologyTerms",
            "specimen.breed.text",
            "specimen.breed.ontologyTerms",
            "species.text",
            "species.ontologyTerms",
            "releaseDate",
            "updateDate",
            "file.url",
            "file.name",
            "file.fileId",
            "file.experiment",
            "file.type",
            "file.size",
            "file.readableSize",
            "file.archive",
            "file.readCount",
            "file.baseCount",
            "file.checksumMethod",
            "file.checksum",
            "experiment.accession",
            "experiment.target",
            "experiment.assayType",
            "instrument",
            "centerName",
            "paperPublished",
            "publishedArticles.articleId",
            "publishedArticles.title",
            "publishedArticles.year",
            "publishedArticles.journal",
            "submitterEmail"
        
        ],
        multipleRecordsResolverFieldName : 'allDatasets',
    },
    'experiment':{
        primaryKeys : ['accession'],
        possibleRightJoinIndices : ['analysis','dataset','file'],
        fields : [
            "accession",
            "project",
            "secondaryProject",
            "assayType",
            "experimentTarget",
            "standardMet",
            "versionLastStandardMet",
            "libraryName",
            "sampleStorage",
            "sampleStorageProcessing",
            "samplingToPreparationInterval.text",
            "samplingToPreparationInterval.unit",
            "experimentalProtocol.url",
            "experimentalProtocol.filename",
            "extractionProtocol.url",
            "extractionProtocol.filename",
            "libraryPreparationLocation",
            "libraryPreparationLocationLongitude.text",
            "libraryPreparationLocationLongitude.unit",
            "libraryPreparationLocationLatitude.text",
            "libraryPreparationLocationLatitude.unit",
            "libraryPreparationDate.text",
            "libraryPreparationDate.unit",
            "sequencingLocation",
            "sequencingLocationLongitude.text",
            "sequencingLocationLongitude.unit",
            "sequencingLocationLatitude.text",
            "sequencingLocationLatitude.unit",
            "sequencingDate.text",
            "sequencingDate.unit",
            "customField.name",
            "customField.value",
            "customField.unit",
            "customField.ontologyTerms",
            //   "ATAC-seq": {
            //     "properties": {
            //       "transposaseProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       }
            //     }
            //   },
            //   "BS-seq": {
            //     "properties": {
            //       "librarySelection": {
            //         "type": "keyword"
            //       },
            //       "bisulfiteConversionProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "pcrProductIsolationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "bisulfiteConversionPercent": {
            //         "type": "keyword"
            //       },
            //       "restrictionEnzyme": {
            //         "type": "keyword"
            //       },
            //       "maxFragmentSizeSelectionRange": {
            //         "type": "keyword"
            //       },
            //       "minFragmentSizeSelectionRange": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "ChIP-seq DNA-binding": {
            //     "properties": {
            //       "chipProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "chipTarget": {
            //         "type": "keyword"
            //       },
            //       "controlExperiment": {
            //         "type": "keyword"
            //       },
            //       "chipAntibodyProvider": {
            //         "type": "keyword"
            //       },
            //       "chipAntibodyCatalog": {
            //         "type": "keyword"
            //       },
            //       "chipAntibodyLot": {
            //         "type": "keyword"
            //       },
            //       "libraryGenerationMaxFragmentSizeRange": {
            //         "type": "keyword"
            //       },
            //       "libraryGenerationMinFragmentSizeRange": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "ChIP-seq input DNA": {
            //     "properties": {
            //       "chipProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "libraryGenerationMaxFragmentSizeRange": {
            //         "type": "keyword"
            //       },
            //       "libraryGenerationMinFragmentSizeRange": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "DNase-seq": {
            //     "properties": {
            //       "dnaseProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       }
            //     }
            //   },
            //   "Hi-C": {
            //     "properties": {
            //       "restrictionEnzyme": {
            //         "type": "keyword"
            //       },
            //       "restrictionSite": {
            //         "type": "keyword"
            //       },
            //       "hi-cProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       }
            //     }
            //   },
            //   "RNA-seq": {
            //     "properties": {
            //       "rnaPreparation3AdapterLigationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "rnaPreparation5AdapterLigationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "libraryGenerationPcrProductIsolationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "preparationReverseTranscriptionProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "libraryGenerationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "readStrand": {
            //         "type": "keyword"
            //       },
            //       "rnaPurity260280ratio": {
            //         "type": "keyword"
            //       },
            //       "rnaPurity260230ratio": {
            //         "type": "keyword"
            //       },
            //       "rnaIntegrityNumber": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "WGS": {
            //     "properties": {
            //       "libraryGenerationPcrProductIsolationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "libraryGenerationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "librarySelection": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "CAGE-seq": {
            //     "properties": {
            //       "cageProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "sequencingPrimerProvider": {
            //         "type": "keyword"
            //       },
            //       "sequencingPrimerCatalog": {
            //         "type": "keyword"
            //       },
            //       "sequencingPrimerLot": {
            //         "type": "keyword"
            //       },
            //       "restrictionEnzymeTargetSequence": {
            //         "type": "keyword"
            //       },
            //       "rnaPurity260280ratio": {
            //         "type": "keyword"
            //       },
            //       "rnaPurity260230ratio": {
            //         "type": "keyword"
            //       },
            //       "rnaIntegrityNumber": {
            //         "type": "keyword"
            //       }
        
        ],
        multipleRecordsResolverFieldName : 'allExperiments', 
    },
    'file':{
        primaryKeys : ['_id'],
        possibleRightJoinIndices : ['article','dataset','experiment','organism','specimen','protocol_files','protocol_samples'],
        fields : [
            'accession', 'alias', 'project',
            "specimen",
            "organism",
            "species.text",
            "species.ontologyTerms",
            "url",
            "name",
            "secondaryProject",
            "type",
            "size",
            "readableSize",
            "checksum",
            "checksumMethod",
            "archive",
            "readCount",
            "baseCount",
            "releaseDate",
            "updateDate",
            "submission",
            "experiment.accession",
            "experiment.target",
            "experiment.assayType",
            "experiment.standardMet",
            "study.accession",
            "study.alias",
            "study.type",
            "study.secondaryAccession",
            "study.title",
            "run.accession",
            "run.alias",
            "run.platform",
            "run.instrument",
            "run.centerName",
            "run.sequencingDate",
            "run.sequencingLocation",
            "run.sequencingLatitude",
            "run.sequencingLongitude",
            "publishedArticles.articleId",
            "publishedArticles.title",
            "publishedArticles.year",
            "publishedArticles.journal",
            "publishedArticles.pubmedId",
            "publishedArticles.doi",
            "submitterEmail"
        ],
        multipleRecordsResolverFieldName : 'allFiles',
    },
    'organism':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['file','specimen','protocol_samples'],
        fields : [
            "biosampleId",
            "id_number",
            "alternativeId",
            "etag",
            "name",
            "description",
            "releaseDate",
            "updateDate",
            "standardMet",
            "versionLastStandardMet",
            "project",
            "secondaryProject",
            "organization.name",
            "organization.role",
            "organization.URL",
            "customField.name",
            "customField.value",
            "customField.unit",
            "customField.ontologyTerms",
            "material.text",
            "material.ontologyTerms",
            "availability",
            "organism.text",
            "organism.ontologyTerms",
            "sex.text",
            "sex.ontologyTerms",
            "breed.text",
            "breed.ontologyTerms",
            "birthDate.text",
            "birthDate.unit",
            "healthStatus.text",
            "healthStatus.ontologyTerms",
            "birthLocation",
            "birthLocationLongitude.text",
            "birthLocationLongitude.unit",
            "birthLocationLatitude.text",
            "birthLocationLatitude.unit",
            "birthWeight.text",
            "birthWeight.unit",
            "placentalWeight.text",
            "placentalWeight.unit",
            "pregnancyLength.text",
            "pregnancyLength.unit",
            "deliveryTiming",
            "deliveryEase",
            "childOf",
            "pedigree",
            "paperPublished",
            "publishedArticles.articleId",
            "publishedArticles.title",
            "publishedArticles.year",
            "publishedArticles.journal"
        ],
        multipleRecordsResolverFieldName : 'allOrganisms',
    },
    'specimen':{
        primaryKeys : ['biosampleId'],
        possibleRightJoinIndices : ['analysis', 'article', 'dataset', 'file', 'protocol_samples', 'derived_from_organism', 'derived_from_specimen', 'derives_specimen_sample'],
        fields : [
            "biosampleId",
              "id_number",
              "alternativeId",
              "etag",
              "name",
              "description",
              "releaseDate",
              "updateDate",
              "standardMet",
              "versionLastStandardMet",
              "project",
              "secondaryProject",
                  "organization.name",
                  "organization.role",
                  "organization.URL",
                  "customField.name",
                  "customField.value",
                  "customField.unit",
                  "customField.ontologyTerms",
                  "material.text",
                  "material.ontologyTerms",
              "derivedFrom",
              "allDeriveFromSpecimens",
              "availability",
              "cellType.text",
            "cellType.ontologyTerms",
            "organism.biosampleId",
            "organism.organism.text",
            "organism.organism.ontologyTerms",
            "organism.sex.text",
            "organism.sex.ontologyTerms",
            "organism.breed.text",
            "organism.breed.ontologyTerms",
            "organism.healthStatus.text",
            "organism.healthStatus.ontologyTerms",
            //   "specimenFromOrganism": {
            //     "properties": {
            //       "specimenFromOrganism.specimenCollectionDate.": {
            //         "properties": {
            //           "specimenFromOrganism.specimenCollectionDate.text": {
            //             "type": "keyword"
            //           },
            //           "specimenFromOrganism.specimenCollectionDate.unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "animalAgeAtCollection": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "developmentalStage": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "healthStatusAtCollection": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "organismPart": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenCollectionProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "fastedStatus": {
            //         "type": "keyword"
            //       },
            //       "numberOfPieces": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenVolume": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenSize": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenWeight": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenPictureUrl": {
            //         "type": "keyword"
            //       },
            //       "gestationalAgeAtSampleCollection": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       }
            //     }
            //   },
            //   "poolOfSpecimens": {
            //     "properties": {
            //       "poolCreationDate": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "poolCreationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenVolume": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenSize": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenWeight": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "specimenPictureUrl": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "cellSpecimen": {
            //     "properties": {
            //       "markers": {
            //         "type": "keyword"
            //       },
            //       "cellType": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "purificationProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       }
            //     }
            //   },
            //   "cellCulture": {
            //     "properties": {
            //       "cultureType": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cellType": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cellCultureProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cultureConditions": {
            //         "type": "keyword"
            //       },
            //       "numberOfPassages": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "cellLine": {
            //     "properties": {
            //       "organism": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "sex": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cellLine": {
            //         "type": "keyword",
            //         "fields": {
            //           "std": {
            //             "type": "text",
            //             "analyzer": "standard"
            //           }
            //         }
            //       },
            //       "biomaterialProvider": {
            //         "type": "keyword"
            //       },
            //       "catalogueNumber": {
            //         "type": "keyword"
            //       },
            //       "numberOfPassages": {
            //         "type": "keyword"
            //       },
            //       "dateEstablished": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "unit": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "publication": {
            //         "type": "keyword"
            //       },
            //       "breed": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cellType": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword"
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "cultureConditions": {
            //         "type": "keyword"
            //       },
            //       "cultureProtocol": {
            //         "properties": {
            //           "url": {
            //             "type": "keyword"
            //           },
            //           "filename": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "disease": {
            //         "properties": {
            //           "text": {
            //             "type": "keyword",
            //             "fields": {
            //               "autocomp": {
            //                 "type": "text",
            //                 "analyzer": "autocomp",
            //                 "search_analyzer": "autocomplete_search"
            //               }
            //             }
            //           },
            //           "ontologyTerms": {
            //             "type": "keyword"
            //           }
            //         }
            //       },
            //       "karyotype": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
            //   "paperPublished": {
            //     "type": "keyword"
            //   },
            //   "publishedArticles": {
            //     "properties": {
            //       "articleId": {
            //         "type": "keyword"
            //       },
            //       "title": {
            //         "type": "keyword"
            //       },
            //       "year": {
            //         "type": "keyword"
            //       },
            //       "journal": {
            //         "type": "keyword"
            //       },
            //       "pubmedId": {
            //         "type": "keyword"
            //       },
            //       "doi": {
            //         "type": "keyword"
            //       }
            //     }
            //   },
              "trackhubUrl"
        ],
        multipleRecordsResolverFieldName : 'allSpecimens',
    },
    'protocol_analysis':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['analysis'],
        fields : [
            'accession', 'alias', 'project',
            "universityName",
            "protocolDate",
            "protocolName",
            "key",
            "url",
            "secondaryProject",
            "analyses.accession",
            "analyses.organism",
            "analyses.datasetAccession",
            "analyses.analysisType"
        ],
        multipleRecordsResolverFieldName : 'allProtocolAnalysis',
    },
    'protocol_files':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file'],
        fields : [
            "name",
            "experimentTarget",
            "assayType",
            "key",
            "url",
            "secondaryProject",
            "filename",
            "experiments.accession",
            "experiments.sampleStorage",
            "experiments.sampleStorageProcessing"
        ],
        multipleRecordsResolverFieldName : 'allProtocolFiles',
    },
    'protocol_samples':{
        primaryKeys : ['key'],
        possibleRightJoinIndices : ['file','organism','specimen'],
        fields : [
            "universityName",
            "protocolDate",
            "protocolName",
            "key",
            "url",
            "secondaryProject",
            "specimens.id",
            "specimens.organismPartCellType",
            "specimens.organism",
            "specimens.breed",
            "specimens.derivedFrom"
        ],
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