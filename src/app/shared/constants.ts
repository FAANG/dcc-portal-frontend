export const male_values = ['male', 'male genotypic sex', 'intact male', 'M', 'Male'];
export const female_values = ['female', 'female genotypic sex', 'intact female', 'F', 'Female'];

export const external_ena_prefix = 'https://www.ebi.ac.uk/ena/browser/view/';
export const external_ols_prefix = 'https://www.ebi.ac.uk/ols/terms?iri=';
export const ruleset_prefix = 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/rulesets/';
export const ols_prefix = 'https://www.ebi.ac.uk/ols/ontologies/';

export const internal_organism = '../organism/';
export const internal_specimen = '../specimen/';
export const internal_dataset = '../dataset/';

export const sample_metadata_template = 'https://www.ebi.ac.uk/seqdb/confluence/download/attachments/36769258/' +
  'faang_sample_metadata_empty_template_20181212.xlsx?version=1&modificationDate=1544608044067&api=v2';
export const sample_metadata_template_with_examples = 'https://www.ebi.ac.uk/seqdb/confluence/download/attachments/36769258/' +
  'faang_sample_metadata_examples_macleod_horses_20181212.xlsx?version=1&modificationDate=1544608044177&api=v2';
export const experiment_metadata_template = 'https://www.ebi.ac.uk/seqdb/confluence/download/attachments/38273982/' +
  'faang_experiment_metadata_empty_template_20190723.xlsx?version=2&modificationDate=1563977871917&api=v2';
export const experiment_metadata_template_with_examples = 'https://www.ebi.ac.uk/seqdb/confluence/download/attachments/38273982/' +
  'faang_experiment_metadata_examples_roslin_20190723.xlsx?version=2&modificationDate=1563977889833&api=v2';

export function convertToSnakeCase(id: string) {
  return id.replace(/\s+/g, '_');
}

export function allowMultiple(rule: any) {
  if (rule && rule['allow_multiple'] === 1) {
    return 'Yes';
  } else {
    return 'No';
  }
}

export function getValidItems(rule: any, section_name: string) {
  if (rule[section_name]) {
    return rule[section_name].map(function(el) {
      return '"' + el + '"';
    }).join(', ');
  }
}

export function getOntologyTerm(link: string) {
  return link.split('/').slice(-1)[0];
}

export function generateEbiOntologyLink(ontology_name, term_iri) {
  return ols_prefix + ontology_name + '/terms?iri=' + term_iri;
}

export function getMandatoryData(data: any) {
  const data_to_return = {};
  data_to_return['description'] = data['description'];
  data_to_return['name'] = data['name'];
  data_to_return['further_details_iri'] = data['further_details_iri'];
  data_to_return['rule_groups'] = [];
  for (const rule of data['rule_groups']) {
    const tmp = {};
    tmp['name'] = rule['name'];
    tmp['consistency_check'] = rule['consistency_check'];
    tmp['imports'] = rule['imports'];
    tmp['condition'] = rule['condition'];
    tmp['rules'] = [];
    for (const el of rule['rules']) {
      if (el['mandatory'] === 'mandatory') {
        tmp['rules'].push(el);
      }
    }
    data_to_return['rule_groups'].push(tmp);
  }
  return data_to_return;
}
