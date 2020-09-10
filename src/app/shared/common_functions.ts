import {EXCLUDED_FIELD_NAMES, FIELD_NAMES} from './fieldnames';

export function replaceUnderscoreWithSpace(data) {
  if (data) {
    if (data.indexOf('_') !== -1) {
      return data.split('_').join(' ');
    } else {
      return data;
    }
  }
}

export function replaceUnderscoreWithSpaceAndCapitalize(data) {
  return data.split('_').map(item => item.charAt(0).toUpperCase() + item.substring(1)).join(' ');
}

export function convertArrayToStr(data: any[], subelement: string): string {
  if (data === undefined || data.length === 0) {
    return '';
  }
  let value = '';
  for (let i = 0; i < data.length; i++) {
    if (subelement === '') {
      value += data[i] + ', ';
    } else {
      if (subelement in data[i]) {
        value += data[i][subelement] + ', ';
      }
    }
  }
  return value.substring(0, value.length - 2);
}

export function allowMultiple(data: any) {
  if ('items' in data) {
    return 'Yes';
  }
  return 'No';
}

export function allowMultipleOld(rule: any) {
  if (rule && rule['allow_multiple'] === 1) {
    return 'Yes';
  } else {
    return 'No';
  }
}

// extract data from given object into a key-value mapping
export function expandObject(data: any, result: any) {
  const type_value = typeof (data);
  // if the given data is not an object, no data can be extracted, just return the existing result
  if (type_value !== 'object') {
    return result;
  }
  //  given data is an object, iterate its key values
  for (const key in data) {
    if (key in FIELD_NAMES) { // known key values
      if (typeof data[key] === 'object') { // some fields have sub elements, like ontologyTerms, units
        for (const secondaryKey in data[key]) {
          if (data[key][secondaryKey] !== '') {
            result[key] = data[key];
          }
        }
      } else {
        if (data[key] !== '') {
          result[key] = data[key];
        }
      }
    } else { // not known key values, could be one of the cases: excluded field name, section name or totally unexpected
      if (key in EXCLUDED_FIELD_NAMES) {
        continue;
      } else {
        result = expandObject(data[key], result);
      }
    }
  }
  return result;
}

export function getValidItems(rule: any, section_name: string) {
  if (rule[section_name]) {
    return rule[section_name]['enum'];
  }
  return '';
}

export function getValidItemsOld(rule: any, section_name: string) {
  if (rule[section_name]) {
    return rule[section_name].map(function (el) {
      return '"' + el + '"';
    }).join(', ');
  }
  return '';
}

export function getOntologyTermFromIRI(iri: string) {
  if (iri.indexOf('/') > -1) {
    return iri.split('/').slice(-1)[0];
  } else {
    return '';
  }
}

export const ols_prefix = 'https://www.ebi.ac.uk/ols/ontologies/';

export function generateEbiOntologyLink(ontology_name, term_iri) {
  let ontology_url;
  if (ontology_name === 'EFO') {
    ontology_url = 'http://www.ebi.ac.uk/efo/';
  } else {
    ontology_url = 'http://purl.obolibrary.org/obo/';
  }
  return ols_prefix + ontology_name + '/terms?iri=' + ontology_url + term_iri.replace(':', '_');
}

export function generateEbiOntologyLinkOld(ontology_name, term_iri) {
  return ols_prefix + ontology_name + '/terms?iri=' + term_iri;
}

export function getMandatoryRulesOnly(data: any) {
  const data_to_return = {
    'properties': {}
  };
  for (const key of Object.keys(data['properties'])) {
    if ('properties' in data['properties'][key] && data['properties'][key]['properties']['mandatory']['const'] === 'mandatory') {
      data_to_return['properties'][key] = data['properties'][key];
    } else if ('items' in data['properties'][key] &&
      data['properties'][key]['items']['properties']['mandatory']['const'] === 'mandatory') {
      data_to_return['properties'][key] = data['properties'][key];
    }
  }
  return data_to_return;
}

export function getMandatoryRulesOnlyOld(data: any) {
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

export function convertToSnakeCase(id: string) {
  return id.replace(/\s+/g, '_');
}

export function getProtocolLink(url) {
  let link: string;
  if (url.indexOf('ftp.faang.ebi.ac.uk') !== -1) {
    link = 'https://data.faang.org/api/fire_api/' + url.split('ftp.faang.ebi.ac.uk/ftp/protocols/')[1];
  } else {
    if (url.split('//')[0] === 'ftp:') {
      link = 'http://' + url.split('//')[1];
    } else {
      link = url;
    }
  }
  return link;
}

export function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getIssues(issues_list, issue_type) {
  issues_list = issues_list.length;
  if (issues_list === 0) {
    return 'pass';
  } else {
    if (issues_list === 1) {
      return issues_list + ' ' + issue_type;
    } else {
      return issues_list + ' ' + issue_type + 's';
    }
  }
}

export function getCellClass(issues_list, issue_type) {
  issues_list = issues_list.length;
  if (issues_list === 0) {
    return '';
  } else {
    if (issue_type === 'warning') {
      return 'table-warning';
    } else {
      return 'table-danger';
    }
  }
}

