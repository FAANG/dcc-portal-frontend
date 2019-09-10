export const male_values = ['male', 'male genotypic sex', 'intact male', 'M', 'Male'];
export const female_values = ['female', 'female genotypic sex', 'intact female', 'F', 'Female'];

export const external_ena_prefix = 'https://www.ebi.ac.uk/ena/browser/view/';
export const external_ols_prefix = 'https://www.ebi.ac.uk/ols/terms?iri=';

export const internal_organism = '../organism/';
export const internal_specimen = '../specimen/';
export const internal_dataset = '../dataset/';

export function removeSpaces(id: string) {
  return id.split(' ').join('_');
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

export function getLink(link: string) {
  return link.split('/').slice(-1)[0];
}

export function getCondition(condition: any) {
  if (condition['attribute_value_match']['Material'].length === 1) {
    return ' Material is "' + condition['attribute_value_match']['Material'][0] + '"';
  } else {
    let str_to_return = ' Material is one of ';
    for (const el of condition['attribute_value_match']['Material']) {
      str_to_return += '"' + el + '" ';
    }
    return str_to_return;
  }
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
