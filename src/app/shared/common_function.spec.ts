
import {
  replaceUnderscoreWithSpace,
  replaceUnderscoreWithSpaceAndCapitalize,
  convertArrayToStr,
  allowMultipleOld,
  allowMultiple,
  getValidItemsOld,
  getValidItems,
  getOntologyTermFromIRI,
  generateEbiOntologyLinkOld,
  generateEbiOntologyLink,
  getMandatoryRulesOnlyOld,
  getMandatoryRulesOnly,
  convertToSnakeCase,
  getProtocolLink,
  expandObject,
  getCellClass,
  getIssues
} from './common_functions';
import { TestBed } from '@angular/core/testing';
import {EXCLUDED_FIELD_NAMES, FIELD_NAMES} from './fieldnames';
import { exception } from 'console';

describe('common functions', () => {
  it ('replaceUnderscoreWithSpace replace underscore with space', () => {
    expect(replaceUnderscoreWithSpace('one_Two_three')).toEqual('one Two three');
  });

  it ('replaceUnderscoreWithSpace does nothing with single word', () => {
    expect(replaceUnderscoreWithSpace('word')).toEqual('word');
  });

  it ('replaceUnderscoreWithSpace replace multiple underscores with same number of spaces', () => {
    expect(replaceUnderscoreWithSpace('_one__Two___three')).toEqual(' one  Two   three');
  });

  it ('should replace underscores with spaces and capitalize starting letter of words', () => {
    expect(replaceUnderscoreWithSpaceAndCapitalize('_one__Two___three')).toEqual(' One  Two   Three');
  });

  it ('convertArrayToStr should return empty string on undefined parameter', () => {
    // tslint:disable-next-line:prefer-const
    let data;
    expect(convertArrayToStr(data, '')).toEqual('');
  });

  it ('convertArrayToStr should return empty string on empty array', () => {
    const data = [];
    expect(convertArrayToStr(data, '')).toEqual('');
  });

  it('convertArrayToStr should return string representation of array without subelement', () => {
    const data = ['test1', 'test2'];
    expect(convertArrayToStr(data, '')).toEqual('test1, test2');
  });

  it('convertArrayToStr should return string representation of array with subelement', () => {
    const data = [{'text': 'abc'}, {'text': 'efg'}];
    expect(convertArrayToStr(data, 'text')).toEqual('abc, efg');
  });

  it('convertArrayToStr should return string representation of array with subelement, some may not having subelement', () => {
    const data = [{'text': 'abc'}, {'txt': 'efg'}];
    expect(convertArrayToStr(data, 'text')).toEqual('abc');
  });

  it('allowMultiple should return Yes when items present', () => {
    const rule = {'items': ['abc']};
    expect(allowMultiple(rule)).toEqual('Yes');
  });

  it('allowMultiple should return No when items not present', () => {
    const rule = {'text': 'abc'};
    expect(allowMultiple(rule)).toEqual('No');
  });

  it('allowMultipleOld should return No when allow_multiple attribute is not present', () => {
    const rule = {'text': 'abc', 'ontology': 'efg'};
    expect(allowMultipleOld(rule)).toEqual('No');
  });

  it('allowMultipleOld should return No when allow_multiple equal to 0', () => {
    const rule = {'allow_multiple': 0, 'text': 'efg'};
    expect(allowMultipleOld(rule)).toEqual('No');
  });

  it('allowMultipleOld should return Yes when allow_multiple equal to 1', () => {
    const rule = {'allow_multiple': 1, 'text': 'efg'};
    expect(allowMultipleOld(rule)).toEqual('Yes');
  });

  it('expandObject should assign right values to experiment', () => {
    const data = {
      standardMet: 'Legacy',
      accession: 'SRX339479',
      assayType: 'whole genome sequencing assay',
      experimentTarget: 'input DNA',
      chipSeq: {
        chipTarget: 'H3K27me3'
      },
      secondaryProject: ''
    };
    const just_a_string = 'string value';
    const just_a_number = 600;
    const expected = {
      assayType: 'whole genome sequencing assay',
      experimentTarget: 'input DNA',
      chipTarget: 'H3K27me3'
    };
    let result: any = {};
    result = expandObject(just_a_string, result);
    expect(Object.keys(result).length).toEqual(0);
    result = expandObject(just_a_number, result);
    expect(Object.keys(result).length).toEqual(0);
    result = expandObject(data, result);
    expect(result).toEqual(expected);
  });

  it('getValidItemsOld should return empty string when the required element is not present', () => {
    const rule = {'value': 15, 'description': 'hahahaha'};
    expect(getValidItemsOld(rule, 'valid')).toEqual('');
  });

  it('getValidItemsOld should return comma separated string with element wrapped with double quote ' +
    'when the required element is present', () => {
    const rule = {'value': 15, 'description': 'hahahaha', 'allowed': ['YYYY', 'YYYY-MM']};
    expect(getValidItemsOld(rule, 'allowed')).toEqual('"YYYY", "YYYY-MM"');
  });

  it('getValidItems should return empty string when the required element is not present', () => {
    const rule = {'value': 15};
    expect(getValidItems(rule, 'valid')).toEqual('');
  });

  it('getValidItems should return appropriate value when the required element is present', () => {
    const rule = {'value': {'enum': 'val1, val2, val3'}};
    expect(getValidItems(rule, 'value')).toEqual('val1, val2, val3');
  });

  it('getOntologyTermFromIRI should return short term which is expected to at the end of iri string', () => {
    expect(getOntologyTermFromIRI('http://purl.obolibrary.org/obo/UBERON_0001037')).toEqual('UBERON_0001037');
  });

  it('getOntologyTermFromIRI should return empty string if invalid iri provided 1', () => {
    expect(getOntologyTermFromIRI('http://purl.obolibrary.org/obo/')).toEqual('');
  });

  it('getOntologyTermFromIRI should return empty string if invalid iri provided 2', () => {
    expect(getOntologyTermFromIRI('just a string')).toEqual('');
  });

  it('convertToSnakeCase should replace all spaces with underscores', () => {
    expect(convertToSnakeCase('original value string')).toEqual('original_value_string');
  });

  it('convertToSnakeCase should replace consecutive spaces with singe underscore', () => {
    expect(convertToSnakeCase('original   value   string')).toEqual('original_value_string');
  });

  it('convertToSnakeCase should return the string itself if no space within the string 1', () => {
    expect(convertToSnakeCase('original__value')).toEqual('original__value');
  });

  it('convertToSnakeCase should return the string itself if no space within the string 2', () => {
    expect(convertToSnakeCase('originalValue')).toEqual('originalValue');
  });

  it('combine convertToSnakeCase and replaceUnderscoreWithSpace to replace consecutive spaces with single space', () => {
    expect(replaceUnderscoreWithSpace(convertToSnakeCase('original   Value  string'))).toEqual('original Value string');
  });

  it('getMandatoryRulesOnlyOld returns mandatory rules only', () => {
    const rules = {
      'description': 'test',
      'name': 'test rule set',
      'rule_groups': [
        {
          'name': 'standard',
          'rules': [
            {
              'mandatory': 'mandatory',
              'name': 'spaceship type',
              'description': 'The type of spaceship',
              'type': 'text',
              'valid_values': [
                'battleship',
                'transporter'
              ]
            },
            {
              'mandatory': 'optional',
              'name': 'build year',
              'description': 'the year when the spaceship was built',
              'type': 'text'
            },
            {
              'mandatory': 'mandatory',
              'name': 'crew number',
              'description': 'the minimum number of crews to operate the spaceship',
              'type': 'number',
              'valid_units': [
                'people'
              ]
            }
          ]
        },
        {
          'condition': {
            'attribute_value_match': {
              'spaceship type': [
                'transporter'
              ]
            }
          },
          'name': 'transporter',
          'rules': [
            {
              'mandatory': 'optional',
              'name': 'capacity',
              'description': 'the weight of cargo the transporter can transport',
              'type': 'number',
              'valid_units': [
                't',
                'kg'
              ]
            }
          ]
        }
      ]
    };
    const mandatory_rules = getMandatoryRulesOnlyOld(rules);
    expect(rules['rule_groups'].length).toEqual(2);
    expect(mandatory_rules['rule_groups'].length).toEqual(2);
    expect(rules['rule_groups'][0]['rules'].length).toEqual(3);
    expect(mandatory_rules['rule_groups'][0]['rules'].length).toEqual(2);
    expect(rules['rule_groups'][1]['rules'].length).toEqual(1);
    expect(mandatory_rules['rule_groups'][1]['rules'].length).toEqual(0);
  });

  it('getMandatoryRulesOnly returns mandatory rules only', () => {
    const rules = {
      "title": "Sample core metadata rules",
      "properties": {
        "schema_version": {
          "type": "string"
        },
        "project": {
          "type": "object",
          "name": "Project",
          "properties": {
            "value": {
              "const": "FAANG"
            },
            "mandatory": {
              "const": "mandatory"
            }
          }
        },
        "secondary_project": {
          "name": "Secondary project",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string",
                "enum": ["AQUA-FAANG", "GENE-SWitCH", "BovReg"]
              },
              "mandatory": {
                "const": "mandatory"
              }
            }
          }
        },
        "availability": {
          "type": "object",
          "name": "Availability",
          "properties": {
            "value": {
              "type": "string",
              "format": "uri"
            },
            "mandatory": {
              "const": "optional"
            }
          }
        }
      }
    };
    const mandatory_rules = getMandatoryRulesOnly(rules);
    expect(mandatory_rules['properties']['schema_version']).toBeUndefined();
    expect(mandatory_rules['properties']['project']).toBeDefined();
    expect(mandatory_rules['properties']['secondary_project']).toBeDefined();
    expect(mandatory_rules['properties']['availability']).toBeUndefined();
  });

  it('generateEbiOntologyLinkOld test 1', () => {
    expect(generateEbiOntologyLinkOld('uberon', 'http://purl.obolibrary.org/obo/UBERON_0001037')).
    toEqual('https://www.ebi.ac.uk/ols/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/UBERON_0001037');
  });

  it('generateEbiOntologyLinkOld test 2 with efo slightly different iri pattern', () => {
    expect(generateEbiOntologyLinkOld('efo', 'http://www.ebi.ac.uk/efo/EFO_0003924')).
    toEqual('https://www.ebi.ac.uk/ols/ontologies/efo/terms?iri=http://www.ebi.ac.uk/efo/EFO_0003924');
  });

  it('generateEbiOntologyLinkOld test 3', () => {
    expect(generateEbiOntologyLinkOld('ncbitaxon', 'http://purl.obolibrary.org/obo/NCBITaxon_9823')).
    toEqual('https://www.ebi.ac.uk/ols/ontologies/ncbitaxon/terms?iri=http://purl.obolibrary.org/obo/NCBITaxon_9823');
  });

  it('generateEbiOntologyLink test 1', () => {
    expect(generateEbiOntologyLink('uberon', 'UBERON_0001037')).
    toEqual('https://www.ebi.ac.uk/ols/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/UBERON_0001037');
  });

  it('generateEbiOntologyLink test 2 with efo slightly different iri pattern', () => {
    expect(generateEbiOntologyLink('EFO', 'EFO_0003924')).
    toEqual('https://www.ebi.ac.uk/ols/ontologies/EFO/terms?iri=http://www.ebi.ac.uk/efo/EFO_0003924');
  });

  it('getProtocolLink should return correct link when uses old firebase server with http in url', () => {
    expect(getProtocolLink('https://ftp.faang.ebi.ac.uk/ftp/protocols/samples/test.pdf'))
      .toEqual('https://data.faang.org/api/fire_api/samples/test.pdf');
  });

  it('getProtocolLink should return correct link when uses old firebase server with ftp in url', () => {
    expect(getProtocolLink('ftp://ftp.faang.ebi.ac.uk/ftp/protocols/samples/test.pdf'))
      .toEqual('https://data.faang.org/api/fire_api/samples/test.pdf');
  });

  it('getProtocolLink should return the same link when does not use old fire server', () => {
    expect(getProtocolLink('https://test.com/test/test.pdf'))
      .toEqual('https://test.com/test/test.pdf');
  });

  it('getProtocolLink should return https when using ftp in url', () => {
    expect(getProtocolLink('ftp://test.com'))
      .toEqual('http://test.com');
  });

  it('should return correct cell class', () => {
    expect(getCellClass([], 'warning')).toEqual('');
    expect(getCellClass(['issue1'], 'warning')).toEqual('table-warning');
    expect(getCellClass(['issue2'], 'error')).toEqual('table-danger');
  });

  it('should return correct issue', () => {
    expect(getIssues([], 'warning')).toEqual('pass');
    expect(getIssues(['issue1'], 'warning')).toEqual('1 warning');
    expect(getIssues(['issue1', 'issue2'], 'error')).toEqual('2 errors');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
