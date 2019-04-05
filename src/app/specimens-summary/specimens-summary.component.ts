import { Component, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-specimens-summary',
  templateUrl: './specimens-summary.component.html',
  styleUrls: ['./specimens-summary.component.css']
})
export class SpecimensSummaryComponent implements OnInit {
  sexData = {'female': 8382, 'male': 7248, 'not determined': 3691};
  paperPublishedData = {'yes': 5321, 'no': 14000};
  organismData = {'Sus scrofa': 3431, 'Bubalus bubalis': 954, 'Ovis aries': 3650, 'Capra hircus': 2230, 'Bos taurus': 5299,
    'Gallus gallus': 2752, 'Equus caballus': 669, 'Bos indicus': 336};
  breeds = {'Duroc': 135, 'Mediterranean': 412, 'Pandharpuri': 401, 'Jafarabadi': 68, 'Bhadawari': 73, 'Texel': 23, 'Alpine': 1199,
    'Holstein': 1849, 'Large White': 1269, 'White Leghorn': 541, 'Texel sire x (Texel sire x Scottish Blackface dam) dam': 88,
    'Texel sire x Scottish Blackface dam': 2210, 'Yorkshire sire x Landrace dam': 20, 'Spanish Churra': 15, 'Spanish Assaf': 15,
    'Thoroughbred': 221, 'chicken breed': 124, 'Hereford (Line 1)': 322, 'Rambouillet': 112,
    'White Leghorn line 6x White Leghorn line 7': 88, 'Brahman': 248, 'Norwegian Red': 72, 'Pietrain': 23, 'German Landrace': 16,
    'Cattle crossbreed': 57, 'Goat crossbreed': 66, 'Yorkshire': 59, 'pig breed': 2, 'Scottish Blackface': 141, 'Nellore': 94,
    'Angus': 346, 'Meishan sire x White Composite dam': 2, None: 1, 'pure bred merino': 11, 'Lohmann Selected Leghorn': 36,
    'Brown Leghorn': 3, 'Sumatra': 7, 'Black Sumatra': 10, 'Kedu Hitam': 10, 'local populations': 233, 'Batagai': 1, 'Sorraia': 2,
    'Hanoverian': 4, '6R': 8, '730_Liver': 1, '541_Liver': 1, 'GM2713': 1, 'GM2741': 1, 'GM2813': 1, 'GM2846': 1, 'GM7452': 1, 'GM7649': 1,
    'Xingyi Bantam chicken': 12, 'Xingyi Bantam chicken embryo': 6, 'Bos taurus turano-mongolicus': 1, 'Feral pig': 2, 'Quarter Horse': 17,
    'Tibetan goat': 21, 'Hereford': 108, 'Village chicken': 12, 'Line Zero': 1, 'Wellcome': 1, 'Australian Merino': 10, 'Araucana': 9,
    'Friesian,JerseyCross': 312, 'Friesian': 134, 'Jersey': 284, 'Cross': 5, 'Bayinbuluke': 10, 'Valley Tibetan': 10, 'Cele Black': 10,
    'EM,JY,LS,MC,MY,PX,SM,TF,AB,DQ,GZ,LZ,QH,SN': 1, 'Hu': 10, 'Wuzhumuqin': 10, 'Oula': 10, 'Tan': 10, 'northeast wild': 3, 'min': 8,
    'Prairie Tibetan': 10, 'Small Tail Han': 9, 'Enshi black': 3, 'Lhasa White E': 1, 'Lhasa White': 1, 'Simmental': 161, 'Charolais': 108,
    'Limousin x Hereford': 3, 'Hereford x Angus': 4, 'Charolais x Angus': 1, 'RedAngus x Simmental': 2, 'Charolais x Hereford': 2,
    'Gelbvieh x Angus': 3, 'Santa Gertrudis': 14, 'Brahman x Angus': 4, 'Maine Anjou': 25, 'Arabian': 6, 'AIL': 1, 'Shetland pony': 9,
    'Inner Mongolia cashmere goat': 60, 'Liaoning cashmere goat': 20, 'HT': 1, 'NY2': 1, 'NX3': 1, 'Lipizzan': 4, 'Standardbred': 30,
    'Warmblood Westphalian': 2, 'Warmblood Holsteiner': 3, 'Warmblood Swiss': 1, 'Morgan Horse': 6, 'Polish Holstein-Friesian': 31,
    'Rongchang': 5, 'Najdei': 3, 'Hary': 3, 'Sichuan indigenous chicken': 1, 'Landrace': 36, 'Inner Mongolia Cashmere': 1, 'Tan sheep': 8,
    'Holstein-Friesian': 139, 'Boer': 1, 'Kiwicross': 320, 'Fayoumi': 1, 'barag sheep': 10, 'Inner Mongolia cashemre goat': 423,
    'short tail sheep': 8, 'Longlin goat Wme01-3': 1, 'Tibet white goat': 1, 'Bange Cashmere Goat': 1, 'biological duplicate 2_3': 1,
    'biological duplicate 2_2': 1, 'Southdown X': 1, 'Beetal Black': 2, 'QG_59_2': 1, 'Raoshan white goat': 1, 'Spain goat SP1': 1,
    'An hui white Goat': 1, 'QG_49_2': 1, 'Lai Wu black goat': 1, 'Yu dong white goat': 1, 'Spain goat SP4': 1, 'Gui shan black goat': 1,
    'Wild-boar': 1, 'Franches Montagnes': 2, 'Noriker': 8, 'Liping': 2, 'Menggu': 2, 'Guanling': 2, 'Dengchuan': 2, 'Dehong': 2,
    'Hasake': 2, 'cashmere goat': 11, 'Tibetan Cattle': 18, 'Lanping': 3, 'Duolang sheep': 2, 'Costeno con Cuernos': 2, 'Limousin': 82,
    'Belgian Blue': 9, 'Black Bengal goat': 4, 'American Standardbred horse': 2, 'Duroc x (Landrace x Yorkshire)': 30,
    'Holstein x Hereford': 9, 'Podolica': 1, 'Sayaguesa': 1, 'Maremmana': 1, 'Pajuna': 1, 'Wannan Black pig': 20, 'Jinhua': 203,
    'Sunit sheep': 2, 'Guizhou wild pig': 1, 'DL (German Landrace)': 17, 'Enshi black pig': 2, 'Holstein Friesian': 8, 'landrace': 12,
    'Japanese black (Wagyu) cattle': 3, 'Bama Xiang': 5, 'Brangus-Angus': 16, 'crossbreed(Duroc*Rongchang)': 9, 'Hucul': 12,
    'Sardinian ewes': 9, 'D05': 48, 'songliao black pigs': 2, 'Broiler': 7, 'Eastern Tibetan': 1, 'Romanov': 10,
    'Crossbred (50% Simmental, 50% Angus)': 2, 'Muturu': 10, 'White Composite': 48, 'MMS': 50, 'MERINO POLLED': 52, 'CA': 53, 'CL': 37,
    'Hampshire': 16, 'L': 37, 'DORSET POLLED': 30, 'Meishan': 36, 'Morada Nova': 2, 'Red Angus': 38, 'MERINO HORNED': 67, 'COMPOSITE': 180,
    'Tibet chicken': 11, 'Red Jungle fowl, inbred line UCD001': 1, 'Gelbvieh': 50, 'D13': 83, 'Bamei': 1, 'PD': 47, 'BH': 25,
    'European domestic pig': 3, 'Kazakh Cattle': 9, 'Timahdite': 16, 'Y': 35, 'MI': 36, 'Composite': 135, "D'man": 30,
    'Asian domestic pig': 5, 'Sardi': 27, 'Red Jungle Fowl': 2, 'B': 16, 'Romagnola': 5, 'P': 20, 'White Leghorn (WL)': 3,
    'JH': 53, "N'Dama": 10, 'Hanwoo': 22, 'Ojalada': 2, 'Dollgellau Welsh Mountain': 1, 'Gulf Coast native': 2, 'SH': 63, 'EH': 31,
    'Karya': 1, 'BORDER LEICESTER': 22, 'Tibetan Yellow Cattle': 9, 'Katahdin': 9, 'SMS': 69, 'Romney cross': 3, 'FJ': 16,
    'Wenshan Cattle': 8, 'Friesian-Jersey cross': 9, 'Cobb/Hubbard F1 hybrids': 4, 'Durocs': 21, 'Piedmontese': 7,
    'Kauai feral chicken': 23, 'Corriente': 4, 'Crossbred (75% Gelbvieh, 25% Limousin)': 1, 'Dorper': 6, 'JX': 29, 'Castellana': 2,
    'Suffolk': 9, 'Cine Capari': 1, 'USMARC Composite': 17, 'SUFFOLK WHITE': 13, 'native chicken': 8, 'Chaidamu Yellow Cattle': 5,
    'Dorset': 11, 'Maine-Anjou': 5, 'mangalica': 3, 'Swiss Mirror': 1, 'Yucatan miniature pig': 12, 'SW': 21, 'Ankole': 10,
    'fighting chicken': 8, 'domestic': 1, 'Luxi Cattle': 5, 'Merino_Horned': 4, 'Merino': 4, 'Yeonsan Ogye': 1, 'Berkshire': 11,
    'Sardinian sheep': 9, 'SUFFOLK BLACKFACE': 2, 'Ethiopian Menz': 1, 'Korean wild boar': 10, 'Salz': 3, 'COOPWORTH': 4, 'Nelore': 1,
    'Valais Blacknose': 1, 'Dorper, white': 4, 'Brangus': 6, 'LX': 16, 'Merino_Polled': 6, 'Beefmaster': 15, 'Ronderib Afrikaner': 2,
    'Indian Garole': 1, 'Navajo-Churro': 1, 'Finn': 10, 'Grey Goats': 1, 'limonero': 9, 'Quarter horse': 5, 'Bamaxiang': 2,
    'Leghorn GB2': 4, 'Fayoumi M43': 4, 'Nubian-Longlin goat, F1': 3, 'Chinese Nubian goat': 3, 'Icelandic': 7, 'Swedish warm blood': 3,
    'Gotland pony': 15, 'Knaubstrupper': 1, 'Mongolian horse': 3, 'Thoroughbred horse': 1, 'American Curly': 2, 'Ardenner': 2, 'Dexter': 2,
    'Hereford miniature': 2, 'holstein': 2, 'Angus lowline': 4, 'Landrace,Large White': 3, 'Pig crossbreed': 4,
    'White Composite sire x Meishan dam': 2, 'Aberdeen Angus': 2, 'Duroc x (Landrace x Large White)': 2, 'Japanese Black': 2, 'WL-G': 3, 'Black Java': 10, 'Rashoki': 8, 'Poll Dorset': 3, 'duelmener': 1, 'GMBC3937': 1, 'GM7826': 1, 'GM7712': 1, '412_Liver': 1, '920_Liver': 1, 'GM2607': 1, 'Tibetan sheep': 22, 'Korean Domestic': 3, 'Chahua chicken': 1, 'Lindian': 1, 'Red Angus x Charolais': 3, 'Limousin x Angus': 1, 'Simmental x Hereford': 1, 'Chi-Angus': 4, 'Simmental x Charolais': 3, 'Shorthorn': 10, 'P2': 1, 'P3': 1, 'QY': 1, 'LS': 1, 'NX1': 1, 'P1': 1, 'Warmblood Trakehner': 2, 'Baden Wuerttemberg': 1, 'Warmblood Oldenburg': 2, 'Swiss Warmblood': 1, 'Noaymi': 3, 'Iberian': 5, 'Beijing Fatty': 7, 'Small tailed han sheep': 1, 'Sichuan indigenous goat': 1, 'Tibetan chicken': 2, 'Taihang Black': 1, 'Arabian Horse': 3, 'Cashmere Goat': 3, 'Short eared Somali': 1, 'Jining Grey Goat': 1, 'Cai da mu goat': 1, 'Longlin goat Wme02-3': 1, 'Xiang dong black goat': 1, 'TG_1': 1, 'Wu zhu mu qin white goat': 1, 'Chengdu Grey Goat': 1, 'QG_57_2': 1, 'QG_50_2': 1, 'Creole': 1, 'Haflinger': 4, 'Shetland Pony': 11, 'domesticated animals': 1, 'Yanbian': 2, 'Wenling': 2, 'Xizang': 2, 'San Martinero': 2, 'Maronesa': 1, 'Large White X Duroc': 4, 'Gushi': 2, 'Laiwu': 2, 'crossbreed(Rongchang*Duroc)': 3, 'Shuxuan': 2, 'Mmilk Lacaune': 1, 'African White Dorper': 2, 'Red Junglefowl': 5, 'Awassi': 3, 'Asia wild': 1, 'DOHNE MERINO': 1, '40_NoIndex_L007_R1_001': 1, 'Afshari': 2, 'Crossbred (50% South Devon, 25% Red Angus, 25% Gelbvieh)': 1, '3_NoIndex_L005_R1_001': 1, 'Ouled Djellal': 8, 'Crossbred (50% Simmental, 37.5% Red Angus, 12.5% Angus)': 1, 'Tregaon Welsh mountain': 1, 'Luxi Game': 1, 'Bangladeshi': 2, 'Sakiz': 2, 'Crossbred (50% Simmental, 50% Red Angus)': 2, 'Beni Guil': 6, 'Arabian horse': 1, 'Mongolian Cattle': 7, 'Gir': 1, 'Korean Oge (KO)': 3, 'Chianina': 4, 'Namaqua Afrikaner': 1, 'Cornish': 1, 'Swiss White Alpine': 4, 'Jiaxian Red Cattle': 5, 'Northern Tibetan': 1, 'LargeWhite': 1, 'Santa InÃªs': 2, 'Dianzhong Cattle': 6, 'Salers': 7, 'Cheviot': 2, 'Faroe pony': 3, 'Belted Galloway': 2, 'Lushi chicken': 2, 'Rhode Island White': 2, '362_Liver': 1, 'GM7860': 1, 'GM7581': 1, 'White leghorn': 2, 'Nanyang': 1, 'Tamworth': 1, 'Yucatan minipig': 1, 'Mongolian sheep': 2, 'Small-tailed Han sheep': 1, 'Line 7': 1, 'pigs': 1, 'Limousin x Simmental': 2, 'Braunveih': 2, 'NY1': 1, 'NY3': 1, 'LH': 1, 'DG': 1, 'South German coldblood': 1, 'Sichuan indigenous cattle': 1, 'Poitou goat': 1, 'Lvliang black goat': 1, 'Gui zhou black goat': 1, 'Ma tou goat': 1, 'Bengal goat': 2, 'Black Bengal': 1, 'biological duplicate 1_2': 1, 'biological duplicate 2_1': 1, 'Longlin goat xme02-6': 1, 'Longlin goat Xme02-1': 1, 'Barbari goat': 1, 'Chengde hornless goat': 1, 'Yimeng black goat': 1, 'Cashmere goat': 1, 'Lei zhou black goat': 1, 'Terry': 1, 'QG_47_3': 1, 'QG_51_3': 1, 'TG_7': 1, 'North Swedish Draft': 2, 'Swedish warmblood': 2, 'Dabieshan': 2, 'Qinchuan': 2, 'Fujian': 2, 'Luxi': 2, 'thoroughbred': 1, 'White Alp Sheep': 2, 'Hu sheep': 1, 'Limia': 1, 'creole': 1, 'TEXEL': 2, 'Tarentaise': 4, 'Daweizi': 1, 'Texas Longhorn': 4, 'Devon': 1, 'Norduz': 2, 'Rong Chang pig': 1, 'Changthangi': 2, 'San Clemente': 1, 'wild boar': 1, 'Meat Lacaune': 1, 'Wenchang': 1, 'Romney': 1, 'Shouguang': 1, 'Braunvieh': 4, 'Min pig': 2, 'Dongxiang': 1, 'Yorkshires': 1, 'Smyth': 1, 'White Plymouth Rock': 2, 'Crossbred (37.5% Gelbvieh, 25% Red Angus, 12.5% Simmental, 12.5% Limousin)': 1, 'Ndama': 1, 'duroc': 1, '24_NoIndex_L006_R1_001': 1, 'Brazilian Creole': 2, 'commercial chicken': 1, 'Jiangsu pig breeds': 1, 'Welsh Hardy Speckled Face': 1, 'Goettingen': 1, 'Brown Suisse': 1, 'Connemara': 4, 'crossbreed': 2, 'ARB3': 1, 'Longlin goat': 2, 'Lippizaner': 1, 'Standardbred horse': 1, 'GMBC1945': 1, 'GMBC1998': 1, '747_Liver': 1, 'Herford': 1, 'Line 15': 1, 'Line C': 1, 'Line N': 1, 'Line P': 1, 'Blue-shelled chicken': 1, 'Ayrshire': 2, 'Tibetan Lhasa White': 1, 'Limousin x Charolais': 1, 'North American Soay': 1, 'QX': 1, 'TY': 1, 'XJ': 1, 'NX2': 1, 'Warmblood Hanoverian': 1, 'Warmblood Bavarian': 1, 'Angora': 1, 'Leghorn': 1, 'biological duplicate 1_1': 1, 'Beetal White': 1, 'Italian trotter': 1, 'Longlin goat XME01-6': 1, 'West African Dwarf': 1, 'Zhong wei goat': 1, 'Saanen': 4, 'TG_10': 1, 'TG_3': 1, 'Wuzhishan minipig': 1, 'Black Bengal Goat': 1, 'Landrace x Yorkshire': 1, 'Charolais-Red Angus': 1, 'Large White pig': 1, 'Chinese Red Steppes cattle': 3, 'Churra': 2, 'Finnsheep': 2, 'Crossbred (50% Simmental, 25% Red Angus, 25% Charolais)': 1, 'Silkie': 1, 'Red junglefowl': 1, '16_NoIndex_L004_R1_001': 1, 'Garut': 2, 'Curly Horse': 2, 'Saxon-Thuringian Heavy Warmblood': 1, 'Tibetan': 1, 'Yanbian Cattle': 1, 'Garole': 1, 'Crossbred (50% Red Angus, 50% Limousin)': 1, 'Rhode Island Red': 1, 'High Quality chicken Line A': 1, 'Crossbred (50% Simmental, 25% Red Angus, 25% Angus)': 1, 'Laoshan dairy goat': 2, 'brown': 1, 'Wuzhishan': 1, 'Karakas': 2, 'KEF11': 1, 'KDO2': 1, 'North swedish draft': 1, 'Icelandic horse': 1, 'GMBC1940': 1, '421_Liver': 1, '721_Liver': 1, 'GM7864': 1, 'Zhenyuan rumpless chicken': 1, 'Line 6': 1, 'Diannan small ear pig': 1, 'Tibetan Linzhi': 1, 'Tibetan Nixi': 1, 'Lhasa White D': 1, 'Simmental x Angus': 1, 'Santa': 1, 'EM': 1, 'Norwegian Fjord': 1, 'Guizhou Small': 1, 'Shaanbei Cashmere': 1, 'Beetal goat': 1, 'biological duplicate 1_3': 1, 'Ritu Cashmere Goat': 1, 'Boiragi (Bezoar)': 1, 'Beetal Brown': 1, 'Cross-bred': 1, 'Jian chang black goat': 1, 'Dries': 1, 'Longlin goat Xme01-1': 1, 'Ma guan hornless goat': 1, 'Red Sokotoa': 1, 'TG_4': 1, 'Chinese domestic pigs': 1, 'Altay sheep': 1, 'Boskarin': 1, 'Chinese wild boar': 1, 'Boujaad': 1, 'Crossbred (62.5% Angus, 12.5% Simmental, 12.5% Gelbvieh, 12.5% Hereford)': 1, 'Turkish Awassi': 2, 'Crossbred (25% Red Angus, 25% Simmental, 25% Gelbvieh, 25% Hereford)': 1, '53_NoIndex_L003_R1_001': 1, "Blonde d'Aquitaine": 1, 'DORSET HORNED': 1, 'Beijing You': 1, 'Huiyang Bearded chicken': 1, 'Crossbred (62.5% Red Angus, 37.5% Gelbvieh)': 1, 'X bred': 1, 'REL': 1, 'SBG1': 1, 'Appaloosa': 1, 'Fjord horse': 1};
  breedLabels = [];
  breedData = [];

  materials = {'specimen from organism': 19031, 'cell specimen': 271, 'cell line': 2, 'pool of specimens': 6, 'cell culture': 11};
  materialLabels = [];
  materialData = [];

  cells = {'mesenteric lymph node': 44, 'caecum': 47, 'cerebellum': 191, 'medulla oblongata': 16, 'dorsal plus ventral thalamus': 15, 'corpus callosum': 17, 'gall bladder': 36, 'bone marrow': 194, 'abdominal aorta': 16, 'skeletal muscle tissue of biceps brachii': 40, 'gingiva': 16, 'thymus': 124, 'thyroid gland': 64, 'left atrium auricular region': 11, 'rumen': 45, 'layer of hippocampus': 11, 'vagina': 37, 'skeletal muscle tissue of internal intercostal muscle': 11, 'retina': 14, 'brachial nerve plexus': 30, 'frontal cortex': 44, 'longissimus thoracis muscle': 51, 'blood': 1306, 'urethra': 33, 'abomasum': 39, 'hypothalamus': 88, 'ascending aorta': 28, 'temporal cortex': 39, 'parathyroid gland': 6, 'subcutaneous adipose tissue': 169, 'synovial membrane of synovial joint': 1, 'papillary muscle of heart': 7, 'hard palate': 30, 'ileum': 201, 'reticulum': 11, 'pulmonary artery': 30, 'pituitary gland': 159, 'thoracic part of esophagus': 31, 'submandibular lymph node': 19, 'pons': 22, "Peyer's patch": 29, 'cervical part of esophagus': 30, 'jejunum': 196, 'heart right ventricle': 38, 'cortex of kidney': 54, 'vesicular gland': 4, 'soft palate': 30, 'heart left ventricle': 41, 'skeletal muscle tissue': 51, 'occipital cortex': 36, 'thalamus': 12, 'parietal cortex': 38, 'ascending colon': 11, 'trachea': 43, 'prostate gland': 10, 'tricuspid valve': 24, 'omental fat pad': 29, 'bronchus': 12, 'pulmonary valve': 22, 'lymphatic vessel': 5, 'bulbo-urethral gland': 12, 'pancreas': 196, 'liver': 187, 'urinary bladder': 53, 'uterine cervix': 37, 'esophagus': 16, 'alveolus of lung': 18, 'neuron projection bundle connecting eye with brain': 23, 'renal medulla': 168, 'renal cortex': 128, 'frontal lobe': 143, 'cardiac muscle': 168, 'colon': 154, 'adrenal cortex': 127, 'uterus': 108, 'corpus luteum': 59, 'abdominal adipose tissue': 168, 'testis': 181, 'tracheal epithelium': 104, 'ovarian cortex': 61, "Peyer's gland": 110, 'liver parenchyma': 282, 'olfactory lobe': 89, 'lung parenchyma': 159, 'spleen': 252, 'duodenum': 198, 'epididymis': 56, 'atrioventricular node': 2, 'omasum': 38, 'mitral valve': 31, 'right atrium auricular region': 11, 'perirenal fat': 33, 'tendon': 16, 'left cardiac atrium': 31, 'ureter': 31, 'tongue': 31, 'thoracic aorta': 22, 'aortic arch': 2, 'papillary muscle of right ventricle': 2, 'posterior vena cava': 15, 'oviduct': 60, 'mammary gland': 121, 'articular cartilage': 150, 'oviductal ampulla': 10, 'spermatozoon': 40, 'seminal vesicle': 73, 'longissimus lumborum': 132, 'hypophysis': 23, 'mediastinal lymph node': 25, 'cecum': 16, 'pectoral muscle': 36, 'cardiac muscle tissue of right auricle': 20, 'olfactory epithelium': 3, 'femoral muscle': 3, 'neocortex': 3, 'milk': 32, 'sartorius': 36, 'theca folliculi': 10, 'ovarian follicle': 12, 'gizzard': 38, 'vas deferens': 16, 'kidney': 40, 'diaphysis of metacarpal bone': 2, 'cerebellar vermis': 2, 'crico-arytenoid muscle': 3, 'cardiac muscle of right atrium': 2, 'hoof': 4, 'cardiac muscle of left atrium': 2, 'left ovary': 1, 'eighth thoracic spinal cord segment': 2, 'nail matrix': 2, 'blood plasma': 4, 'flexor tendon': 8, 'skin of back': 24, 'skin of neck': 6, 'subcutaneous abdominal adipose tissue': 3, 'synovial fluid': 3, 'red bone marrow': 2, 'articular cartilage of joint': 4, 'dorsal root ganglion': 11, 'lower back skin': 2, 'skeletal muscle tissue of pectoralis major': 23, 'olfactory bulb': 13, 'left lung lobe': 4, 'colonic mucosa': 4, 'gluteus medius': 5, 'uterine endometrium - caruncular (contralateral to Corpus Luteum)': 2, 'adrenal gland': 34, 'lobe of liver': 6, 'skin': 23, 'corpus epididymus': 2, 'cervical mucosa': 2, 'uterine endometrium - intercaruncular (ipsilateral to Corpus Luteum)': 2, 'Ileal mucosa': 4, 'Caecum (smooth muscle)': 4, 'uterine tube infundibulum (contralateral to Corpus Luteum)': 2, 'duodenum (smooth muscle)': 4, 'spinal cord': 4, 'cardiac atrium': 8, 'Tongue Superficial': 4, 'diaphragm': 24, 'Abomasum (smooth muscle)': 4, 'myometrium': 2, 'psoas major muscle': 5, 'duodenal mucosa': 4, 'biceps femoris': 5, 'ruminant reticulum': 27, 'occipital lobe': 2, 'longissimus dorsi': 7, 'aorta': 1, 'aortic valve': 31, 'submandibular gland': 1, 'sciatic nerve': 22, 'rectum': 36, 'semimembranosus': 1, 'bone': 3, 'lymph node': 10, 'cauda epididymus': 2, 'right lung lobe': 4, 'jejunum (smooth muscle)': 4, 'lung': 39, 'heart': 21, 'non-lactating non-pregnant mammary gland epithelium': 15, 'lactating mammary gland epithelium': 16, 'Muscle': 29, 'Liver': 47, 'Left ovary': 24, 'Right ovary': 24, 'Hypothalamus': 25, 'Uterus': 25, 'Fat tissue': 24, 'gluteal muscle': 2, 'epiglottis': 3, 'cerebellar hemisphere': 2, 'cartilage tissue': 6, 'cauda epididymis': 10, 'caput epididymis': 10, 'Pituitary gland': 24, 'ovary': 42, 'adipose tissue': 16, 'stomach': 6, 'laryngeal cartilage': 4, 'intercostal muscle': 23, 'female gonad': 8, 'brain': 15, 'semimembranosus muscle': 9, 'brainstem': 18, 'cardiac septum': 7, 'thoracic spinal cord': 21, 'amniotic fluid': 8, 'skin of front of neck': 21, 'eye': 21, 'tonsil': 17, 'caudal region': 4, 'lumbar spinal cord': 23, 'skin of abdomen': 20, 'cervical spinal cord': 26, 'sinoatrial node': 8, 'haemal node': 10, 'pineal body': 9, 'adrenal tissue': 16, 'chorioallantoic membrane': 12, 'uterine horn': 27, 'placental caruncle': 18, 'placental cotyledon': 8, 'pulmonary vein': 19, 'dura mater': 12, 'endometrium': 14, 'abdominal part of esophagus': 3, 'saliva-secreting gland': 28, 'popliteal lymph node': 21, 'cardiac muscle tissue of left auricle': 20, 'trabecula carnea of right ventricle': 8, 'right main bronchus': 19, 'pylorus': 32, 'pharyngeal arch': 4, 'penis': 12, 'fallopian tube': 36, 'hindlimb bud': 9, 'meniscus': 17, 'umbilical cord': 4, 'allantoic fluid': 12, 'prescapular lymph node': 30, 'body of corpus callosum': 6, 'placentome of cotyledonary placenta': 8, 'hippocampal formation': 22, 'left main bronchus': 19, 'connecting stalk': 4, 'genu of corpus callosum': 6, 'arch of aorta': 18, 'descending colon': 35, 'anterior part of tongue': 16, 'left eye': 4, 'forelimb bud': 9, 'splenium of the corpus callosum': 6, 'spiral colon': 21, 'right cardiac atrium': 30, 'bone marrow cell': 30, 'peripheral blood mononuclear cell': 34, 'alveolar macrophage': 24, 'inflammatory macrophage': 32, 'bone marrow macrophage': 32, 'mammary gland epithelial cell': 6, 'leukocyte': 34, 'macrophage': 45, 'CD8-positive, alpha-beta cytotoxic T cell': 16, 'CD4-positive helper T cell': 16, 'splenocyte': 4, 'CD14-positive monocyte': 1, 'CD8-positive T cell': 1, None: 1, 'B cell line': 74, 'whole embryo': 46, 'blastocysts': 6, 'B cell': 9, 'mesenchyme (pulp)': 8, 'pig induced pluripotent stem cells': 13, 'dorsal skin': 4, 'MSCs derived from embryonal HH25 limb bud': 40, 'perirenal adipose tissue': 11, 'Cultured distal-anterior mesenchymal cells from chick forelimb buds at HH21': 7, 'limb buds': 36, 'testes': 4, 'chicken embryo skeletal muscle derived myoblasts': 2, 'chicken micromass': 8, 'BL-derived ESC': 6, 'cartilage': 16, 'whole genome': 105, 'embryo': 20, 'Blood': 132, 'peripheral venous blood': 99, 'muscle': 81, 'ear tissue': 793, 'semen': 1261, 'whole_blood': 9, 'jugular vein blood': 80, 'blood sample': 10, 'ear': 158, 'Large intestine': 3, 'Rectum': 3, 'Whole blood': 32, 'blood from the left jugular vein': 423, 'Bronchoalveolar lavage': 18, 'sperm': 69, 'subcutaneous adipose': 6, 'semen straw': 3, 'psoas': 6, 'Hair': 6, 'abomasum pyloric': 1, 'Ear tissue': 203, 'Longissimus dorsi': 18, 'placenta': 4, 'distal small intestine': 14, 'primary dermal fibroblasts': 12, 'Peripheral blood mononuclear cells': 11, 'Lungs': 1, 'jejunum2-8': 1, 'muscle tissue': 6, 'Kidney': 1, 'fibroblasts': 2, 'jejunum2-5': 1, 'iPSC NT derived Embryo': 1, 'middle small intestine': 87, 'jejunum1-9': 1, 'Normal Placenta': 3, '2-cell': 3, 'MII oocyte': 6, 'Immature oocyte': 3, 'white blood cells': 13, 'sternum': 1, 'whole blood': 106, 'ear punch_D003': 1, 'blood and muscle': 33, 'Skin': 5, 'ear punch_D001': 1, 'ear punch_D002': 1, 'E12 metatarsal skin': 6, 'Tail': 16, 'adrenal medulla': 11, 'Mesodermal': 3, 'Not Applicable': 6, 'Semen': 13, 'ear punch_D005': 1, 'hypothalamus tissue': 1, 'iPSC Nuclear transfer derived fetus': 1, 'Lung': 10, 'tail hair': 8, 'chorda tendinea': 8, 'trigeminal nerve root': 2, 'lacrimal gland': 2, 'lens of a camera-type eye': 2, 'omentum': 7, 'optic chiasm': 2, 'papillary muscle of left ventricle': 4, 'interventricular septum': 2, 'isthmus of fallopian tube': 5, 'mesenteric fat pad': 1, 'mammalian oviduct': 1, 'supraspinatus': 1, 'skin of lip': 1, 'left lobe of thyroid gland': 1, 'liver left lateral lobe': 2, 'ventral lateral sacrocaudal muscle': 2, 'urine': 2, 'right uterine tube': 1, 'left lung': 3, 'blood serum': 2, 'left uterine tube': 2, 'sesamoid bone': 3, 'skin of body': 8, 'right ovary': 2, 'cerebral cortex': 2, 'cecum mucosa': 4, 'colon (smooth muscle)': 4, 'pigment epithelium of eye': 4, 'Internal Tongue Muscle': 4, 'inner lining mucosa of abomasum': 4, 'Jejunal mucosa': 4, 'ileum (smooth muscle)': 4, "peyer's patches": 4, 'ampulla of uterine tube (ipsilateral to Corpus Luteum)': 2, 'Ovarian section (without Corpus Luteum)': 2, 'latissimus dorsi muscle': 2, 'Adipose (perirenal)': 4, 'snout': 4, 'right eye': 4, 'embryonic post-anal tail': 4, 'skin fibroblast': 4, 'keratinocyte': 3, 'gamma-delta T cell': 1, 'B-cell': 1, 'Longissimus Dorsi': 2, 'Differentiated myoblast cell': 2, 'tarsometatarsal skin': 4, 'Neural crest cells (NCC)': 4, 'Auricular-derived primary cartilage cells': 2, 'chicken embryo skeletal muscle derived myotubes': 2, 'oviduct epithelial cell': 2, 'genomic DNA': 7, 'Small intestine': 3, 'carotid artery': 4, 'feces': 4, 'immature erythrocytes': 2, 'mid small intestine': 4, 'monocyte': 4, 'granulocyte': 4, 'lymphocyte': 4, 'skeletal muscle near ceasarian': 1, 'mammary/parenchyma': 1, 'breast muscle': 2, 'LD muscle': 2, 'tumour tissue': 1, 'new born fetal fibroblast-derived iPSC line': 3, 'fetal fibroblasts': 3, 'Gall bladder': 1, 'Fascia': 1, 'monocytes': 2, 'jejunum1-5': 1, 'Normal Embryo': 3, 'fetal fibroblast-derived iPSC line': 1, 'Compact morula': 3, 'Blastocyst': 3, '8-cell': 3, 'Early morula': 3, 'Sperm': 7, '4-cell': 3, 'inferior sternum': 1, 'Mammary gland': 6, 'palatine tonsil': 7, 'ear punch_D017': 1, 'common iliac lymph node': 3, 'Endodermal': 3, 'hair': 9, 'ear punch_D007': 1, 'Whole Blood': 3, 'ear punch_D004': 1, 'Ectodermal': 3, 'iPSC Nuclear transfer derived placenta': 1, 'muscle organ': 5, 'cornea': 5, 'chorda tendinea of left ventricle': 4, 'tongue muscle': 1, 'amygdala': 2, 'ampullary gland': 2, 'iris': 1, 'mandibular lymph node': 2, 'hippocampus': 1, 'trigeminal ganglion': 1, 'cerebrospinal fluid': 2, 'first lumbar spinal cord segment': 2, 'ampulla of uterine tube (contralateral to Corpus Luteum)': 2, 'uterine endometrium - intercaruncular (contralateral to Corpus Luteum)': 2, 'uterine tube infundibulum (ipsilateral to Corpus Luteum)': 2, 'hoof lamina': 4, 'cardiac muscle tissue': 2, 'visceral fat': 2, 'cortex': 6, 'salivary gland': 4, 'isthmus of fallopian tube (ipsilateral)': 2, 'optic chiasma': 6, 'head': 4, 'anterior vena cava': 6, 'embryonic fibroblast': 2, 'Spinal neural tube (brachial level)': 9, 'Ear': 6, 'Mature erythrocytes': 2, 'oocytes': 2, 'sperm cells': 1, '90 d lactating gland': 1, 'fetal fibroblast': 4, 'longissimus dorsi muscle': 6, 'Gizzard': 1, 'jejunum1-7': 1, 'keel': 1, 'flight muscle': 2, 'Longissimus dorsi muscle': 1, 'Fibroblast NT derived Placenta': 2, 'skin_ear': 4, 'ear biopsy': 2, 'mammillary body': 2, 'midbrain': 1, 'xiphoid process': 1, 'heart right atrium': 1, 'caput epididymus': 2, 'suspensory ligament': 4, 'right lobe of thyroid gland': 1, 'upper leg skin': 2, 'C6 segment of cervical spinal cord': 2, 'C1 segment of cervical spinal cord': 2, 'yellow bone marrow': 2, 'uterine endometrium - caruncular (ipsilateral to Corpus Luteum)': 2, 'isthmus of fallopian tube (contralateral)': 2, 'trunk': 4, 'epitheloid cell of small intestine': 1, 'Rumen Fluid': 1, 'Embryonic fibroblasts': 2, 'nucleated blood cells': 1, 'cerebrum': 1, 'Cerebellum': 1, 'Bone marrow': 1, 'Heart': 1, 'Eye': 1, 'Immature egg': 1, 'Comb': 1, 'jejunum1-10': 1, 'jejunum2-9': 1, 'jejunum1-6': 1, 'jejunum1-8': 1, 'B lymphocyte': 1, 'major salivary gland': 1, 'ear punch_D018': 1, 'Fibroblast NT derived Embryo': 2, 'sclera': 2, 'chorda tendinea of right ventricle': 1, 'heart left atrium': 1, 'caudal vena cava': 1, 'venous blood': 1, 'infraspinatus muscle': 1, 'pharyngeal arch artery': 2, 'Adipose (messenteric)': 4, 'fornix of vagina': 2, 'CD4-positive T cell': 1, 'lateral_plate_mesoderm': 1, 'DNA extracted from ear biopsy': 1, 'whole testes': 1, 'uterus intercaruncular': 1, 'tumour distant skin': 1, 'Spleen': 1, 'Mature egg': 1, 'Cerebrum': 1, 'Pancreas': 1, 'Breast': 1, 'jejunum2-10': 1, 'iPSC NT derived Placenta': 1, 'jejunum2-7': 1, 'jejunum2-6': 1, 'Shank': 1, 'ear punch_D012': 1, 'superior sternum': 1, 'BAC': 1, 'hide': 1, 'ear punch_D015': 1};
  cellsLabels = [];
  cellsData = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public sexChartLabels = Object.keys(this.sexData);
  public sexChartData = Object.values(this.sexData);

  public paperChartLabels = Object.keys(this.paperPublishedData);
  public paperChartData = Object.values(this.paperPublishedData);

  public organismChartLabels = Object.keys(this.organismData);
  public organismChartData = Object.values(this.organismData);

  public breedChartLabels = this.breedLabels;
  public breedChartData = this.breedData;

  public barChartPlugins = [pluginDataLabels];

  constructor(private splicePipe: SlicePipe) { }

  ngOnInit() {
    const tmp = Object.entries(this.breeds);
    tmp.sort(function (a, b) {
      return b[1] - a[1];
    });
    tmp.forEach((item, index) => {
      if (index <= 10) {
        if (item[0].length > 29) {
          item[0] = this.splicePipe.transform(item[0], 0, 30) + '...';
        }
        this.breedLabels.push(item[0]);
        this.breedData.push(item[1]);
      }
    });
    const tmp2 = Object.entries(this.materials);
    tmp2.sort(function (a, b) {
      return b[1] - a[1];
    });
    tmp2.forEach((item, index) => {
      if (item[0].length > 29) {
        item[0] = this.splicePipe.transform(item[0], 0, 30) + '...';
      }
      this.materialLabels.push(item[0]);
      this.materialData.push(item[1]);
    });

    const tmp3 = Object.entries(this.cells);
    tmp3.sort(function (a, b) {
      return b[1] - a[1];
    });
    tmp3.forEach((item, index) => {
      if (index <= 10) {
        this.cellsLabels.push(item[0]);
        this.cellsData.push(item[1]);
      }
    });
  }

}
