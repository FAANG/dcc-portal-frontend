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
  target: string;
  specimen: string;
  instrument: string;
  standard: string;
  paperPublished: string;
}

export interface FileForProjectTable {
  name: string;
  fileId: string;
  experiment: string;
  assayType: string;
  experimentTarget: string;
  run: string;
  readableSize: string;
  checksum: string;
  checksumMethod: string;
  private: boolean;
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

export interface OrganismForProjectTable {
  bioSampleId: string;
  sex: string;
  organism: string;
  breed: string;
  private: boolean;
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

export interface SpecimenForProjectTable {
  bioSampleId: string;
  material: string;
  organismpart_celltype: string;
  sex: string;
  organism: string;
  breed: string;
  private: boolean;
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
  private: boolean;
}

export interface AnalysisTable {
  accession: string;
  datasetAccession: string;
  title: string;
  species: string;
  assayType: string;
  analysisType: string;
  standard: string;
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
export interface ProtocolAnalysis {
  key: string;
  protocol_name: string;
  university_name: string;
  protocol_date: string;
  protocol_analysis_type: string;
}
export interface ArticleTable {
  id: string;
  title: string;
  year: string;
  journal: string;
  datasetSource: string;
}
