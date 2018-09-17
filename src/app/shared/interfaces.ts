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
}

export interface OrganismTable {
  bioSampleId: string;
  sex: string;
  organism: string;
  breed: string;
  standard: string;
}

export interface SpecimenTable {
  bioSampleId: string;
  material: string;
  organismpart_celltype: string;
  sex: string;
  organism: string;
  breed: string;
  standard: string;
}

export interface DatasetTable {
  datasetAccession: string;
  title: string;
  species: string;
  archive: string;
  numberOfExperiments: string;
  numberOfSpecimens: string;
  numberOfFiles: string;
  standard: string;
}
