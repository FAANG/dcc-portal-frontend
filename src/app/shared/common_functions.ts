export function replaceUnderscoreWithSpace(data) {
  if (data.indexOf('_') !== -1) {
    return data.split('_').join(' ');
  } else {
    return data;
  }
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

export function allowMultiple(rule: any) {
  if (rule && rule['allow_multiple'] === 1) {
    return 'Yes';
  } else {
    return 'No';
  }
}

export function getValidItems(rule: any, section_name: string) {
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
  return ols_prefix + ontology_name + '/terms?iri=' + term_iri;
}

export function getMandatoryRulesOnly(data: any) {
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
    link = 'https://hx.fire.sdo.ebi.ac.uk/fire/public/faang' + url.split('ftp.faang.ebi.ac.uk')[1];
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
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
