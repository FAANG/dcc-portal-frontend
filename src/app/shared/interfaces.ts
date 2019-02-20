export interface SortParams {
  id: string;
  direction: string;
}

export interface FileTable {
  fileName: string;
  study: string;
  experiment: string;
  species: string;
  assayType: string;
  specimen: string;
  instrument: string;
  standard: string;
  paperPublished: string;
}

export interface OrganismTable {
  bioSampleId: string;
  sex: string;
  organism: string;
  breed: string;
  standard: string;
  idNumber: number;
  paperPublished: string;
}

export interface SpecimenTable {
  bioSampleId: string;
  material: string;
  organismpart_celltype: string;
  sex: string;
  organism: string;
  breed: string;
  standard: string;
  idNumber: number;
  paperPublished: string;
}

export interface DatasetTable {
  datasetAccession: string;
  title: string;
  species: string;
  archive: string;
  assayType: string;
  numberOfExperiments: string;
  numberOfSpecimens: string;
  numberOfFiles: string;
  standard: string;
  paperPublished: string;
}

export interface ProtocolFile {
  name: string;
  experimentTarget: string;
  assayType: string;
  key: string;
}

export interface ProtocolSample {
  key: string;
  protocol_name: string;
  university_name: string;
  protocol_date: string;
  protocol_type: string;
}

export interface ArticleTable {
  pubmedId: string;
  publicationYear: string;
  journal: string;
  citations: string;
}
