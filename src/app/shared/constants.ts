export const male_values = ['male', 'male genotypic sex', 'intact male', 'M', 'Male'];
export const female_values = ['female', 'female genotypic sex', 'intact female', 'F', 'Female'];

export const external_ena_prefix = 'https://www.ebi.ac.uk/ena/browser/view/';
export const external_ols_prefix = 'https://www.ebi.ac.uk/ols/terms?iri=';
export const external_biosample_prefix = 'https://www.ebi.ac.uk/biosamples/samples/';
export const external_epmc_prefix = 'http://europepmc.org/search?query=';
export const external_pubmed_prefix = 'https://www.ncbi.nlm.nih.gov/pubmed/';
export const external_doi_prefix = 'https://doi.org/';
export const ruleset_prefix_old = 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/rulesets/';
export const ruleset_prefix_new = 'https://raw.githubusercontent.com/FAANG/dcc-metadata/switch_to_json-schema/json_schema/';

// export const validation_service_url = 'https://data.faang.org/validation_api';
export const validation_service_url_download = 'http://data.faang.org/validation_api';
// export const validation_ws_url = 'wss://data.faang.org/validation_ws/ws/submission/';

export const validation_service_url = 'http://localhost:8000';
export const validation_ws_url = 'ws://localhost:8000/ws/submission/';

export const internal_organism = '../organism/';
export const internal_specimen = '../specimen/';
export const internal_dataset = '../dataset/';

export const record_type = ['core', 'type', 'custom'];
export const issue_type = ['errors', 'warnings'];

export const sample_metadata_template_with_examples = '../../assets/with_examples/faang_sample.xlsx';
export const experiment_metadata_template_with_examples = '../../assets/with_examples/faang_experiment.xlsx';
export const analysis_metadata_template_with_examples = '../../assets/with_examples/faang_analysis.xlsx';

export const sample_metadata_template_without_examples = '../../assets/empty/faang_sample.xlsx';
export const experiment_metadata_template_without_examples = '../../assets/empty/faang_experiment.xlsx';
export const analysis_metadata_template_without_examples = '../../assets/empty/faang_analysis.xlsx';

export const missing_values = ['not applicable', 'not collected', 'not provided', 'restricted access'];
export const special_sheets = ['describedBy', 'schema_version', 'samples_core'];
