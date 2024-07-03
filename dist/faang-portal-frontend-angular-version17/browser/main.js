"use strict";
(self["webpackChunkfaang_portal_frontend_angular_version17"] = self["webpackChunkfaang_portal_frontend_angular_version17"] || []).push([["main"],{

/***/ 4114:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 7824);
/* harmony import */ var _organism_organism_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./organism/organism.component */ 8810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);

// import {FileComponent} from './file/file.component';




// import {SpecimenComponent} from './specimen/specimen.component';
// import {DatasetComponent} from './dataset/dataset.component';
// import {AnalysisComponent} from './analysis/analysis.component';
// import {ArticleComponent} from './article/article.component';
// import {FileDetailComponent} from './file/file-detail/file-detail.component';
// import {OrganismDetailComponent} from './organism/organism-detail/organism-detail.component';
// import {SpecimenDetailComponent} from './specimen/specimen-detail/specimen-detail.component';
// import {DatasetDetailComponent} from './dataset/dataset-detail/dataset-detail.component';
// import {AnalysisDetailComponent} from './analysis/analysis-detail/analysis-detail.component';
// import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
// import { SubprojectDetailComponent } from './subprojects/subproject-detail/subproject-detail.component';
// import {ProtocolSampleComponent} from './protocol-sample/protocol-sample.component';
// import {ProtocolExperimentComponent} from './protocol-experiment/protocol-experiment.component';
// import {ProtocolSampleDetailsComponent} from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
// import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
// import {OrganismsSummaryComponent} from './organisms-summary/organisms-summary.component';
// import {SpecimensSummaryComponent} from './specimens-summary/specimens-summary.component';
// import {DatasetsSummaryComponent} from './datasets-summary/datasets-summary.component';
// import {FilesSummaryComponent} from './files-summary/files-summary.component';
// import {ProtocolAnalysisComponent} from './protocol-analysis/protocol-analysis.component';
// import {ProtocolAnalysisDetailsComponent} from './protocol-analysis/protocol-analysis-details/protocol-analysis-details.component';
// import {NonExistingComponent} from './non-existing/non-existing.component';
// import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
// import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
// import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';
// import {ValidationSamplesComponent} from './validation/validation-samples/validation-samples.component';
// import {ValidationExperimentsComponent} from './validation/validation-experiments/validation-experiments.component';
// import {ValidationAnalysesComponent} from './validation/validation-analyses/validation-analyses.component';
// // to delete
// import {UsdaBovineComponent} from './subprojects/usda-bovine/usda-bovine.component';
// import {SheepatlasComponent} from './subprojects/sheepatlas/sheepatlas.component';
//
// import {SubprojectComponent} from './subprojects/subproject.component';
// import {LoginComponent} from './login/login.component';
// import {FilesUploadComponent} from './files-upload/files-upload.component';
// import { OntologyImproverComponent } from './ontology-improver/ontology-improver.component';
// // import { OntologyImproverWorkshopComponent } from './ontology-improver-workshop/ontology-improver-workshop.component';
// import { OntologyDetailComponent } from './ontology-improver/ontology-detail/ontology-detail.component';
// // import { OntologyDetailWorkshopComponent } from './ontology-improver-workshop/ontology-detail-workshop/ontology-detail-workshop.component';
// import { ApiDocsComponent } from './api-docs/api-docs.component';
// to delete
// import { QueryLanguageComponent } from './query-language/query-language.component';
//
// import { TrackhubsSubmissionComponent } from './trackhubs-submission/trackhubs-submission.component';
// import { NextflowSubmissionComponent } from './nextflow-submission/nextflow-submission.component';
// import { LocalGenomeBrowserComponent } from './local-genome-browser/local-genome-browser.component';
// import { GraphqlComponent } from './graphql/graphql.component';
// import { GlobalSearchComponent } from './globalsearch/globalsearch.component';
const routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: 'home',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}, {
  path: 'organism',
  component: _organism_organism_component__WEBPACK_IMPORTED_MODULE_1__.OrganismComponent
}
// {path: 'organism/:id', component: OrganismDetailComponent},
// {path: 'specimen', component: SpecimenComponent},
// {path: 'specimen/:id', component: SpecimenDetailComponent},
// {path: 'dataset', component: DatasetComponent},
// {path: 'dataset/:id', component: DatasetDetailComponent},
// {path: 'file', component: FileComponent},
// {path: 'file/:id', component: FileDetailComponent},
// {path: 'analysis', component: AnalysisComponent},
// {path: 'analysis/:id', component: AnalysisDetailComponent},
// {path: 'article', component: ArticleComponent},
// {path: 'article/:id', component: ArticleDetailComponent},
// {path: 'protocol/samples', component: ProtocolSampleComponent},
// {path: 'protocol/samples/:id', component: ProtocolSampleDetailsComponent},
// {path: 'protocol/experiments', component: ProtocolExperimentComponent},
// {path: 'protocol/experiments/:id', component: ProtocolExperimentDetailsComponent},
// {path: 'protocol/analysis', component: ProtocolAnalysisComponent},
// {path: 'protocol/analysis/:id', component: ProtocolAnalysisDetailsComponent},
// {path: 'summary', redirectTo: 'summary/organisms', pathMatch: 'full'},
// {path: 'summary/organisms', component: OrganismsSummaryComponent},
// {path: 'summary/specimens', component: SpecimensSummaryComponent},
// {path: 'summary/datasets', component: DatasetsSummaryComponent},
// {path: 'summary/files', component: FilesSummaryComponent},
// {path: 'ruleset/samples', component: RulesetSampleComponent},
// {path: 'ruleset/experiments', component: RulesetExperimentComponent},
// {path: 'ruleset/analyses', component: RulesetAnalysisComponent},
// {path: 'validation/samples', component: ValidationSamplesComponent},
// {path: 'validation/experiments', component: ValidationExperimentsComponent},
// {path: 'validation/analyses', component: ValidationAnalysesComponent},
// {path: 'projects', component: SubprojectComponent},
// //to delete
// {path: 'projects/usda-bovine', component: UsdaBovineComponent},
// {path: 'projects/sheepatlas', component: SheepatlasComponent},
//
// {path: 'projects/:id', component: SubprojectDetailComponent},
// {path: 'login', component: LoginComponent},
// {path: 'upload_protocol', component: FilesUploadComponent},
// {path: 'ontology', component: OntologyImproverComponent},
// // {path: 'ontology-workshop', component: OntologyImproverWorkshopComponent},
// {path: 'ontology/:id', component: OntologyDetailComponent},
// // {path: 'ontology-workshop/:id', component: OntologyDetailWorkshopComponent},
// {path: 'api', component: ApiDocsComponent},
//
// // to delete
// {path: 'query', component: QueryLanguageComponent},
//
// {path: 'trackhubs', component: TrackhubsSubmissionComponent},
// {path: 'nextflowSubmission', component: NextflowSubmissionComponent},
// {path: 'genome_browser', component: LocalGenomeBrowserComponent},
// {path: 'graphql', component: GraphqlComponent},
// {path: 'globalsearch', component: GlobalSearchComponent},
// {path: '404', component: NonExistingComponent},
// {path: '**', component: NonExistingComponent}
];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent),
/* harmony export */   cookieConfig: () => (/* binding */ cookieConfig)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var ngx_cookieconsent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookieconsent */ 3719);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ 1249);
/* harmony import */ var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/footer/footer.component */ 3568);






const cookieConfig = {
  "cookie": {
    "domain": _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.cookieDomain
  },
  "position": "bottom",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#333",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#f1d600",
      "text": "#333",
      "border": "transparent"
    }
  },
  "type": "info",
  "content": {
    "message": "This website requires cookies, and the limited processing of your personal data in order to function. By using the site you are agreeing to this as outlined in our ",
    "dismiss": "Accept cookies",
    "deny": "Refuse cookies",
    "link": "Privacy Notice",
    "href": "https://www.ebi.ac.uk/data-protection/privacy-notice/faang-data-portal",
    "policy": "Cookie Policy"
  }
};
class AppComponent {
  constructor(ccService) {
    this.ccService = ccService;
    this.title = 'faang-portal-frontend-angular-version17';
  }
  ngOnInit() {}
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_cookieconsent__WEBPACK_IMPORTED_MODULE_3__.NgcCookieConsentService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 3,
    vars: 0,
    consts: [["bdColor", "rgba(51, 51, 51, 0.8)", "size", "medium", "color", "#fff", "type", "ball-clip-rotate"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ngx-spinner", 0)(1, "router-outlet")(2, "app-footer");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, ngx_spinner__WEBPACK_IMPORTED_MODULE_5__.NgxSpinnerComponent, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent],
    styles: [".container[_ngcontent-%COMP%] {\n  font-family: Arial;\n  margin-bottom: 100px;\n}\n\n.container-fluid[_ngcontent-%COMP%] {\n  font-family: Arial;\n  margin-bottom: 100px;\n  padding: 0 5% 1% 5% !important;\n}\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{\n  color: #49494A;\n}\n\n.navbar[_ngcontent-%COMP%] {\n  padding: 0 0 2% 0 !important;\n}\n\nbutton[_ngcontent-%COMP%]:focus {\n  outline: none !important;\n}\n\n.igv-container[_ngcontent-%COMP%] {\n  z-index: 1;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsVUFBVTtBQUNaIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbiAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XG59XG5cbi5jb250YWluZXItZmx1aWQge1xuICBmb250LWZhbWlseTogQXJpYWw7XG4gIG1hcmdpbi1ib3R0b206IDEwMHB4O1xuICBwYWRkaW5nOiAwIDUlIDElIDUlICFpbXBvcnRhbnQ7XG59XG5cbmgxLCBoMiwgaDN7XG4gIGNvbG9yOiAjNDk0OTRBO1xufVxuXG4ubmF2YmFyIHtcbiAgcGFkZGluZzogMCAwIDIlIDAgIWltcG9ydGFudDtcbn1cblxuYnV0dG9uOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uaWd2LWNvbnRhaW5lciB7XG4gIHotaW5kZXg6IDE7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   getToken: () => (/* binding */ getToken),
/* harmony export */   removeToken: () => (/* binding */ removeToken),
/* harmony export */   updateToken: () => (/* binding */ updateToken)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 4114);
/* harmony import */ var _services_api_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/api-data.service */ 6401);
/* harmony import */ var _services_api_filters_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/api-filters.service */ 724);
/* harmony import */ var _services_aggregation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/aggregation.service */ 9396);
/* harmony import */ var _shared_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/filter/filter.component */ 9022);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _shared_active_filter_active_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/active-filter/active-filter.component */ 7092);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ 7824);
/* harmony import */ var _organism_organism_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./organism/organism.component */ 8810);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/header/header.component */ 6772);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-spinner */ 1249);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/service-worker */ 6140);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/footer/footer.component */ 3568);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tooltip */ 640);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/radio */ 3804);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/tabs */ 8223);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared/table-server-side/table-server-side.component */ 5104);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/toolbar */ 9552);
/* harmony import */ var ngx_cookieconsent__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ngx-cookieconsent */ 3719);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/tree */ 8379);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _shared_subscription_dialog_subscription_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/subscription-dialog/subscription-dialog.component */ 9344);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/list */ 943);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 7580);


// import { FileComponent } from './file/file.component';





// import {NgxPaginationModule} from 'ngx-pagination'; <--- not used




// import { SpecimenComponent } from './specimen/specimen.component';
// import { DatasetComponent } from './dataset/dataset.component';
// import { AnalysisComponent } from './analysis/analysis.component';
// import { ArticleComponent } from './article/article.component';


// import { FileDetailComponent } from './file/file-detail/file-detail.component';
// import { RobustLinkComponent } from './shared/robust-link/robust-link.component';
// import { RelatedItemsComponent } from './shared/related-items/related-items.component';
// import { OrganismDetailComponent } from './organism/organism-detail/organism-detail.component';
// import { SpecimenDetailComponent } from './specimen/specimen-detail/specimen-detail.component';
// import { DatasetDetailComponent } from './dataset/dataset-detail/dataset-detail.component';
// import { AnalysisDetailComponent } from './analysis/analysis-detail/analysis-detail.component';
// import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
// import { SubprojectDetailComponent } from './subprojects/subproject-detail/subproject-detail.component';



// import { NgxSmartModalModule } from 'ngx-smart-modal';
// import { ProtocolSampleComponent } from './protocol-sample/protocol-sample.component';
// import { ProtocolExperimentComponent } from './protocol-experiment/protocol-experiment.component';
// import { ProtocolSampleDetailsComponent } from './protocol-sample/protocol-sample-details/protocol-sample-details.component';
// import {ProtocolExperimentDetailsComponent} from './protocol-experiment/protocol-experiment-details/protocol-experiment-details.component';
// // import { ChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';
// import { OrganismsSummaryComponent } from './organisms-summary/organisms-summary.component';
// import { SpecimensSummaryComponent } from './specimens-summary/specimens-summary.component';
// import { DatasetsSummaryComponent } from './datasets-summary/datasets-summary.component';
// import { FilesSummaryComponent } from './files-summary/files-summary.component';
// import {SlicePipe} from '@angular/common';
// // import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
// import { ProtocolAnalysisComponent } from './protocol-analysis/protocol-analysis.component';
// import { NonExistingComponent } from './non-existing/non-existing.component';
// // import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { IndeterminateDirective } from './shared/indeterminate.directive';
// import {RulesetAnalysisComponent} from './rulesets/ruleset-analysis/ruleset-analysis.component';
// import {RulesetSampleComponent} from './rulesets/ruleset-sample/ruleset-sample.component';
// import {RulesetExperimentComponent} from './rulesets/ruleset-experiment/ruleset-experiment.component';


// import { ValidationSamplesComponent } from './validation/validation-samples/validation-samples.component';
// import { ValidationExperimentsComponent } from './validation/validation-experiments/validation-experiments.component';
// import { ValidationAnalysesComponent } from './validation/validation-analyses/validation-analyses.component';
// import { UsdaBovineComponent } from './subprojects/usda-bovine/usda-bovine.component';
// import { SheepatlasComponent } from './subprojects/sheepatlas/sheepatlas.component';
// import {FileUploadModule} from 'ng2-file-upload';
// import { SubprojectComponent } from './subprojects/subproject.component';
// import {JwtModule} from '@auth0/angular-jwt';



// import { TableClientSideComponent } from './shared/table-client-side/table-client-side.component';
// import {LoginComponent} from './login/login.component';
// import {FilesUploadComponent} from './files-upload/files-upload.component';
// import {UserService} from './services/user.service';



// import { OntologyImproverComponent } from './ontology-improver/ontology-improver.component';
// import {MatExpansionModule} from '@angular/material/expansion';






// import { OntologyDetailComponent } from './ontology-improver/ontology-detail/ontology-detail.component';




// import { ApiDocsComponent } from './api-docs/api-docs.component';
// import { QueryLanguageComponent } from './query-language/query-language.component';
// import { TrackhubsSubmissionComponent } from './trackhubs-submission/trackhubs-submission.component';
// import { BulkFilesUploaderComponent } from './bulk-files-uploader/bulk-files-uploader.component';
// import { EurofaangInfoComponent } from './subprojects/subproject-detail/eurofaang-info/eurofaang-info.component';


// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

// import { MatBadgeModule } from '@angular/material/badge';
// import { NextflowSubmissionComponent } from './nextflow-submission/nextflow-submission.component';


// import { ProtocolAnalysisDetailsComponent } from './protocol-analysis/protocol-analysis-details/protocol-analysis-details.component';
// import { EnsemblAnnotationComponent } from './shared/ensembl-annotation/ensembl-annotation.component';
// import { LocalGenomeBrowserComponent } from './local-genome-browser/local-genome-browser.component';


// import { GraphQLModule } from './graphql.module';
// import { GraphqlComponent } from './graphql/graphql.component';
// import { GlobalSearchComponent } from './globalsearch/globalsearch.component';
// import { DisplayDataComponent } from './graphql/display-data/display-data.component';
// import { IndexFiltersComponent } from './graphql/index-filters/index-filters.component';
// import { ShortenTitlePipe } from './graphql/display-data/shorten-title.pipe';





// import { PortalDataTableComponent } from './shared/portal-data-table/portal-data-table.component';
//
// // to delete
// import { CustomTableBuilderComponent } from './custom-table-builder/custom-table-builder.component';
// import { OntologyImproverWorkshopComponent } from './ontology-improver-workshop/ontology-improver-workshop.component';
// import { OntologyDetailWorkshopComponent } from './ontology-improver-workshop/ontology-detail-workshop/ontology-detail-workshop.component';
function getToken() {
  return localStorage.getItem('jwt_token') || '';
}
function updateToken(newToken) {
  return localStorage.setItem('jwt_token', newToken);
}
function removeToken() {
  return localStorage.removeItem('jwt_token');
}
// @ts-ignore
class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({
    providers: [_services_api_data_service__WEBPACK_IMPORTED_MODULE_2__.ApiDataService, _services_aggregation_service__WEBPACK_IMPORTED_MODULE_4__.AggregationService, _services_api_filters_service__WEBPACK_IMPORTED_MODULE_3__.ApiFiltersService, (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_15__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_15__.withInterceptorsFromDi)()), (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.provideClientHydration)()],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
    // NgxPaginationModule,
    ngx_spinner__WEBPACK_IMPORTED_MODULE_17__.NgxSpinnerModule,
    // // NgbDropdownModule,
    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__.BrowserAnimationsModule,
    // // ChartsModule,
    // NgChartsModule,
    _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
    // FileUploadModule,
    _angular_material_table__WEBPACK_IMPORTED_MODULE_20__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__.MatSortModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_24__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__.MatIconModule,
    // MatExpansionModule,
    _angular_material_input__WEBPACK_IMPORTED_MODULE_26__.MatInputModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__.MatTabsModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_30__.MatSnackBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__.MatProgressSpinnerModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_32__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__.MatFormFieldModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__.MatMenuModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_35__.MatCardModule,
    // FlexLayoutModule,
    // MatProgressBarModule,
    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__.MatToolbarModule,
    // MatBadgeModule,
    _angular_material_tree__WEBPACK_IMPORTED_MODULE_37__.MatTreeModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_38__.MatDividerModule,
    // MatCheckboxModule,
    // JwtModule.forRoot({
    //     config: {
    //         tokenGetter: getToken,
    //         allowedDomains: ['api.aai.ebi.ac.uk'],
    //         disallowedRoutes: ['https://api.aai.ebi.ac.uk/auth']
    //     }
    // }),
    // // BsDropdownModule.forRoot(),
    _angular_service_worker__WEBPACK_IMPORTED_MODULE_39__.ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_10__.environment.production
    }),
    // NgxSmartModalModule.forRoot(),
    // // NgbModule,
    ngx_cookieconsent__WEBPACK_IMPORTED_MODULE_40__.NgcCookieConsentModule.forRoot(_app_component__WEBPACK_IMPORTED_MODULE_0__.cookieConfig),
    // GraphQLModule,
    _angular_material_list__WEBPACK_IMPORTED_MODULE_41__.MatListModule,
    // FileComponent,
    _shared_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__.FilterComponent, _shared_active_filter_active_filter_component__WEBPACK_IMPORTED_MODULE_6__.ActiveFilterComponent, _home_home_component__WEBPACK_IMPORTED_MODULE_7__.HomeComponent, _organism_organism_component__WEBPACK_IMPORTED_MODULE_8__.OrganismComponent,
    // SpecimenComponent,
    // DatasetComponent,
    // AnalysisComponent,
    // ArticleComponent,
    _shared_header_header_component__WEBPACK_IMPORTED_MODULE_9__.HeaderComponent,
    // ValidationSamplesComponent,
    // ValidationExperimentsComponent,
    // ValidationAnalysesComponent,
    // UsdaBovineComponent,
    // SheepatlasComponent,
    // SubprojectComponent,
    // TableClientSideComponent,
    // LoginComponent,
    // FilesUploadComponent,
    // OntologyImproverComponent,
    // OntologyDetailComponent,
    // ApiDocsComponent,
    // QueryLanguageComponent,
    // TrackhubsSubmissionComponent,
    // BulkFilesUploaderComponent,
    // EurofaangInfoComponent,
    _shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_12__.TableServerSideComponent,
    // NextflowSubmissionComponent,
    // ProtocolAnalysisDetailsComponent,
    // EnsemblAnnotationComponent,
    // LocalGenomeBrowserComponent,
    // GraphqlComponent,
    // GlobalSearchComponent,
    // DisplayDataComponent,
    // IndexFiltersComponent,
    // ShortenTitlePipe,
    _shared_subscription_dialog_subscription_dialog_component__WEBPACK_IMPORTED_MODULE_13__.SubscriptionDialogComponent]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
    // NgxPaginationModule,
    ngx_spinner__WEBPACK_IMPORTED_MODULE_17__.NgxSpinnerModule,
    // // NgbDropdownModule,
    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__.BrowserAnimationsModule,
    // // ChartsModule,
    // NgChartsModule,
    _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
    // FileUploadModule,
    _angular_material_table__WEBPACK_IMPORTED_MODULE_20__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__.MatSortModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_24__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__.MatIconModule,
    // MatExpansionModule,
    _angular_material_input__WEBPACK_IMPORTED_MODULE_26__.MatInputModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_28__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__.MatTabsModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_30__.MatSnackBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__.MatProgressSpinnerModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_32__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__.MatFormFieldModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__.MatMenuModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_35__.MatCardModule,
    // FlexLayoutModule,
    // MatProgressBarModule,
    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__.MatToolbarModule,
    // MatBadgeModule,
    _angular_material_tree__WEBPACK_IMPORTED_MODULE_37__.MatTreeModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_38__.MatDividerModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_39__.ServiceWorkerModule, ngx_cookieconsent__WEBPACK_IMPORTED_MODULE_40__.NgcCookieConsentModule,
    // GraphQLModule,
    _angular_material_list__WEBPACK_IMPORTED_MODULE_41__.MatListModule,
    // FileComponent,
    _shared_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__.FilterComponent, _shared_active_filter_active_filter_component__WEBPACK_IMPORTED_MODULE_6__.ActiveFilterComponent, _home_home_component__WEBPACK_IMPORTED_MODULE_7__.HomeComponent, _organism_organism_component__WEBPACK_IMPORTED_MODULE_8__.OrganismComponent,
    // SpecimenComponent,
    // DatasetComponent,
    // AnalysisComponent,
    // ArticleComponent,
    _shared_header_header_component__WEBPACK_IMPORTED_MODULE_9__.HeaderComponent,
    // FileDetailComponent,
    // RobustLinkComponent,
    // RelatedItemsComponent,
    // OrganismDetailComponent,
    // SpecimenDetailComponent,
    // DatasetDetailComponent,
    // AnalysisDetailComponent,
    // ArticleDetailComponent,
    // SubprojectDetailComponent,
    // ProtocolSampleComponent,
    // ProtocolExperimentComponent,
    // ProtocolSampleDetailsComponent,
    // ProtocolExperimentDetailsComponent,
    // OrganismsSummaryComponent,
    // SpecimensSummaryComponent,
    // DatasetsSummaryComponent,
    // FilesSummaryComponent,
    // ProtocolAnalysisComponent,
    // NonExistingComponent,
    // RulesetSampleComponent,
    // RulesetExperimentComponent,
    // RulesetAnalysisComponent,
    // IndeterminateDirective,
    _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__.FooterComponent,
    // ValidationSamplesComponent,
    // ValidationExperimentsComponent,
    // ValidationAnalysesComponent,
    // UsdaBovineComponent,
    // SheepatlasComponent,
    // SubprojectComponent,
    // TableClientSideComponent,
    // LoginComponent,
    // FilesUploadComponent,
    // OntologyImproverComponent,
    // OntologyDetailComponent,
    // ApiDocsComponent,
    // QueryLanguageComponent,
    // TrackhubsSubmissionComponent,
    // BulkFilesUploaderComponent,
    // EurofaangInfoComponent,
    _shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_12__.TableServerSideComponent,
    // NextflowSubmissionComponent,
    // ProtocolAnalysisDetailsComponent,
    // EnsemblAnnotationComponent,
    // LocalGenomeBrowserComponent,
    // GraphqlComponent,
    // GlobalSearchComponent,
    // DisplayDataComponent,
    // IndexFiltersComponent,
    // ShortenTitlePipe,
    _shared_subscription_dialog_subscription_dialog_component__WEBPACK_IMPORTED_MODULE_13__.SubscriptionDialogComponent]
  });
})();

/***/ }),

/***/ 7824:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/header/header.component */ 6772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 436);






class HomeComponent {
  constructor(titleService) {
    this.titleService = titleService;
  }
  ngOnInit() {
    this.titleService.setTitle('FAANG data portal');
  }
  static #_ = this.ɵfac = function HomeComponent_Factory(t) {
    return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.Title));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: HomeComponent,
    selectors: [["app-home"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 88,
    vars: 0,
    consts: [[1, "container-fluid"], ["fxLayout", "row", "fxLayout.lt-md", "column", 2, "margin-bottom", "5px"], ["href", "http://www.faang.org"], ["src", "../../assets/FAANG_WebLogo.png", "alt", "logo", 1, "center-block", "faang-logo"], ["fxFlex", "", 2, "padding", "1%"], [1, "text-center"], ["href", "mailto:faang-dcc@ebi.ac.uk?Subject=Data%20portal", "target", "_top"], ["fxLayout", "row", "fxLayout.lt-md", "column", "fxLayoutGap", "1%"], ["fxFlex", "58", 1, "home-card"], ["routerLink", "/organism"], ["routerLink", "/specimen"], ["routerLink", "/dataset"], ["routerLink", "/file"], ["routerLink", "/graphql"], ["fxFlex", "42", "fxLayout", "column", "fxLayoutGap", "2%"], ["fxFlex", "", 1, "home-card"], ["href", "http://www.faang.org/cgi-bin/host/misc/FAANG/mem", "target", "_blank"], ["href", "https://dcc-documentation.readthedocs.io/en/latest/"], ["href", "https://www.faang.org/data-share-principle", "target", "_blank"]],
    template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "h1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Data Portal");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div")(9, "p")(10, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "FAANG");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " is the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "unctional ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "nnotation of ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "AN");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "imal ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "G");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "enomes project. We are working to understand the genotype to phenotype link in domesticated animals. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, " This data portal will help find and browse FAANG's data. Let us know what you think at ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "faang-dcc@ebi.ac.uk");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, ". ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 7)(31, "mat-card", 8)(32, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Using this site");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](34, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div")(36, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, " The ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Organisms");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, " page lets you search for any organism in the FAANG data set. We use the term \"organism\" to mean any individual animal that has contributed a biological specimen. Click an item in the list to see full details of the organism. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, " The ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "Specimens");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, " page lets you search for any specimen in the FAANG data set. We use the term \"specimen\" to mean any biological material originating from a particular organism. Click an item in the list to see full details of the specimen. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, " The ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, "Dataset");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, " page lets you search for any dataset in the FAANG data set. We use the term \"dataset\" to mean the Study concept used in ENA (also referred as a Project). Click an item in the list to see full details of the dataset. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](52, " The ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "File");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, " page lets you search for any experiment files in the FAANG data set. We use the term \"file\" to mean any experiment assay file that has been submitted to a public archive. Click an item in the list to see full details of the file. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](57, " The ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, " page lets you search across different types of data tables. It enables custom search allowing you to join tables and select specific columns. Click an item in the results list to see full details. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "div", 14)(62, "mat-card", 15)(63, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "Contribute to FAANG");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](65, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div")(67, "p")(68, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](69, "Sign up to become part of the FAANG community");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](70, " and join the working commitees.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](72, "Instructions on how to submit your samples and analyses to FAANG are detailed on the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "FAANG submission guidelines");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](75, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "mat-card", 15)(77, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](78, "It's good to share");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](79, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](80, "div")(81, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](82, "FAANG is committed to sharing data rapidly, before publication. All members have agreed to the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](83, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](84, "FAANG Data Sharing Statement");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](85, " for pre-publication data release.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](86, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](87, "FAANG is also committed to making regular public releases of primary and secondary analysis results to provide access to the wider community.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
      }
    },
    dependencies: [_shared_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_divider__WEBPACK_IMPORTED_MODULE_4__.MatDivider, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
    styles: ["img.faang-logo[_ngcontent-%COMP%] {\n  max-width: 70%;\n}\n\n@media (max-width: 767px) {\n  img.faang-logo[_ngcontent-%COMP%] {\n    width: 300px;\n  }\n}\n\n.home-card[_ngcontent-%COMP%] {\n  border: solid 0.2px rgba(0,0,0,0.15);\n  padding: 16px;\n}\n\np[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-family: Arial;\n}\n\na[_ngcontent-%COMP%] {\n  color: steelblue;\n}\n\nhr[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color:#ccc;\n}\n\nmat-card[_ngcontent-%COMP%] {\n  font-family: Roboto,Helvetica Neue,sans-serif;\n}\n\nmat-divider[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0U7SUFDRSxZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFLG9DQUFvQztFQUNwQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLDZDQUE2QztBQUMvQzs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbWcuZmFhbmctbG9nbyB7XG4gIG1heC13aWR0aDogNzAlO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgaW1nLmZhYW5nLWxvZ28ge1xuICAgIHdpZHRoOiAzMDBweDtcbiAgfVxufVxuXG4uaG9tZS1jYXJkIHtcbiAgYm9yZGVyOiBzb2xpZCAwLjJweCByZ2JhKDAsMCwwLDAuMTUpO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG5wIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogQXJpYWw7XG59XG5cbmEge1xuICBjb2xvcjogc3RlZWxibHVlO1xufVxuXG5ociB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7XG59XG5cbm1hdC1jYXJkIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90byxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO1xufVxuXG5tYXQtZGl2aWRlciB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 8810:
/*!************************************************!*\
  !*** ./src/app/organism/organism.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrganismComponent: () => (/* binding */ OrganismComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/table-server-side/table-server-side.component */ 5104);
/* harmony import */ var _shared_subscription_dialog_subscription_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/subscription-dialog/subscription-dialog.component */ 9344);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 640);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _shared_filter_filter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/filter/filter.component */ 9022);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/header/header.component */ 6772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_api_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/api-data.service */ 6401);
/* harmony import */ var _services_filter_state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/filter-state.service */ 1544);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _services_aggregation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/aggregation.service */ 9396);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 436);

















const _c0 = ["bioSampleIdTemplate"];
const _c1 = ["paperPublishedTemplate"];
const OrganismComponent_Conditional_14_Defer_4_DepsFn = () => [Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../shared/active-filter/active-filter.component */ 7092)).then(m => m.ActiveFilterComponent)];
function OrganismComponent_Conditional_14_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-active-filter");
  }
}
function OrganismComponent_Conditional_14_DeferLoading_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Loading active filters... ");
  }
}
function OrganismComponent_Conditional_14_DeferError_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Failed to load active filters! ");
  }
}
function OrganismComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, OrganismComponent_Conditional_14_Defer_1_Template, 1, 0)(2, OrganismComponent_Conditional_14_DeferLoading_2_Template, 1, 0)(3, OrganismComponent_Conditional_14_DeferError_3_Template, 1, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefer"](4, 1, OrganismComponent_Conditional_14_Defer_4_DepsFn, 2, null, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function OrganismComponent_Conditional_14_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.removeFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Remove all filters");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function OrganismComponent_Conditional_14_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.openSubscriptionDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 18)(10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdeferWhen"](ctx_r2.hasActiveFilters());
  }
}
function OrganismComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function OrganismComponent_Conditional_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.downloadFile("csv"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " Export as CSV file ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function OrganismComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function OrganismComponent_Conditional_18_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.downloadFile("txt"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " Export as Tabular file ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function OrganismComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "mat-spinner", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("diameter", 30);
  }
}
function OrganismComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", item_r6["bioSampleId"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r6["bioSampleId"]);
  }
}
function OrganismComponent_ng_template_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 21)(1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "check_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx_r2.isGreen(item_r7["paperPublished"]));
  }
}
function OrganismComponent_ng_template_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 21)(1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "highlight_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", ctx_r2.isGreen(item_r7["paperPublished"]));
  }
}
function OrganismComponent_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, OrganismComponent_ng_template_23_Conditional_0_Template, 3, 1, "td", 21)(1, OrganismComponent_ng_template_23_Conditional_1_Template, 3, 1, "td", 21);
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx_r2.wasPublished(item_r7["paperPublished"]) ? 0 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](!ctx_r2.wasPublished(item_r7["paperPublished"]) ? 1 : -1);
  }
}
class OrganismComponent {
  constructor(dataService, filterStateService, activatedRoute, router, dialog, dialogModel, aggregationService, titleService) {
    this.dataService = dataService;
    this.filterStateService = filterStateService;
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.dialog = dialog;
    this.dialogModel = dialogModel;
    this.aggregationService = aggregationService;
    this.titleService = titleService;
    this.columnNames = ['BioSample ID', 'Sex', 'Organism', 'Breed', 'Standard', 'Paper published', 'Subscribe'];
    this.displayFields = ['bioSampleId', 'sex', 'organism', 'breed', 'standard', 'paperPublished', 'subscribe'];
    this.downloadData = false;
    this.downloading = false;
    this.data = {};
    this.subscriber = {
      email: '',
      title: '',
      indexName: '',
      indexKey: ''
    };
    this.query = {
      'sort': ['id_number', 'desc'],
      '_source': ['biosampleId', 'sex.text', 'organism.text', 'breed.text', 'standardMet', 'id_number', 'paperPublished'],
      'search': ''
    };
    this.downloadQuery = {
      'sort': ['id_number', 'desc'],
      '_source': ['_source.biosampleId', '_source.sex.text', '_source.organism.text', '_source.breed.text', '_source.standardMet', '_source.paperPublished'],
      'columns': this.columnNames,
      'filters': {},
      'file_format': 'csv'
    };
    this.defaultSort = ['id_number', 'desc'];
  }
  ngOnInit() {
    this.indexDetails = {
      index: 'organism',
      indexKey: 'biosampleId',
      apiKey: 'bioSampleId'
    };
    this.templates = {
      'bioSampleId': this.bioSampleIdTemplate,
      'paperPublished': this.paperPublishedTemplate
    };
    this.loadTableDataFunction = this.dataService.getAllOrganisms.bind(this.dataService);
    this.titleService.setTitle('FAANG organisms');
    this.activatedRoute.queryParams.subscribe(params => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });
    this.tableServerComponent.dataUpdate.subscribe(data => {
      this.aggregationService.getAggregations(data.aggregations, 'organism');
    });
    this.tableServerComponent.sortUpdate.subscribe(sortParams => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['organism']);
  }
  hasActiveFilters() {
    if (typeof this.filter_field === 'undefined') {
      return false;
    }
    for (const key of Object.keys(this.filter_field)) {
      if (this.filter_field[key].length !== 0) {
        return true;
      }
    }
    return false;
  }
  removeFilter() {
    this.filterStateService.resetFilter();
    this.filter_field = {};
    this.router.navigate(['organism'], {
      queryParams: {},
      replaceUrl: true,
      skipLocationChange: false
    });
  }
  onDownloadData() {
    this.downloadData = !this.downloadData;
  }
  downloadFile(format) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    const mapping = {
      'bioSampleId': 'biosampleId',
      'sex': 'sex.text',
      'organism': 'organism.text',
      'breed': 'breed.text',
      'standard': 'standardMet',
      'paper_published': 'paperPublished'
    };
    this.dataService.downloadRecords('organism', mapping, this.downloadQuery).subscribe(res => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.' + format;
      a.click();
      this.downloading = false;
    });
  }
  wasPublished(published) {
    return published === 'true';
  }
  isGreen(published) {
    return published === 'true' ? 'green' : 'default';
  }
  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.filterStateService.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }
  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered Organism entries';
    this.subscriber.indexName = this.indexDetails['index'];
    this.subscriber.indexKey = this.indexDetails['indexKey'];
    const subscriptionDialog = this.dialogModel.open(_shared_subscription_dialog_subscription_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SubscriptionDialogComponent, {
      height: '300px',
      width: '400px',
      data: this.subscriber
    });
  }
  loadInitialPageState(params) {
    const filters = this.filterStateService.setUpAggregationFilters(params);
    this.filter_field = filters;
    this.query['filters'] = filters;
    this.downloadQuery['filters'] = filters;
    // load pre-search and pre-sorting
    if (params['searchTerm']) {
      this.query['search'] = params['searchTerm'];
    }
    if (params['sortTerm'] && params['sortDirection']) {
      this.query['sort'] = [params['sortTerm'], params['sortDirection']];
    }
  }
  static #_ = this.ɵfac = function OrganismComponent_Factory(t) {
    return new (t || OrganismComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_api_data_service__WEBPACK_IMPORTED_MODULE_4__.ApiDataService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_filter_state_service__WEBPACK_IMPORTED_MODULE_5__.FilterStateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_aggregation_service__WEBPACK_IMPORTED_MODULE_6__.AggregationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.Title));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: OrganismComponent,
    selectors: [["app-organism"]],
    viewQuery: function OrganismComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_0__.TableServerSideComponent, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.bioSampleIdTemplate = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.paperPublishedTemplate = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.tableServerComponent = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵStandaloneFeature"]],
    decls: 25,
    vars: 19,
    consts: [["bioSampleIdTemplate", ""], ["paperPublishedTemplate", ""], [1, "container-fluid"], ["fxLayoutGap", "2%", "fxLayout", "row", "fxLayout.lt-md", "column"], ["fxFlex", "17"], ["title", "Standard", 3, "filterSize"], ["title", "Sex", 3, "filterSize"], ["title", "Organism", 3, "filterSize"], ["title", "Breed", 3, "filterSize"], ["title", "Paper published", 3, "filterSize"], ["title", "Project", 3, "filterSize"], ["fxFlex", "83", 1, "table-responsive"], ["mat-raised-button", "", 2, "background-color", "green", "color", "white", 3, "click", "disabled"], ["mat-raised-button", ""], [2, "padding", "15px"], [3, "display_fields", "column_names", "indexDetails", "templates", "filter_values", "apiFunction", "query", "defaultSort"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "matTooltip", "Subscribe to selected Organism entries", 3, "click"], [1, "subscription-icon"], [3, "diameter"], ["target", "_blank", 2, "cursor", "pointer", 3, "routerLink"], [3, "ngClass"], [1, "material-icons"]],
    template: function OrganismComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 2)(2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "FAANG Organisms");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 3)(6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "app-filter", 5)(8, "app-filter", 6)(9, "app-filter", 7)(10, "app-filter", 8)(11, "app-filter", 9)(12, "app-filter", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, OrganismComponent_Conditional_14_Template, 13, 1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function OrganismComponent_Template_button_click_15_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.onDownloadData());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " Download data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, OrganismComponent_Conditional_17_Template, 2, 0, "button", 13)(18, OrganismComponent_Conditional_18_Template, 2, 0, "button", 13)(19, OrganismComponent_Conditional_19_Template, 2, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "app-table-server-side", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](21, OrganismComponent_ng_template_21_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"])(23, OrganismComponent_ng_template_23_Template, 2, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("filterSize", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.hasActiveFilters() ? 14 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx.downloading);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.downloadData ? 17 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.downloadData ? 18 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.downloading ? 19 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("display_fields", ctx.displayFields)("column_names", ctx.columnNames)("indexDetails", ctx.indexDetails)("templates", ctx.templates)("filter_values", ctx.filter_field)("apiFunction", ctx.loadTableDataFunction)("query", ctx.query)("defaultSort", ctx.defaultSort);
      }
    },
    dependencies: [_shared_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _shared_filter_filter_component__WEBPACK_IMPORTED_MODULE_2__.FilterComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinner, _shared_table_server_side_table_server_side_component__WEBPACK_IMPORTED_MODULE_0__.TableServerSideComponent, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass],
    styles: [".unsorted[_ngcontent-%COMP%] {\n  color: lightgrey;\n}\n\n.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n@media (max-width: 767px) {\n  div.faang-filter[_ngcontent-%COMP%] {\n    width: 300px;\n    max-width: 100%;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n\nbutton[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n.green[_ngcontent-%COMP%] {\n  color: green;\n  text-align: center;\n  width: 100px;\n}\n\n.default[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100px;\n}\n\na[_ngcontent-%COMP%] {\n  color: steelblue;\n}\n\ntable[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\nh3[_ngcontent-%COMP%] {\n  color: #477AAF;\n}\n\n.subscription-icon[_ngcontent-%COMP%] {\n  color: steelblue;\n  display: flex;\n  align-items: center;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb3JnYW5pc20vb3JnYW5pc20uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRTtJQUNFLFlBQVk7SUFDWixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtFQUNwQjtBQUNGOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQiIsInNvdXJjZXNDb250ZW50IjpbIi51bnNvcnRlZCB7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG59XG5cbi5jbGlja2FibGUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICBkaXYuZmFhbmctZmlsdGVyIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxufVxuXG5idXR0b24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4uZ3JlZW4ge1xuICBjb2xvcjogZ3JlZW47XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMHB4O1xufVxuXG4uZGVmYXVsdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMHB4O1xufVxuXG5hIHtcbiAgY29sb3I6IHN0ZWVsYmx1ZTtcbn1cblxudGFibGUge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbmgzIHtcbiAgY29sb3I6ICM0NzdBQUY7XG59XG5cbi5zdWJzY3JpcHRpb24taWNvbiB7XG4gIGNvbG9yOiBzdGVlbGJsdWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 9396:
/*!*************************************************!*\
  !*** ./src/app/services/aggregation.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AggregationService: () => (/* binding */ AggregationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ 951);
/* harmony import */ var _shared_protocolnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/protocolnames */ 8122);
/* harmony import */ var _shared_common_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common_functions */ 6023);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);





class AggregationService {
  constructor() {
    this.active_filters = {
      standard: [],
      study: [],
      species: [],
      assayType: [],
      target: [],
      instrument: [],
      sex: [],
      organism: [],
      datasetAccession: [],
      analysisType: [],
      breed: [],
      material: [],
      organismpart_celltype: [],
      archive: [],
      protocol_name: [],
      university_name: [],
      protocol_date: [],
      protocol_type: [],
      name: [],
      experimentTarget: [],
      paper_published: [],
      year: [],
      journal: [],
      source: [],
      datasetSource: [],
      project: [],
      type: [],
      projects: [],
      status_activity: []
    };
    this.protocolNames = _shared_protocolnames__WEBPACK_IMPORTED_MODULE_1__.protocolNames;
    this.current_active_filters = [];
    this.data = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this.field = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
  }
  getHumanName(data) {
    return this.protocolNames[data];
  }
  getHumanReadableValue(data) {
    return data.split(/(?=[A-Z])/).join(' ').toLowerCase();
  }
  updateAggregation(aggs, value) {
    aggs.hasOwnProperty(value) ? aggs[value] += 1 : aggs[value] = 1;
    return aggs;
  }
  updateAggregationCommaSeparated(aggs, value) {
    let values = value.split(', ');
    values.forEach(val => {
      aggs.hasOwnProperty(val) ? aggs[val] += 1 : aggs[val] = 1;
    });
    return aggs;
  }
  getAggregations(recordList, type) {
    if (type === 'file' || type === 'organism' || type === 'specimen' || type === 'dataset' || type === 'analysis' || type === 'protocol' || type === 'protocol_experiments' || type === 'article' || type === 'ontology') {
      let all_data = {};
      for (const key in recordList) {
        // recordList contains aggregations from API response
        all_data[key] = {};
        if (recordList[key]['buckets']) {
          recordList[key]['buckets'].forEach(bucket => {
            if (bucket['key']) {
              all_data[key][bucket['key']] = bucket['doc_count'];
            }
          });
        } else {
          all_data[key] = recordList[key]['doc_count'];
        }
      }
      let paperPublishedProcessed = false;
      for (let key in all_data) {
        // process paperPublished values
        if ((key == 'paper_published' || key == 'paper_published_missing') && !paperPublishedProcessed) {
          let paper_values = {
            'Yes': 0,
            'No': 0
          };
          for (const val in all_data['paper_published']) {
            val == 'true' ? paper_values['Yes'] += all_data['paper_published'][val] : paper_values['No'] += all_data['paper_published'][val];
          }
          if (all_data['paper_published_missing']) {
            paper_values['No'] += all_data['paper_published_missing'];
          }
          for (const val in paper_values) {
            if (paper_values[val] == 0) {
              delete paper_values[val];
            }
          }
          all_data['paper_published'] = paper_values;
          paperPublishedProcessed = true;
        }
        // process assayType
        if (key == 'assay_type') {
          for (const val in all_data['assay_type']) {
            if (val == 'transcription profiling by high throughput sequencing') {
              all_data['assay_type']['RNA-Seq'] = all_data['assay_type'][val];
              delete all_data['assay_type'][val];
              break;
            }
          }
        }
        // process sex
        if (key == 'sex') {
          let sex_values = {
            'male': 0,
            'female': 0
          };
          for (const val in all_data['sex']) {
            _shared_constants__WEBPACK_IMPORTED_MODULE_0__.male_values.indexOf(val) > -1 ? sex_values['male'] += all_data['sex'][val] : _shared_constants__WEBPACK_IMPORTED_MODULE_0__.female_values.indexOf(val) > -1 ? sex_values['female'] += all_data['sex'][val] : sex_values[val] = all_data['sex'][val];
          }
          for (const val in sex_values) {
            if (sex_values[val] == 0) {
              delete sex_values[val];
            }
          }
          all_data['sex'] = sex_values;
        }
        // process article source
        if (key === 'source') {
          const source_values = {
            'published': 0,
            'preprint': 0
          };
          for (const prop in all_data['source']) {
            if (prop.toUpperCase() === 'PPR') {
              source_values['preprint'] += all_data['source'][prop];
            } else if (_shared_constants__WEBPACK_IMPORTED_MODULE_0__.published_article_source.indexOf(prop.toUpperCase()) > -1) {
              source_values['published'] += all_data['source'][prop];
            } else {
              source_values[prop] = all_data['source'][prop];
            }
          }
          for (const prop in source_values) {
            if (source_values[prop] === 0) {
              delete source_values[prop];
            }
          }
          all_data['source'] = source_values;
        }
        // process Analysis Type and Experiment Target
        if (key == 'analysis_type' || key == 'experiment_target') {
          for (const val in all_data[key]) {
            all_data[key][(0,_shared_common_functions__WEBPACK_IMPORTED_MODULE_2__.replaceUnderscoreWithSpace)(val)] = all_data[key][val];
            delete all_data[key][val];
          }
        }
        // process protocol name for experiment protocols
        if (key == 'protocol_type') {
          for (const val in all_data[key]) {
            all_data['protocol_type'][this.getHumanName(val)] = all_data[key][val];
            delete all_data[key][val];
          }
        }
        // process ontology type
        if (key == 'type') {
          for (const val in all_data[key]) {
            all_data['type'][this.getHumanReadableValue(val)] = all_data[key][val];
            delete all_data[key][val];
          }
        }
        all_data[key] = Object.entries(all_data[key]).sort(function (a, b) {
          return b[1] - a[1];
        });
      }
      this.data.next(all_data);
    }
  }
  updatePaperAggregation(paper_published, value) {
    if (value === 'true') {
      paper_published = this.updateAggregation(paper_published, 'Yes');
    } else {
      paper_published = this.updateAggregation(paper_published, 'No');
    }
    return paper_published;
  }
  static #_ = this.ɵfac = function AggregationService_Factory(t) {
    return new (t || AggregationService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AggregationService,
    factory: AggregationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6401:
/*!**********************************************!*\
  !*** ./src/app/services/api-data.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiDataService: () => (/* binding */ ApiDataService)
/* harmony export */ });
/* harmony import */ var _host_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./host-setting */ 8220);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 9400);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1995);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/constants */ 951);
/* harmony import */ var _shared_common_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common_functions */ 6023);
/* harmony import */ var _shared_protocolnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/protocolnames */ 8122);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.service */ 9885);
/* harmony import */ var _api_filters_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api-filters.service */ 724);











class ApiDataService {
  constructor(http, _userService, apiFiltersService) {
    this.http = http;
    this._userService = _userService;
    this.apiFiltersService = apiFiltersService;
    this.hostSetting = new _host_setting__WEBPACK_IMPORTED_MODULE_0__.HostSetting();
  }
  getGSearchData(sterm) {
    const url = `${this.hostSetting.host}data/_gsearch/?sterm=${sterm}`;
    const json_data = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      for (const [key, value] of Object.entries(data)) {
        json_data[key] = {
          totalHits: value['hits']['total']['value'],
          searchTerms: value['search_terms'] || []
        };
      }
      return json_data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllFiles(query, size) {
    const url = `${this.hostSetting.host}data/file/_search/?size=${size}`;
    const aggs = {
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'fileName': 'name',
      'study': 'study.accession',
      'experiment': 'experiment.accession',
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'specimen': 'specimen',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        fileName: entry['_id'],
        study: entry['_source']['study']['accession'],
        experiment: entry['_source']['experiment']['accession'],
        species: entry['_source']['species']['text'],
        assayType: entry['_source']['experiment']['assayType'],
        target: entry['_source']['experiment']['target'],
        specimen: entry['_source']['specimen'],
        instrument: entry['_source']['run']['instrument'],
        standard: entry['_source']['experiment']['standardMet'],
        paperPublished: entry['_source']['paperPublished'],
        submitterEmail: entry['_source']['submitterEmail']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getEnsemblAnnotationData(projectArr, sort, offset) {
    const res = {};
    const project_filter = JSON.stringify({
      'project.keyword': projectArr
    });
    const url = `${this.hostSetting.host}data/ensembl_annotation/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data['hits']['hits'].map(ele => ele['_source']);
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getTrackhubsData() {
    const res = {};
    const url = `${this.hostSetting.host}data/trackhubs/_search/?size=10`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data['hits']['hits'].map(ele => ele['_source']);
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  downloadRecords(index, mapping, query) {
    const url = `${this.hostSetting.host}data/${index}/download/`;
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (mapping[prop] && prop !== mapping[prop]) {
        filters[mapping[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('columns', JSON.stringify(query['columns'])).set('file_format', query['file_format']);
    const fullURL = `${url}?${params.toString()}`;
    return this.http.get(fullURL, {
      responseType: 'blob'
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  downloadGraphqlRecords(selectedIndicesArray, selectedColumns, query, queryName) {
    const url = `${this.hostSetting.host}graphql/download`;
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('selected_indices', JSON.stringify(selectedIndicesArray)).set('selected_columns', JSON.stringify(selectedColumns)).set('query', JSON.stringify(query)).set('query_name', JSON.stringify(queryName));
    const fullURL = `${url}?${params.toString()}`;
    return this.http.get(fullURL, {
      responseType: 'blob'
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllFilesForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/file/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          name: entry['_source']['name'],
          fileId: entry['_id'],
          experiment: entry['_source']['experiment']['accession'],
          assayType: entry['_source']['experiment']['assayType'],
          experimentTarget: entry['_source']['experiment']['target'],
          run: entry['_source']['run']['accession'],
          readableSize: entry['_source']['readableSize'],
          checksum: entry['_source']['checksum'],
          checksumMethod: entry['_source']['checksumMethod'],
          url: entry['_source']['url'],
          secondaryProject: entry['_source']['secondaryProject'].toString(),
          private: entry['_source']['private']
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: projectArr
      });
      const url = `${this.hostSetting.host}data/file/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          name: entry['_source']['name'],
          fileId: entry['_id'],
          experiment: entry['_source']['experiment']['accession'],
          assayType: entry['_source']['experiment']['assayType'],
          experimentTarget: entry['_source']['experiment']['target'],
          run: entry['_source']['run']['accession'],
          readableSize: entry['_source']['readableSize'],
          checksum: entry['_source']['checksum'],
          checksumMethod: entry['_source']['checksumMethod'],
          url: entry['_source']['url'],
          secondaryProject: entry['_source']['secondaryProject'].toString(),
          private: false
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  getAllDatasetsForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/dataset/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          datasetAccession: entry['_source']['accession'],
          title: entry['_source']['title'],
          species: entry['_source']['species'][0]['text'],
          archive: entry['_source']['archive'][0],
          assayType: entry['_source']['assayType'][0],
          numberOfExperiments: entry['_source']['experiment'].length,
          numberOfSpecimens: entry['_source']['specimen'].length,
          numberOfFiles: entry['_source']['file'].length,
          standard: entry['_source']['standardMet'],
          private: entry['_source']['private']
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: projectArr
      });
      let url = `${this.hostSetting.host}data/dataset/_search/?size=10&filters=${project_filter}&from_=${offset}&search=${search}`;
      const sort_field = sort.split(':')[0];
      if (sort_field === 'experiment' || sort_field === 'specimen' || sort_field === 'file') {
        url = url + '&sort_by_count=' + sort;
      } else {
        url = url + '&sort=' + sort;
      }
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          datasetAccession: entry['_source']['accession'],
          title: entry['_source']['title'],
          species: entry['_source']['species'][0]['text'],
          archive: entry['_source']['archive'][0],
          assayType: entry['_source']['assayType'][0],
          numberOfExperiments: entry['_source']['experiment'].length,
          numberOfSpecimens: entry['_source']['specimen'].length,
          numberOfFiles: entry['_source']['file'].length,
          standard: entry['_source']['standardMet'],
          secondaryProject: entry['_source']['secondaryProject'].toString(),
          private: false
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  getFile(fileId, mode) {
    let url = `${this.hostSetting.host}data/file/${fileId}`;
    if (mode === 'private') {
      url = 'https://api.faang.org/private_portal/file/' + fileId;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getFilesByRun(runId, sort, offset, search, mode) {
    const run_filter = JSON.stringify({
      'run.accession': [runId]
    });
    let url = `${this.hostSetting.host}data/file/_search/?filters=${run_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/file/${runId}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    const res = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits;
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getExperimentByAccession(experimentId) {
    const url = `${this.hostSetting.host}data/experiment/${experimentId}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllOntologiesWorkshop(query, size) {
    const url = `${this.hostSetting.host}data/ontologies_test/_search/?size=${size}`;
    const aggs = {
      'projects': 'projects',
      'type': 'type'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => entry['_source']);
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllOntologies(query, size) {
    const url = `${this.hostSetting.host}data/ontologies/_search/?size=${size}`;
    const aggs = {
      'projects': 'projects',
      'type': 'type',
      'status_activity': 'status_activity'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => entry['_source']);
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      // status_activity is a special case as a nested property is used for the aggregate
      if ('status_activity' in res['aggregations']) {
        res['aggregations']['status_activity'] = res['aggregations']['status_activity']['status'];
        // do not display Awaiting Assessment in filter list
        res['aggregations']['status_activity']['buckets'] = res['aggregations']['status_activity']['buckets'].filter(ele => ele['key'] !== 'Awaiting Assessment');
      }
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getOntologyById(ontologyId, ontologies_type) {
    const url = `${this.hostSetting.host}data/${ontologies_type}/${ontologyId}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data.hits.hits[0]['_source'];
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllOrganisms(query, size) {
    const url = `${this.hostSetting.host}data/organism/_search/?size=${size}`;
    const aggs = {
      'sex': 'sex.text',
      'organism': 'organism.text',
      'breed': 'breed.text',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'bioSampleId': 'biosampleId',
      'sex': 'sex.text',
      'organism': 'organism.text',
      'breed': 'breed.text',
      'standard': 'standardMet',
      'idNumber': 'id_number',
      'paper_published': 'paperPublished'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        bioSampleId: entry['_source']['biosampleId'],
        sex: entry['_source']['sex']['text'],
        organism: entry['_source']['organism']['text'],
        breed: entry['_source']['breed']['text'],
        standard: entry['_source']['standardMet'],
        idNumber: entry['_source']['id_number'],
        paperPublished: entry['_source']['paperPublished']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllOrganismsFromProject(projectArr, mode, sort, offset, search) {
    const res = {};
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/organism/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          private: this.checkPrivateData(entry['_source']['customField'])
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: projectArr
      });
      const url = `${this.hostSetting.host}data/organism/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          secondaryProject: entry['_source']['secondaryProject'].toString(),
          private: this.checkPrivateData(entry['_source']['customField'])
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  checkPrivateData(entry) {
    for (const data of entry) {
      if (data['name'] === 'BovReg private submission') {
        return true;
      }
    }
    return false;
  }
  getOrganism(biosampleId, mode) {
    let url = `${this.hostSetting.host}data/organism/${biosampleId}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/organism/${biosampleId}/`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getOrganismsSpecimens(biosampleId, sort, offset, mode, search) {
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/specimen/?q=organism.biosampleId:${biosampleId}&size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const organism_filter = JSON.stringify({
        'organism.biosampleId': [biosampleId]
      });
      const url = `${this.hostSetting.host}data/specimen/_search/?filters=${organism_filter}&sort=${sort}&size=10&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  getAllSpecimensForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/specimen/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: this.checkField(entry['_source']['material']),
          organismpart_celltype: this.checkField(entry['_source']['cellType']),
          sex: this.checkField(entry['_source']['organism']['sex']),
          organism: this.checkField(entry['_source']['organism']['organism']),
          breed: this.checkField(entry['_source']['organism']['breed']),
          private: this.checkPrivateData(entry['_source']['customField'])
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: projectArr
      });
      const url = `${this.hostSetting.host}data/specimen/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits.map(entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: this.checkField(entry['_source']['material']),
          organismpart_celltype: this.checkField(entry['_source']['cellType']),
          sex: this.checkField(entry['_source']['organism']['sex']),
          organism: this.checkField(entry['_source']['organism']['organism']),
          breed: this.checkField(entry['_source']['organism']['breed']),
          secondaryProject: entry['_source']['secondaryProject'].toString(),
          private: this.checkPrivateData(entry['_source']['customField'])
        }));
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  getAllProtocolSamplesForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: projectArr
    });
    const url = `${this.hostSetting.host}data/protocol_samples/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_name: entry['_source']['protocolName'],
        university_name: entry['_source']['universityName'],
        protocol_date: entry['_source']['protocolDate'],
        secondaryProject: entry['_source']['secondaryProject'].toString()
      }));
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllProtocolFilesForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: projectArr
    });
    const url = `${this.hostSetting.host}data/protocol_files/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_type: _shared_protocolnames__WEBPACK_IMPORTED_MODULE_3__.protocolNames[entry['_source']['name']],
        experiment_target: entry['_source']['experimentTarget'],
        assay_type: entry['_source']['assayType'],
        secondaryProject: entry['_source']['secondaryProject'].toString()
      }));
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllProtocolAnalysisForProject(projectArr, mode, sort, offset, search) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: projectArr
    });
    const url = `${this.hostSetting.host}data/protocol_analysis/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_name: entry['_source']['protocolName'],
        university_name: entry['_source']['universityName'],
        protocol_date: entry['_source']['protocolDate'],
        secondaryProject: entry['_source']['secondaryProject'].toString()
      }));
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllSpecimens(query, size) {
    const url = `${this.hostSetting.host}data/specimen/_search/?size=${size}`;
    const aggs = {
      'standard': 'standardMet',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'bioSampleId': 'biosampleId',
      'standard': 'standardMet',
      'id_number': 'id_number',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished',
      'trackhubUrl': 'trackhubUrl'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        bioSampleId: entry['_source']['biosampleId'],
        material: this.checkField(entry['_source']['material']),
        organismpart_celltype: this.checkField(entry['_source']['cellType']),
        sex: this.checkField(entry['_source']['organism']['sex']),
        organism: this.checkField(entry['_source']['organism']['organism']),
        breed: this.checkField(entry['_source']['organism']['breed']),
        standard: entry['_source']['standardMet'],
        idNumber: entry['_source']['id_number'],
        paperPublished: entry['_source']['paperPublished'],
        trackhubUrl: entry['_source']['trackhubUrl']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  // Todo preserve JSON structure on backend part
  checkField(field) {
    if (field && typeof field !== 'undefined') {
      return field['text'];
    } else {
      return '';
    }
  }
  getSpecimen(biosampleId, mode) {
    let url = `${this.hostSetting.host}data/specimen/${biosampleId}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/specimen/${biosampleId}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getSpecimenFiles(biosampleId, sort, offset, search) {
    const specimen_filter = JSON.stringify({
      specimen: [biosampleId]
    });
    const url = `${this.hostSetting.host}data/file/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits;
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getSpecimenRelationships(biosampleId, sort, offset, search) {
    const specimen_filter = JSON.stringify({
      allDeriveFromSpecimens: [biosampleId]
    });
    const url = `${this.hostSetting.host}data/specimen/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits;
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllDatasets(query, size) {
    const url = `${this.hostSetting.host}data/dataset/_search/?size=${size}`;
    const aggs = {
      'archive': 'archive',
      'species': 'species.text',
      'assay_type': 'assayType',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'datasetAccession': 'accession',
      'title': 'title',
      'species': 'species.text',
      'archive': 'archive',
      'assayType': 'assayType',
      'numberOfExperiments': 'experiment',
      'numberOfSpecimens': 'specimen',
      'numberOfFiles': 'file',
      'standard': 'standardMet',
      'paper_published': 'paperPublished'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    if (query['sort'][0] === 'numberOfExperiments' || query['sort'][0] === 'numberOfSpecimens' || query['sort'][0] === 'numberOfFiles') {
      params = params.set('sort_by_count', sortParams);
    } else {
      params = params.set('sort', sortParams);
    }
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        datasetAccession: entry['_source']['accession'],
        title: entry['_source']['title'],
        species: this.getSpeciesStr(entry),
        archive: entry['_source']['archive'].toString(),
        assayType: entry['_source']['assayType'].toString(),
        numberOfExperiments: entry['_source']['experiment']['length'],
        numberOfSpecimens: entry['_source']['specimen']['length'],
        numberOfFiles: entry['_source']['file']['length'],
        standard: entry['_source']['standardMet'],
        paperPublished: entry['_source']['paperPublished'],
        submitterEmail: entry['_source']['submitterEmail']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getSpeciesStr(dataset) {
    const species = dataset['_source']['species'];
    let value = '';
    for (let i = species.length - 1; i >= 0; i--) {
      value += species[i]['text'] + ',';
    }
    return value.substring(0, value.length - 1);
  }
  getDataset(accession, mode) {
    let url = `${this.hostSetting.host}data/dataset/${accession}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/dataset/${accession}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllAnalyses(query, size) {
    const url = `${this.hostSetting.host}data/analysis/_search/?size=${size}`;
    const aggs = {
      'dataset': 'datasetAccession',
      'species': 'organism.text',
      'assay_type': 'assayType',
      'analysis_type': 'analysisType',
      'standard': 'standardMet',
      'project': 'secondaryProject'
    };
    const mapping = {
      'accession': 'accession',
      'datasetAccession': 'datasetAccession',
      'title': 'title',
      'species': 'organism.text',
      'assayType': 'assayType',
      'analysisType': 'analysisType',
      'standard': 'standardMet'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        accession: entry['_source']['accession'],
        datasetAccession: entry['_source']['datasetAccession'],
        title: entry['_source']['title'],
        species: entry['_source']['organism']['text'],
        assayType: entry['_source']['assayType'],
        analysisType: (0,_shared_common_functions__WEBPACK_IMPORTED_MODULE_2__.replaceUnderscoreWithSpace)(entry['_source']['analysisType']),
        standard: entry['_source']['standardMet']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAnalysesBySample(sampleId, sort, offset, search) {
    const specimen_filter = JSON.stringify({
      sampleAccessions: [sampleId]
    });
    const url = `${this.hostSetting.host}data/analysis/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits;
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAnalysesByDataset(accession, sort, offset, mode, search) {
    const res = {};
    if (mode === 'private') {
      const url = `${this.hostSetting.host}private_portal/analysis/?q=datasetAccession:${accession}&size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    } else {
      const dataset_filter = JSON.stringify({
        datasetAccession: [accession]
      });
      const url = `${this.hostSetting.host}data/analysis/_search/?filters=${dataset_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
  }
  getAnalysis(accession, mode) {
    let url = `${this.hostSetting.host}data/analysis/${accession}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/analysis/${accession}`;
      return this.http.get(url, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpHeaders({
          'Authorization': `jwt ${this._userService.token}`
        })
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
    }
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllArticlesForProject(projectArr, sort, offset, search) {
    const project_filter = JSON.stringify({
      secondaryProject: projectArr
    });
    const url = `${this.hostSetting.host}data/article/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        id: entry['_id'],
        title: entry['_source']['title'],
        year: entry['_source']['year'],
        journal: entry['_source']['journal'],
        datasetSource: entry['_source']['datasetSource'],
        secondaryProject: entry['_source']['secondaryProject'].toString()
      }));
      res['totalHits'] = data.hits.total.value;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllPipelinesForProject(project) {
    const url = this.hostSetting.relatedProjectsHost + project.toLowerCase() + '/pipelines.tsv';
    let pipelineArr = [];
    return this.http.get(url, {
      responseType: 'text'
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      const lineArr = data.split('\n');
      pipelineArr = lineArr.map(line => {
        const [name, assayType, link, documentation, platform] = line.split('\t');
        return {
          name,
          assayType,
          link,
          documentation,
          platform
        };
      }).filter(ele => ele.name !== 'Pipeline name' && ele.assayType !== 'Assay type');
      return pipelineArr;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(error => {
      if (!(error.error instanceof ErrorEvent)) {
        if (error.status === 404) {
          return rxjs__WEBPACK_IMPORTED_MODULE_10__.EMPTY.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
            return [];
          }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(() => 'Something bad happened; please try again later.');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(() => error);
    }));
  }
  getAllArticles(query, size) {
    const url = `${this.hostSetting.host}data/article/_search/?size=${size}`;
    const aggs = {
      'year': 'year',
      'journal': 'journal',
      'datasetSource': 'datasetSource',
      'project': 'secondaryProject',
      'source': 'source'
    };
    const mapping = {
      'title': 'title',
      'year': 'year',
      'journal': 'journal',
      'datasetSource': 'datasetSource',
      'source': 'source'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        id: entry['_id'],
        title: entry['_source']['title'],
        year: entry['_source']['year'],
        journal: entry['_source']['journal'],
        datasetSource: entry['_source']['datasetSource'],
        source: entry['_source']['source']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getArticle(id) {
    const url = `${this.hostSetting.host}data/article/${id}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllSamplesProtocols(query, size) {
    const url = `${this.hostSetting.host}data/protocol_samples/_search/?size=${size}`;
    const aggs = {
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_name: entry['_source']['protocolName'],
        university_name: entry['_source']['universityName'],
        protocol_date: entry['_source']['protocolDate']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getSampleProtocol(id) {
    const url = `${this.hostSetting.host}data/protocol_samples/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllAnalysisProtocols(query, size) {
    const url = `${this.hostSetting.host}data/protocol_analysis/_search/?size=${size}`;
    const aggs = {
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_name: entry['_source']['protocolName'],
        university_name: entry['_source']['universityName'],
        protocol_date: entry['_source']['protocolDate']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAnalysisProtocol(id) {
    const url = `${this.hostSetting.host}data/protocol_analysis/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getAllExperimentsProtocols(query, size) {
    const url = `${this.hostSetting.host}data/protocol_files/_search/?size=${size}`;
    const aggs = {
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && prop !== aggs[prop]) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    // set the service variable current_api_filters with the current filters for global use
    this.apiFiltersService.set_current_api_filters(filters);
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1];
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {
      params: params
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      res['data'] = data.hits.hits.map(entry => ({
        key: entry['_source']['key'],
        protocol_type: _shared_protocolnames__WEBPACK_IMPORTED_MODULE_3__.protocolNames[entry['_source']['name']] ? _shared_protocolnames__WEBPACK_IMPORTED_MODULE_3__.protocolNames[entry['_source']['name']] : entry['_source']['name'],
        experiment_target: entry['_source']['experimentTarget'],
        assay_type: entry['_source']['assayType']
      }));
      res['totalHits'] = data.hits.total.value;
      res['aggregations'] = data.aggregations;
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getExperimentProtocol(id) {
    const url = `${this.hostSetting.host}data/protocol_files/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getOrganismSummary(id) {
    const url = `${this.hostSetting.host}data/summary_organism/${id}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getSpecimenSummary(id) {
    const url = `${this.hostSetting.host}data/summary_specimen/${id}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getDatasetSummary(id) {
    const url = `${this.hostSetting.host}data/summary_dataset/${id}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getFileSummary(id) {
    const url = `${this.hostSetting.host}data/summary_file/${id}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getRulesetSample(category) {
    let rule_type;
    if (category === 'standard') {
      rule_type = 'core';
      category = 'core';
    } else {
      if (category.indexOf('teleostei') !== -1) {
        rule_type = 'module';
        category = category.replace('teleostei', 'teleost');
      } else {
        rule_type = 'type';
        if (category === 'specimen_standard_rules') {
          category = 'specimen';
        }
      }
    }
    const url = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.ruleset_prefix_new + `${rule_type}/samples/faang_samples_${category}.metadata_rules.json`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getRulesetExperiment(category) {
    let rule_type;
    if (category === 'standard') {
      rule_type = 'core';
      category = 'core';
    } else if (category === 'chip-seq_dna-binding_proteins' || category === 'chip-seq_input_dna') {
      rule_type = 'module';
    } else {
      rule_type = 'type';
      if (category === 'chip-seq_standard_rules') {
        category = 'chip-seq';
      }
    }
    const url = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.ruleset_prefix_new + `${rule_type}/experiments/faang_experiments_${category}.metadata_rules.json`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  getRulesetAnalysis(category) {
    let rule_type;
    if (category === 'eva') {
      rule_type = 'module';
    } else {
      rule_type = 'type';
    }
    const url = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.ruleset_prefix_new + `${rule_type}/analyses/faang_analyses_${category}.metadata_rules.json`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  startValidation(submission_type, task_id, room_id, rules_type) {
    const url = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url + '/validation/' + submission_type + '/' + rules_type + '/' + task_id + '/' + room_id;
    return this.http.get(url);
  }
  startConversion(task_id, room_id, rules_type) {
    const url = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url + '/submission/' + rules_type + '/' + task_id + '/' + room_id;
    return this.http.get(url);
  }
  getTemplate(task_id, room_id, data_type, action) {
    const url = `${_shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url}/submission/get_template/${task_id}/${room_id}/${data_type}/${action}`;
    return this.http.get(url);
  }
  chooseDomain(username, password, mode, room_id, private_submission) {
    const url = `${_shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url}/submission/samples/${room_id}/choose_domain`;
    return this.http.post(url, {
      username: username,
      password: password,
      mode: mode,
      private_submission: private_submission
    });
  }
  submitDomain(username, password, mode, domain_name, domain_description, room_id, private_submission) {
    const url = `${_shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url}/submission/samples/${room_id}/submit_domain`;
    return this.http.post(url, {
      username: username,
      password: password,
      mode: mode,
      domain_name: domain_name,
      domain_description: domain_description,
      private_submission: private_submission
    });
  }
  submitRecords(action, username, password, mode, room_id, task_id, submission_type, private_submission, domain_name = '') {
    const url = `${_shared_constants__WEBPACK_IMPORTED_MODULE_1__.validation_service_url}/submission/${action}/${submission_type}/${task_id}/${room_id}/submit_records`;
    if (domain_name !== '') {
      return this.http.post(url, {
        username: username,
        password: password,
        mode: mode,
        domain_name: domain_name,
        private_submission: private_submission
      });
    } else {
      return this.http.post(url, {
        username: username,
        password: password,
        mode: mode,
        private_submission: private_submission
      });
    }
  }
  get_pubsub_messages() {
    const url = `${this.hostSetting.host}data/submission_portal_status/_search/?size=1`;
    const mapping = {
      'enaStatus': 'ena_status',
      'biosampleStatus': 'biosample_status'
    };
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      const res = data.hits.hits.map(entry => ({
        enaStatus: entry['_source']['ena_status'],
        biosampleStatus: entry['_source']['biosample_status']
      }));
      return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.retry)(3), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(this.handleError));
  }
  subscribeUser(indexName, indexKey, subscriberEmail, filters) {
    const url = `${this.hostSetting.host}submission/submission_subscribe_faang/${indexName}/${indexKey}/${subscriberEmail}`;
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('filters', JSON.stringify(filters));
    return this.http.get(url, {
      params: params
    });
  }
  subscribeFilteredData(indexName, indexKey, subscriberEmail) {
    const filters = this.apiFiltersService.get_current_api_filters();
    const url = `${this.hostSetting.host}submission/submission_subscribe_faang/${indexName}/${indexKey}/${subscriberEmail}`;
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpParams().set('filters', JSON.stringify(filters));
    return this.http.get(url, {
      params: params
    });
  }
  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network errorSubject occurred. Handle it accordingly.
      console.error('An errorSubject occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      console.error(error);
    }
    // return an observable with a user-facing errorSubject message
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)(error);
  }
  static #_ = this.ɵfac = function ApiDataService_Factory(t) {
    return new (t || ApiDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_api_filters_service__WEBPACK_IMPORTED_MODULE_5__.ApiFiltersService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({
    token: ApiDataService,
    factory: ApiDataService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 724:
/*!*************************************************!*\
  !*** ./src/app/services/api-filters.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiFiltersService: () => (/* binding */ ApiFiltersService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class ApiFiltersService {
  constructor() {}
  set_current_api_filters(filters) {
    this.current_api_filters = filters;
  }
  get_current_api_filters() {
    return this.current_api_filters;
  }
  static #_ = this.ɵfac = function ApiFiltersService_Factory(t) {
    return new (t || ApiFiltersService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: ApiFiltersService,
    factory: ApiFiltersService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 1544:
/*!**************************************************!*\
  !*** ./src/app/services/filter-state.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterStateService: () => (/* binding */ FilterStateService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _aggregation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aggregation.service */ 9396);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);



class FilterStateService {
  constructor(aggregationService, router) {
    this.aggregationService = aggregationService;
    this.router = router;
  }
  updateUrlParams(queryObj, componentRoute) {
    // setting urls params based on filters
    const aggrSubscription = this.aggregationService.field.subscribe(data => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      //update url for search term and sorting
      if (queryObj['search']) {
        params['searchTerm'] = queryObj['search'];
      }
      if (queryObj['sort']) {
        params['sortTerm'] = queryObj['sort'][0];
        params['sortDirection'] = queryObj['sort'][1];
      }
      this.router.navigate(componentRoute, {
        queryParams: params,
        replaceUrl: true,
        skipLocationChange: false
      });
    });
    return aggrSubscription;
  }
  setUpAggregationFilters(params) {
    // set up filters on pageLoad based on queryParams
    const filters = {};
    for (const key in params) {
      if (key !== 'searchTerm' && key !== 'sortTerm' && key !== 'sortDirection' && key !== 'pageIndex') {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
    }
    this.aggregationService.field.next(this.aggregationService.active_filters);
    return filters;
  }
  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
  }
  static #_ = this.ɵfac = function FilterStateService_Factory(t) {
    return new (t || FilterStateService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_aggregation_service__WEBPACK_IMPORTED_MODULE_0__.AggregationService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: FilterStateService,
    factory: FilterStateService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8220:
/*!******************************************!*\
  !*** ./src/app/services/host-setting.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HostSetting: () => (/* binding */ HostSetting)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);

class HostSetting {
  constructor() {
    this.host = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host;
    this.relatedProjectsHost = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.relatedProjectsHost;
  }
  getHost() {
    return this.host;
  }
  setHost(host) {
    this.host = host;
  }
}

/***/ }),

/***/ 9885:
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserService: () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal/Subject */ 819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class UserService {
  constructor(http) {
    this.http = http;
    this.loginSuccess = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_0__.Subject();
    // error messages received from the login attempt
    this.errors = [];
    this.httpOptions = {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  login(user) {
    this.http.post('https://api.faang.org/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(data => {
      console.log('login success', data);
      this.loginSuccess.next(true);
      this.updateData(data['token']);
    }, err => {
      console.error('login error', err);
      this.errors = err['error'];
    });
  }
  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  refreshToken() {
    this.http.post('https://api.faang.org/api-token-refresh/', JSON.stringify({
      token: this.token
    }), this.httpOptions).subscribe(data => {
      console.log('refresh success', data);
      this.updateData(data['token']);
    }, err => {
      console.error('refresh error', err);
      this.errors = err['error'];
    });
  }
  testToken() {
    this.http.get('https://api.faang.org/private_portal/organism/', {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
        'Authorization': `jwt ${this.token}`
      })
    }).subscribe(data => {
      console.log(data);
    });
  }
  logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }
  updateData(token) {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
  static #_ = this.ɵfac = function UserService_Factory(t) {
    return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: UserService,
    factory: UserService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 7092:
/*!*****************************************************************!*\
  !*** ./src/app/shared/active-filter/active-filter.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveFilterComponent: () => (/* binding */ ActiveFilterComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_aggregation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/aggregation.service */ 9396);



function ActiveFilterComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ActiveFilterComponent_For_1_Template_button_click_0_listener() {
      const field_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.clearFilter(field_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 2)(2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "i", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "highlight_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const field_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](field_r2);
  }
}
class ActiveFilterComponent {
  constructor(aggregationService) {
    this.aggregationService = aggregationService;
    this.aggs = [];
    this.data = {};
  }
  ngOnInit() {
    this.aggs = this.aggregationService.current_active_filters;
    this.data = this.aggregationService.active_filters;
    this.aggregationService.field.subscribe(data => {
      this.aggs = this.aggregationService.current_active_filters;
      this.data = this.aggregationService.active_filters;
    });
  }
  clearFilter(field) {
    const index = this.aggregationService.current_active_filters.indexOf(field);
    this.aggregationService.current_active_filters.splice(index, 1);
    for (const key of Object.keys(this.data)) {
      const my_index = this.data[key].indexOf(field);
      if (my_index > -1) {
        this.data[key].splice(my_index, 1);
      }
    }
    this.aggregationService.field.next(this.data);
  }
  static #_ = this.ɵfac = function ActiveFilterComponent_Factory(t) {
    return new (t || ActiveFilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_aggregation_service__WEBPACK_IMPORTED_MODULE_0__.AggregationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ActiveFilterComponent,
    selectors: [["app-active-filter"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 0,
    consts: [["mat-raised-button", "", 1, "filter-button"], ["mat-raised-button", "", 1, "filter-button", 3, "click"], [2, "display", "flex", "align-items", "center"], [1, "material-icons"]],
    template: function ActiveFilterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](0, ActiveFilterComponent_For_1_Template, 6, 1, "button", 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](ctx.aggs);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton],
    styles: [".filter-button[_ngcontent-%COMP%] {\n  margin-left: 5px;\n  font-size: 14px;\n  background-color: #477AAF;\n  color: white;\n}\n\ni[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2FjdGl2ZS1maWx0ZXIvYWN0aXZlLWZpbHRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbHRlci1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0NzdBQUY7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuaSB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 6023:
/*!********************************************!*\
  !*** ./src/app/shared/common_functions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allowMultiple: () => (/* binding */ allowMultiple),
/* harmony export */   allowMultipleOld: () => (/* binding */ allowMultipleOld),
/* harmony export */   convertArrayToStr: () => (/* binding */ convertArrayToStr),
/* harmony export */   convertToSnakeCase: () => (/* binding */ convertToSnakeCase),
/* harmony export */   expandObject: () => (/* binding */ expandObject),
/* harmony export */   generateEbiOntologyLink: () => (/* binding */ generateEbiOntologyLink),
/* harmony export */   generateEbiOntologyLinkOld: () => (/* binding */ generateEbiOntologyLinkOld),
/* harmony export */   getCellClass: () => (/* binding */ getCellClass),
/* harmony export */   getIssues: () => (/* binding */ getIssues),
/* harmony export */   getMandatoryRulesOnly: () => (/* binding */ getMandatoryRulesOnly),
/* harmony export */   getMandatoryRulesOnlyOld: () => (/* binding */ getMandatoryRulesOnlyOld),
/* harmony export */   getOntologyTermFromIRI: () => (/* binding */ getOntologyTermFromIRI),
/* harmony export */   getProtocolLink: () => (/* binding */ getProtocolLink),
/* harmony export */   getValidItems: () => (/* binding */ getValidItems),
/* harmony export */   getValidItemsOld: () => (/* binding */ getValidItemsOld),
/* harmony export */   makeid: () => (/* binding */ makeid),
/* harmony export */   ols_prefix: () => (/* binding */ ols_prefix),
/* harmony export */   replaceUnderscoreWithSpace: () => (/* binding */ replaceUnderscoreWithSpace),
/* harmony export */   replaceUnderscoreWithSpaceAndCapitalize: () => (/* binding */ replaceUnderscoreWithSpaceAndCapitalize)
/* harmony export */ });
/* harmony import */ var _fieldnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fieldnames */ 8960);

function replaceUnderscoreWithSpace(data) {
  if (data) {
    if (data.indexOf('_') !== -1) {
      return data.split('_').join(' ');
    } else {
      return data;
    }
  }
}
function replaceUnderscoreWithSpaceAndCapitalize(data) {
  return data.split('_').map(item => item.charAt(0).toUpperCase() + item.substring(1)).join(' ');
}
function convertArrayToStr(data, subelement) {
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
function allowMultiple(data) {
  if ('items' in data) {
    return 'Yes';
  }
  return 'No';
}
function allowMultipleOld(rule) {
  if (rule && rule['allow_multiple'] === 1) {
    return 'Yes';
  } else {
    return 'No';
  }
}
// extract data from given object into a key-value mapping
function expandObject(data, result) {
  const type_value = typeof data;
  // if the given data is not an object, no data can be extracted, just return the existing result
  if (type_value !== 'object') {
    return result;
  }
  //  given data is an object, iterate its key values
  for (const key in data) {
    if (key in _fieldnames__WEBPACK_IMPORTED_MODULE_0__.FIELD_NAMES) {
      // known key values
      if (typeof data[key] === 'object') {
        // some fields have sub elements, like ontologyTerms, units
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
    } else {
      // not known key values, could be one of the cases: excluded field name, section name or totally unexpected
      if (key in _fieldnames__WEBPACK_IMPORTED_MODULE_0__.EXCLUDED_FIELD_NAMES) {
        continue;
      } else {
        result = expandObject(data[key], result);
      }
    }
  }
  return result;
}
function getValidItems(rule, section_name) {
  if (rule[section_name]) {
    return rule[section_name]['enum'];
  }
  return '';
}
function getValidItemsOld(rule, section_name) {
  if (rule[section_name]) {
    return rule[section_name].map(function (el) {
      return '"' + el + '"';
    }).join(', ');
  }
  return '';
}
function getOntologyTermFromIRI(iri) {
  if (iri.indexOf('/') > -1) {
    return iri.split('/').slice(-1)[0];
  } else {
    return '';
  }
}
const ols_prefix = 'https://www.ebi.ac.uk/ols/ontologies/';
function generateEbiOntologyLink(ontology_name, term_iri) {
  let ontology_url;
  if (ontology_name === 'EFO') {
    ontology_url = 'http://www.ebi.ac.uk/efo/';
  } else {
    ontology_url = 'http://purl.obolibrary.org/obo/';
  }
  return ols_prefix + ontology_name + '/terms?iri=' + ontology_url + term_iri.replace(':', '_');
}
function generateEbiOntologyLinkOld(ontology_name, term_iri) {
  return ols_prefix + ontology_name + '/terms?iri=' + term_iri;
}
function getMandatoryRulesOnly(data) {
  const data_to_return = {
    'properties': {}
  };
  for (const key of Object.keys(data['properties'])) {
    if ('properties' in data['properties'][key] && data['properties'][key]['properties']['mandatory']['const'] === 'mandatory') {
      data_to_return['properties'][key] = data['properties'][key];
    } else if ('items' in data['properties'][key] && data['properties'][key]['items']['properties']['mandatory']['const'] === 'mandatory') {
      data_to_return['properties'][key] = data['properties'][key];
    }
  }
  return data_to_return;
}
function getMandatoryRulesOnlyOld(data) {
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
function convertToSnakeCase(id) {
  return id.replace(/\s+/g, '_');
}
function getProtocolLink(url) {
  if (url) {
    let link;
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
  return '';
}
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function getIssues(issues_list, issue_type) {
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
function getCellClass(issues_list, issue_type) {
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

/***/ }),

/***/ 951:
/*!*************************************!*\
  !*** ./src/app/shared/constants.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analysis_metadata_template_with_examples: () => (/* binding */ analysis_metadata_template_with_examples),
/* harmony export */   analysis_metadata_template_without_examples: () => (/* binding */ analysis_metadata_template_without_examples),
/* harmony export */   experiment_metadata_template_with_examples: () => (/* binding */ experiment_metadata_template_with_examples),
/* harmony export */   experiment_metadata_template_without_examples: () => (/* binding */ experiment_metadata_template_without_examples),
/* harmony export */   external_biosample_prefix: () => (/* binding */ external_biosample_prefix),
/* harmony export */   external_doi_prefix: () => (/* binding */ external_doi_prefix),
/* harmony export */   external_ena_prefix: () => (/* binding */ external_ena_prefix),
/* harmony export */   external_epmc_prefix: () => (/* binding */ external_epmc_prefix),
/* harmony export */   external_ols_prefix: () => (/* binding */ external_ols_prefix),
/* harmony export */   external_pubmed_prefix: () => (/* binding */ external_pubmed_prefix),
/* harmony export */   female_values: () => (/* binding */ female_values),
/* harmony export */   graphql_server_endpoint: () => (/* binding */ graphql_server_endpoint),
/* harmony export */   graphql_ws_url: () => (/* binding */ graphql_ws_url),
/* harmony export */   internal_dataset: () => (/* binding */ internal_dataset),
/* harmony export */   internal_organism: () => (/* binding */ internal_organism),
/* harmony export */   internal_specimen: () => (/* binding */ internal_specimen),
/* harmony export */   issue_type: () => (/* binding */ issue_type),
/* harmony export */   male_values: () => (/* binding */ male_values),
/* harmony export */   missing_values: () => (/* binding */ missing_values),
/* harmony export */   published_article_source: () => (/* binding */ published_article_source),
/* harmony export */   record_type: () => (/* binding */ record_type),
/* harmony export */   ruleset_prefix_new: () => (/* binding */ ruleset_prefix_new),
/* harmony export */   ruleset_prefix_old: () => (/* binding */ ruleset_prefix_old),
/* harmony export */   sample_biosample_update_template: () => (/* binding */ sample_biosample_update_template),
/* harmony export */   sample_metadata_template_with_examples: () => (/* binding */ sample_metadata_template_with_examples),
/* harmony export */   sample_metadata_template_without_examples: () => (/* binding */ sample_metadata_template_without_examples),
/* harmony export */   special_sheets: () => (/* binding */ special_sheets),
/* harmony export */   subscription_ws_url: () => (/* binding */ subscription_ws_url),
/* harmony export */   trackhubs_template_with_examples: () => (/* binding */ trackhubs_template_with_examples),
/* harmony export */   trackhubs_template_without_examples: () => (/* binding */ trackhubs_template_without_examples),
/* harmony export */   validation_service_url: () => (/* binding */ validation_service_url),
/* harmony export */   validation_service_url_download: () => (/* binding */ validation_service_url_download),
/* harmony export */   validation_ws_url: () => (/* binding */ validation_ws_url)
/* harmony export */ });
const male_values = ['male', 'male genotypic sex', 'intact male', 'M', 'Male'];
const female_values = ['female', 'female genotypic sex', 'intact female', 'F', 'Female'];
const published_article_source = ['AGR', 'CBA', 'CTX', 'MED', 'PMC'];
const external_ena_prefix = 'https://www.ebi.ac.uk/ena/browser/view/';
const external_ols_prefix = 'https://www.ebi.ac.uk/ols/terms?iri=';
const external_biosample_prefix = 'https://www.ebi.ac.uk/biosamples/samples/';
const external_epmc_prefix = 'http://europepmc.org/search?query=';
const external_pubmed_prefix = 'https://www.ncbi.nlm.nih.gov/pubmed/';
const external_doi_prefix = 'https://doi.org/';
const ruleset_prefix_old = 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/rulesets/';
const ruleset_prefix_new = 'https://raw.githubusercontent.com/FAANG/dcc-metadata/master/json_schema/';
// export const validation_service_url_download = 'http://45.88.80.63:8000';
// export const validation_ws_url = 'wss://data.faang.org/validation_ws/ws/submission/';
// export const validation_service_url = 'http://45.88.80.63:8000';
// export const validation_ws_url = 'ws://45.88.80.63:8000/ws/submission/';
const internal_organism = '../organism/';
const internal_specimen = '../specimen/';
const internal_dataset = '../dataset/';
const record_type = ['core', 'type', 'custom'];
const issue_type = ['errors', 'warnings'];
const sample_metadata_template_with_examples = '../../assets/with_examples/faang_sample.xlsx';
const sample_biosample_update_template = '../../assets/with_examples/faang_update_sample.xlsx';
const experiment_metadata_template_with_examples = '../../assets/with_examples/faang_experiment.xlsx';
const analysis_metadata_template_with_examples = '../../assets/with_examples/faang_analysis.xlsx';
const trackhubs_template_with_examples = '../../assets/with_examples/trackhubs.xlsx';
const sample_metadata_template_without_examples = '../../assets/empty/faang_sample.xlsx';
const experiment_metadata_template_without_examples = '../../assets/empty/faang_experiment.xlsx';
const analysis_metadata_template_without_examples = '../../assets/empty/faang_analysis.xlsx';
const trackhubs_template_without_examples = '../../assets/empty/trackhubs.xlsx';
const missing_values = ['not applicable', 'not collected', 'not provided', 'restricted access'];
const special_sheets = ['describedBy', 'schema_version', 'samples_core', 'experiments_core', 'input_dna', 'dna-binding_proteins'];
// export const graphql_ws_url = 'ws://45.88.80.63:8000/ws/graphqltaskstatus/';
// export const graphql_server_endpoint = 'http://45.88.80.63:8000/graphql/';
// export const validation_service_url_download = 'http://127.0.0.1:8000';
// export const validation_service_url = 'http://127.0.0.1:8000';
// export const validation_ws_url = 'ws://127.0.0.1:8000/ws/submission/';
// export const subscription_ws_url = 'ws://127.0.0.1:8000/ws/';
// export const graphql_ws_url = 'ws://127.0.0.1:8000/ws/graphqltaskstatus/';
// export const graphql_server_endpoint = 'http://localhost:8000/graphql/';
// export const validation_service_url_download = 'http://127.0.0.1:57564';
// export const validation_service_url = 'http://127.0.0.1:57564';
// export const validation_ws_url = 'ws://127.0.0.1:57564/ws/submission/';
// export const subscription_ws_url = 'ws://127.0.0.1:57564/ws/';
// export const graphql_ws_url = 'ws://127.0.0.1:57564/ws/graphqltaskstatus/';
// export const graphql_server_endpoint = 'http://localhost:57564/graphql/';
const validation_service_url_download = 'https://api.faang.org';
const validation_service_url = 'https://api.faang.org';
const validation_ws_url = 'wss://api.faang.org/ws/submission/';
const graphql_ws_url = 'wss://api.faang.org/ws/graphqltaskstatus/';
const graphql_server_endpoint = 'https://api.faang.org/graphql/';
const subscription_ws_url = 'wss://api.faang.org/ws/';
// export const validation_service_url_download = 'http://45.88.81.194:8001';
// export const validation_service_url = 'http://45.88.81.194:8001';
// export const validation_ws_url = 'wss://45.88.81.194:8001/ws/submission/';
// export const subscription_ws_url = 'wss://45.88.81.194:8001/ws/';
// export const graphql_ws_url = 'wss://45.88.81.194:8001/ws/graphqltaskstatus/';
// export const graphql_server_endpoint = 'http://45.88.81.194:8001/graphql/';

/***/ }),

/***/ 8960:
/*!**************************************!*\
  !*** ./src/app/shared/fieldnames.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXCLUDED_FIELD_NAMES: () => (/* binding */ EXCLUDED_FIELD_NAMES),
/* harmony export */   FIELD_NAMES: () => (/* binding */ FIELD_NAMES)
/* harmony export */ });
const FIELD_NAMES = {
  project: 'Project',
  secondaryProject: 'Secondary project',
  assayType: 'Assay type',
  sampleStorage: 'Sample storage',
  sampleStorageProcessing: 'Sample storage processing',
  samplingToPreparationInterval: 'Sampling to preparation interval',
  experimentalProtocol: 'Experimental protocol',
  extractionProtocol: 'Extraction protocol',
  libraryPreparationLocation: 'Library preparation location',
  libraryPreparationLocationLongitude: 'Library preparation location longitude',
  libraryPreparationLocationLatitude: 'Library preparation location latitude',
  libraryPreparationDate: 'Library preparation date',
  sequencingLocation: 'Sequencing location',
  sequencingLocationLatitude: 'Sequencing location latitude',
  sequencingLocationLongitude: 'Sequencing location longitude',
  sequencingDate: 'Sequencing date',
  experimentTarget: 'Experiment target',
  rnaPreparation3AdapterLigationProtocol: 'Rna preparation 3\' adapter ligation protocol',
  rnaPreparation5AdapterLigationProtocol: 'Rna preparation 5\' adapter ligation protocol',
  libraryGenerationPcrProductIsolationProtocol: 'Library generation PCR product isolation protocol',
  preparationReverseTranscriptionProtocol: 'Preparation reverse transcription protocol',
  libraryGenerationProtocol: 'Library generation protocol',
  readStrand: 'Read strand',
  rnaPurity260230ratio: 'RNA purity - 260:230 ratio',
  rnaPurity260280ratio: 'RNA purity - 260:280 ratio',
  rnaIntegrityNumber: 'RNA integrity number',
  librarySelection: 'Library selection',
  bisulfiteConversionProtocol: 'Bisulfite conversion protocol',
  pcrProductIsolationProtocol: 'PCR product isolation protocol',
  bisulfiteConversionPercent: 'Bisulfite conversion percent',
  restrictionEnzyme: 'Restriction enzyme',
  maxFragmentSizeSelectionRange: 'Max fragment size selection range',
  minFragmentSizeSelectionRange: 'Min fragment size selection range',
  transposaseProtocol: 'Transposase protocol',
  dnaseProtocol: 'DNase protocol',
  restrictionSite: 'Restriction site',
  chipProtocol: 'ChIP protocol',
  controlExperiment: 'Control experiment',
  chipTarget: 'Target',
  chipAntibodyProvider: 'ChIP antibody provider',
  chipAntibodyCatalog: 'ChIP antibody catalog',
  chipAntibodyLot: 'ChIP antibody lot',
  libraryGenerationMaxFragmentSizeRange: 'Library generation max fragment size range',
  libraryGenerationMinFragmentSizeRange: 'Library generation min fragment size range',
  'hi-cProtocol': 'Hi-C protocol',
  sequencingPrimerProvider: 'Sequencing primer provider',
  sequencingPrimerCatalog: 'Sequencing primer catalog',
  sequencingPrimerLot: 'Sequencing primer lot',
  restrictionEnzymeTargetSequence: 'Restriction enzyme target sequence',
  cageProtocol: 'CAGE protocol'
};
const EXCLUDED_FIELD_NAMES = {
  accession: 'accession',
  standardMet: 'standard Met',
  versionLastStandardMet: 'version last standard met'
};

/***/ }),

/***/ 9022:
/*!***************************************************!*\
  !*** ./src/app/shared/filter/filter.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterComponent: () => (/* binding */ FilterComponent)
/* harmony export */ });
/* harmony import */ var _protocolnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../protocolnames */ 8122);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_aggregation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/aggregation.service */ 9396);





const _c0 = a0 => ({
  "long-list": a0
});
const _c1 = a0 => ({
  "active": a0
});
function FilterComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FilterComponent_Conditional_0_Conditional_3_Template_i_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleCollapse());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function FilterComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FilterComponent_Conditional_0_Conditional_4_Template_i_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleCollapse());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function FilterComponent_Conditional_0_Conditional_5_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FilterComponent_Conditional_0_Conditional_5_For_2_Conditional_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const aggr_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onButtonClick(aggr_r5[0], ctx_r1.title));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const aggr_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r1.aggregationService.current_active_filters && ctx_r1.aggregationService.current_active_filters.indexOf(aggr_r5[0]) > -1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", aggr_r5[0], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](aggr_r5[1]);
  }
}
function FilterComponent_Conditional_0_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, FilterComponent_Conditional_0_Conditional_5_For_2_Conditional_0_Template, 4, 5, "div", 5);
  }
  if (rf & 2) {
    const aggr_r5 = ctx.$implicit;
    const ɵ$index_18_r6 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ɵ$index_18_r6 < ctx_r1.itemLimit && aggr_r5[0] != "" ? 0 : -1);
  }
}
function FilterComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](1, FilterComponent_Conditional_0_Conditional_5_For_2_Template, 1, 1, null, null, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, ctx_r1.itemLimit > ctx_r1.filterSize));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx_r1.aggregation);
  }
}
function FilterComponent_Conditional_0_Conditional_6_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FilterComponent_Conditional_0_Conditional_6_For_2_Conditional_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const aggr_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onButtonClick(aggr_r8[0], ctx_r1.title));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const aggr_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r1.aggregationService.current_active_filters && ctx_r1.aggregationService.current_active_filters.indexOf(ctx_r1.getReverseHumanName(aggr_r8[0])) > -1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", aggr_r8[0], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](aggr_r8[1]);
  }
}
function FilterComponent_Conditional_0_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, FilterComponent_Conditional_0_Conditional_6_For_2_Conditional_0_Template, 4, 5, "div", 5);
  }
  if (rf & 2) {
    const aggr_r8 = ctx.$implicit;
    const ɵ$index_29_r9 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ɵ$index_29_r9 < ctx_r1.itemLimit && aggr_r8[0] != "" ? 0 : -1);
  }
}
function FilterComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](1, FilterComponent_Conditional_0_Conditional_6_For_2_Template, 1, 1, null, null, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, ctx_r1.itemLimit > ctx_r1.filterSize));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx_r1.aggregation);
  }
}
function FilterComponent_Conditional_0_Conditional_7_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FilterComponent_Conditional_0_Conditional_7_For_2_Conditional_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10);
      const aggr_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.onButtonClick(aggr_r11[0], ctx_r1.title));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const aggr_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r1.aggregationService.current_active_filters && ctx_r1.aggregationService.current_active_filters.indexOf(aggr_r11[0].split(" ").join("_")) > -1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", aggr_r11[0], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](aggr_r11[1]);
  }
}
function FilterComponent_Conditional_0_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, FilterComponent_Conditional_0_Conditional_7_For_2_Conditional_0_Template, 4, 5, "div", 5);
  }
  if (rf & 2) {
    const aggr_r11 = ctx.$implicit;
    const ɵ$index_40_r12 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ɵ$index_40_r12 < ctx_r1.itemLimit && aggr_r11[0] != "" ? 0 : -1);
  }
}
function FilterComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](1, FilterComponent_Conditional_0_Conditional_7_For_2_Template, 1, 1, null, null, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, ctx_r1.itemLimit > ctx_r1.filterSize));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx_r1.aggregation);
  }
}
function FilterComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card", 0)(1, "h6", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, FilterComponent_Conditional_0_Conditional_3_Template, 2, 0, "i", 2)(4, FilterComponent_Conditional_0_Conditional_4_Template, 2, 0, "i", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, FilterComponent_Conditional_0_Conditional_5_Template, 3, 3, "div", 3)(6, FilterComponent_Conditional_0_Conditional_6_Template, 3, 3, "div", 3)(7, FilterComponent_Conditional_0_Conditional_7_Template, 3, 3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"]((ctx_r1.aggregation == null ? null : ctx_r1.aggregation.length) > ctx_r1.filterSize && ctx_r1.isCollapsed ? 3 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"]((ctx_r1.aggregation == null ? null : ctx_r1.aggregation.length) > ctx_r1.filterSize && !ctx_r1.isCollapsed ? 4 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r1.title !== "Protocol" && ctx_r1.title !== "Experiment target" && ctx_r1.title !== "Analysis type" ? 5 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r1.title === "Protocol" ? 6 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r1.title === "Experiment target" || ctx_r1.title === "Analysis type" ? 7 : -1);
  }
}
class FilterComponent {
  constructor(aggregationService, cdRef) {
    this.aggregationService = aggregationService;
    this.cdRef = cdRef;
    this.aggregation = [];
    this.isCollapsed = true;
    this.current_active_filters = this.aggregationService.current_active_filters;
  }
  ngOnInit() {
    this.itemLimit = this.filterSize;
    this.subsription = this.aggregationService.data.subscribe(data => {
      // data is a map, keys are active_filters names defined in service/aggregatin_service.ts,
      // values are the corresponding aggregation e.g. { "FAANG":675,"Legacy": 9834}
      if (this.title === 'Standard') {
        this.aggregation = data['standard'];
      } else if (this.title === 'Study') {
        this.aggregation = data['study'];
      } else if (this.title === 'Dataset') {
        this.aggregation = data['dataset'];
      } else if (this.title === 'Species') {
        this.aggregation = data['species'];
      } else if (this.title === 'Assay type') {
        this.aggregation = data['assay_type'];
      } else if (this.title === 'Analysis type') {
        this.aggregation = data['analysis_type'];
      } else if (this.title === 'Instrument') {
        this.aggregation = data['instrument'];
      } else if (this.title === 'Sex') {
        this.aggregation = data['sex'];
      } else if (this.title === 'Organism') {
        this.aggregation = data['organism'];
      } else if (this.title === 'Breed') {
        this.aggregation = data['breed'];
      } else if (this.title === 'Material') {
        this.aggregation = data['material'];
      } else if (this.title === 'Organism part/Cell type') {
        this.aggregation = data['organismpart_celltype'];
      } else if (this.title === 'Archive') {
        this.aggregation = data['archive'];
      } else if (this.title === 'Protocol Name') {
        this.aggregation = data['protocol_name'];
      } else if (this.title === 'Organisation') {
        this.aggregation = data['university_name'];
      } else if (this.title === 'Protocol Year') {
        this.aggregation = data['protocol_date'];
      } else if (this.title === 'Protocol type') {
        this.aggregation = data['protocol_type'];
      } else if (this.title === 'Protocol') {
        this.aggregation = data['protocol_type'];
      } else if (this.title === 'Experiment target') {
        this.aggregation = data['experiment_target'];
      } else if (this.title === 'Target') {
        this.aggregation = data['target'];
      } else if (this.title === 'Paper published') {
        this.aggregation = data['paper_published'];
      } else if (this.title === 'Journal') {
        this.aggregation = data['journal'];
      } else if (this.title === 'Article Type') {
        this.aggregation = data['source'];
      } else if (this.title === 'Year') {
        // this.aggregation = data['publication_year'];
        this.aggregation = data['year'];
      } else if (this.title === 'Dataset source') {
        this.aggregation = data['datasetSource'];
      } else if (this.title === 'Ontology Type') {
        this.aggregation = data['type'];
      } else if (this.title === 'Project') {
        this.aggregation = data['project'];
      } else if (this.title === 'Projects') {
        this.aggregation = data['projects'];
      } else if (this.title === 'Term Status') {
        this.aggregation = data['status_activity'];
      }
      this.cdRef.detectChanges();
    });
  }
  onButtonClick(key, title) {
    let data_key;
    // the data_key refers to active_filters defined in service/aggregatin_service.ts
    switch (title) {
      case 'Standard':
        {
          data_key = 'standard';
          break;
        }
      case 'Study':
        {
          data_key = 'study';
          break;
        }
      case 'Dataset':
        {
          data_key = 'datasetAccession';
          break;
        }
      case 'Species':
        {
          data_key = 'species';
          break;
        }
      case 'Assay type':
        {
          data_key = 'assayType';
          break;
        }
      case 'Analysis type':
        {
          data_key = 'analysisType';
          key = key.split(' ').join('_');
          break;
        }
      case 'Instrument':
        {
          data_key = 'instrument';
          break;
        }
      case 'Sex':
        {
          data_key = 'sex';
          break;
        }
      case 'Organism':
        {
          data_key = 'organism';
          break;
        }
      case 'Breed':
        {
          data_key = 'breed';
          break;
        }
      case 'Material':
        {
          data_key = 'material';
          break;
        }
      case 'Organism part/Cell type':
        {
          data_key = 'organismpart_celltype';
          break;
        }
      case 'Archive':
        {
          data_key = 'archive';
          break;
        }
      case 'Organisation':
        {
          data_key = 'university_name';
          break;
        }
      case 'Protocol Year':
        {
          data_key = 'protocol_date';
          break;
        }
      case 'Protocol type':
        {
          data_key = 'protocol_type';
          break;
        }
      case 'Protocol':
        {
          data_key = 'protocol_type';
          key = this.getReverseHumanName(key);
          break;
        }
      case 'Experiment target':
        {
          data_key = 'experimentTarget';
          key = key.split(' ').join('_');
          break;
        }
      case 'Target':
        {
          data_key = 'target';
          break;
        }
      case 'Paper published':
        {
          data_key = 'paper_published';
          break;
        }
      case 'Journal':
        {
          data_key = 'journal';
          break;
        }
      case 'Article Type':
        {
          data_key = 'source';
          break;
        }
      case 'Year':
        {
          data_key = 'year';
          break;
        }
      case 'Dataset source':
        {
          data_key = 'datasetSource';
          break;
        }
      case 'Ontology Type':
        {
          data_key = 'type';
          key = this.revertReadableType(key);
          break;
        }
      case 'Project':
        {
          data_key = 'project';
          break;
        }
      case 'Projects':
        {
          data_key = 'projects';
          break;
        }
      case 'Term Status':
        {
          data_key = 'status_activity';
          break;
        }
    }
    const index = this.aggregationService.active_filters[data_key].indexOf(key);
    if (index > -1) {
      this.aggregationService.active_filters[data_key].splice(index, 1);
    } else {
      this.aggregationService.active_filters[data_key].push(key);
    }
    const active_filter_index = this.aggregationService.current_active_filters.indexOf(key);
    if (index > -1) {
      this.aggregationService.current_active_filters.splice(active_filter_index, 1);
    } else {
      this.aggregationService.current_active_filters.push(key);
    }
    this.aggregationService.field.next(this.aggregationService.active_filters);
  }
  toggleCollapse() {
    if (this.isCollapsed) {
      this.itemLimit = 10000;
      this.isCollapsed = false;
    } else {
      this.itemLimit = this.filterSize;
      this.isCollapsed = true;
    }
  }
  getReverseHumanName(data) {
    return _protocolnames__WEBPACK_IMPORTED_MODULE_0__.reverseProtocolNames[data];
  }
  revertReadableType(data) {
    data = data.split(' ');
    for (let i = 1; i < data.length; i += 1) {
      data[i] = data[i].charAt(0).toUpperCase() + data[i].slice(1);
    }
    data = data.join('');
    console.log(data);
    return data;
  }
  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
  static #_ = this.ɵfac = function FilterComponent_Factory(t) {
    return new (t || FilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_aggregation_service__WEBPACK_IMPORTED_MODULE_1__.AggregationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: FilterComponent,
    selectors: [["app-filter"]],
    inputs: {
      title: "title",
      filterSize: "filterSize"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 1,
    vars: 1,
    consts: [[1, "filter-card"], [1, "filter-header", "item"], [1, "material-icons", "float-right"], [3, "ngClass"], [1, "material-icons", "float-right", 3, "click"], [1, "d-flex", "justify-content-between", "align-items-center", "item", 3, "ngClass"], [1, "d-flex", "justify-content-between", "align-items-center", "item", 3, "click", "ngClass"], [1, "badge", "badge-secondary", "badge-pill"]],
    template: function FilterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, FilterComponent_Conditional_0_Template, 8, 6, "mat-card", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx.aggregation.length !== 0 ? 0 : -1);
      }
    },
    dependencies: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass],
    styles: [".long-list[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: scroll;\n  overflow-x: auto;\n}\n\n.item[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  cursor: pointer;\n  font-size: 14px;\n  border-bottom: 1px solid rgba(0,0,0,.125);\n}\n\n.mat-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 0;\n}\n\n.filter-header[_ngcontent-%COMP%] {\n  background-color: #DCEDF5;\n  color: #577C95;\n  cursor: default;\n}\n\n.filter-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.active[_ngcontent-%COMP%] {\n  background-color: #477AAF;\n  color: white;\n}\n\n.active[_ngcontent-%COMP%] > span[_ngcontent-%COMP%] {\n  background-color: white;\n  color: #477AAF;\n}\n\nh6[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.badge-secondary[_ngcontent-%COMP%] {\n  background-color: #DCEDF5;\n  color: black;\n  width: 4em;\n  padding: 0.4em 0.6em 0.4em 0.6em;\n  border-radius: 7px\n}\n\n.filter-card[_ngcontent-%COMP%] {\n  margin-top: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2ZpbHRlci9maWx0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLGVBQWU7RUFDZixlQUFlO0VBQ2YseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixVQUFVO0VBQ1YsZ0NBQWdDO0VBQ2hDO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyIubG9uZy1saXN0IHtcbiAgbWF4LWhlaWdodDogMzAwcHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLml0ZW0ge1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLDAsMCwuMTI1KTtcbn1cblxuLm1hdC1jYXJkIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgcGFkZGluZzogMDtcbn1cblxuLmZpbHRlci1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRENFREY1O1xuICBjb2xvcjogIzU3N0M5NTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uZmlsdGVyLWhlYWRlciBpIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ3N0FBRjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYWN0aXZlPnNwYW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICM0NzdBQUY7XG59XG5cbmg2IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uYmFkZ2Utc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RDRURGNTtcbiAgY29sb3I6IGJsYWNrO1xuICB3aWR0aDogNGVtO1xuICBwYWRkaW5nOiAwLjRlbSAwLjZlbSAwLjRlbSAwLjZlbTtcbiAgYm9yZGVyLXJhZGl1czogN3B4XG59XG5cbi5maWx0ZXItY2FyZCB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 3568:
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class FooterComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function FooterComponent_Factory(t) {
    return new (t || FooterComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: FooterComponent,
    selectors: [["app-footer"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 14,
    vars: 0,
    consts: [[1, "footer", "font-small", "mdb-color", "lighten-3", "pt-4"], [1, "container-fluid", "text-center", "text-md-left"], ["fxLayout", "row", "fxlayout.lt-sm", "column", "fxLayoutGap", "2%"], ["fxFlex", "10", "fxFlex.lt-sm", "100"], ["src", "../../../assets/1200px-Flag_of_Europe.svg.png", "alt", "EU logo", "width", "90", "height", "50", 1, "img-fluid"], ["fxFlex", "90", "fxFlex.lt-sm", "100"], ["href", "https://ec.europa.eu/programmes/horizon2020/"], ["href", "https://bbsrc.ukri.org/"]],
    template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5)(6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " The FAANG Data Coordination Centre has received funding from the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "European Union\u2019s Horizon 2020");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " research and innovation program under Grant Agreement Nos. 815668, 817923 and 817998, and also from the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Biotechnology and Biological Sciences Research Council");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " under Grant Agreement No. BB/N019563/1. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      }
    },
    styles: [".page-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  height: 100px;\n  width: 100%;\n}\n\n.mdb-color[_ngcontent-%COMP%] {\n  background-color: #F7F7F7;\n}\n\na[_ngcontent-%COMP%] {\n  color: steelblue;\n}\n\n.footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 100px; \n\n  background-color: #f5f5f5;\n  z-index: 2;\n}\n\n\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixTQUFTO0VBQ1QsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixTQUFTO0VBQ1QsV0FBVztFQUNYLGFBQWEsRUFBRSw0Q0FBNEM7RUFDM0QseUJBQXlCO0VBQ3pCLFVBQVU7QUFDWiIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWZvb3RlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDEwMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm1kYi1jb2xvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3Rjc7XG59XG5cbmEge1xuICBjb2xvcjogc3RlZWxibHVlO1xufVxuXG4uZm9vdGVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMHB4OyAvKiBTZXQgdGhlIGZpeGVkIGhlaWdodCBvZiB0aGUgZm9vdGVyIGhlcmUgKi9cbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbiAgei1pbmRleDogMjtcbn1cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6772:
/*!***************************************************!*\
  !*** ./src/app/shared/header/header.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ 9552);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);








class HeaderComponent {
  constructor(router) {
    this.router = router;
    this.collapsed = true;
    this.records_dropdown_open = false;
    this.projects_dropdown_open = false;
    this.validation_dropdown_open = false;
    this.help_dropdown_open = false;
    this.show_banner = 'show';
  }
  ngOnInit() {}
  isActive(option) {
    const menuItems = {
      'data': ['organism', 'specimen', 'dataset', 'file', 'analysis', 'protocol', 'article'],
      'submit': ['ruleset', 'validation', 'trackhubs', 'nextflowSubmission'],
      'help': ['api'],
      'search': ['graphql', 'globalsearch'],
      'protocol': ['protocol'],
      'validation': ['validation'],
      'ruleset': ['ruleset']
    };
    for (const item of menuItems[option]) {
      if (option === 'data') {
        if (this.router.url.includes(item) && !this.router.url.includes('summary')) {
          return 'active';
        }
      } else {
        if (this.router.url.includes(item)) {
          return 'active';
        }
      }
    }
    return null;
  }
  static #_ = this.ɵfac = function HeaderComponent_Factory(t) {
    return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: HeaderComponent,
    selectors: [["app-header"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 143,
    vars: 20,
    consts: [["menu", "matMenu"], ["data", "matMenu"], ["submit", "matMenu"], ["help", "matMenu"], ["search", "matMenu"], [2, "margin-bottom", "20px", "padding", "0 30px"], ["fxFlex", "", "fxLayout", ""], [2, "margin-right", "15px"], ["routerLink", "/home"], ["alt", "FAANG logo", "src", "../../../assets/FAANG_logo_RGBc.png", "height", "50", "width", "auto", 1, "d-inline-block", "align-top"], ["mat-button", "", "fxHide", "false", "fxHide.gt-md", "", 3, "mat-menu-trigger-for"], [2, "font-size", "30px"], ["fxFlex", "", "fxLayout", "", "fxHide.md", "", "fxHide.lt-md", "", "fxLayoutAlign", "end center"], ["mat-button", ""], ["routerLink", "/home", "routerLinkActive", "active", 1, "nav-link"], ["mat-button", "", 3, "matMenuTriggerFor"], [1, "nav-link", 3, "ngClass"], [2, "vertical-align", "middle"], ["routerLink", "/projects", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/genome_browser", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/ontology", "routerLinkActive", "active", 1, "nav-link"], ["x-position", "before"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "matMenuTriggerFor"], ["routerLink", "/summary", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/organism", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/specimen", "routerLinkActive", "active", 1, "nav-link"], [1, "dropdown-divider"], ["routerLink", "/dataset", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/file", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/analysis", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/protocol/samples", 1, "nav-link", 3, "ngClass"], ["routerLink", "/article", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/ruleset/samples", "fragment", "Standard", 1, "nav-link", 3, "ngClass"], ["routerLink", "/validation/samples", 1, "nav-link", 3, "ngClass"], ["routerLink", "/trackhubs", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/nextflowSubmission", "routerLinkActive", "active", 1, "nav-link"], ["href", "https://dcc-documentation.readthedocs.io/en/latest/", "target", "_blank", "routerLinkActive", "active", 1, "nav-link"], ["href", "https://dcc-documentation.readthedocs.io/en/latest/faq/", "target", "_blank", 1, "nav-link"], ["routerLink", "/api", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/graphql", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/globalsearch", "routerLinkActive", "active", 1, "nav-link"]],
    template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 5)(1, "div", 6)(2, "div", 7)(3, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 10)(6, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 12)(9, "button", 13)(10, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 15)(13, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 13)(18, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 13)(21, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Genome Browser ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Beta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "button", 15)(26, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 13)(31, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Ontology Improver ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Beta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "button", 15)(36, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Help ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "button", 15)(41, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "mat-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "mat-menu", 21, 0)(47, "button", 22)(48, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 23)(51, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "button", 22)(54, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "button", 22)(57, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Summary");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "button", 22)(60, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " Genome Browser ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Beta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "button", 23)(65, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "button", 22)(68, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, " Ontology Improver ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Beta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "button", 23)(73, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Help ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "button", 23)(76, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "mat-menu", null, 1)(80, "button", 22)(81, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Organisms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "button", 22)(84, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Specimens");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "button", 22)(88, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Datasets");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "button", 22)(91, "a", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "Files");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "button", 22)(95, "a", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "Analyses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "button", 22)(99, "a", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "Protocols");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "button", 22)(102, "a", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](103, "Publications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "button", 22)(105, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, "Summary");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "mat-menu", null, 2)(109, "button", 22)(110, "a", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, "Rule sets");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "button", 22)(113, "a", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "Validation service");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "button", 22)(116, "a", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "Track Hubs ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "Beta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "button", 22)(121, "a", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "NextFlow files");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "button", 22)(125, "a", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "Help");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "mat-menu", null, 3)(129, "button", 22)(130, "a", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](131, "FAQ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "button", 22)(133, "a", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, "API Documentation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "mat-menu", null, 4)(137, "button", 22)(138, "a", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](139, "Custom queries");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "button", 22)(141, "a", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const menu_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](46);
        const data_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](79);
        const submit_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](108);
        const help_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](128);
        const search_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](136);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-menu-trigger-for", menu_r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", data_r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("data"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", submit_r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("submit"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", help_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("help"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", search_r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("search"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", data_r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("data"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", submit_r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("submit"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", help_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("help"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", search_r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("search"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("protocol"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("ruleset"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isActive("validation"));
      }
    },
    dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__.MatToolbar, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenuTrigger, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenuItem],
    styles: ["a[_ngcontent-%COMP%] {\n  font-family: Arial;\n}\n\n.nav-link[_ngcontent-%COMP%] {\n  color: rgba(0,0,0,.5);\n  font-size: 18px;\n}\n\n.active[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.mat-button[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtBQUNaIiwic291cmNlc0NvbnRlbnQiOlsiYSB7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbn1cblxuLm5hdi1saW5rIHtcbiAgY29sb3I6IHJnYmEoMCwwLDAsLjUpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5hY3RpdmUge1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5tYXQtYnV0dG9uIHtcbiAgcGFkZGluZzogMDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 8122:
/*!*****************************************!*\
  !*** ./src/app/shared/protocolnames.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   protocolNames: () => (/* binding */ protocolNames),
/* harmony export */   reverseProtocolNames: () => (/* binding */ reverseProtocolNames)
/* harmony export */ });
const protocolNames = {
  experimentalProtocol: 'Experimental protocol',
  extractionProtocol: 'Extraction protocol',
  rnaPreparation3AdapterLigationProtocol: 'Rna preparation 3\' adapter ligation protocol',
  rnaPreparation5AdapterLigationProtocol: 'Rna preparation 5\' adapter ligation protocol',
  libraryGenerationPcrProductIsolationProtocol: 'Library generation PCR product isolation protocol',
  preparationReverseTranscriptionProtocol: 'Preparation reverse transcription protocol',
  libraryGenerationProtocol: 'Library generation protocol',
  bisulfiteConversionProtocol: 'Bisulfite conversion protocol',
  pcrProductIsolationProtocol: 'PCR product isolation protocol',
  transposaseProtocol: 'Transposase protocol',
  dnaseProtocol: 'DNase protocol',
  chipProtocol: 'ChIP protocol',
  'hi-cProtocol': 'Hi-C protocol',
  cageProtocol: 'CAGE protocol'
};
const reverseProtocolNames = {
  'Experimental protocol': 'experimentalProtocol',
  'Extraction protocol': 'extractionProtocol',
  'Rna preparation 3\' adapter ligation protocol': 'rnaPreparation3AdapterLigationProtocol',
  'Rna preparation 5\' adapter ligation protocol': 'rnaPreparation5AdapterLigationProtocol',
  'Library generation PCR product isolation protocol': 'libraryGenerationPcrProductIsolationProtocol',
  'Preparation reverse transcription protocol': 'preparationReverseTranscriptionProtocol',
  'Library generation protocol': 'libraryGenerationProtocol',
  'Bisulfite conversion protocol': 'bisulfiteConversionProtocol',
  'PCR product isolation protocol': 'pcrProductIsolationProtocol',
  'Transposase protocol': 'transposaseProtocol',
  'DNase protocol': 'dnaseProtocol',
  'ChIP protocol': 'chipProtocol',
  'Hi-C protocol': 'hi-cProtocol'
};

/***/ }),

/***/ 9344:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/subscription-dialog/subscription-dialog.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscriptionDialogComponent: () => (/* binding */ SubscriptionDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_api_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/api-data.service */ 6401);









function SubscriptionDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Email is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SubscriptionDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter a valid email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class SubscriptionDialogComponent {
  constructor(dataService, dialogRef, data) {
    this.dataService = dataService;
    this.dialogRef = dialogRef;
    this.data = data;
    this.email = '';
    this.title = '';
    this.displayError = (controlName, errorName) => {
      return this.subscriptionForm.controls[controlName].hasError(errorName);
    };
    this.inputData = {
      ...data
    };
    this.subscriptionDialogTitle = this.inputData['title'];
  }
  ngOnInit() {
    this.subscriptionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup({
      subscriberEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email])
    });
  }
  onCancelDialog(dialogType) {
    this.dialogRef.close();
  }
  onRegister() {
    if (this.subscriptionForm.valid && this.subscriptionForm.touched) {
      this.dataService.subscribeFilteredData(this.inputData['indexName'], this.inputData['indexKey'], this.inputData['email']).subscribe(response => {
        console.log("You have now been subscribed!");
        this.dialogRef.close();
      }, error => {
        console.log(error);
        this.dialogRef.close();
      });
    }
  }
  static #_ = this.ɵfac = function SubscriptionDialogComponent_Factory(t) {
    return new (t || SubscriptionDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_data_service__WEBPACK_IMPORTED_MODULE_0__.ApiDataService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: SubscriptionDialogComponent,
    selectors: [["app-subscription-dialog"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 16,
    vars: 7,
    consts: [["mat-dialog-content", "", 1, "centerContents"], [1, "mat-dialog-title-font"], ["novalidate", "", 3, "formGroup"], ["appearance", "fill"], ["matInput", "", "placeholder", "Enter email", "formControlName", "subscriberEmail", "id", "subscriberEmail", 3, "ngModelChange", "ngModel"], ["align", "end"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "click"]],
    template: function SubscriptionDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 2)(4, "p")(5, "mat-form-field", 3)(6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function SubscriptionDialogComponent_Template_input_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.inputData.email, $event) || (ctx.inputData.email = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-hint", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Enter a valid email address.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, SubscriptionDialogComponent_Conditional_9_Template, 2, 0, "mat-error")(10, SubscriptionDialogComponent_Conditional_10_Template, 2, 0, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 6)(12, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SubscriptionDialogComponent_Template_button_click_12_listener() {
          return ctx.onCancelDialog("form");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SubscriptionDialogComponent_Template_button_click_14_listener() {
          return ctx.onRegister();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.subscriptionDialogTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.subscriptionForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", 100, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.inputData.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.displayError("subscriberEmail", "required") ? 9 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.displayError("subscriberEmail", "email") ? 10 : -1);
      }
    },
    dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatError, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5104:
/*!*************************************************************************!*\
  !*** ./src/app/shared/table-server-side/table-server-side.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableServerSideComponent: () => (/* binding */ TableServerSideComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3617);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 3037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 9475);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ 951);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-spinner */ 1249);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_api_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/api-data.service */ 6401);






















const _c0 = ["subscriptionTemplate"];
const _c1 = ["subscriptionInfoTemplate"];
function TableServerSideComponent_For_6_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ɵ$index_10_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.column_names[ɵ$index_10_r2], " ");
  }
}
function TableServerSideComponent_For_6_Conditional_1_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "td", 12);
  }
}
function TableServerSideComponent_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, TableServerSideComponent_For_6_Conditional_1_th_0_Template, 2, 1, "th", 9)(1, TableServerSideComponent_For_6_Conditional_1_td_1_Template, 1, 0, "td", 10);
  }
}
function TableServerSideComponent_For_6_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ɵ$index_10_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.column_names[ɵ$index_10_r2], " ");
  }
}
function TableServerSideComponent_For_6_Conditional_2_td_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TableServerSideComponent_For_6_Conditional_2_td_1_Conditional_1_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.openSubscriptionDialog(item_r5[ctx_r2.apiKey]));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function TableServerSideComponent_For_6_Conditional_2_td_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const item_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const col_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", item_r5[col_r6], " ");
  }
}
function TableServerSideComponent_For_6_Conditional_2_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, TableServerSideComponent_For_6_Conditional_2_td_1_Conditional_1_Template, 4, 0, "div")(2, TableServerSideComponent_For_6_Conditional_2_td_1_Conditional_2_Template, 1, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](col_r6 === "subscribe" ? 1 : 2);
  }
}
function TableServerSideComponent_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, TableServerSideComponent_For_6_Conditional_2_th_0_Template, 2, 1, "th", 9)(1, TableServerSideComponent_For_6_Conditional_2_td_1_Template, 3, 1, "td", 10);
  }
}
function TableServerSideComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, TableServerSideComponent_For_6_Conditional_1_Template, 2, 0)(2, TableServerSideComponent_For_6_Conditional_2_Template, 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const col_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matColumnDef", col_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r2.templates[col_r6] ? 1 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](!ctx_r2.templates[col_r6] ? 2 : -1);
  }
}
function TableServerSideComponent_tr_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 15);
  }
}
function TableServerSideComponent_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 16);
  }
}
function TableServerSideComponent_ng_template_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Email is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function TableServerSideComponent_ng_template_10_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter a valid email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function TableServerSideComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 19)(4, "p")(5, "mat-form-field", 20)(6, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function TableServerSideComponent_ng_template_10_Template_input_input_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.getEmail($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-hint", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Enter a valid email address.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, TableServerSideComponent_ng_template_10_Conditional_9_Template, 2, 0, "mat-error")(10, TableServerSideComponent_ng_template_10_Conditional_10_Template, 2, 0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 23)(12, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TableServerSideComponent_ng_template_10_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onCancelDialog("form"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TableServerSideComponent_ng_template_10_Template_button_click_14_listener() {
      const data_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onRegister(data_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Register");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.subscriptionDialogTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r2.subscriptionForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", 100, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r2.displayError("subscriberEmail", "required") ? 9 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx_r2.displayError("subscriberEmail", "email") ? 10 : -1);
  }
}
function TableServerSideComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "div", 26)(2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 23)(5, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TableServerSideComponent_ng_template_12_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.onCancelDialog("info"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r2.subscription_status == "success" ? "alert alert-success" : "alert alert-warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.submission_message, " ");
  }
}
class TableServerSideComponent {
  constructor(spinner, activatedRoute, router, dialog, dataService, location) {
    this.spinner = spinner;
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.dialog = dialog;
    this.dataService = dataService;
    this.dataUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.sortUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.subscriptionTemplate = {};
    this.subscriptionInfoTemplate = {};
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTableDataSource();
    this.totalHits = 0;
    this.delaySearch = true;
    this.subscriber = {
      email: '',
      filters: {}
    };
    this.currentSearchTerm = '';
    this.queryParams = {};
    this.specialFilters = {
      paper_published: [{
        filterValue: ['true'],
        displayValue: 'Yes'
      }, {
        filterValue: ['false'],
        displayValue: 'No'
      }],
      sex: [{
        filterValue: _constants__WEBPACK_IMPORTED_MODULE_0__.male_values,
        displayValue: 'male'
      }, {
        filterValue: _constants__WEBPACK_IMPORTED_MODULE_0__.female_values,
        displayValue: 'female'
      }],
      source: [{
        filterValue: ['PPR'],
        displayValue: 'preprint'
      }, {
        filterValue: _constants__WEBPACK_IMPORTED_MODULE_0__.published_article_source,
        displayValue: 'published'
      }],
      assayType: [{
        filterValue: ['transcription profiling by high throughput sequencing'],
        displayValue: 'RNA-Seq'
      }]
    };
    this.displayError = (controlName, errorName) => {
      return this.subscriptionForm.controls[controlName].hasError(errorName);
    };
    this.location = location;
  }
  ngOnInit() {
    this.subscriptionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
      subscriberEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email])
    });
    // get search term
    this.currentSearchTerm = this.query['search'];
    // extract query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = {
        ...params
      };
    });
    if (this.queryParams['sortTerm'] && this.queryParams['sortDirection']) {
      // display sort arrow
      this.sort.active = this.queryParams['sortTerm'];
      this.sort.direction = this.queryParams['sortDirection'];
    }
    if (this.queryParams['pageIndex']) {
      this.resetPagination(this.queryParams['pageIndex']);
    }
  }
  ngAfterViewInit() {
    if (this.indexDetails) {
      this.apiKey = this.indexDetails['apiKey'];
      this.setSocket();
    }
    // Reset back to the first page when sort order is changed
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(this.sort.sortChange, this.paginator.page).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.startWith)({}), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => {
      this.spinner.show();
      if (this.sort.active && this.sort.direction) {
        this.query['sort'] = [this.sort.active, this.sort.direction];
        this.sortUpdate.emit(this.query['sort']);
      } else {
        this.query['sort'] = this.defaultSort;
      }
      this.updateSortingUrlParameters(this.query['sort'][0], this.query['sort'][1]);
      this.query['from_'] = this.paginator.pageIndex * this.paginator.pageSize;
      return this.apiFunction(this.query, 25);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)(data => {
      return data;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.catchError)(() => {
      this.spinner.hide();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)([]);
    })).subscribe(res => {
      this.dataSource.data = res.data; // set table data
      this.dataUpdate.emit(res); // emit data update event
      this.totalHits = res.totalHits; // set length of paginator
      this.spinner.hide();
    });
  }
  // apply filter when component input "filter_values" is changed
  ngOnChanges() {
    if (this.dataSource) {
      this.spinner.show();
      // reset query params before applying filter
      this.paginator.pageIndex = 0;
      if (this.sort.active && this.sort.direction) {
        this.query['sort'] = [this.sort.active, this.sort.direction];
        this.sortUpdate.emit(this.query['sort']);
      } else {
        this.query['sort'] = this.defaultSort;
      }
      this.updateSortingUrlParameters(this.query['sort'][0], this.query['sort'][1]);
      this.sortUpdate.emit(this.query['sort']);
      this.query['from_'] = 0;
      // Update filter value for special cases
      this.updateUrlCodeFilters();
      this.apiFunction(this.query, 25).subscribe(res => {
        this.dataSource.data = res.data; // set table data
        this.dataUpdate.emit(res); // emit data update event
        this.totalHits = res.totalHits; // set length of paginator
        this.spinner.hide();
      });
    }
  }
  searchChanged(event) {
    const searchFilterValue = event.target.value.trim().toLowerCase();
    if (this.delaySearch) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.applySearchFilter.bind(this), 500, searchFilterValue);
    } else {
      this.applySearchFilter(searchFilterValue);
    }
  }
  applySearchFilter(value) {
    // reset query params before applying search
    this.paginator.pageIndex = 0;
    this.query['from_'] = 0;
    this.query['search'] = value;
    this.spinner.show();
    this.apiFunction(this.query, 25).subscribe(res => {
      this.dataSource.data = res.data; // set table data
      this.dataUpdate.emit(res); // emit data update event
      this.totalHits = res.totalHits; // set length of paginator
      this.spinner.hide();
    });
    // Update query parameters to pass to route
    this.updateUrlParameters(value, 'searchTerm');
  }
  updateSortingUrlParameters(sortTerm, sortDirection) {
    this.updateUrlParameters(sortTerm, 'sortTerm');
    this.updateUrlParameters(sortDirection, 'sortDirection');
  }
  updateUrlParameters(value, parameterName) {
    if (value) {
      this.queryParams[parameterName] = value;
    } else {
      if (parameterName in this.queryParams) {
        delete this.queryParams[parameterName];
      }
    }
    // will not reload the page, but will update query params
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      replaceUrl: true,
      skipLocationChange: false
    });
  }
  openSubscriptionDialog(value) {
    this.subscriptionDialogTitle = `Subscribing to record ${value}`;
    this.subscriber.filters[this.indexDetails['indexKey']] = [value];
    this.dialogRef = this.dialog.open(this.subscriptionTemplate, {
      data: this.subscriber,
      height: '260px',
      width: '400px'
    });
  }
  onCancelDialog(dialogType) {
    if (dialogType === 'info') {
      this.dialogSubscriptionInfoRef.close();
    } else {
      this.dialogRef.close();
    }
  }
  getEmail(event) {
    this.subscriber.email = event.target.value;
  }
  onRegister(data) {
    if (this.subscriptionForm.valid && this.subscriptionForm.touched) {
      this.dataService.subscribeUser(this.indexDetails['index'], this.indexDetails['indexKey'], data.email, data.filters).subscribe(response => {
        this.dialogRef.close();
      }, error => {
        console.log(error);
        this.dialogRef.close();
      });
    }
  }
  setSocket() {
    const url = `${_constants__WEBPACK_IMPORTED_MODULE_0__.subscription_ws_url}submission/subscription_${this.indexDetails['index']}/`;
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data)['response'];
      if (data['submission_message']) {
        if (this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef.afterClosed().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.finalize)(() => this.dialogRef = undefined));
        }
        this.submission_message = data['submission_message'];
        this.subscription_status = data['subscription_status'];
        if (this.subscription_status) {
          this.dialogSubscriptionInfoRef = this.dialog.open(this.subscriptionInfoTemplate, {
            data: this.subscriber,
            height: '250px',
            width: '600px'
          });
        }
      }
    };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }
  resetPagination(pageIndex) {
    if (pageIndex != 0) {
      this.queryParams['pageIndex'] = pageIndex;
      this.paginator.pageIndex = pageIndex;
      // emit an event so that the table will refresh the data
      this.paginator.page.next({
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    }
  }
  updateUrlCodeFilters() {
    for (const param in this.query['filters']) {
      if (Array.isArray(this.query['filters'][param])) {
        let filters_arr = [];
        this.query['filters'][param].forEach((val, i) => {
          const filterValue = this.getFilterCodeValue(param, val);
          if (filterValue) {
            filters_arr = filters_arr.concat(filterValue);
          }
        });
        this.query['filters'][param] = filters_arr;
      }
    }
  }
  getFilterCodeValue(paramName, displayVal) {
    if (paramName in this.specialFilters) {
      const matchedFiltersArr = this.specialFilters[paramName].filter(obj => obj['displayValue'] == displayVal);
      if (matchedFiltersArr.length > 0) {
        return matchedFiltersArr[0]['filterValue'];
      }
    }
    return [displayVal];
  }
  onPageChange($event) {
    const params = {
      pageIndex: this.paginator.pageIndex
    };
    this.urlTree = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    }).toString();
    //Update route with Query Params
    this.location.go(this.urlTree);
  }
  ngDoCheck() {
    if (this.urlTree) {
      this.location.go(this.urlTree);
    }
    this.urlTree = '';
  }
  static #_ = this.ɵfac = function TableServerSideComponent_Factory(t) {
    return new (t || TableServerSideComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_12__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_api_data_service__WEBPACK_IMPORTED_MODULE_1__.ApiDataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_15__.Location));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: TableServerSideComponent,
    selectors: [["app-table-server-side"]],
    viewQuery: function TableServerSideComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_17__.MatSort, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.subscriptionTemplate = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.subscriptionInfoTemplate = _t.first);
      }
    },
    inputs: {
      display_fields: "display_fields",
      column_names: "column_names",
      templates: "templates",
      filter_values: "filter_values",
      apiFunction: "apiFunction",
      query: "query",
      defaultSort: "defaultSort",
      indexDetails: "indexDetails"
    },
    outputs: {
      dataUpdate: "dataUpdate",
      sortUpdate: "sortUpdate"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 14,
    vars: 5,
    consts: [["subscriptionTemplate", ""], ["subscriptionInfoTemplate", ""], [2, "width", "100%", "margin-top", "10px"], ["matInput", "", "name", "searchField", "placeholder", "Search", 3, "keyup", "ngModelChange", "ngModel"], ["mat-table", "", "matSort", "", "table-striped", "", 2, "width", "100%", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["pageSize", "25", 3, "page", "length"], ["mat-header-cell", "", "class", "table-header", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "table-cell-data", "style", "padding-right: 5px; max-width: 150px", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "table-header"], ["mat-cell", "", 1, "table-cell-data", 2, "padding-right", "5px", "max-width", "150px"], ["mat-icon-button", "", 3, "click"], [1, "subscription-icon"], ["mat-header-row", ""], ["mat-row", ""], ["mat-dialog-content", "", 1, "centerContents"], [1, "mat-dialog-title-font"], ["novalidate", "", 3, "formGroup"], ["appearance", "fill"], ["matInput", "", "placeholder", "Enter email", "formControlName", "subscriberEmail", "id", "subscriberEmail", 3, "input"], ["align", "end"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "click"], ["fxLayout", "row", 3, "ngClass"], ["fxFlex", "100"]],
    template: function TableServerSideComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 2)(1, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup", function TableServerSideComponent_Template_input_keyup_3_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.searchChanged($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function TableServerSideComponent_Template_input_ngModelChange_3_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.currentSearchTerm, $event) || (ctx.currentSearchTerm = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "table", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](5, TableServerSideComponent_For_6_Template, 3, 3, "ng-container", 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, TableServerSideComponent_tr_7_Template, 1, 0, "tr", 6)(8, TableServerSideComponent_tr_8_Template, 1, 0, "tr", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-paginator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("page", function TableServerSideComponent_Template_mat_paginator_page_9_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onPageChange($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, TableServerSideComponent_ng_template_10_Template, 16, 6, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"])(12, TableServerSideComponent_ng_template_12_Template, 7, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.currentSearchTerm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx.display_fields);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.display_fields);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.display_fields);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("length", ctx.totalHits);
      }
    },
    dependencies: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_19__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__.MatSort, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCell, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIcon, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRow, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogContent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatError, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatButton, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass],
    styles: [".table-header[_ngcontent-%COMP%] {\n    background-color: rgba(0, 0, 0, 0.07);\n    font-size: 14px;\n    color: black;\n    font-weight: 600;\n}\n\n.table-cell-data[_ngcontent-%COMP%] {\n    padding-right: 12px !important;\n}\n\ntd.mat-cell[_ngcontent-%COMP%]:first-of-type, \ntd.mat-footer-cell[_ngcontent-%COMP%]:first-of-type, \nth.mat-header-cell[_ngcontent-%COMP%]:first-of-type {\n    padding-left: 10px;\n}\n.subscription-icon[_ngcontent-%COMP%] {\n  color: steelblue;\n}\n\n.mat-dialog-title-font[_ngcontent-%COMP%] {\n  \n\n}\n\ndiv.mat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin:0 auto;\n  display:block;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL3RhYmxlLXNlcnZlci1zaWRlL3RhYmxlLXNlcnZlci1zaWRlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxxQ0FBcUM7SUFDckMsZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7OztJQUdJLGtCQUFrQjtBQUN0QjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7QUFDZiIsInNvdXJjZXNDb250ZW50IjpbIi50YWJsZS1oZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNyk7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udGFibGUtY2VsbC1kYXRhIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMnB4ICFpbXBvcnRhbnQ7XG59XG5cbnRkLm1hdC1jZWxsOmZpcnN0LW9mLXR5cGUsXG50ZC5tYXQtZm9vdGVyLWNlbGw6Zmlyc3Qtb2YtdHlwZSxcbnRoLm1hdC1oZWFkZXItY2VsbDpmaXJzdC1vZi10eXBlIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG4uc3Vic2NyaXB0aW9uLWljb24ge1xuICBjb2xvcjogc3RlZWxibHVlO1xufVxuXG4ubWF0LWRpYWxvZy10aXRsZS1mb250IHtcbiAgLypjb2xvcjogc3RlZWxibHVlOyovXG59XG5cbmRpdi5tYXQtZGlhbG9nLWFjdGlvbnMgYnV0dG9uIHtcbiAgbWFyZ2luOjAgYXV0bztcbiAgZGlzcGxheTpibG9jaztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  cookieDomain: 'localhost',
  // host: 'http://localhost:8000/',
  // host: 'http://45.88.81.194:8001/',
  // host: 'http://localhost:57564/',
  host: 'https://api.faang.org/',
  relatedProjectsHost: 'https://raw.githubusercontent.com/FAANG/comm-data-portal-projects/master/projects/'
};
/*
 * In development mode, for easier debugging, you can ignore zone related errorSubject
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/plugins/zone-errorSubject';  // Included with Angular CLI.

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 5312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.log(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map