(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./demo/app.component.css":
/*!********************************!*\
  !*** ./demo/app.component.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dynamic-form {\n  display: inline-block;\n  float: left;\n  padding-left: 25px;\n}\n.half-size {\n  width: 50%;\n}\n#preview{\n  width: 100%;\n  border: 1px solid forestgreen;\n}\npre {\n  display: inline-block;\n  /*display: none;*/\n  padding-left: 10px;\n  background-color: lightgrey;\n  width: 46%;\n}\n"

/***/ }),

/***/ "./demo/app.component.html":
/*!*********************************!*\
  !*** ./demo/app.component.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\">\n  <dynamic-form #form class=\"half-size\" [layout]=\"layout\" [entity]=\"entity\" (cancel)=\"onCancel($event)\"\n    (remove)=\"onDelete($event)\" (submit)=\"onSubmit($event)\">\n  </dynamic-form>\n</div>"

/***/ }),

/***/ "./demo/app.component.ts":
/*!*******************************!*\
  !*** ./demo/app.component.ts ***!
  \*******************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _src_app_dynamic_form_components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/app/dynamic-form/components/dynamic-form/dynamic-form.component */ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.service */ "./demo/layout.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(layoutService) {
        this.layoutService = layoutService;
        this.jsonSelect = [];
        this.layout = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var previewJson = localStorage.getItem("previewJson");
        if (previewJson == undefined || previewJson == null)
            localStorage.setItem("previewJson", JSON.stringify([{ "type": "heading", "label": "Dynamic Data demo", "options": { "level": 1 } }, { "type": "static", "label": "<em>Enrolling in this program requires your consent.</em>" }, { "type": "states", "name": "state", "label": "State", "options": { "hint": "Select a state", "showIf": {}, "validation": { "required": true, "requiredIf": {} } } }, { "type": "ssn", "name": "ssn", "label": "Social security number", "options": { "validation": { "required": true, "requiredIf": {} } } }, { "type": "zip", "name": "zip", "label": "Zip", "options": { "validation": { "required": true, "requiredIf": {} } } }, { "name": "password", "type": "password", "label": "Password", "options": { "hint": "Enter your password.", "validation": { "required": true } } }, { "name": "startTime", "type": "time", "label": "Start time", "options": { "hint": "Enter start time.", "validation": { "required": true } } }, { "name": "altPhone", "type": "text-mask", "label": "Alt phone", "options": { "hint": "Enter another phone number.", "inputMask": "(000) 000-0000", "validation": { "required": true, "pattern": "[0-9]{10}", "patternValMsg": "Alt phone should be 10 digits." } } }, { "type": "checkbox", "name": "consent", "label": "I consent.", "options": { "hint": "Consent is required to continue.", "align": "after", "validation": { "required": true } } }, { "name": "name", "type": "text", "label": "Full name", "options": { "hint": "Enter your full name.", "validation": { "required": true, "minLength": "3", "maxLength": "100" } } }, { "name": "schoolInfo", "type": "panel", "label": "School Information", "options": { "validation": { "required": true }, "hint": "Talkin' 'bout your education", "fields": [{ "name": "school", "type": "text", "label": "School", "options": { "autocomplete": true, "hint": "Start typing...", "validation": { "required": true }, "items": [{ "label": "Central High School" }, { "label": "East High School" }, { "label": "North High School" }] } }, { "name": "address", "type": "address", "label": "Address", "options": { "validation": { "required": true }, "hint": "Enter your school's address" } }, { "name": "studentId", "type": "text", "label": "Student Id", "options": { "hint": "AA000", "validation": { "required": true, "pattern": "[A-Z]{2}[0-9]{3}" } } }] } }, { "name": "age", "type": "number", "label": "Age", "options": { "hint": "Provide your current age.", "validation": { "required": true, "min": "12", "max": "22" } } }, { "type": "date", "name": "dateOfBirth", "label": "Date of birth", "options": { "hint": "Provide your date of birth.", "startAt": { "year": "2001", "month": "0", "day": "1" }, "validation": { "required": true, "minDate": { "year": "2001", "month": "0", "day": "1" }, "maxDate": { "year": "2010", "month": "11", "day": "15" } } } }, { "type": "select", "name": "status", "label": "Status", "options": { "hint": "Select the case status", "validation": { "required": true }, "items": [{ "value": "1", "label": "New" }, { "value": "2", "label": "Active" }, { "value": "3", "label": "Closed" }, { "value": "4", "label": "Other", "options": { "specify": { "name": "statusOther", "type": "text", "label": "Please specify", "options": { "hint": "(e.g. withdrawn, deceased)", "validation": { "required": true, "minLength": "2", "maxLength": "100" } } } } }] } }, { "type": "select", "name": "appointmentTime", "label": "Appointment time", "options": { "hint": "Select the appointment time", "validation": { "required": true }, "items": [{ "value": "10", "label": "10:00 AM" }, { "value": "11", "label": "11:00 AM" }, { "value": "12", "label": "12:00 PM" }, { "value": "13", "label": " 1:00 PM", "options": { "specify": { "name": "statusOther", "type": "text", "label": "Please specify", "options": { "hint": "(e.g. withdrawn, deceased)", "validation": { "required": true, "minLength": "2", "maxLength": "100" } } } } }] } }, { "name": "sportsList", "type": "checkbox-group", "label": "Which of the following sports did you play last year?", "options": { "hint": "(Check all that apply)", "validation": { "requiredMin": "2" }, "fields": [{ "type": "checkbox", "name": "baseball", "label": "Baseball", "options": { "align": "after", "validation": {} } }, { "type": "checkbox", "name": "soccer", "label": "Soccer", "options": { "align": "after", "validation": {} } }, { "type": "checkbox", "name": "teamSport", "label": "Other team sport", "options": { "align": "after", "validation": {}, "specify": { "name": "teamSportOther", "type": "text", "label": "Please specify type", "options": { "hint": "(e.g. dodge ball, kickball)", "validation": { "requiredIf": { "property": "teamSport", "value": "true" }, "minLength": "3", "maxLength": "100" } } } } }, { "type": "checkbox", "name": "sport", "label": "Other individual sport", "options": { "align": "after", "validation": {}, "specify": { "name": "sportOther", "type": "text", "label": "Please specify", "options": { "hint": "(e.g. running, swimming)", "validation": { "required": true, "minLength": "3", "maxLength": "100" } } } } }] } }, { "name": "brightness", "type": "slider", "label": "Brightness", "options": { "validation": { "required": true, "min": 0, "max": "10" }, "invert": false, "vertical": false, "thumbLabel": true, "step": "0.5", "tickInterval": "auto" } }, { "type": "radio", "name": "color", "label": "Which color is your favorite?", "options": { "hint": "Select your preference", "align": "after", "vertical": true, "validation": { "required": true }, "items": [{ "value": "blue", "label": "Blue" }, { "value": "red", "label": "Red" }, { "value": "yellow", "label": "Yellow" }, { "value": "other", "label": "Other", "options": { "specify": { "name": "colorOther", "type": "text", "label": "Please specify", "options": { "hint": "(e.g. turquoise, chartreuse)", "validation": { "required": true, "minLength": "3", "maxLength": "100" } } } } }] } }, { "name": "contactInfo", "type": "fieldset", "label": "Your contact info", "options": { "fields": [{ "type": "phone", "name": "phone", "label": "Phone", "options": { "validation": { "required": true, "patternValMsg": "Phone must be 10 digits", "requiredIf": {} } } }, { "name": "email", "type": "email", "label": "Email", "options": { "hint": "Provide your email address.", "validation": { "required": false } } }] } }, { "name": "contacts", "type": "array", "label": "Additional contacts", "options": { "hint": "Please provide a few names of people close to you.", "addText": "Add contact", "removeText": "Remove contact", "fields": [{ "name": "contactName", "type": "text", "label": "Name", "options": { "hint": "Enter the full name", "validation": { "required": true, "minLength": 3, "maxLength": 100 } } }, { "name": "relationship", "type": "select", "label": "Relationship to you", "options": { "hint": "Give us a clue", "items": [{ "value": "mother", "label": "Mom" }, { "value": "father", "label": "Dad" }, { "value": "other", "label": "Other", "options": { "specify": { "name": "otherRelationship", "type": "text", "label": "Please specify", "options": { "hint": "(e.g. grandparent, neighbor)", "validation": { "requiredIf": { "property": "relationship", "value": "other" }, "minLength": "2", "maxLength": "100" } } } } }], "validation": { "required": false } } }] } }, { "name": "notes", "type": "textarea", "label": "Notes", "options": { "hint": "Please provide a few more details.", "validation": { "required": true } } }, { "type": "slide-toggle", "name": "onOff", "label": "Toggle on or off.", "options": { "align": "after", "validation": { "required": true } } }, { "type": "action-toolbar", "options": { "buttons": { "allowDelete": false, "allowCancel": false, "allowSubmit": true } } }]));
        previewJson = localStorage.getItem("previewJson");
        this.layout = JSON.parse(previewJson);
    };
    AppComponent.prototype.onChange = function (val) {
    };
    AppComponent.prototype.onSubmit = function (value) {
    };
    AppComponent.prototype.onDelete = function () {
        // // handle delete event
        // console.log('handle delete');
    };
    AppComponent.prototype.onCancel = function () {
        // handle cancel event
        console.log('handle cancel');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _src_app_dynamic_form_components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_1__["DynamicFormComponent"])
    ], AppComponent.prototype, "formDemoType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _src_app_dynamic_form_components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_1__["DynamicFormComponent"])
    ], AppComponent.prototype, "form", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-root',
            template: __webpack_require__(/*! ./app.component.html */ "./demo/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./demo/app.component.css")]
        }),
        __metadata("design:paramtypes", [_layout_service__WEBPACK_IMPORTED_MODULE_2__["LayoutService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./demo/app.module.ts":
/*!****************************!*\
  !*** ./demo/app.module.ts ***!
  \****************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _src_app_dynamic_form_dynamic_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/app/dynamic-form/dynamic-data.module */ "./src/app/dynamic-form/dynamic-data.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./demo/app.component.ts");
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout.service */ "./demo/layout.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// published library
// import {DynamicDataModule} from '../lib/dynamic-form/dynamic-data.module';
// import {LayoutService} from '../lib/dynamic-form/services/layout-service/layout.service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _src_app_dynamic_form_dynamic_data_module__WEBPACK_IMPORTED_MODULE_2__["DynamicDataModule"]],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            providers: [_layout_service__WEBPACK_IMPORTED_MODULE_4__["LayoutService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./demo/layout.service.ts":
/*!********************************!*\
  !*** ./demo/layout.service.ts ***!
  \********************************/
/*! exports provided: LayoutService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutService", function() { return LayoutService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutService = /** @class */ (function () {
    function LayoutService(http) {
        this.http = http;
    }
    LayoutService.prototype.get = function (url) {
        return (this.http
            .get(url)
            // .delay(2000)
            .pipe(function (data) {
            return data;
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (error) {
            throw error;
        })));
    };
    LayoutService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], LayoutService);
    return LayoutService;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]],
            declarations: [],
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fill-space {\n  flex: 1 1 auto;\n}\n\n.mat-toolbar {\n  background: rgba(253, 252, 252, 0.87);\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container>\n  <mat-toolbar>\n      <button\n        *ngIf=\"config.options.buttons.allowDelete\"\n        mat-button\n        mat-raised-button\n        data-action=\"delete\"\n        type=\"submit\"\n        color=\"warn\"\n      >\n        {{ getButtonText('delete') }}\n      </button>\n      <span class=\"fill-space\"></span>\n      <button\n        *ngIf=\"config.options.buttons.allowCancel\"\n        mat-button\n        mat-raised-button\n        data-action=\"cancel\"\n        type=\"submit\"\n      >\n        {{ getButtonText('cancel') }}\n      </button>\n\n      <button\n        *ngIf=\"config.options.buttons.allowSubmit\"\n        mat-button\n        mat-raised-button\n        data-action=\"submit\"\n        color=\"primary\"\n        type=\"submit\"\n      >\n        {{ getButtonText('submit') }}\n      </button>\n  </mat-toolbar>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.ts ***!
  \************************************************************************************/
/*! exports provided: ActionToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionToolbarComponent", function() { return ActionToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enumerations/action-buttons */ "./src/app/dynamic-form/enumerations/action-buttons.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ActionToolbarComponent = /** @class */ (function () {
    function ActionToolbarComponent() {
    }
    ActionToolbarComponent.prototype.getActionButtonEnum = function (button) {
        switch (button) {
            case 'cancel':
                return _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Cancel;
            case 'delete':
                return _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Delete;
            case 'submit':
                return _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Submit;
        }
    };
    ActionToolbarComponent.prototype.getButtonText = function (button) {
        switch (this.getActionButtonEnum(button)) {
            case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Cancel:
                return this.config.options.buttons.cancelButtonText
                    ? this.config.options.buttons.cancelButtonText
                    : 'Cancel';
            case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Delete:
                return this.config.options.buttons.deleteButtonText
                    ? this.config.options.buttons.deleteButtonText
                    : 'Delete';
            case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_1__["ActionButtons"].Submit:
                return this.config.options.buttons.submitButtonText
                    ? this.config.options.buttons.submitButtonText
                    : 'Submit';
        }
    };
    ActionToolbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-action-toolbar',
            template: __webpack_require__(/*! ./action-toolbar.component.html */ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.html"),
            styles: [__webpack_require__(/*! ./action-toolbar.component.css */ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.css")],
        })
    ], ActionToolbarComponent);
    return ActionToolbarComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-base-component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-base-component.ts ***!
  \*******************************************************************/
/*! exports provided: DynamicBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicBaseComponent", function() { return DynamicBaseComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_1__);
/// <reference types="@types/node" />


// workaround - assign import to a variable to avoid 
// rollup.js error "Cannot call a namespace ('uuidv4')"
var uuid = uuid_v4__WEBPACK_IMPORTED_MODULE_1__;
var DynamicBaseComponent = /** @class */ (function () {
    function DynamicBaseComponent() {
        this.id = "ddc-id-" + uuid();
    }
    DynamicBaseComponent.prototype.ngOnInit = function () {
        this.requiredIfChanges();
        this.showIfChanges();
    };
    DynamicBaseComponent.prototype.resetControls = function (config, disable, nestedGroup) {
        var _this = this;
        if (disable === void 0) { disable = false; }
        if (nestedGroup === void 0) { nestedGroup = null; }
        var group = nestedGroup || this.group;
        if (group.controls[config.name]) {
            if (disable) {
                group.controls[config.name].disable(); // disable to be exempt from validation checks
                group.controls[config.name].reset();
            }
            else {
                group.controls[config.name].enable();
            }
        }
        if (config.options.fields) {
            config.options.fields.forEach(function (f) {
                var g = group.controls[config.name] instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]
                    ? group.controls[config.name]
                    : null;
                _this.resetControls(f, disable, g);
            });
        }
        if (config.options.items) {
            config.options.items.forEach(function (i) {
                if (i.options && i.options.specify) {
                    _this.resetControls(i.options.specify, disable);
                    _this.handleSpecifyConfig(group, i.options.specify, disable);
                }
            });
        }
        if (config.options.specify) {
            this.resetControls(config.options.specify, disable);
            this.handleSpecifyConfig(group, config.options.specify, disable);
        }
    };
    DynamicBaseComponent.prototype.findControl = function (group, properties) {
        // NOTE: this method is still limited to properties within the same FormGroup
        // properties represents the array of a property containing dot notation; i.e. insuranceType.mediCal
        var property = properties[0];
        // get the first property and check if it is a FormGroup; i.e. insuranceType
        if (group.get(property) instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]) {
            // check nested FormGroup for the next property within the dot notation; i.e. mediCal
            return this.findControl(group.get(property), properties.slice(1));
        }
        // return the lowest level FormControl with the specified property name
        return group.get(property);
    };
    DynamicBaseComponent.prototype.handleSpecifyConfig = function (group, spec, disable) {
        if (group.get(spec.name)) {
            group.get(spec.name).disable();
        }
    };
    DynamicBaseComponent.prototype.handleEnableDisable = function (validation, onInit) {
        if (onInit === void 0) { onInit = false; }
        if (!this.requiredIf() ||
            (onInit &&
                this.group.controls[validation.property].value === undefined &&
                this.group.value &&
                this.group.value[validation.property] &&
                this.group.value[validation.property].toString() ===
                    validation.value.toString()) ||
            (this.group.controls[validation.property].value &&
                this.group.controls[validation.property].value.toString() !==
                    validation.value.toString())) {
            this.resetControls(this.config, true);
        }
        else {
            this.resetControls(this.config);
        }
    };
    DynamicBaseComponent.prototype.requiredIfChanges = function () {
        var _this = this;
        if (!this.config.options || !this.config.options.validation) {
            return;
        }
        var validation = this.config.options.validation.requiredIf;
        if (validation &&
            validation.property &&
            this.group.controls[validation.property]) {
            this.handleEnableDisable(validation, true); // check if text component should be disabled onInit
            this.group.controls[validation.property].valueChanges.subscribe(function (val) {
                _this.handleEnableDisable(validation);
            });
        }
    };
    DynamicBaseComponent.prototype.requiredIf = function () {
        var validation = this.config.options.validation.requiredIf;
        var required = validation &&
            validation.property &&
            this.group.controls[validation.property] &&
            (!this.group.controls[validation.property].value ||
                (this.group.controls[validation.property].value &&
                    validation.value &&
                    this.group.controls[validation.property].value.toString() ===
                        validation.value.toString()));
        // check parent FormGroup if validation.property does not exist within the FormArray
        if (this.group.parent &&
            this.group.parent instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormArray"] &&
            validation &&
            validation.property &&
            !this.group.controls[validation.property]) {
            var parentGroup = this.group.parent.parent;
            required =
                validation &&
                    validation.property &&
                    parentGroup.controls[validation.property] &&
                    (!parentGroup.controls[validation.property].value ||
                        (parentGroup.controls[validation.property].value &&
                            validation.value &&
                            parentGroup.controls[validation.property].value.toString() ===
                                validation.value.toString()));
        }
        return required;
    };
    DynamicBaseComponent.prototype.showIfChanges = function () {
        var _this = this;
        var showIf = this.config.options && this.config.options.showIf
            ? this.config.options.showIf
            : null;
        var ctrl = showIf &&
            showIf.property &&
            this.findControl(this.group, showIf.property.split('.'));
        if (ctrl) {
            ctrl.valueChanges.subscribe(function (val) {
                if (!_this.showIf()) {
                    _this.resetControls(_this.config, true);
                }
                else {
                    _this.resetControls(_this.config);
                }
            });
        }
    };
    DynamicBaseComponent.prototype.showIf = function () {
        var showIf = this.config.options && this.config.options.showIf
            ? this.config.options.showIf
            : null;
        var ctrl = showIf &&
            showIf.property &&
            this.findControl(this.group, showIf.property.split('.'));
        var show = !showIf ||
            (showIf && !showIf.property) ||
            (showIf &&
                showIf.property &&
                ctrl &&
                (ctrl.value &&
                    showIf.value &&
                    ctrl.value.toString() === showIf.value.toString()));
        return show;
    };
    return DynamicBaseComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n  font-family: Roboto, Arial, sans-serif;\n}\n\n:host ::ng-deep .dynamic-group {\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n\n:host ::ng-deep .component-container{\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n:host ::ng-deep fieldset .dynamic-field:first-of-type,\n:host ::ng-deep mat-card .dynamic-field:first-of-type{\n   margin-top: 0;\n }\n\n:host ::ng-deep .mimic-mat-hint {\n  color: rgba(0,0,0,.54);\n  font-size: 75%;\n  margin-top: .54167em;\n}\n\n:host ::ng-deep .mimic-mat-error {\n  color: rgb(244, 67, 54);\n  font-size: 75%;\n  font-weight: normal;\n  line-height: 13.5px;\n  text-align: left;\n  /*position: absolute;*/\n  margin-top: .54167em;\n}\n\n:host ::ng-deep .mimic-mat-placeholder {\n  display: block;\n}\n\n:host ::ng-deep .mimic-mat-placeholder:not(.mat-error) {\n  color: rgba(0, 0, 0, .54);\n}\n\n:host ::ng-deep .mimic-mat-label {\n   font-size: 14px;\n    line-height: 1.42857143;\n    font-weight: 400;\n}"

/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form\n  class=\"dynamic-form\"\n  [id]=\"id\"\n  [name]=\"id\"\n  [formGroup]=\"form\"\n  [ngClass]=\"submitted ? 'ddc-submitted' : ''\"\n  (submit)=\"handleSubmit($event)\">\n  <div\n    class=\"component-container\"\n    *ngFor=\"let config of layout;\"\n    dynamicField\n    [config]=\"config\"\n    [group]=\"form\">\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.ts ***!
  \********************************************************************************/
/*! exports provided: DynamicFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormComponent", function() { return DynamicFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../element-config/element-config */ "./src/app/element-config/element-config.ts");
/* harmony import */ var _element_config_element_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../element-config/element-type */ "./src/app/element-config/element-type.ts");
/* harmony import */ var _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dynamic-form-builder */ "./src/app/dynamic-form/dynamic-form-builder.ts");
/* harmony import */ var _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enumerations/action-buttons */ "./src/app/dynamic-form/enumerations/action-buttons.ts");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// workaround - assign import to a variable to avoid
// rollup.js error "Cannot call a namespace ('uuidv4')"
var uuid = uuid_v4__WEBPACK_IMPORTED_MODULE_6__;
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(elRef) {
        this.elRef = elRef;
        this.layout = [];
        this.valueChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.submit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.id = "dd-id-" + uuid();
        this.dynFormBuilder = new _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_4__["DynamicFormBuilder"]();
        this.submitted = false;
    }
    Object.defineProperty(DynamicFormComponent.prototype, "changes", {
        get: function () {
            return this.form.valueChanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "valid", {
        get: function () {
            return this.form.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "errors", {
        get: function () {
            return this.getErrors(this.form);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "value", {
        get: function () {
            // getRawValue will include disabled controls. value will not.
            return this.form.getRawValue();
            // this.form.value;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.dynFormBuilder.createForm();
        this.reconcileLayout();
        this.reconcileForm();
        this.form.valueChanges.subscribe(function (val) {
            _this.valueChanges.emit(val);
        });
    };
    DynamicFormComponent.prototype.ngOnChanges = function () {
        this.reconcileLayout();
        this.reconcileForm();
    };
    DynamicFormComponent.prototype.reconcileForm = function () {
        if (this.dynFormBuilder && this.form) {
            this.dynFormBuilder.reconcileForm(this.form, this.layout, this.entity);
        }
    };
    DynamicFormComponent.prototype.reconcileLayout = function () {
        if (!this.layout) {
            var actionToolbar = _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__["ElementConfig"].get(_element_config_element_type__WEBPACK_IMPORTED_MODULE_3__["ElementType"].ActionToolbar)
                .entity;
            if (this.entity && this.entity.fields) {
                // we know we're editing so let's include the delete button
                actionToolbar.options.buttons.allowDelete = true;
                this.layout = _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__["ElementConfig"].parseEntity(this.entity.fields);
            }
            else {
                // this is a new layout; no delete needed
                actionToolbar.options.buttons.allowDelete = false;
                this.layout = [];
                this.layout.push(_element_config_element_config__WEBPACK_IMPORTED_MODULE_2__["ElementConfig"].get(_element_config_element_type__WEBPACK_IMPORTED_MODULE_3__["ElementType"].LayoutEditor).layout);
            }
            this.layout.push(actionToolbar);
        }
    };
    DynamicFormComponent.prototype.validateFormControls = function (control) {
        var _this = this;
        if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
            control.markAsTouched({ onlySelf: true });
            return;
        }
        else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
            // controls is json object, so get keys and loop to get form controls
            Object.keys(control.controls).forEach(function (key) {
                var c = control.get(key);
                c.markAsTouched({ onlySelf: true });
                _this.validateFormControls(c);
            });
        }
        else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]) {
            // controls is array, so use it
            control.controls.forEach(function (c) {
                c.markAsTouched({ onlySelf: true });
                _this.validateFormControls(c);
            });
        }
    };
    DynamicFormComponent.prototype.validate = function () {
        this.validateFormControls(this.form);
    };
    DynamicFormComponent.prototype.handleSubmit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.submitted = true;
        var btn = this.elRef.nativeElement.querySelector('button.cdk-focused.cdk-mouse-focused');
        if (btn) {
            var action = btn.getAttribute('data-action');
            switch (action) {
                case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_5__["ActionButtons"].Delete:
                    this.remove.emit(this.value);
                    break;
                case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_5__["ActionButtons"].Cancel:
                    this.cancel.emit(this.value);
                    break;
                case _enumerations_action_buttons__WEBPACK_IMPORTED_MODULE_5__["ActionButtons"].Submit:
                    this.validateFormControls(this.form);
                    this.submit.emit(this.value);
                    break;
                default:
                    console.log('Unknown action');
                    break;
            }
        }
    };
    DynamicFormComponent.prototype.setDisabled = function (name, disable) {
        // if already added to controls, change there
        if (this.form.controls[name]) {
            var method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }
        // otherwise, change config so it is built with corret disable
        this.layout = this.layout.map(function (item) {
            if (item.name === name) {
                if (!item.options) {
                    item.options = {};
                }
                item.options.disabled = disable;
            }
            return item;
        });
    };
    DynamicFormComponent.prototype.getValue = function (name) {
        var value = this.entity ? this.entity[name] : this.entity;
        if (!value) {
            return value;
        }
        var config = this.layout.find(function (field) { return field.name === name; });
        // type conversion
        switch (config ? config.type : '') {
            case 'date':
                return new Date(value);
            default:
                return value;
        }
    };
    DynamicFormComponent.prototype.getControlErrors = function (key, control) {
        var _this = this;
        if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
            return {
                field: key,
                errors: control.errors
            };
        }
        var errs = control.errors;
        var childErrs = null;
        if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
            childErrs = this.getErrors(control);
        }
        else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]) {
            childErrs = control.controls
                .map(function (c, i) {
                return _this.getControlErrors(key + '[' + i + ']', c);
            })
                .filter(function (x) { return x.errors; });
        }
        if (childErrs && childErrs.length > 0) {
            if (!errs) {
                errs = {};
            }
            errs['children'] = childErrs;
        }
        return {
            field: key,
            errors: errs
        };
    };
    DynamicFormComponent.prototype.getErrors = function (group) {
        var _this = this;
        if (!group.controls) {
            return {};
        }
        return Object.keys(group.controls)
            .map(function (key) {
            return _this.getControlErrors(key, group.controls[key]);
        })
            .filter(function (x) { return x.errors; });
    };
    DynamicFormComponent.prototype.getControlsForGroup = function (group) {
        if (!group || !group.controls) {
            return [];
        }
        var keys = Object.keys(group.controls);
        if (!keys || keys.length === 0) {
            return [];
        }
        return keys.map(function (key) { return group.controls[key]; });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DynamicFormComponent.prototype, "layout", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DynamicFormComponent.prototype, "entity", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DynamicFormComponent.prototype, "valueChanges", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DynamicFormComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DynamicFormComponent.prototype, "remove", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DynamicFormComponent.prototype, "submit", void 0);
    DynamicFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form',
            template: __webpack_require__(/*! ./dynamic-form.component.html */ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-form.component.css */ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "pre {\n  background-color: lightgrey;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title *ngIf=\"data.heading\">{{data.heading}}</h1>\n<div *ngIf=\"!data.preformattedJson\">\n  <div mat-dialog-content [ngClass]=\"data.size\">\n    <dynamic-form\n      #modalForm\n      [layout]=\"data.layout\"\n      [entity]=\"data.entity\"\n    >\n    </dynamic-form>\n  </div>\n  <div mat-dialog-actions>\n    <button mat-raised-button color=\"primary\" [mat-dialog-close]=\"returnValue ? returnValue : modalForm.value\" tabindex=\"2\">{{primaryButtonText}}</button>\n    <button mat-raised-button (click)=\"cancel()\" tabindex=\"-1\" *ngIf=\"displayCancel()\">{{secondaryButtonText}}</button>\n  </div>\n</div>\n\n<div *ngIf=\"data.preformattedJson\">\n  <div mat-dialog-content [ngClass]=\"data.size\">\n  <pre>{{ data.entity | json }}</pre>\n  </div>\n  <div *ngIf=\"data.preformattedJson\"  mat-dialog-actions>\n    <button mat-raised-button color=\"primary\" [mat-dialog-close]=\"returnValue\" tabindex=\"2\">{{primaryButtonText}}</button>\n    <button mat-raised-button (click)=\"cancel()\" tabindex=\"-1\" *ngIf=\"displayCancel()\">{{secondaryButtonText}}</button>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.ts ***!
  \************************************************************************************************/
/*! exports provided: DynamicModalDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicModalDialogComponent", function() { return DynamicModalDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enumerations/dialog-buttons */ "./src/app/dynamic-form/enumerations/dialog-buttons.ts");
/* harmony import */ var _dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dynamic-form/dynamic-form.component */ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var DynamicModalDialogComponent = /** @class */ (function () {
    function DynamicModalDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.primaryButtonText = 'Submit';
        this.secondaryButtonText = 'Cancel';
        if (!data.preformattedJson) {
            data.preformattedJson = false;
        }
        switch (data.dialogButtons) {
            case _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].OK:
            case _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].OKCancel:
                this.primaryButtonText = 'OK';
                this.returnValue = true;
                break;
            case _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].NextCancel:
                this.primaryButtonText = 'Next';
                break;
            case _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].SaveCancel:
                this.primaryButtonText = 'Save';
                break;
            case _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].YesNo:
                this.primaryButtonText = 'Yes';
                this.secondaryButtonText = 'No';
                this.returnValue = true;
                break;
        }
    }
    DynamicModalDialogComponent.prototype.checkValidity = function () {
        return (this.data.dialogButtons === _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].NextCancel ||
            this.data.dialogButtons === _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].SaveCancel ||
            this.data.dialogButtons === _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].SubmitCancel);
    };
    DynamicModalDialogComponent.prototype.displayCancel = function () {
        return this.data.dialogButtons !== _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].OK;
    };
    DynamicModalDialogComponent.prototype.cancel = function () {
        if (this.data.dialogButtons === _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].OKCancel ||
            this.data.dialogButtons === _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_2__["DialogButtons"].YesNo) {
            return this.dialogRef.close(false);
        }
        this.dialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__["DynamicFormComponent"])
    ], DynamicModalDialogComponent.prototype, "modalForm", void 0);
    DynamicModalDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-dynamic-modal-dialog',
            template: __webpack_require__(/*! ./dynamic-modal-dialog.component.html */ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-modal-dialog.component.css */ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DynamicModalDialogComponent);
    return DynamicModalDialogComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/form-address/form-address.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-address/form-address.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field{\n  width: 400px;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-address/form-address.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-address/form-address.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\">\n  <mat-form-field>\n    <input\n      matInput\n      type=\"text\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\"\n    >\n    <mat-hint>{{config.options.hint}}</mat-hint>\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n  </mat-form-field>\n\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-address/form-address.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-address/form-address.component.ts ***!
  \********************************************************************************/
/*! exports provided: FormAddressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormAddressComponent", function() { return FormAddressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
/// <reference types="@types/googlemaps" />
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormAddressComponent = /** @class */ (function (_super) {
    __extends(FormAddressComponent, _super);
    function FormAddressComponent(mapsAPILoader) {
        var _this = _super.call(this) || this;
        _this.mapsAPILoader = mapsAPILoader;
        return _this;
    }
    FormAddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        // load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var input = document.getElementById(_this.id);
            var autocomplete = new google.maps.places.Autocomplete(input, {
                types: ['address']
            });
            _this.geolocate(autocomplete);
            // store control in variable before scope change
            var control = _this.group.get(_this.config.name);
            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                control.patchValue(place.formatted_address);
            });
        });
        _super.prototype.ngOnInit.call(this);
    };
    FormAddressComponent.prototype.geolocate = function (autocomplete) {
        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    };
    FormAddressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-address',
            template: __webpack_require__(/*! ./form-address.component.html */ "./src/app/dynamic-form/components/form-address/form-address.component.html"),
            styles: [__webpack_require__(/*! ./form-address.component.css */ "./src/app/dynamic-form/components/form-address/form-address.component.css")]
        }),
        __metadata("design:paramtypes", [_agm_core__WEBPACK_IMPORTED_MODULE_1__["MapsAPILoader"]])
    ], FormAddressComponent);
    return FormAddressComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-array/form-array.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-array/form-array.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button.remove{\n  display: inline-block;\n  float: right;\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin:5px 5px 0 0;\n}\nmat-card {\n  margin: 2px;\n}\ndiv.add {\n  text-align: right;\n  margin: 5px 5px 0 0;\n}"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-array/form-array.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-array/form-array.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  [formGroup]=\"group\"\n  class=\"dynamic-group\"\n>\n  <div\n    class=\"mimic-mat-placeholder\"\n  ><span>{{config.label}}</span></div>\n  <div\n    *ngIf=\"!(group.get(config.name).touched && (group.get(config.name).hasError('required') || group.get(config.name).hasError('minlength') || group.get(config.name).hasError('maxlength')))\"\n    class=\"mimic-mat-hint\"><span>{{config.options.hint}}</span></div>\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('required') && (group.get(config.name).touched)\">\n    <span>Your response is required.</span>\n  </div>\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('minlength') && (group.get(config.name).touched)\">\n    <span>At least {{config.options.validation.minLength}} {{config.options.validation.minLength===1 ? ' is ' :' are '}}required.</span>\n  </div>\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('maxlength') && (group.get(config.name).touched)\">\n    <span>No more than {{config.options.validation.maxLength}} {{config.options.validation.maxLength===1 ? ' is ' :' are '}}allowed.</span>\n  </div>\n  <ng-container\n    [formArrayName]=\"config.name\"\n  >\n    <mat-card\n      *ngFor=\"let subgroup of group.get(config.name)['controls']; let i = index;\"\n    >\n      <button mat-icon-button type=\"button\" color=\"warn\" class=\"remove\" mat-tooltip=\"Remove this one\" aria-label=\"Remove button with icon\" (click)=\"remove(i)\" *ngIf=\"!config.options.removeText\">\n        <mat-icon\n          aria-hidden=\"true\">remove_circle\n        </mat-icon>\n      </button>\n      \n      <button mat-raised-button type=\"button\" color=\"warn\" class=\"remove\" mat-tooltip=\"Remove this one\" aria-label=\"Remove button with icon\" (click)=\"remove(i)\"  *ngIf=\"config.options.removeText\">\n        <mat-icon\n          aria-hidden=\"true\">remove_circle\n        </mat-icon>\n         {{config.options.removeText}}\n      </button>\n      <div\n        *ngFor=\"let field of config.options.fields;\"\n        dynamicField\n        [config]=\"field\"\n        [group]=\"subgroup\"\n      >\n      </div>\n    </mat-card>\n  </ng-container>\n<div class=\"add\">\n  <button mat-mini-fab type=\"button\" (click)=\"add()\" mat-tooltip=\"Add another\" aria-label=\"Add button with icon\" *ngIf=\"!config.options.addText\">\n    <mat-icon\n      aria-hidden=\"true\">add\n    </mat-icon>\n  </button>\n  \n  <button mat-raised-button type=\"button\" (click)=\"add()\" color=\"accent\" mat-tooltip=\"Add another\" aria-label=\"Add button with icon\" *ngIf=\"config.options.addText\">\n    <mat-icon aria-hidden=\"true\">add</mat-icon>\n    {{config.options.addText}}\n  </button>\n</div>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-array/form-array.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-array/form-array.component.ts ***!
  \****************************************************************************/
/*! exports provided: FormArrayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormArrayComponent", function() { return FormArrayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dynamic-form-builder */ "./src/app/dynamic-form/dynamic-form-builder.ts");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormArrayComponent = /** @class */ (function (_super) {
    __extends(FormArrayComponent, _super);
    function FormArrayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormArrayComponent.prototype.ngOnInit = function () {
        this.fb = new _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_1__["DynamicFormBuilder"]();
        this.array = this.group.get(this.config.name);
        _super.prototype.ngOnInit.call(this);
    };
    FormArrayComponent.prototype.add = function () {
        this.array.push(this.fb.createGroup(this.config));
        this.array.markAsTouched();
    };
    FormArrayComponent.prototype.remove = function (index) {
        this.array.removeAt(index);
        this.array.markAsTouched();
    };
    FormArrayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-array',
            template: __webpack_require__(/*! ./form-array.component.html */ "./src/app/dynamic-form/components/form-array/form-array.component.html"),
            styles: [__webpack_require__(/*! ./form-array.component.css */ "./src/app/dynamic-form/components/form-array/form-array.component.css")]
        })
    ], FormArrayComponent);
    return FormArrayComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-button/form-button.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-button/form-button.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-button/form-button.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-button/form-button.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-button\"\n  [formGroup]=\"group\">\n  <button\n    mat-raised-button\n    color=\"primary\"\n    type=\"submit\"\n    [id]=\"config.name\"\n    [name]=\"config.name\"\n  >{{ config.label }}\n  </button>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-button/form-button.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-button/form-button.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormButtonComponent", function() { return FormButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormButtonComponent = /** @class */ (function () {
    function FormButtonComponent() {
    }
    FormButtonComponent.prototype.setValidators = function () {
        // do nothing
    };
    FormButtonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-button',
            template: __webpack_require__(/*! ./form-button.component.html */ "./src/app/dynamic-form/components/form-button/form-button.component.html"),
            styles: [__webpack_require__(/*! ./form-button.component.css */ "./src/app/dynamic-form/components/form-button/form-button.component.css")]
        })
    ], FormButtonComponent);
    return FormButtonComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep .dynamic-field {\n  margin: 5px !important;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-group\"\n  *ngIf=\"showIf()\"\n>\n  <span\n    class=\"mimic-mat-placeholder mimic-mat-label\"\n    [ngClass]=\"{'mat-error': group.get(config.name).hasError('requiredMin') && group.get(config.name).touched}\">\n    {{config.label}}<span *ngIf=\"config.options.validation.requiredMin\"> *</span> </span>\n  \n  <div class=\"mimic-mat-hint\">{{config.options.hint}}</div>    \n  \n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('requiredMin') && (group.get(config.name).touched)\">\n    <span>At least {{config.options.validation.requiredMin}} selection{{config.options.validation.requiredMin===1 ? ' is ' :'s are '}}required.</span>\n  </div>\n  <div\n    *ngFor=\"let field of config.options.fields;\"\n    dynamicField\n    [config]=\"field\"\n    [group]=\"group.get(config.name)\"\n  >\n  </div>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: FormCheckboxGroupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCheckboxGroupComponent", function() { return FormCheckboxGroupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormCheckboxGroupComponent = /** @class */ (function (_super) {
    __extends(FormCheckboxGroupComponent, _super);
    function FormCheckboxGroupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormCheckboxGroupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-checkbox-group',
            template: __webpack_require__(/*! ./form-checkbox-group.component.html */ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.html"),
            styles: [__webpack_require__(/*! ./form-checkbox-group.component.css */ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.css")]
        })
    ], FormCheckboxGroupComponent);
    return FormCheckboxGroupComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\"\n  *ngIf=\"showIf()\"\n  >\n  <mat-checkbox\n    [id]=\"id\"\n    [name]=\"id\"\n    [formControlName]=\"config.name\"\n    [required]=\"config.options.validation.required || requiredIf()\"\n    [labelPosition]=\"(config.options && config.options.align) || 'after'\"\n    [indeterminate]=\"config.options.indeterminate\"\n    (change)=\"change();\"\n  >\n    <span\n      [ngClass]=\"{'mat-error' : group.get(config.name).hasError('required') && group.get(config.name).touched}\"\n    >{{config.label}}<span\n      *ngIf=\"config.options.validation.required\"\n    > *</span></span>\n  </mat-checkbox>\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('required') && group.get(config.name).touched\">\n    <span>Your response is required.</span>\n  </div>\n  <ng-container\n    *ngIf=\"specifyConfig() && !!group.get(config.name).value\"\n    dynamicField\n    [group]=\"group\"\n    [config]=\"config.options.specify\"\n  ></ng-container>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FormCheckboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCheckboxComponent", function() { return FormCheckboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormCheckboxComponent = /** @class */ (function (_super) {
    __extends(FormCheckboxComponent, _super);
    function FormCheckboxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormCheckboxComponent.prototype.getConfig = function () {
        return this.config;
    };
    FormCheckboxComponent.prototype.specifyConfig = function () {
        return this.config.options &&
            this.config.options.specify &&
            this.config.options.specify.type &&
            this.config.options.specify.name
            ? this.config.options.specify
            : undefined;
    };
    FormCheckboxComponent.prototype.change = function () {
        var spec = this.specifyConfig();
        // if value cleared & spec exists, then clear spec value too
        if (!this.group.get(this.config.name).value) {
            if (spec && this.group.get(spec.name)) {
                this.group.get(spec.name).reset();
                this.group.get(spec.name).disable();
            }
        }
        else {
            if (spec && this.group.get(spec.name)) {
                this.group.get(spec.name).enable();
            }
        }
    };
    FormCheckboxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-checkbox',
            template: __webpack_require__(/*! ./form-checkbox.component.html */ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.html"),
            styles: [__webpack_require__(/*! ./form-checkbox.component.css */ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.css")]
        })
    ], FormCheckboxComponent);
    return FormCheckboxComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-date/form-date.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-date/form-date.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-date/form-date.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-date/form-date.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\"\n  *ngIf=\"showIf()\">\n  <mat-form-field>\n    <input\n      matInput\n      [matDatepicker]=\"picker\"\n      [formControlName]=\"config.name\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      [min]=\"minDate\"\n      [max]=\"maxDate\"\n      minDate=\"{{minDate}}\"\n      maxDate=\"{{maxDate}}\"\n      [matDatepickerFilter]=\"dateFilter\"\n      maxlength=\"10\"\n    >\n    <mat-datepicker-toggle\n      matSuffix\n      [for]=\"picker\"\n    ></mat-datepicker-toggle>\n\n    <mat-datepicker\n      #picker\n      [startAt]=\"startAt\"\n    ></mat-datepicker>\n    <mat-hint>{{config.options.hint}}</mat-hint>\n\n    <mat-error\n      *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n    <mat-error\n      *ngIf=\"group.get(config.name).hasError('min') || group.get(config.name).hasError('matDatepickerMin')\">\n      {{ config.label }} must be on or after {{ minDateString }}.\n    </mat-error>\n    <mat-error\n      *ngIf=\"group.get(config.name).hasError('max') ||  group.get(config.name).hasError('matDatepickerMax')\">\n      {{ config.label }} must be on or before {{ maxDateString }}.\n    </mat-error>\n    <mat-error\n      *ngIf=\"group.get(config.name).hasError('matDatepickerParse') ||  group.get(config.name).hasError('matDatepickerMax')\">\n      {{ config.label }} must be a valid date.\n    </mat-error>\n    <mat-error\n      *ngIf=\"group.get(config.name).hasError('matDatepickerFilter ')\">\n      {{ config.label }} must contain a valid date...filter.\n    </mat-error>\n\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-date/form-date.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-date/form-date.component.ts ***!
  \**************************************************************************/
/*! exports provided: FormDateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormDateComponent", function() { return FormDateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormDateComponent = /** @class */ (function (_super) {
    __extends(FormDateComponent, _super);
    function FormDateComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormDateComponent.prototype.ngOnInit = function () {
        this.startAt = this.buildDate(this.config.options.startAt);
        this.minDate = this.buildDate(this.config.options.validation.minDate);
        this.maxDate = this.buildDate(this.config.options.validation.maxDate);
        this.minDateString = this.formatDateString(this.minDate);
        this.maxDateString = this.formatDateString(this.maxDate);
        _super.prototype.ngOnInit.call(this);
    };
    FormDateComponent.prototype.buildDate = function (attr) {
        return attr && attr.year && attr.month && attr.day
            ? new Date(attr.year, attr.month, attr.day)
            : undefined;
    };
    FormDateComponent.prototype.formatDateString = function (date) {
        // TODO: allow for other date formats
        return (date &&
            date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear());
    };
    FormDateComponent.prototype.dateFilter = function (d) {
        return true;
        // TODO allow custom date validation functions
    };
    FormDateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-date',
            template: __webpack_require__(/*! ./form-date.component.html */ "./src/app/dynamic-form/components/form-date/form-date.component.html"),
            styles: [__webpack_require__(/*! ./form-date.component.css */ "./src/app/dynamic-form/components/form-date/form-date.component.css")]
        })
    ], FormDateComponent);
    return FormDateComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-email/form-email.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-email/form-email.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-email/form-email.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-email/form-email.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field\"\n  [formGroup]=\"group\">\n  <mat-form-field>\n    <input\n      matInput\n      type=\"email\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      [pattern]=\"pattern()\"\n    >\n\n    <mat-hint>{{config.options.hint}}</mat-hint>\n\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('pattern') || group.get(config.name).hasError('email')\">\n      Please provide a valid email address.\n    </mat-error>\n\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-email/form-email.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-email/form-email.component.ts ***!
  \****************************************************************************/
/*! exports provided: FormEmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormEmailComponent", function() { return FormEmailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _element_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../element-config */ "./src/app/element-config/index.ts");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormEmailComponent = /** @class */ (function (_super) {
    __extends(FormEmailComponent, _super);
    function FormEmailComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormEmailComponent.prototype.pattern = function () {
        return _element_config__WEBPACK_IMPORTED_MODULE_1__["EmailConfig"].pattern;
    };
    FormEmailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-email',
            template: __webpack_require__(/*! ./form-email.component.html */ "./src/app/dynamic-form/components/form-email/form-email.component.html"),
            styles: [__webpack_require__(/*! ./form-email.component.css */ "./src/app/dynamic-form/components/form-email/form-email.component.css")]
        })
    ], FormEmailComponent);
    return FormEmailComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-expansion-panel class=\"dynamic-group\">\n  <mat-expansion-panel-header>\n    <mat-panel-title>\n      {{config.label}}\n    </mat-panel-title>\n    <mat-panel-description>\n      {{config.options.hint}}\n    </mat-panel-description>\n  </mat-expansion-panel-header>\n  <div\n    *ngFor=\"let field of config.options.fields;\"\n    dynamicField\n    [config]=\"field\"\n    [group]=\"group.get(config.name)\"\n  >\n  </div>\n</mat-expansion-panel>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.ts ***!
  \************************************************************************************************/
/*! exports provided: FormExpansionPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormExpansionPanelComponent", function() { return FormExpansionPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormExpansionPanelComponent = /** @class */ (function (_super) {
    __extends(FormExpansionPanelComponent, _super);
    function FormExpansionPanelComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormExpansionPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-expansion-panel',
            template: __webpack_require__(/*! ./form-expansion-panel.component.html */ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.html"),
            styles: [__webpack_require__(/*! ./form-expansion-panel.component.css */ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.css")]
        })
    ], FormExpansionPanelComponent);
    return FormExpansionPanelComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fieldset\n  class=\"dynamic-group\"\n>\n  <legend>{{config.label}}</legend>\n  <div\n    *ngFor=\"let field of config.options.fields;\"\n    dynamicField\n    [config]=\"field\"\n    [group]=\"group.get(config.name)\">\n  </div>\n</fieldset>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FormFieldSetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFieldSetComponent", function() { return FormFieldSetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormFieldSetComponent = /** @class */ (function (_super) {
    __extends(FormFieldSetComponent, _super);
    function FormFieldSetComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormFieldSetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-fieldset',
            template: __webpack_require__(/*! ./form-fieldset.component.html */ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.html"),
            styles: [__webpack_require__(/*! ./form-fieldset.component.css */ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.css")]
        })
    ], FormFieldSetComponent);
    return FormFieldSetComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-heading/form-heading.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-heading/form-heading.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-heading/form-heading.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-heading/form-heading.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field\"\n  [ngSwitch]=\"config.options.level\">\n  <h1 *ngSwitchCase=\"1\">{{config.label}}</h1>\n  <h2 *ngSwitchCase=\"2\">{{config.label}}</h2>\n  <h3 *ngSwitchCase=\"3\">{{config.label}}</h3>\n  <h4 *ngSwitchCase=\"4\">{{config.label}}</h4>\n  <h5 *ngSwitchCase=\"5\">{{config.label}}</h5>\n  <h6 *ngSwitchCase=\"6\">{{config.label}}</h6>\n  <span *ngSwitchDefault>{{config.label}}</span>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-heading/form-heading.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-heading/form-heading.component.ts ***!
  \********************************************************************************/
/*! exports provided: FormHeadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormHeadingComponent", function() { return FormHeadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormHeadingComponent = /** @class */ (function () {
    function FormHeadingComponent() {
    }
    FormHeadingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-heading',
            template: __webpack_require__(/*! ./form-heading.component.html */ "./src/app/dynamic-form/components/form-heading/form-heading.component.html"),
            styles: [__webpack_require__(/*! ./form-heading.component.css */ "./src/app/dynamic-form/components/form-heading/form-heading.component.css")]
        })
    ], FormHeadingComponent);
    return FormHeadingComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/form-number/form-number.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-number/form-number.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-number/form-number.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-number/form-number.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\">\n  <mat-form-field>\n    <input\n      matInput\n      type=\"number\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      minNumber=\"{{config.options.validation.min}}\"\n      maxNumber=\"{{config.options.validation.max}}\"\n    >\n    <mat-hint>{{config.options.hint}}</mat-hint>\n\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('min')\">\n      {{ config.label }} must be at least {{config.options.validation.min}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('max')\">\n      {{ config.label }} must be no more than {{config.options.validation.max}}.\n    </mat-error>\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-number/form-number.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-number/form-number.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormNumberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormNumberComponent", function() { return FormNumberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormNumberComponent = /** @class */ (function (_super) {
    __extends(FormNumberComponent, _super);
    function FormNumberComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormNumberComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-number',
            template: __webpack_require__(/*! ./form-number.component.html */ "./src/app/dynamic-form/components/form-number/form-number.component.html"),
            styles: [__webpack_require__(/*! ./form-number.component.css */ "./src/app/dynamic-form/components/form-number/form-number.component.css")]
        })
    ], FormNumberComponent);
    return FormNumberComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-password/form-password.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-password/form-password.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-password/form-password.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-password/form-password.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"dynamic-field\">\n  <mat-form-field\n    class=\"form-input\"\n    [formGroup]=\"group\">\n\n    <input\n      matInput\n      type=\"password\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      [pattern]=\"config.options.validation.pattern\"\n      [minlength]=\"config.options.validation.minLength\"\n      [maxlength]=\"config.options.validation.maxLength\"\n    >\n    <mat-hint>{{config.options.hint}}</mat-hint>\n\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('pattern')\">\n      {{ config.label }} should follow the pattern of {{config.options.validation.pattern}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('minlength')\">\n      {{ config.label }} must have length of at least {{config.options.validation.minLength}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('maxlength')\">\n      {{ config.label }} must have length of no more than {{config.options.validation.maxLength}}.\n    </mat-error>\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-password/form-password.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-password/form-password.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FormPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormPasswordComponent", function() { return FormPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormPasswordComponent = /** @class */ (function (_super) {
    __extends(FormPasswordComponent, _super);
    function FormPasswordComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-password',
            template: __webpack_require__(/*! ./form-password.component.html */ "./src/app/dynamic-form/components/form-password/form-password.component.html"),
            styles: [__webpack_require__(/*! ./form-password.component.css */ "./src/app/dynamic-form/components/form-password/form-password.component.css")]
        })
    ], FormPasswordComponent);
    return FormPasswordComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-radio/form-radio.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-radio/form-radio.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".radio-group {\n  display: inline-flex;\n}\n\n.radio-group.vertical {\n  flex-direction: column;\n}\n\n.radio-group.horizontal {\n  flex-direction: row;\n}\n\n.radio-button {\n  margin: 5px;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-radio/form-radio.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-radio/form-radio.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field\"\n  [formGroup]=\"group\"\n   *ngIf=\"showIf()\">\n  <mat-radio-group\n    class=\"radio-group\"\n    [ngClass]=\"[ config.options.vertical ? 'vertical' : 'horiztonal']\"\n    [id]=\"id\"\n    [name]=\"id\"\n    [formControlName]=\"config.name\"\n    [required]=\"config.options.validation.required || requiredIf()\"\n    (change)=\"change()\"\n  >\n    <span\n    class=\"mimic-mat-placeholder mimic-mat-label\"\n    [ngClass]=\"{'mat-error': group.get(config.name).hasError('required') && group.get(config.name).touched}\">\n    {{config.label}}<span *ngIf=\"config.options.validation.required || requiredIf()\"> *</span> </span>\n    \n    <div class=\"mimic-mat-hint\">{{config.options.hint}}</div>    \n      \n    <div\n      class=\"mimic-mat-error\"\n      *ngIf=\"group.get(config.name).hasError('required') && (group.get(config.name).touched)\">\n      <span>Your response is required.</span>\n    </div>\n    <ng-container\n      *ngFor=\"let item of config.options.items\">\n      <mat-radio-button\n        class=\"radio-button\"\n        [style.width.%]=\"width\"\n        [value]=\"item.value\"\n      >{{item.label}}\n      </mat-radio-button>\n\n      <ng-container\n        *ngIf=\"group.get(config.name).value === item.value && specifyConfig(item.value)\"\n        dynamicField\n        [group]=\"group\"\n        [config]=\"specifyConfig(item.value)\"\n      ></ng-container>\n\n      </ng-container>\n  </mat-radio-group>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-radio/form-radio.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-radio/form-radio.component.ts ***!
  \****************************************************************************/
/*! exports provided: FormRadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormRadioComponent", function() { return FormRadioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormRadioComponent = /** @class */ (function (_super) {
    __extends(FormRadioComponent, _super);
    function FormRadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 100;
        _this.isList = false;
        return _this;
    }
    FormRadioComponent.prototype.ngOnInit = function () {
        this.isList = this.config.options.items.length > 1;
        _super.prototype.ngOnInit.call(this);
    };
    FormRadioComponent.prototype.specifyConfig = function (value) {
        var selected = this.config.options.items.find(function (item) { return item.value === value; });
        return selected &&
            selected.options &&
            selected.options.specify &&
            selected.options.specify.type &&
            selected.options.specify.name
            ? selected.options.specify
            : undefined;
    };
    FormRadioComponent.prototype.change = function () {
        var _this = this;
        // clear any spec values unrelated to current selection
        var value = this.group.get(this.config.name).value;
        this.config.options.items
            .filter(function (item) { return item.value !== value; })
            .forEach(function (item) {
            var spec = _this.specifyConfig(item.value);
            if (spec && _this.group.get(spec.name)) {
                _this.group.get(spec.name).reset();
                _this.group.get(spec.name).disable();
            }
        });
        this.config.options.items
            .filter(function (item) { return item.value === value; })
            .forEach(function (item) {
            var spec = _this.specifyConfig(item.value);
            if (spec && _this.group.get(spec.name)) {
                _this.group.get(spec.name).enable();
            }
        });
    };
    FormRadioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-radio',
            template: __webpack_require__(/*! ./form-radio.component.html */ "./src/app/dynamic-form/components/form-radio/form-radio.component.html"),
            styles: [__webpack_require__(/*! ./form-radio.component.css */ "./src/app/dynamic-form/components/form-radio/form-radio.component.css")]
        })
    ], FormRadioComponent);
    return FormRadioComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-select/form-select.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-select/form-select.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-select/form-select.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-select/form-select.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-select\"\n  [formGroup]=\"group\"\n  *ngIf=\"showIf()\"\n  >\n  <mat-form-field>\n    <mat-select\n      [id]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      (change)=\"change()\"\n    >\n      <mat-option class=\"mat-option-disabled\">{{config.options.hint}}</mat-option>\n      <mat-option *ngFor=\"let item of config.options.items\"\n                  [value]=\"item.value\">{{ item.label }}\n      </mat-option>\n    </mat-select>\n    \n   <mat-hint>{{config.options.hint}}</mat-hint>\n      <mat-error\n    *ngIf=\"group.get(config.name).hasError('required') && (group.get(config.name).touched)\"\n  >\n    <span>{{config.label}} is required.</span>\n  </mat-error>\n  </mat-form-field>\n</ng-container>\n<div></div>\n<ng-container\n  *ngIf=\"!!group.get(config.name).value && specifyConfig(group.get(config.name).value)\"\n  dynamicField\n  [group]=\"group\"\n  [config]=\"specifyConfig(group.get(config.name).value)\"\n></ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-select/form-select.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-select/form-select.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSelectComponent", function() { return FormSelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormSelectComponent = /** @class */ (function (_super) {
    __extends(FormSelectComponent, _super);
    function FormSelectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSelectComponent.prototype.specifyConfig = function (value) {
        var selected = this.config.options.items.find(function (item) { return item.value === value; });
        return selected &&
            selected.options &&
            selected.options.specify &&
            selected.options.specify.type
            ? selected.options.specify
            : undefined;
    };
    FormSelectComponent.prototype.change = function () {
        var _this = this;
        // clear any spec values unrelated to current selection
        var value = this.group.get(this.config.name).value;
        this.config.options.items
            .filter(function (item) { return item.value !== value; })
            .forEach(function (item) {
            var spec = _this.specifyConfig(item.value);
            if (spec && _this.group.get(spec.name)) {
                _this.group.get(spec.name).reset();
                _this.group.get(spec.name).disable();
            }
        });
    };
    FormSelectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-select',
            template: __webpack_require__(/*! ./form-select.component.html */ "./src/app/dynamic-form/components/form-select/form-select.component.html"),
            styles: [__webpack_require__(/*! ./form-select.component.css */ "./src/app/dynamic-form/components/form-select/form-select.component.css")]
        })
    ], FormSelectComponent);
    return FormSelectComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\">\n  <mat-slide-toggle\n    [id]=\"id\"\n    [name]=\"id\"\n    [formControlName]=\"config.name\"\n    [required]=\"config.options.validation.required || requiredIf()\"\n    [labelPosition]=\"config.options.align || 'after'\"\n    [color]=\"config.options.color || 'accent'\">\n    <span\n      [ngClass]=\"{'mat-error' : group.get(config.name).hasError('required') && group.get(config.name).touched}\"\n    >{{config.label}}<span *ngIf=\"config.options.validation.required\"> *</span></span>\n  </mat-slide-toggle>\n\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('required') && group.get(config.name).touched\">\n    <span>Your response is required.</span>\n  </div>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.ts ***!
  \******************************************************************************************/
/*! exports provided: FormSlideToggleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSlideToggleComponent", function() { return FormSlideToggleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormSlideToggleComponent = /** @class */ (function (_super) {
    __extends(FormSlideToggleComponent, _super);
    function FormSlideToggleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSlideToggleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-slide-toggle',
            template: __webpack_require__(/*! ./form-slide-toggle.component.html */ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.html"),
            styles: [__webpack_require__(/*! ./form-slide-toggle.component.css */ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.css")]
        })
    ], FormSlideToggleComponent);
    return FormSlideToggleComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-slider/form-slider.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slider/form-slider.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-slider{\n  width: 200px;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-slider/form-slider.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slider/form-slider.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\">\n  <div>\n    <label\n      class=\"mimic-mat-placeholder\"\n      [ngClass]=\"{'mat-error': (group.get(config.name).hasError('required') || group.get(config.name).hasError('required')) && group.get(config.name).touched }\"\n    >{{config.label}}<span *ngIf=\"config.options.validation.required\"> *</span> </label>\n  </div>\n  <mat-slider\n    [id]=\"id\"\n    [formControlName]=\"config.name\"\n    [required]=\"config.options.validation.required || requiredIf()\"\n    [min]=\"config.options.validation.min\"\n    [max]=\"config.options.validation.max\"\n    [invert]=\"config.options.invert\"\n    [vertical]=\"config.options.vertical\"\n    [step]=\"config.options.step\"\n    [thumbLabel]=\"config.options.thumbLabel\"\n    [tickInterval]=\"config.options.tickInterval\"\n  >\n  </mat-slider>\n  <div\n    class=\"mimic-mat-error\"\n    *ngIf=\"group.get(config.name).hasError('required') && (group.get(config.name).touched)\">\n    <span>{{config.label}} is required.</span>\n  </div>\n</ng-container>\n\n\n\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-slider/form-slider.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-slider/form-slider.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormSliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSliderComponent", function() { return FormSliderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormSliderComponent = /** @class */ (function (_super) {
    __extends(FormSliderComponent, _super);
    function FormSliderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSliderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-slider',
            template: __webpack_require__(/*! ./form-slider.component.html */ "./src/app/dynamic-form/components/form-slider/form-slider.component.html"),
            styles: [__webpack_require__(/*! ./form-slider.component.css */ "./src/app/dynamic-form/components/form-slider/form-slider.component.css")]
        })
    ], FormSliderComponent);
    return FormSliderComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-states/form-states.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-states/form-states.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-states/form-states.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-states/form-states.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-states\"\n  [formGroup]=\"group\"\n  *ngIf=\"showIf()\"\n  >\n  <mat-form-field>\n    <mat-select\n      [id]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n    >\n      <mat-option class=\"mat-option-disabled\">{{config.options.hint}}</mat-option>\n      <mat-option *ngFor=\"let item of config.options.states\"\n                  [value]=\"item.value\">{{ item.label }}\n      </mat-option>\n    </mat-select>\n    \n    <mat-hint>{{config.options.hint}}</mat-hint>\n      <mat-error\n    *ngIf=\"group.get(config.name).hasError('required') && (group.get(config.name).touched)\"\n  >\n    <span>{{config.label}} is required.</span>\n  </mat-error>\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-states/form-states.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-states/form-states.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormStatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormStatesComponent", function() { return FormStatesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _element_config_config_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../element-config/config/states */ "./src/app/element-config/config/states.ts");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormStatesComponent = /** @class */ (function (_super) {
    __extends(FormStatesComponent, _super);
    function FormStatesComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormStatesComponent.prototype.ngOnInit = function () {
        this.config.options.states = _element_config_config_states__WEBPACK_IMPORTED_MODULE_1__["StatesConfig"].states;
        _super.prototype.ngOnInit.call(this);
    };
    FormStatesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-states',
            template: __webpack_require__(/*! ./form-states.component.html */ "./src/app/dynamic-form/components/form-states/form-states.component.html"),
            styles: [__webpack_require__(/*! ./form-states.component.css */ "./src/app/dynamic-form/components/form-states/form-states.component.css")]
        })
    ], FormStatesComponent);
    return FormStatesComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-expansion-panel class=\"dynamic-group\">\n  <mat-expansion-panel-header>\n    <mat-panel-title>\n      {{config.label}}\n    </mat-panel-title>\n    <mat-panel-description>\n      {{config.options.hint}}\n    </mat-panel-description>\n  </mat-expansion-panel-header>\n  <div\n    *ngFor=\"let field of config.options.fields;\"\n    dynamicField\n    [config]=\"field\"\n    [group]=\"group.get(config.name)\"\n  >\n  </div>\n</mat-expansion-panel>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.ts ***!
  \******************************************************************************************/
/*! exports provided: FormStaticPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormStaticPanelComponent", function() { return FormStaticPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormStaticPanelComponent = /** @class */ (function () {
    function FormStaticPanelComponent() {
    }
    FormStaticPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-static-panel',
            template: __webpack_require__(/*! ./form-static-panel.component.html */ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.html"),
            styles: [__webpack_require__(/*! ./form-static-panel.component.css */ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.css")]
        })
    ], FormStaticPanelComponent);
    return FormStaticPanelComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/components/form-static/form-static.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static/form-static.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-static/form-static.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static/form-static.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"dynamic-field\" *ngIf=\"showIf()\">\n  <div [innerHtml]=\"config.label\"></div>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-static/form-static.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-static/form-static.component.ts ***!
  \******************************************************************************/
/*! exports provided: FormStaticComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormStaticComponent", function() { return FormStaticComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormStaticComponent = /** @class */ (function (_super) {
    __extends(FormStaticComponent, _super);
    function FormStaticComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormStaticComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-static',
            template: __webpack_require__(/*! ./form-static.component.html */ "./src/app/dynamic-form/components/form-static/form-static.component.html"),
            styles: [__webpack_require__(/*! ./form-static.component.css */ "./src/app/dynamic-form/components/form-static/form-static.component.css")]
        })
    ], FormStaticComponent);
    return FormStaticComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"dynamic-field\">\n  <mat-form-field class=\"form-input\" [formGroup]=\"group\">\n\n    <input matInput [type]=\"config.type === 'phone' ? 'tel' : 'text'\"     \n      [id]=\"id\"\n      [name]=\"id\" \n      [placeholder]=\"config.label\" \n      [formControlName]=\"config.name\" \n      [required]=\"config.options.validation.required || requiredIf()\" \n      [pattern]=\"pattern()\"\n      [minlength]=\"config.options.validation.minLength\" \n      [maxlength]=\"config.options.validation.maxLength\" \n      mask=\"{{inputMask()}}\">\n\n    <mat-hint>{{hint()}}</mat-hint>\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n\n    <mat-error *ngIf=\"group.get(config.name).hasError('minlength')\">\n      {{ config.label }} must have length of at least {{config.options.validation.minLength}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('maxlength')\">\n      {{ config.label }} must have length of no more than {{config.options.validation.maxLength}}.\n    </mat-error>\n\n  </mat-form-field>\n  <mat-error *ngIf=\"group.get(config.name).hasError('pattern')\" [innerHtml]=\"patternValidationMessage()\" class=\"mimic-mat-error\">\n  </mat-error>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.ts ***!
  \************************************************************************************/
/*! exports provided: FormTextMaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormTextMaskComponent", function() { return FormTextMaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _element_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../element-config */ "./src/app/element-config/index.ts");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormTextMaskComponent = /** @class */ (function (_super) {
    __extends(FormTextMaskComponent, _super);
    function FormTextMaskComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormTextMaskComponent.prototype.hint = function () {
        return this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Phone
            ? _element_config__WEBPACK_IMPORTED_MODULE_1__["PhoneConfig"].hint
            : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Ssn
                ? _element_config__WEBPACK_IMPORTED_MODULE_1__["SsnConfig"].hint
                : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Time
                    ? _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].hint
                    : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Zip
                        ? _element_config__WEBPACK_IMPORTED_MODULE_1__["ZipConfig"].hint
                        : this.config.options.hint;
    };
    FormTextMaskComponent.prototype.inputMask = function () {
        return this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Phone
            ? _element_config__WEBPACK_IMPORTED_MODULE_1__["PhoneConfig"].inputMask
            : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Ssn
                ? _element_config__WEBPACK_IMPORTED_MODULE_1__["SsnConfig"].inputMask
                : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Time
                    ? _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].inputMask
                    : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Zip
                        ? _element_config__WEBPACK_IMPORTED_MODULE_1__["ZipConfig"].inputMask
                        : this.config.options.inputMask;
    };
    FormTextMaskComponent.prototype.pattern = function () {
        return this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Phone
            ? _element_config__WEBPACK_IMPORTED_MODULE_1__["PhoneConfig"].pattern
            : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Ssn
                ? _element_config__WEBPACK_IMPORTED_MODULE_1__["SsnConfig"].pattern
                : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Time
                    ? _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].pattern
                    : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Zip
                        ? _element_config__WEBPACK_IMPORTED_MODULE_1__["ZipConfig"].pattern
                        : this.config.options.validation.pattern;
    };
    FormTextMaskComponent.prototype.patternValidationMessage = function () {
        return this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Phone
            ? _element_config__WEBPACK_IMPORTED_MODULE_1__["PhoneConfig"].patternValMsg
            : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Ssn
                ? _element_config__WEBPACK_IMPORTED_MODULE_1__["SsnConfig"].patternValMsg
                : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Time
                    ? _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].patternValMsg
                    : this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Zip
                        ? _element_config__WEBPACK_IMPORTED_MODULE_1__["ZipConfig"].patternValMsg
                        : this.config.options.validation.patternValMsg ||
                            this.config.label + " should follow the pattern of " + this.config.options.validation.pattern + ".";
    };
    FormTextMaskComponent.prototype.dropSpecialCharacters = function () {
        return this.config.type === _element_config__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Time ? false : true;
    };
    FormTextMaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-text-mask',
            template: __webpack_require__(/*! ./form-text-mask.component.html */ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.html"),
            styles: [__webpack_require__(/*! ./form-text-mask.component.css */ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.css")]
        })
    ], FormTextMaskComponent);
    return FormTextMaskComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-text/form-text.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text/form-text.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-text/form-text.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text/form-text.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"dynamic-field\" *ngIf=\"showIf()\">\n  <mat-form-field\n    class=\"form-input\"\n    [formGroup]=\"group\">\n\n    <input\n      matInput\n      type=\"text\"\n      [id]=\"id\"\n      [name]=\"id\"\n      [placeholder]=\"config.label\"\n      [formControlName]=\"config.name\"\n      [required]=\"config.options.validation.required || requiredIf()\"\n      [pattern]=\"config.options.validation.pattern\"\n      [minlength]=\"config.options.validation.minLength\"\n      [maxlength]=\"config.options.validation.maxLength\"\n      [matAutocomplete]=\"auto\"\n    >\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option\n        *ngFor=\"let item of filteredItems | async\"\n        [value]=\"item\"\n      >\n        <span>{{ item }}</span>\n      </mat-option>\n    </mat-autocomplete>\n    <mat-hint>{{config.options.hint}}</mat-hint>\n\n    <mat-error *ngIf=\"group.get(config.name) && group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name) && group.get(config.name).hasError('pattern')\">\n      {{ config.label }} should follow the pattern of {{config.options.validation.pattern}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name) && group.get(config.name).hasError('minlength')\">\n      {{ config.label }} must have length of at least {{config.options.validation.minLength}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name) && group.get(config.name).hasError('maxlength')\">\n      {{ config.label }} must have length of no more than {{config.options.validation.maxLength}}.\n    </mat-error>\n  </mat-form-field>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-text/form-text.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-text/form-text.component.ts ***!
  \**************************************************************************/
/*! exports provided: FormTextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormTextComponent", function() { return FormTextComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormTextComponent = /** @class */ (function (_super) {
    __extends(FormTextComponent, _super);
    function FormTextComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormTextComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.config &&
            this.config.options &&
            !!this.config.options.autocomplete &&
            this.group &&
            this.group.get(this.config.name)) {
            this.items = this.getItems(this.config.options.items);
            this.filteredItems = this.group
                .get(this.config.name)
                .valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(null))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (text) { return _this.filterItems(text); }));
        }
        _super.prototype.ngOnInit.call(this);
    };
    FormTextComponent.prototype.getItems = function (config) {
        return config ? config.map(function (item) { return item.label; }) : [];
    };
    FormTextComponent.prototype.filterItems = function (text) {
        return !text
            ? this.items.slice()
            : this.items.filter(function (i) { return i.toLowerCase().indexOf(text.toLowerCase()) === 0; });
    };
    FormTextComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-text',
            template: __webpack_require__(/*! ./form-text.component.html */ "./src/app/dynamic-form/components/form-text/form-text.component.html"),
            styles: [__webpack_require__(/*! ./form-text.component.css */ "./src/app/dynamic-form/components/form-text/form-text.component.css")]
        })
    ], FormTextComponent);
    return FormTextComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-textarea/form-textarea.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field{\n  width: 100%;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-textarea/form-textarea.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  class=\"dynamic-field form-input\"\n  [formGroup]=\"group\">\n\n  <span\n    class=\"mimic-mat-placeholder\"\n    [ngClass]=\"{'mat-error': group.get(config.name).hasError('required') && group.get(config.name).touched}\">\n    {{config.label}}<span *ngIf=\"config.options.validation.required\"> *</span> </span>\n\n  <ngx-trumbowyg-editor\n    [formControlName]=\"config.name\"\n    [placeholder]=\"config.label\"\n    [required]=\"config.options.validation.required || requiredIf()\">\n  </ngx-trumbowyg-editor>\n\n  <div class=\"mimic-mat-hint\">{{config.options.hint}}</div>\n\n  <div class=\"mimic-mat-error\"\n       *ngIf=\"group.get(config.name).hasError('required') && group.get(config.name).touched\">\n    {{ config.label }} is required.\n  </div>\n</ng-container>\n\n\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-textarea/form-textarea.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FormTextareaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormTextareaComponent", function() { return FormTextareaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormTextareaComponent = /** @class */ (function (_super) {
    __extends(FormTextareaComponent, _super);
    function FormTextareaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormTextareaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-textarea',
            template: __webpack_require__(/*! ./form-textarea.component.html */ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.html"),
            styles: [__webpack_require__(/*! ./form-textarea.component.css */ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.css")]
        })
    ], FormTextareaComponent);
    return FormTextareaComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_1__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/form-time/form-time.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-time/form-time.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dynamic-form/components/form-time/form-time.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-time/form-time.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container class=\"dynamic-field\">\n  <mat-form-field class=\"form-input\" [formGroup]=\"group\">\n\n    <input matInput \n      type=\"text\"    \n      [id]=\"id\"\n      [name]=\"id\" \n      [placeholder]=\"config.label\" \n      [formControlName]=\"config.name\" \n      [required]=\"config.options.validation.required || requiredIf()\" \n      [pattern]=\"pattern()\"\n      [minlength]=\"config.options.validation.minLength\" \n      [maxlength]=\"config.options.validation.maxLength\" \n      mask=\"{{inputMask()}}\"\n      dropSpecialCharacters=\"false\">\n\n    <mat-hint>{{hint()}}</mat-hint>\n    <mat-error *ngIf=\"group.get(config.name).hasError('required')\">\n      {{ config.label }} is required.\n    </mat-error>\n\n    <mat-error *ngIf=\"group.get(config.name).hasError('minlength')\">\n      {{ config.label }} must have length of at least {{config.options.validation.minLength}}.\n    </mat-error>\n    <mat-error *ngIf=\"group.get(config.name).hasError('maxlength')\">\n      {{ config.label }} must have length of no more than {{config.options.validation.maxLength}}.\n    </mat-error>\n\n  </mat-form-field>\n  <mat-error *ngIf=\"group.get(config.name).hasError('pattern')\" [innerHtml]=\"patternValidationMessage()\" class=\"mimic-mat-error\">\n  </mat-error>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/form-time/form-time.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dynamic-form/components/form-time/form-time.component.ts ***!
  \**************************************************************************/
/*! exports provided: FormTimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormTimeComponent", function() { return FormTimeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _element_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../element-config */ "./src/app/element-config/index.ts");
/* harmony import */ var _dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-base-component */ "./src/app/dynamic-form/components/dynamic-base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormTimeComponent = /** @class */ (function (_super) {
    __extends(FormTimeComponent, _super);
    function FormTimeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormTimeComponent.prototype.hint = function () {
        return _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].hint;
    };
    FormTimeComponent.prototype.inputMask = function () {
        return _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].inputMask;
    };
    FormTimeComponent.prototype.pattern = function () {
        return _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].pattern;
    };
    FormTimeComponent.prototype.patternValidationMessage = function () {
        return _element_config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"].patternValMsg;
    };
    FormTimeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-time',
            template: __webpack_require__(/*! ./form-time.component.html */ "./src/app/dynamic-form/components/form-time/form-time.component.html"),
            styles: [__webpack_require__(/*! ./form-time.component.css */ "./src/app/dynamic-form/components/form-time/form-time.component.css")]
        })
    ], FormTimeComponent);
    return FormTimeComponent;
}(_dynamic_base_component__WEBPACK_IMPORTED_MODULE_2__["DynamicBaseComponent"]));



/***/ }),

/***/ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/layout-editor/layout-editor.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fill-space {\n  flex: 1 1 auto;\n}\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dynamic-form/components/layout-editor/layout-editor.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container\n  [formGroup]=\"group\"\n  class=\"dynamic-group\"\n>\n  <ng-container>\n    <mat-toolbar>\n      <button\n        mat-button\n        mat-icon-button\n        type=\"button\"\n        (click)=\"add()\"\n        mat-tooltip=\"Add element\"\n      >\n        <mat-icon aria-hidden=\"true\">add circle</mat-icon>\n      </button>\n\n      <button\n        mat-button\n        mat-icon-button\n        type=\"button\"\n        (click)=\"viewSource()\"\n        [disabled]=\"!config.options.fields\"\n        mat-tooltip=\"View source\"\n      >\n        <mat-icon aria-hidden=\"true\">code</mat-icon>\n      </button>\n\n      <button\n        mat-button\n        mat-icon-button\n        type=\"button\"\n        (click)=\"preview()\"\n        [disabled]=\"!config.options.fields || config.options.fields.length === 0\"\n        mat-tooltip=\"Preview\"\n      >\n        <mat-icon aria-hidden=\"true\">launch</mat-icon>\n      </button>\n    </mat-toolbar>\n  </ng-container>\n  <ng-container\n    [formArrayName]=\"config.name\"\n  >\n    <mat-expansion-panel\n      *ngFor=\"let subgroup of group.get(config.name)['controls']; let i = index;\"\n    >\n      <mat-expansion-panel-header>\n        <mat-panel-description>{{getElementLabel(config.options.fields[i], subgroup)}}</mat-panel-description>\n        {{getElementHeading(config.options.fields[i])}}\n        <span class=\"fill-space\"></span>\n        <button\n          mat-button\n          mat-icon-button\n          type=\"button\"\n          (click)=\"moveElement(i, 'up')\"\n          [disabled]=\"i === 0\"\n          mat-tooltip=\"Move element up\"\n        >\n          <mat-icon aria-hidden=\"true\">arrow_upward</mat-icon>\n        </button>\n\n        <button\n          mat-button\n          mat-icon-button\n          type=\"button\"\n          (click)=\"moveElement(i,'down')\"\n          [disabled]=\"i === config.options.fields.length-1\"\n          mat-tooltip=\"Move element down\"\n        >\n          <mat-icon aria-hidden=\"true\">arrow_downward</mat-icon>\n        </button>\n\n        <button\n          mat-button\n          mat-icon-button\n          type=\"button\"\n          color=\"accent\"\n          (click)=\"remove(i)\"\n          mat-tooltip=\"Remove element\"\n        >\n          <mat-icon aria-hidden=\"true\">delete_forever</mat-icon>\n        </button>\n      </mat-expansion-panel-header>\n      <div\n        *ngFor=\"let field of config.options.fields[i];\"\n        dynamicField\n        [config]=\"field\"\n        [group]=\"subgroup\"\n      >\n      </div>\n    </mat-expansion-panel>\n  </ng-container>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/components/layout-editor/layout-editor.component.ts ***!
  \**********************************************************************************/
/*! exports provided: LayoutEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutEditorComponent", function() { return LayoutEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../element-config/element-config */ "./src/app/element-config/element-config.ts");
/* harmony import */ var _element_config_element_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../element-config/element-type */ "./src/app/element-config/element-type.ts");
/* harmony import */ var _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dynamic-form-builder */ "./src/app/dynamic-form/dynamic-form-builder.ts");
/* harmony import */ var _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enumerations/dialog-buttons */ "./src/app/dynamic-form/enumerations/dialog-buttons.ts");
/* harmony import */ var _dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dynamic-modal-dialog/dynamic-modal-dialog.component */ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LayoutEditorComponent = /** @class */ (function () {
    function LayoutEditorComponent(dialog) {
        this.dialog = dialog;
        this.typeSelectOptions = {
            heading: 'Add an element',
            size: '400px',
            layout: _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__["ElementConfig"].getTypeSelection().layout,
            entity: {},
            dialogButtons: _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_5__["DialogButtons"].SubmitCancel
        };
        this.viewSourceOptions = {
            heading: 'Dynamic Data Generated JSON',
            size: '600px',
            layout: [],
            entity: {},
            dialogButtons: _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_5__["DialogButtons"].OK,
            preformattedJson: true
        };
        this.elementConfigOptions = {
            heading: 'Element configuration',
            size: '800px',
            layout: [],
            entity: {},
            dialogButtons: _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_5__["DialogButtons"].SubmitCancel
        };
        this.previewOptions = {
            heading: 'Preview',
            size: '800px',
            layout: [],
            entity: {},
            dialogButtons: _enumerations_dialog_buttons__WEBPACK_IMPORTED_MODULE_5__["DialogButtons"].OK
        };
    }
    LayoutEditorComponent.prototype.ngOnInit = function () {
        this.fb = new _dynamic_form_builder__WEBPACK_IMPORTED_MODULE_4__["DynamicFormBuilder"]();
        this.array = this.group.get(this.config.name);
    };
    LayoutEditorComponent.prototype.add = function () {
        var _this = this;
        // for element type selection
        var typeSelectRef = this.dialog.open(_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_6__["DynamicModalDialogComponent"], {
            width: this.typeSelectOptions.size,
            disableClose: true,
            data: this.typeSelectOptions
        });
        typeSelectRef.afterClosed().subscribe(function (result) {
            if (result && typeof result !== 'boolean') {
                var elementConfig = _element_config_element_config__WEBPACK_IMPORTED_MODULE_2__["ElementConfig"].get(result.elementType, true);
                _this.config.options.fields.push(elementConfig.layout);
                _this.array.push(_this.fb.createGroup(elementConfig.layout, elementConfig.entity));
            }
        });
    };
    LayoutEditorComponent.prototype.viewSource = function () {
        this.viewSourceOptions.entity = this.array.getRawValue();
        this.dialog.open(_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_6__["DynamicModalDialogComponent"], {
            width: this.viewSourceOptions.size,
            data: this.viewSourceOptions
        });
    };
    LayoutEditorComponent.prototype.onElementChange = function (index, config) {
        this.config.options.fields[index] = config;
    };
    LayoutEditorComponent.prototype.moveElement = function (index, direction) {
        var moveIndex = direction.toLocaleLowerCase() === 'up' ? index - 1 : index + 1;
        var temp = this.config.options.fields[index];
        this.config.options.fields[index] = this.config.options.fields[moveIndex];
        this.config.options.fields[moveIndex] = temp;
        var arrTemp = this.array.controls[index];
        this.array.controls[index] = this.array.controls[moveIndex];
        this.array.controls[moveIndex] = arrTemp;
    };
    LayoutEditorComponent.prototype.remove = function (index) {
        this.config.options.fields.splice(index, 1);
        this.array.removeAt(index);
    };
    LayoutEditorComponent.prototype.preview = function () {
        // handle preview
        this.previewOptions.layout = this.array.getRawValue();
        this.dialog.open(_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_6__["DynamicModalDialogComponent"], {
            width: this.previewOptions.size,
            data: this.previewOptions
        });
    };
    LayoutEditorComponent.prototype.getElementHeading = function (elementConfig) {
        if (Array.isArray(elementConfig)) {
            var heading = elementConfig.find(function (e) { return e.type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_3__["ElementType"].Heading; });
            if (heading) {
                return heading.label;
            }
        }
        return 'Element configuration';
    };
    LayoutEditorComponent.prototype.getElementLabel = function (elementConfig, group) {
        if (Array.isArray(elementConfig)) {
            var name_1 = elementConfig.find(function (e) { return e.name === 'name'; });
            if (name_1 && group.value.name) {
                return group.value.name;
            }
        }
        return '';
    };
    LayoutEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-page-editor',
            template: __webpack_require__(/*! ./layout-editor.component.html */ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.html"),
            styles: [__webpack_require__(/*! ./layout-editor.component.css */ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], LayoutEditorComponent);
    return LayoutEditorComponent;
}());



/***/ }),

/***/ "./src/app/dynamic-form/directives/dynamic-field/dynamic-field.directive.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dynamic-form/directives/dynamic-field/dynamic-field.directive.ts ***!
  \**********************************************************************************/
/*! exports provided: DynamicFieldDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFieldDirective", function() { return DynamicFieldDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_action_toolbar_action_toolbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/action-toolbar/action-toolbar.component */ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.ts");
/* harmony import */ var _components_form_address_form_address_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/form-address/form-address.component */ "./src/app/dynamic-form/components/form-address/form-address.component.ts");
/* harmony import */ var _components_form_array_form_array_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/form-array/form-array.component */ "./src/app/dynamic-form/components/form-array/form-array.component.ts");
/* harmony import */ var _components_form_button_form_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/form-button/form-button.component */ "./src/app/dynamic-form/components/form-button/form-button.component.ts");
/* harmony import */ var _components_form_checkbox_group_form_checkbox_group_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/form-checkbox-group/form-checkbox-group.component */ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.ts");
/* harmony import */ var _components_form_checkbox_form_checkbox_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/form-checkbox/form-checkbox.component */ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.ts");
/* harmony import */ var _components_form_date_form_date_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/form-date/form-date.component */ "./src/app/dynamic-form/components/form-date/form-date.component.ts");
/* harmony import */ var _components_form_email_form_email_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/form-email/form-email.component */ "./src/app/dynamic-form/components/form-email/form-email.component.ts");
/* harmony import */ var _components_form_expansion_panel_form_expansion_panel_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/form-expansion-panel/form-expansion-panel.component */ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.ts");
/* harmony import */ var _components_form_fieldset_form_fieldset_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/form-fieldset/form-fieldset.component */ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.ts");
/* harmony import */ var _components_form_heading_form_heading_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/form-heading/form-heading.component */ "./src/app/dynamic-form/components/form-heading/form-heading.component.ts");
/* harmony import */ var _components_form_number_form_number_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/form-number/form-number.component */ "./src/app/dynamic-form/components/form-number/form-number.component.ts");
/* harmony import */ var _components_form_password_form_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/form-password/form-password.component */ "./src/app/dynamic-form/components/form-password/form-password.component.ts");
/* harmony import */ var _components_form_radio_form_radio_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/form-radio/form-radio.component */ "./src/app/dynamic-form/components/form-radio/form-radio.component.ts");
/* harmony import */ var _components_form_select_form_select_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components/form-select/form-select.component */ "./src/app/dynamic-form/components/form-select/form-select.component.ts");
/* harmony import */ var _components_form_slide_toggle_form_slide_toggle_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/form-slide-toggle/form-slide-toggle.component */ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.ts");
/* harmony import */ var _components_form_slider_form_slider_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/form-slider/form-slider.component */ "./src/app/dynamic-form/components/form-slider/form-slider.component.ts");
/* harmony import */ var _components_form_states_form_states_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../components/form-states/form-states.component */ "./src/app/dynamic-form/components/form-states/form-states.component.ts");
/* harmony import */ var _components_form_static_panel_form_static_panel_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../components/form-static-panel/form-static-panel.component */ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.ts");
/* harmony import */ var _components_form_static_form_static_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../components/form-static/form-static.component */ "./src/app/dynamic-form/components/form-static/form-static.component.ts");
/* harmony import */ var _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../components/form-text-mask/form-text-mask.component */ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.ts");
/* harmony import */ var _components_form_text_form_text_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../components/form-text/form-text.component */ "./src/app/dynamic-form/components/form-text/form-text.component.ts");
/* harmony import */ var _components_form_textarea_form_textarea_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../components/form-textarea/form-textarea.component */ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.ts");
/* harmony import */ var _components_form_time_form_time_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../components/form-time/form-time.component */ "./src/app/dynamic-form/components/form-time/form-time.component.ts");
/* harmony import */ var _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../components/layout-editor/layout-editor.component */ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























var components = {
    'action-toolbar': _components_action_toolbar_action_toolbar_component__WEBPACK_IMPORTED_MODULE_2__["ActionToolbarComponent"],
    address: _components_form_address_form_address_component__WEBPACK_IMPORTED_MODULE_3__["FormAddressComponent"],
    array: _components_form_array_form_array_component__WEBPACK_IMPORTED_MODULE_4__["FormArrayComponent"],
    button: _components_form_button_form_button_component__WEBPACK_IMPORTED_MODULE_5__["FormButtonComponent"],
    checkbox: _components_form_checkbox_form_checkbox_component__WEBPACK_IMPORTED_MODULE_7__["FormCheckboxComponent"],
    'checkbox-group': _components_form_checkbox_group_form_checkbox_group_component__WEBPACK_IMPORTED_MODULE_6__["FormCheckboxGroupComponent"],
    date: _components_form_date_form_date_component__WEBPACK_IMPORTED_MODULE_8__["FormDateComponent"],
    email: _components_form_email_form_email_component__WEBPACK_IMPORTED_MODULE_9__["FormEmailComponent"],
    fieldset: _components_form_fieldset_form_fieldset_component__WEBPACK_IMPORTED_MODULE_11__["FormFieldSetComponent"],
    heading: _components_form_heading_form_heading_component__WEBPACK_IMPORTED_MODULE_12__["FormHeadingComponent"],
    'layout-editor': _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_26__["LayoutEditorComponent"],
    number: _components_form_number_form_number_component__WEBPACK_IMPORTED_MODULE_13__["FormNumberComponent"],
    panel: _components_form_expansion_panel_form_expansion_panel_component__WEBPACK_IMPORTED_MODULE_10__["FormExpansionPanelComponent"],
    password: _components_form_password_form_password_component__WEBPACK_IMPORTED_MODULE_14__["FormPasswordComponent"],
    phone: _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_22__["FormTextMaskComponent"],
    radio: _components_form_radio_form_radio_component__WEBPACK_IMPORTED_MODULE_15__["FormRadioComponent"],
    select: _components_form_select_form_select_component__WEBPACK_IMPORTED_MODULE_16__["FormSelectComponent"],
    slider: _components_form_slider_form_slider_component__WEBPACK_IMPORTED_MODULE_18__["FormSliderComponent"],
    'slide-toggle': _components_form_slide_toggle_form_slide_toggle_component__WEBPACK_IMPORTED_MODULE_17__["FormSlideToggleComponent"],
    ssn: _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_22__["FormTextMaskComponent"],
    states: _components_form_states_form_states_component__WEBPACK_IMPORTED_MODULE_19__["FormStatesComponent"],
    static: _components_form_static_form_static_component__WEBPACK_IMPORTED_MODULE_21__["FormStaticComponent"],
    'static-panel': _components_form_static_panel_form_static_panel_component__WEBPACK_IMPORTED_MODULE_20__["FormStaticPanelComponent"],
    text: _components_form_text_form_text_component__WEBPACK_IMPORTED_MODULE_23__["FormTextComponent"],
    textarea: _components_form_textarea_form_textarea_component__WEBPACK_IMPORTED_MODULE_24__["FormTextareaComponent"],
    'text-mask': _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_22__["FormTextMaskComponent"],
    time: _components_form_time_form_time_component__WEBPACK_IMPORTED_MODULE_25__["FormTimeComponent"],
    zip: _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_22__["FormTextMaskComponent"]
};
var DynamicFieldDirective = /** @class */ (function () {
    function DynamicFieldDirective(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    DynamicFieldDirective.prototype.ngOnChanges = function () {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    };
    DynamicFieldDirective.prototype.ngOnInit = function () {
        if (!this.config) {
            throw new Error("Configuration missing");
        }
        if (!this.group) {
            throw new Error("FormGroup missing");
        }
        if (this.config.type && !components[this.config.type]) {
            var supportedTypes = Object.keys(components).join(', ');
            throw new Error("Trying to use an unsupported type (" + this.config.type + ").\n        Supported types: " + supportedTypes);
        }
        var component = this.resolver.resolveComponentFactory(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DynamicFieldDirective.prototype, "config", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], DynamicFieldDirective.prototype, "group", void 0);
    DynamicFieldDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[dynamicField]',
            exportAs: 'dynamicForm'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], DynamicFieldDirective);
    return DynamicFieldDirective;
}());



/***/ }),

/***/ "./src/app/dynamic-form/dynamic-data.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/dynamic-form/dynamic-data.module.ts ***!
  \*****************************************************/
/*! exports provided: DynamicDataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataModule", function() { return DynamicDataModule; });
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ngx_trumbowyg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-trumbowyg */ "./node_modules/ngx-trumbowyg/fesm5/ngx-trumbowyg.js");
/* harmony import */ var _components_action_toolbar_action_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/action-toolbar/action-toolbar.component */ "./src/app/dynamic-form/components/action-toolbar/action-toolbar.component.ts");
/* harmony import */ var _components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/dynamic-form/dynamic-form.component */ "./src/app/dynamic-form/components/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var _components_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/dynamic-modal-dialog/dynamic-modal-dialog.component */ "./src/app/dynamic-form/components/dynamic-modal-dialog/dynamic-modal-dialog.component.ts");
/* harmony import */ var _components_form_address_form_address_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/form-address/form-address.component */ "./src/app/dynamic-form/components/form-address/form-address.component.ts");
/* harmony import */ var _components_form_array_form_array_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/form-array/form-array.component */ "./src/app/dynamic-form/components/form-array/form-array.component.ts");
/* harmony import */ var _components_form_button_form_button_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/form-button/form-button.component */ "./src/app/dynamic-form/components/form-button/form-button.component.ts");
/* harmony import */ var _components_form_checkbox_group_form_checkbox_group_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/form-checkbox-group/form-checkbox-group.component */ "./src/app/dynamic-form/components/form-checkbox-group/form-checkbox-group.component.ts");
/* harmony import */ var _components_form_checkbox_form_checkbox_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/form-checkbox/form-checkbox.component */ "./src/app/dynamic-form/components/form-checkbox/form-checkbox.component.ts");
/* harmony import */ var _components_form_date_form_date_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/form-date/form-date.component */ "./src/app/dynamic-form/components/form-date/form-date.component.ts");
/* harmony import */ var _components_form_email_form_email_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/form-email/form-email.component */ "./src/app/dynamic-form/components/form-email/form-email.component.ts");
/* harmony import */ var _components_form_expansion_panel_form_expansion_panel_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/form-expansion-panel/form-expansion-panel.component */ "./src/app/dynamic-form/components/form-expansion-panel/form-expansion-panel.component.ts");
/* harmony import */ var _components_form_fieldset_form_fieldset_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/form-fieldset/form-fieldset.component */ "./src/app/dynamic-form/components/form-fieldset/form-fieldset.component.ts");
/* harmony import */ var _components_form_heading_form_heading_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/form-heading/form-heading.component */ "./src/app/dynamic-form/components/form-heading/form-heading.component.ts");
/* harmony import */ var _components_form_number_form_number_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/form-number/form-number.component */ "./src/app/dynamic-form/components/form-number/form-number.component.ts");
/* harmony import */ var _components_form_password_form_password_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/form-password/form-password.component */ "./src/app/dynamic-form/components/form-password/form-password.component.ts");
/* harmony import */ var _components_form_radio_form_radio_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/form-radio/form-radio.component */ "./src/app/dynamic-form/components/form-radio/form-radio.component.ts");
/* harmony import */ var _components_form_select_form_select_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/form-select/form-select.component */ "./src/app/dynamic-form/components/form-select/form-select.component.ts");
/* harmony import */ var _components_form_slide_toggle_form_slide_toggle_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/form-slide-toggle/form-slide-toggle.component */ "./src/app/dynamic-form/components/form-slide-toggle/form-slide-toggle.component.ts");
/* harmony import */ var _components_form_slider_form_slider_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/form-slider/form-slider.component */ "./src/app/dynamic-form/components/form-slider/form-slider.component.ts");
/* harmony import */ var _components_form_states_form_states_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/form-states/form-states.component */ "./src/app/dynamic-form/components/form-states/form-states.component.ts");
/* harmony import */ var _components_form_static_panel_form_static_panel_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/form-static-panel/form-static-panel.component */ "./src/app/dynamic-form/components/form-static-panel/form-static-panel.component.ts");
/* harmony import */ var _components_form_static_form_static_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/form-static/form-static.component */ "./src/app/dynamic-form/components/form-static/form-static.component.ts");
/* harmony import */ var _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/form-text-mask/form-text-mask.component */ "./src/app/dynamic-form/components/form-text-mask/form-text-mask.component.ts");
/* harmony import */ var _components_form_text_form_text_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/form-text/form-text.component */ "./src/app/dynamic-form/components/form-text/form-text.component.ts");
/* harmony import */ var _components_form_textarea_form_textarea_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/form-textarea/form-textarea.component */ "./src/app/dynamic-form/components/form-textarea/form-textarea.component.ts");
/* harmony import */ var _components_form_time_form_time_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/form-time/form-time.component */ "./src/app/dynamic-form/components/form-time/form-time.component.ts");
/* harmony import */ var _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/layout-editor/layout-editor.component */ "./src/app/dynamic-form/components/layout-editor/layout-editor.component.ts");
/* harmony import */ var _directives_dynamic_field_dynamic_field_directive__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./directives/dynamic-field/dynamic-field.directive */ "./src/app/dynamic-form/directives/dynamic-field/dynamic-field.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var DynamicDataModule = /** @class */ (function () {
    function DynamicDataModule() {
    }
    DynamicDataModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _core_core_module__WEBPACK_IMPORTED_MODULE_4__["CoreModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_0__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyAdOa90pqGf2iukXoy43TBYQcfUE-nYqjQ',
                    libraries: ['places']
                }),
                ngx_trumbowyg__WEBPACK_IMPORTED_MODULE_6__["NgxTrumbowygModule"].withConfig({
                    svgPath: '/assets/trumbowyg-icons.svg',
                    removeformatPasted: true
                })
            ],
            declarations: [
                // directives
                _directives_dynamic_field_dynamic_field_directive__WEBPACK_IMPORTED_MODULE_34__["DynamicFieldDirective"],
                // components
                _components_action_toolbar_action_toolbar_component__WEBPACK_IMPORTED_MODULE_7__["ActionToolbarComponent"],
                _components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_8__["DynamicFormComponent"],
                _components_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_9__["DynamicModalDialogComponent"],
                _components_form_address_form_address_component__WEBPACK_IMPORTED_MODULE_10__["FormAddressComponent"],
                _components_form_array_form_array_component__WEBPACK_IMPORTED_MODULE_11__["FormArrayComponent"],
                _components_form_button_form_button_component__WEBPACK_IMPORTED_MODULE_12__["FormButtonComponent"],
                _components_form_checkbox_form_checkbox_component__WEBPACK_IMPORTED_MODULE_14__["FormCheckboxComponent"],
                _components_form_checkbox_group_form_checkbox_group_component__WEBPACK_IMPORTED_MODULE_13__["FormCheckboxGroupComponent"],
                _components_form_date_form_date_component__WEBPACK_IMPORTED_MODULE_15__["FormDateComponent"],
                _components_form_email_form_email_component__WEBPACK_IMPORTED_MODULE_16__["FormEmailComponent"],
                _components_form_fieldset_form_fieldset_component__WEBPACK_IMPORTED_MODULE_18__["FormFieldSetComponent"],
                _components_form_heading_form_heading_component__WEBPACK_IMPORTED_MODULE_19__["FormHeadingComponent"],
                _components_form_number_form_number_component__WEBPACK_IMPORTED_MODULE_20__["FormNumberComponent"],
                _components_form_password_form_password_component__WEBPACK_IMPORTED_MODULE_21__["FormPasswordComponent"],
                _components_form_radio_form_radio_component__WEBPACK_IMPORTED_MODULE_22__["FormRadioComponent"],
                _components_form_select_form_select_component__WEBPACK_IMPORTED_MODULE_23__["FormSelectComponent"],
                _components_form_slider_form_slider_component__WEBPACK_IMPORTED_MODULE_25__["FormSliderComponent"],
                _components_form_slide_toggle_form_slide_toggle_component__WEBPACK_IMPORTED_MODULE_24__["FormSlideToggleComponent"],
                _components_form_states_form_states_component__WEBPACK_IMPORTED_MODULE_26__["FormStatesComponent"],
                _components_form_static_form_static_component__WEBPACK_IMPORTED_MODULE_28__["FormStaticComponent"],
                _components_form_static_panel_form_static_panel_component__WEBPACK_IMPORTED_MODULE_27__["FormStaticPanelComponent"],
                _components_form_text_form_text_component__WEBPACK_IMPORTED_MODULE_30__["FormTextComponent"],
                _components_form_textarea_form_textarea_component__WEBPACK_IMPORTED_MODULE_31__["FormTextareaComponent"],
                _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_29__["FormTextMaskComponent"],
                _components_form_time_form_time_component__WEBPACK_IMPORTED_MODULE_32__["FormTimeComponent"],
                _components_form_expansion_panel_form_expansion_panel_component__WEBPACK_IMPORTED_MODULE_17__["FormExpansionPanelComponent"],
                _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_33__["LayoutEditorComponent"]
            ],
            exports: [_components_dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_8__["DynamicFormComponent"], _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_33__["LayoutEditorComponent"]],
            entryComponents: [
                _components_action_toolbar_action_toolbar_component__WEBPACK_IMPORTED_MODULE_7__["ActionToolbarComponent"],
                _components_dynamic_modal_dialog_dynamic_modal_dialog_component__WEBPACK_IMPORTED_MODULE_9__["DynamicModalDialogComponent"],
                _components_form_address_form_address_component__WEBPACK_IMPORTED_MODULE_10__["FormAddressComponent"],
                _components_form_array_form_array_component__WEBPACK_IMPORTED_MODULE_11__["FormArrayComponent"],
                _components_form_button_form_button_component__WEBPACK_IMPORTED_MODULE_12__["FormButtonComponent"],
                _components_form_checkbox_form_checkbox_component__WEBPACK_IMPORTED_MODULE_14__["FormCheckboxComponent"],
                _components_form_checkbox_group_form_checkbox_group_component__WEBPACK_IMPORTED_MODULE_13__["FormCheckboxGroupComponent"],
                _components_form_date_form_date_component__WEBPACK_IMPORTED_MODULE_15__["FormDateComponent"],
                _components_form_email_form_email_component__WEBPACK_IMPORTED_MODULE_16__["FormEmailComponent"],
                _components_form_fieldset_form_fieldset_component__WEBPACK_IMPORTED_MODULE_18__["FormFieldSetComponent"],
                _components_form_heading_form_heading_component__WEBPACK_IMPORTED_MODULE_19__["FormHeadingComponent"],
                _components_form_number_form_number_component__WEBPACK_IMPORTED_MODULE_20__["FormNumberComponent"],
                _components_form_password_form_password_component__WEBPACK_IMPORTED_MODULE_21__["FormPasswordComponent"],
                _components_form_radio_form_radio_component__WEBPACK_IMPORTED_MODULE_22__["FormRadioComponent"],
                _components_form_select_form_select_component__WEBPACK_IMPORTED_MODULE_23__["FormSelectComponent"],
                _components_form_slider_form_slider_component__WEBPACK_IMPORTED_MODULE_25__["FormSliderComponent"],
                _components_form_slide_toggle_form_slide_toggle_component__WEBPACK_IMPORTED_MODULE_24__["FormSlideToggleComponent"],
                _components_form_states_form_states_component__WEBPACK_IMPORTED_MODULE_26__["FormStatesComponent"],
                _components_form_static_form_static_component__WEBPACK_IMPORTED_MODULE_28__["FormStaticComponent"],
                _components_form_static_panel_form_static_panel_component__WEBPACK_IMPORTED_MODULE_27__["FormStaticPanelComponent"],
                _components_form_text_form_text_component__WEBPACK_IMPORTED_MODULE_30__["FormTextComponent"],
                _components_form_textarea_form_textarea_component__WEBPACK_IMPORTED_MODULE_31__["FormTextareaComponent"],
                _components_form_text_mask_form_text_mask_component__WEBPACK_IMPORTED_MODULE_29__["FormTextMaskComponent"],
                _components_form_time_form_time_component__WEBPACK_IMPORTED_MODULE_32__["FormTimeComponent"],
                _components_form_expansion_panel_form_expansion_panel_component__WEBPACK_IMPORTED_MODULE_17__["FormExpansionPanelComponent"],
                _components_layout_editor_layout_editor_component__WEBPACK_IMPORTED_MODULE_33__["LayoutEditorComponent"]
            ],
            providers: []
        })
    ], DynamicDataModule);
    return DynamicDataModule;
}());



/***/ }),

/***/ "./src/app/dynamic-form/dynamic-form-builder.ts":
/*!******************************************************!*\
  !*** ./src/app/dynamic-form/dynamic-form-builder.ts ***!
  \******************************************************/
/*! exports provided: DynamicFormBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormBuilder", function() { return DynamicFormBuilder; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element-config/element-type */ "./src/app/element-config/element-type.ts");
/* harmony import */ var _validators_required_minimum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validators/required-minimum */ "./src/app/dynamic-form/validators/required-minimum.ts");



var DynamicFormBuilder = /** @class */ (function () {
    function DynamicFormBuilder() {
        this.fb = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"]();
    }
    DynamicFormBuilder.prototype.createForm = function () {
        return this.fb.group({});
    };
    DynamicFormBuilder.prototype.reconcileForm = function (form, layout, entity) {
        this.reconcileGroup(form, layout, entity);
    };
    DynamicFormBuilder.prototype.reconcileGroup = function (group, configs, entity) {
        var _this = this;
        var controlKeys = Object.keys(group.controls);
        var itemSpecs = this.getSpecify(configs);
        var configNames = configs
            .filter(function (config) { return _this.isControl(config.type); })
            .map(function (field) { return field.name; })
            .concat(configs
            .filter(function (config) { return _this.hasSpecify(config); })
            .map(function (field) { return field.options.specify.name; }), itemSpecs.map(function (field) { return field.name; }))
            // remove null values from configNames
            .filter(function (config) { return config; });
        // if key is not found in configs, remove the control from the group
        controlKeys
            .filter(function (key) { return configNames.indexOf(key) === -1; })
            .forEach(function (key) { return group.removeControl(key); });
        // if config name not found in keys, add the control to the group
        configNames
            .filter(function (name) { return controlKeys.indexOf(name) === -1; })
            .forEach(function (name) {
            var entityValue = entity ? entity[name] : entity;
            var config = configs.find(function (field) { return field.name === name; });
            if (config) {
                if (config.options.defaultValue && entityValue === undefined) {
                    entityValue = config.options.defaultValue;
                }
                group.addControl(config.name, _this.createControl(config, entityValue));
                if (_this.hasSpecify(config)) {
                    var specifyValue = entity
                        ? entity[config.options.specify.name]
                        : entity;
                    group.addControl(config.options.specify.name, _this.createControl(config.options.specify, specifyValue));
                }
                if (config.options && config.options.items) {
                    config.options.items.forEach(function (item) {
                        if (_this.hasSpecify(item) && item.options.specify.name) {
                            var specifyValue = entity
                                ? entity[item.options.specify.name]
                                : entity;
                            group.addControl(item.options.specify.name, _this.createControl(item.options.specify, specifyValue));
                        }
                    });
                }
            }
        });
    };
    DynamicFormBuilder.prototype.createControl = function (config, entity) {
        if (this.isGroup(config.type)) {
            return this.createGroup(config, entity);
        }
        if (this.isEditorArray(config.type)) {
            return this.createEditorArray(config, entity);
        }
        if (this.isArray(config.type)) {
            var length_1 = entity && Array.isArray(entity)
                ? entity.length
                : config.options && config.options.defaultEmpty === true
                    ? 0
                    : 1;
            return this.createArray(config, length_1, entity);
        }
        var disabled = config.options ? config.options.disabled : false;
        if (config.type === 'date' && entity) {
            entity = new Date(entity);
        }
        return this.fb.control({ disabled: disabled, value: entity });
    };
    DynamicFormBuilder.prototype.createGroup = function (groupConfig, entity) {
        var _this = this;
        var validator = this.createGroupValidator(groupConfig);
        var group = this.fb.group({}, validator);
        // addControlsToGroup
        var configs = groupConfig.options && groupConfig.options.fields
            ? groupConfig.options.fields
            : groupConfig;
        configs.filter(function (config) { return _this.isControl(config.type); }).forEach(function (config) {
            var entityValue = entity ? entity[config.name] : entity;
            if (config.options.defaultValue && entityValue === undefined) {
                entityValue = config.options.defaultValue;
            }
            group.addControl(config.name, _this.createControl(config, entityValue));
            if (_this.hasSpecify(config)) {
                var specifyValue = entity
                    ? entity[config.options.specify.name]
                    : entity;
                group.addControl(config.options.specify.name, _this.createControl(config.options.specify, specifyValue));
            }
            if (config.options && config.options.items) {
                config.options.items.forEach(function (item) {
                    if (_this.hasSpecify(item) && item.options.specify.name) {
                        var specifyValue = entity
                            ? entity[item.options.specify.name]
                            : entity;
                        group.addControl(item.options.specify.name, _this.createControl(item.options.specify, specifyValue));
                    }
                });
            }
        });
        return group;
    };
    DynamicFormBuilder.prototype.createArray = function (arrayConfig, length, entity) {
        var validators = this.createArrayValidator(arrayConfig);
        var array = this.fb.array([], validators);
        for (var i = 0; i < length; i++) {
            // TODO: test array > group > array > group recursive
            var group = this.createGroup(arrayConfig, entity && entity.length >= i && entity[i] ? entity[i] : entity);
            array.push(group);
        }
        return array;
    };
    DynamicFormBuilder.prototype.createEditorArray = function (arrayConfig, entity) {
        var validators = this.createArrayValidator(arrayConfig);
        var array = this.fb.array([], validators);
        for (var i = 0; i < arrayConfig.options.fields.length; i++) {
            var group = this.createGroup(arrayConfig.options.fields[i], entity[i]);
            array.push(group);
        }
        return array;
    };
    DynamicFormBuilder.prototype.createGroupValidator = function (config) {
        if (!config || !config.options || !config.options.validation) {
            return;
        }
        if (config.options.validation.requiredMin) {
            // must return function
            var val = new _validators_required_minimum__WEBPACK_IMPORTED_MODULE_2__["RequiredMinimumValidator"](config.options.validation.requiredMin).validate;
            return { validator: val };
        }
    };
    DynamicFormBuilder.prototype.createArrayValidator = function (config) {
        var arr = [];
        if (!config || !config.options || !config.options.validation) {
            return null;
        }
        if (config.options.validation.required) {
            arr.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required);
        }
        if (config.options.validation.minLength) {
            arr.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(config.options.validation.minLength));
        }
        if (config.options.validation.maxLength) {
            arr.push(_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].maxLength(config.options.validation.maxLength));
        }
        return _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].compose(arr);
    };
    DynamicFormBuilder.prototype.isGroup = function (type) {
        return (type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].CheckboxGroup ||
            type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Fieldset ||
            type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Panel);
    };
    DynamicFormBuilder.prototype.isArray = function (type) {
        return type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Array;
    };
    DynamicFormBuilder.prototype.isEditorArray = function (type) {
        return type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].LayoutEditor;
    };
    DynamicFormBuilder.prototype.isControl = function (type) {
        return !(type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Heading || type === _element_config_element_type__WEBPACK_IMPORTED_MODULE_1__["ElementType"].Static);
    };
    DynamicFormBuilder.prototype.hasSpecify = function (config) {
        return config.options && !!config.options.specify;
    };
    DynamicFormBuilder.prototype.getSpecify = function (items) {
        var _this = this;
        return items
            .filter(function (item) { return _this.hasSpecify(item); })
            .map(function (item) { return item.options.specify; });
    };
    return DynamicFormBuilder;
}());



/***/ }),

/***/ "./src/app/dynamic-form/enumerations/action-buttons.ts":
/*!*************************************************************!*\
  !*** ./src/app/dynamic-form/enumerations/action-buttons.ts ***!
  \*************************************************************/
/*! exports provided: ActionButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionButtons", function() { return ActionButtons; });
var ActionButtons;
(function (ActionButtons) {
    ActionButtons["Cancel"] = "cancel";
    ActionButtons["Delete"] = "delete";
    ActionButtons["Submit"] = "submit";
})(ActionButtons || (ActionButtons = {}));


/***/ }),

/***/ "./src/app/dynamic-form/enumerations/dialog-buttons.ts":
/*!*************************************************************!*\
  !*** ./src/app/dynamic-form/enumerations/dialog-buttons.ts ***!
  \*************************************************************/
/*! exports provided: DialogButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogButtons", function() { return DialogButtons; });
var DialogButtons;
(function (DialogButtons) {
    DialogButtons[DialogButtons["OK"] = 0] = "OK";
    DialogButtons[DialogButtons["OKCancel"] = 1] = "OKCancel";
    DialogButtons[DialogButtons["NextCancel"] = 2] = "NextCancel";
    DialogButtons[DialogButtons["SaveCancel"] = 3] = "SaveCancel";
    DialogButtons[DialogButtons["SubmitCancel"] = 4] = "SubmitCancel";
    DialogButtons[DialogButtons["YesNo"] = 5] = "YesNo";
})(DialogButtons || (DialogButtons = {}));


/***/ }),

/***/ "./src/app/dynamic-form/validators/required-minimum.ts":
/*!*************************************************************!*\
  !*** ./src/app/dynamic-form/validators/required-minimum.ts ***!
  \*************************************************************/
/*! exports provided: RequiredMinimumValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequiredMinimumValidator", function() { return RequiredMinimumValidator; });
var RequiredMinimumValidator = /** @class */ (function () {
    function RequiredMinimumValidator(min) {
        // set up function w/ min param, store for future use
        this.validate = this.validateRequiredMin(min);
    }
    RequiredMinimumValidator.prototype.validateRequiredMin = function (min) {
        return function (group) {
            if (!group || !group.controls) {
                return null;
            }
            var count = Object.keys(group.controls)
                .map(function (name) { return group.get(name); })
                .filter(function (item) { return item.value; }).length;
            return count < min
                ? { requiredMin: { required: min, actual: count } }
                : null;
        };
    };
    return RequiredMinimumValidator;
}());



/***/ }),

/***/ "./src/app/element-config/config/action-toolbar.ts":
/*!*********************************************************!*\
  !*** ./src/app/element-config/config/action-toolbar.ts ***!
  \*********************************************************/
/*! exports provided: ActionToolbarConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionToolbarConfig", function() { return ActionToolbarConfig; });
var ActionToolbarConfig = /** @class */ (function () {
    function ActionToolbarConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Action Toolbar Configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                type: 'panel',
                name: 'options',
                label: 'Options',
                options: {
                    fields: [
                        {
                            type: 'checkbox-group',
                            name: 'buttons',
                            label: 'Buttons',
                            options: {
                                validation: {
                                    requiredMin: 1,
                                },
                                fields: [
                                    {
                                        type: 'checkbox',
                                        name: 'allowDelete',
                                        label: 'Delete',
                                        options: {
                                            specify: {
                                                type: 'text',
                                                name: 'deleteButtonText',
                                                label: 'Delete button text',
                                                options: {
                                                    hint: 'Default is Delete',
                                                    validation: {},
                                                },
                                            },
                                            validation: {},
                                        },
                                    },
                                    {
                                        type: 'checkbox',
                                        name: 'allowCancel',
                                        label: 'Cancel',
                                        options: {
                                            specify: {
                                                type: 'text',
                                                name: 'cancelButtonText',
                                                label: 'Cancel button text',
                                                options: {
                                                    hint: 'Default is Cancel',
                                                    validation: {},
                                                },
                                            },
                                            validation: {},
                                        },
                                    },
                                    {
                                        type: 'checkbox',
                                        name: 'allowSubmit',
                                        label: 'Submit',
                                        options: {
                                            specify: {
                                                type: 'text',
                                                name: 'submitButtonText',
                                                label: 'Submit button text',
                                                options: {
                                                    hint: 'Default is Submit',
                                                    validation: {},
                                                },
                                            },
                                            validation: {},
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        ];
        this.entity = {
            type: 'action-toolbar',
            options: {
                buttons: {
                    allowDelete: false,
                    deleteButtonText: 'Delete',
                    allowCancel: true,
                    cancelButtonText: 'Cancel',
                    allowSubmit: true,
                    submitButtonText: 'Submit',
                },
            },
        };
    }
    return ActionToolbarConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/address.ts":
/*!**************************************************!*\
  !*** ./src/app/element-config/config/address.ts ***!
  \**************************************************/
/*! exports provided: AddressConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressConfig", function() { return AddressConfig; });
var AddressConfig = /** @class */ (function () {
    function AddressConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Address configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'What the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide additional instructions if necessary'
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'address'
        };
    }
    return AddressConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/array.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/array.ts ***!
  \************************************************/
/*! exports provided: ArrayConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayConfig", function() { return ArrayConfig; });
var ArrayConfig = /** @class */ (function () {
    function ArrayConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Array configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'addText',
                            type: 'text',
                            label: 'Add button text',
                            options: {
                                hint: 'Provide meaningful button text',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'removeText',
                            type: 'text',
                            label: 'Remove button text',
                            options: {
                                hint: 'Provide meaningful button text',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultEmpty',
                            type: 'checkbox',
                            label: 'Default to empty array?',
                            options: {
                                align: 'after',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'array'
        };
    }
    return ArrayConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/button.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/button.ts ***!
  \*************************************************/
/*! exports provided: ButtonConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonConfig", function() { return ButtonConfig; });
var ButtonConfig = /** @class */ (function () {
    function ButtonConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Button configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'disabled',
                            type: 'radio',
                            label: 'Disabled by default',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Yes',
                                        value: true
                                    },
                                    {
                                        label: 'No',
                                        value: false
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'button',
            options: {
                disabled: false
            }
        };
    }
    return ButtonConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/checkbox-group.ts":
/*!*********************************************************!*\
  !*** ./src/app/element-config/config/checkbox-group.ts ***!
  \*********************************************************/
/*! exports provided: CheckboxGroupConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupConfig", function() { return CheckboxGroupConfig; });
var CheckboxGroupConfig = /** @class */ (function () {
    function CheckboxGroupConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Checkbox group configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'requiredMin',
                                        type: 'number',
                                        label: 'Require at least this many to be checked:',
                                        options: {
                                            validation: {
                                                required: false,
                                                min: '0'
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'fields',
                            type: 'array',
                            label: 'Fields',
                            options: {
                                fields: [
                                    {
                                        name: 'type',
                                        type: 'select',
                                        label: 'Element type',
                                        options: {
                                            validation: {
                                                required: true
                                            },
                                            items: [
                                                {
                                                    label: 'checkbox',
                                                    value: 'checkbox'
                                                }
                                            ],
                                            disabled: false
                                        }
                                    },
                                    {
                                        name: 'name',
                                        type: 'text',
                                        label: 'Name',
                                        options: {
                                            hint: 'A unique element name',
                                            validation: {
                                                required: true
                                            }
                                        }
                                    },
                                    {
                                        name: 'label',
                                        type: 'text',
                                        label: 'Label',
                                        options: {
                                            hint: 'The text the user sees',
                                            validation: {
                                                required: true
                                            }
                                        }
                                    },
                                    {
                                        name: 'options',
                                        type: 'panel',
                                        label: 'Options',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'align',
                                                    type: 'radio',
                                                    label: 'Align box to...',
                                                    options: {
                                                        align: 'after',
                                                        vertical: true,
                                                        validation: {
                                                            required: false
                                                        },
                                                        items: [
                                                            {
                                                                label: 'Start',
                                                                value: 'start'
                                                            },
                                                            {
                                                                label: 'End',
                                                                value: 'end'
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    name: 'disabled',
                                                    type: 'radio',
                                                    label: 'Default state',
                                                    options: {
                                                        align: 'after',
                                                        vertical: true,
                                                        validation: {
                                                            required: false
                                                        },
                                                        items: [
                                                            {
                                                                label: 'Disabled',
                                                                value: true
                                                            },
                                                            {
                                                                label: 'Enabled',
                                                                value: false
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    name: 'specify',
                                                    type: 'panel',
                                                    label: 'Other specify',
                                                    options: {
                                                        fields: [
                                                            {
                                                                name: 'type',
                                                                type: 'select',
                                                                label: 'Element type',
                                                                options: {
                                                                    validation: {
                                                                        required: false
                                                                    },
                                                                    items: [
                                                                        {
                                                                            label: 'text',
                                                                            value: 'text'
                                                                        }
                                                                    ],
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                name: 'name',
                                                                type: 'text',
                                                                label: 'Name',
                                                                options: {
                                                                    hint: 'A unique element name',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'label',
                                                                type: 'text',
                                                                label: 'Label',
                                                                options: {
                                                                    hint: 'The text the user sees',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'options',
                                                                type: 'panel',
                                                                label: 'Options',
                                                                options: {
                                                                    fields: [
                                                                        {
                                                                            name: 'hint',
                                                                            type: 'text',
                                                                            label: 'Hint',
                                                                            options: {
                                                                                hint: 'Give the user a hint',
                                                                                validation: {
                                                                                    required: false
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'validation',
                                                                            type: 'fieldset',
                                                                            label: 'Validation',
                                                                            options: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'requiredIf',
                                                                                        type: 'fieldset',
                                                                                        label: 'Required If?',
                                                                                        options: {
                                                                                            fields: [
                                                                                                {
                                                                                                    name: 'property',
                                                                                                    type: 'text',
                                                                                                    label: 'Property name',
                                                                                                    options: {
                                                                                                        hint: 'Property name of field dependency.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    name: 'value',
                                                                                                    type: 'text',
                                                                                                    label: 'Property value',
                                                                                                    options: {
                                                                                                        hint: 'Value of dependent field.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    name: 'validation',
                                                    type: 'fieldset',
                                                    label: 'Validation',
                                                    options: {
                                                        fields: [
                                                            {
                                                                name: 'required',
                                                                type: 'checkbox',
                                                                label: 'Required?',
                                                                options: {
                                                                    align: 'after',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'checkbox-group',
            options: {
                validation: {
                    requiredMin: 0
                },
                fields: [
                    {
                        options: {
                            validation: {
                                disabled: false,
                                align: 'after'
                            }
                        }
                    }
                ]
            }
        };
    }
    return CheckboxGroupConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/checkbox.ts":
/*!***************************************************!*\
  !*** ./src/app/element-config/config/checkbox.ts ***!
  \***************************************************/
/*! exports provided: CheckboxConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxConfig", function() { return CheckboxConfig; });
var CheckboxConfig = /** @class */ (function () {
    function CheckboxConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Checkbox configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'align',
                            type: 'radio',
                            label: 'Align box to...',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Start',
                                        value: 'after'
                                    },
                                    {
                                        label: 'End',
                                        value: 'before'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'disabled',
                            type: 'radio',
                            label: 'Default state',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Disabled',
                                        value: true
                                    },
                                    {
                                        label: 'Enabled',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'checkbox',
            options: {
                disabled: false,
                align: 'after'
            }
        };
    }
    return CheckboxConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/date.ts":
/*!***********************************************!*\
  !*** ./src/app/element-config/config/date.ts ***!
  \***********************************************/
/*! exports provided: DateConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateConfig", function() { return DateConfig; });
var DateConfig = /** @class */ (function () {
    function DateConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Date configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value (ISO date format)'
                            }
                        },
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'startAt',
                            type: 'panel',
                            label: 'Start date',
                            options: {
                                fields: [
                                    {
                                        name: 'year',
                                        type: 'number',
                                        label: 'Year',
                                        options: {
                                            hint: 'The start year',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'month',
                                        type: 'select',
                                        label: 'Month',
                                        options: {
                                            hint: 'The start month',
                                            items: [
                                                {
                                                    value: '0',
                                                    label: 'January'
                                                },
                                                {
                                                    value: '1',
                                                    label: 'February'
                                                },
                                                {
                                                    value: '2',
                                                    label: 'March'
                                                },
                                                {
                                                    value: '3',
                                                    label: 'April'
                                                },
                                                {
                                                    value: '4',
                                                    label: 'May'
                                                },
                                                {
                                                    value: '5',
                                                    label: 'June'
                                                },
                                                {
                                                    value: '6',
                                                    label: 'July'
                                                },
                                                {
                                                    value: '7',
                                                    label: 'August'
                                                },
                                                {
                                                    value: '8',
                                                    label: 'September'
                                                },
                                                {
                                                    value: '9',
                                                    label: 'October'
                                                },
                                                {
                                                    value: '10',
                                                    label: 'November'
                                                },
                                                {
                                                    value: '11',
                                                    label: 'December'
                                                }
                                            ],
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'day',
                                        type: 'number',
                                        label: 'Day',
                                        options: {
                                            hint: 'The start day',
                                            validation: {
                                                required: false,
                                                min: 1,
                                                max: 31
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'minDate',
                                        type: 'panel',
                                        label: 'Minimum date',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'year',
                                                    type: 'number',
                                                    label: 'Year',
                                                    options: {
                                                        hint: 'The minimum date year',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'month',
                                                    type: 'select',
                                                    label: 'Month',
                                                    options: {
                                                        hint: 'The minimum date month',
                                                        items: [
                                                            {
                                                                value: '0',
                                                                label: 'January'
                                                            },
                                                            {
                                                                value: '1',
                                                                label: 'February'
                                                            },
                                                            {
                                                                value: '2',
                                                                label: 'March'
                                                            },
                                                            {
                                                                value: '3',
                                                                label: 'April'
                                                            },
                                                            {
                                                                value: '4',
                                                                label: 'May'
                                                            },
                                                            {
                                                                value: '5',
                                                                label: 'June'
                                                            },
                                                            {
                                                                value: '6',
                                                                label: 'July'
                                                            },
                                                            {
                                                                value: '7',
                                                                label: 'August'
                                                            },
                                                            {
                                                                value: '8',
                                                                label: 'September'
                                                            },
                                                            {
                                                                value: '9',
                                                                label: 'October'
                                                            },
                                                            {
                                                                value: '10',
                                                                label: 'November'
                                                            },
                                                            {
                                                                value: '11',
                                                                label: 'December'
                                                            }
                                                        ],
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'day',
                                                    type: 'number',
                                                    label: 'Day',
                                                    options: {
                                                        hint: 'The minimum date day',
                                                        validation: {
                                                            required: false,
                                                            min: 1,
                                                            max: 31
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        name: 'maxDate',
                                        type: 'panel',
                                        label: 'Maximum date',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'year',
                                                    type: 'number',
                                                    label: 'Year',
                                                    options: {
                                                        hint: 'The maximum date year',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'month',
                                                    type: 'select',
                                                    label: 'Month',
                                                    options: {
                                                        hint: 'The maximum date month',
                                                        items: [
                                                            {
                                                                value: '0',
                                                                label: 'January'
                                                            },
                                                            {
                                                                value: '1',
                                                                label: 'February'
                                                            },
                                                            {
                                                                value: '2',
                                                                label: 'March'
                                                            },
                                                            {
                                                                value: '3',
                                                                label: 'April'
                                                            },
                                                            {
                                                                value: '4',
                                                                label: 'May'
                                                            },
                                                            {
                                                                value: '5',
                                                                label: 'June'
                                                            },
                                                            {
                                                                value: '6',
                                                                label: 'July'
                                                            },
                                                            {
                                                                value: '7',
                                                                label: 'August'
                                                            },
                                                            {
                                                                value: '8',
                                                                label: 'September'
                                                            },
                                                            {
                                                                value: '9',
                                                                label: 'October'
                                                            },
                                                            {
                                                                value: '10',
                                                                label: 'November'
                                                            },
                                                            {
                                                                value: '11',
                                                                label: 'December'
                                                            }
                                                        ],
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'day',
                                                    type: 'number',
                                                    label: 'Day',
                                                    options: {
                                                        hint: 'The maximum date day',
                                                        validation: {
                                                            required: false,
                                                            min: 1,
                                                            max: 31
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'date'
        };
    }
    return DateConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/email.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/email.ts ***!
  \************************************************/
/*! exports provided: EmailConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailConfig", function() { return EmailConfig; });
var EmailConfig = /** @class */ (function () {
    function EmailConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Email configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'email'
        };
    }
    EmailConfig.pattern = 
    // tslint:disable-next-line
    "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_'a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_'a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$";
    return EmailConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/fieldset.ts":
/*!***************************************************!*\
  !*** ./src/app/element-config/config/fieldset.ts ***!
  \***************************************************/
/*! exports provided: FieldsetConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldsetConfig", function() { return FieldsetConfig; });
var FieldsetConfig = /** @class */ (function () {
    function FieldsetConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Fieldset configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [],
                },
            },
        ];
        this.entity = {
            type: 'fieldset',
        };
    }
    return FieldsetConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/heading.ts":
/*!**************************************************!*\
  !*** ./src/app/element-config/config/heading.ts ***!
  \**************************************************/
/*! exports provided: HeadingConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeadingConfig", function() { return HeadingConfig; });
var HeadingConfig = /** @class */ (function () {
    function HeadingConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Heading configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'What the user sees',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'level',
                            type: 'slider',
                            label: 'Level',
                            options: {
                                validation: {
                                    required: true,
                                    min: 1,
                                    max: '6',
                                },
                                invert: false,
                                vertical: false,
                                thumbLabel: true,
                                step: '1',
                                tickInterval: 'auto',
                            },
                        },
                    ],
                },
            },
        ];
        this.entity = {
            type: 'heading',
            options: {
                level: 1,
            },
        };
    }
    return HeadingConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/index.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/index.ts ***!
  \************************************************/
/*! exports provided: ActionToolbarConfig, AddressConfig, ArrayConfig, ButtonConfig, CheckboxConfig, CheckboxGroupConfig, DateConfig, EmailConfig, FieldsetConfig, HeadingConfig, LayoutEditorConfig, NumberConfig, PanelConfig, PasswordConfig, PhoneConfig, RadioConfig, SelectConfig, SliderConfig, SlideToggleConfig, StatesConfig, StaticConfig, StaticPanelConfig, SsnConfig, TextConfig, TextareaConfig, TextMaskConfig, TimeConfig, TypeSelectConfig, ZipConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _action_toolbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action-toolbar */ "./src/app/element-config/config/action-toolbar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActionToolbarConfig", function() { return _action_toolbar__WEBPACK_IMPORTED_MODULE_0__["ActionToolbarConfig"]; });

/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./address */ "./src/app/element-config/config/address.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddressConfig", function() { return _address__WEBPACK_IMPORTED_MODULE_1__["AddressConfig"]; });

/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array */ "./src/app/element-config/config/array.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayConfig", function() { return _array__WEBPACK_IMPORTED_MODULE_2__["ArrayConfig"]; });

/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./button */ "./src/app/element-config/config/button.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonConfig", function() { return _button__WEBPACK_IMPORTED_MODULE_3__["ButtonConfig"]; });

/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkbox */ "./src/app/element-config/config/checkbox.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxConfig", function() { return _checkbox__WEBPACK_IMPORTED_MODULE_4__["CheckboxConfig"]; });

/* harmony import */ var _checkbox_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkbox-group */ "./src/app/element-config/config/checkbox-group.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupConfig", function() { return _checkbox_group__WEBPACK_IMPORTED_MODULE_5__["CheckboxGroupConfig"]; });

/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./date */ "./src/app/element-config/config/date.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateConfig", function() { return _date__WEBPACK_IMPORTED_MODULE_6__["DateConfig"]; });

/* harmony import */ var _email__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./email */ "./src/app/element-config/config/email.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailConfig", function() { return _email__WEBPACK_IMPORTED_MODULE_7__["EmailConfig"]; });

/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fieldset */ "./src/app/element-config/config/fieldset.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldsetConfig", function() { return _fieldset__WEBPACK_IMPORTED_MODULE_8__["FieldsetConfig"]; });

/* harmony import */ var _heading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./heading */ "./src/app/element-config/config/heading.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeadingConfig", function() { return _heading__WEBPACK_IMPORTED_MODULE_9__["HeadingConfig"]; });

/* harmony import */ var _layout_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layout-editor */ "./src/app/element-config/config/layout-editor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutEditorConfig", function() { return _layout_editor__WEBPACK_IMPORTED_MODULE_10__["LayoutEditorConfig"]; });

/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./number */ "./src/app/element-config/config/number.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberConfig", function() { return _number__WEBPACK_IMPORTED_MODULE_11__["NumberConfig"]; });

/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./panel */ "./src/app/element-config/config/panel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelConfig", function() { return _panel__WEBPACK_IMPORTED_MODULE_12__["PanelConfig"]; });

/* harmony import */ var _password__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./password */ "./src/app/element-config/config/password.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PasswordConfig", function() { return _password__WEBPACK_IMPORTED_MODULE_13__["PasswordConfig"]; });

/* harmony import */ var _phone__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./phone */ "./src/app/element-config/config/phone.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneConfig", function() { return _phone__WEBPACK_IMPORTED_MODULE_14__["PhoneConfig"]; });

/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./radio */ "./src/app/element-config/config/radio.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioConfig", function() { return _radio__WEBPACK_IMPORTED_MODULE_15__["RadioConfig"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./select */ "./src/app/element-config/config/select.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectConfig", function() { return _select__WEBPACK_IMPORTED_MODULE_16__["SelectConfig"]; });

/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./slider */ "./src/app/element-config/config/slider.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderConfig", function() { return _slider__WEBPACK_IMPORTED_MODULE_17__["SliderConfig"]; });

/* harmony import */ var _slide_toggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./slide-toggle */ "./src/app/element-config/config/slide-toggle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlideToggleConfig", function() { return _slide_toggle__WEBPACK_IMPORTED_MODULE_18__["SlideToggleConfig"]; });

/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./states */ "./src/app/element-config/config/states.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatesConfig", function() { return _states__WEBPACK_IMPORTED_MODULE_19__["StatesConfig"]; });

/* harmony import */ var _static__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./static */ "./src/app/element-config/config/static.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticConfig", function() { return _static__WEBPACK_IMPORTED_MODULE_20__["StaticConfig"]; });

/* harmony import */ var _static_panel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./static-panel */ "./src/app/element-config/config/static-panel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticPanelConfig", function() { return _static_panel__WEBPACK_IMPORTED_MODULE_21__["StaticPanelConfig"]; });

/* harmony import */ var _ssn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ssn */ "./src/app/element-config/config/ssn.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SsnConfig", function() { return _ssn__WEBPACK_IMPORTED_MODULE_22__["SsnConfig"]; });

/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./text */ "./src/app/element-config/config/text.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextConfig", function() { return _text__WEBPACK_IMPORTED_MODULE_23__["TextConfig"]; });

/* harmony import */ var _textarea__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./textarea */ "./src/app/element-config/config/textarea.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextareaConfig", function() { return _textarea__WEBPACK_IMPORTED_MODULE_24__["TextareaConfig"]; });

/* harmony import */ var _text_mask__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./text-mask */ "./src/app/element-config/config/text-mask.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextMaskConfig", function() { return _text_mask__WEBPACK_IMPORTED_MODULE_25__["TextMaskConfig"]; });

/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./time */ "./src/app/element-config/config/time.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeConfig", function() { return _time__WEBPACK_IMPORTED_MODULE_26__["TimeConfig"]; });

/* harmony import */ var _type_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./type-select */ "./src/app/element-config/config/type-select.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeSelectConfig", function() { return _type_select__WEBPACK_IMPORTED_MODULE_27__["TypeSelectConfig"]; });

/* harmony import */ var _zip__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./zip */ "./src/app/element-config/config/zip.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZipConfig", function() { return _zip__WEBPACK_IMPORTED_MODULE_28__["ZipConfig"]; });
































/***/ }),

/***/ "./src/app/element-config/config/layout-editor.ts":
/*!********************************************************!*\
  !*** ./src/app/element-config/config/layout-editor.ts ***!
  \********************************************************/
/*! exports provided: LayoutEditorConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutEditorConfig", function() { return LayoutEditorConfig; });
var LayoutEditorConfig = /** @class */ (function () {
    function LayoutEditorConfig() {
        this.layout = {
            type: 'layout-editor',
            name: 'fields',
            options: {
                fields: [],
            },
        };
    }
    return LayoutEditorConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/number.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/number.ts ***!
  \*************************************************/
/*! exports provided: NumberConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberConfig", function() { return NumberConfig; });
var NumberConfig = /** @class */ (function () {
    function NumberConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Number configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'min',
                                        type: 'number',
                                        label: 'Minimum length',
                                        options: {
                                            hint: 'The minimum value that must be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'max',
                                        type: 'number',
                                        label: 'Maximum length',
                                        options: {
                                            hint: 'The maximum value that can be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'number',
            options: {
                disabled: false
            }
        };
    }
    return NumberConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/panel.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/panel.ts ***!
  \************************************************/
/*! exports provided: PanelConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelConfig", function() { return PanelConfig; });
var PanelConfig = /** @class */ (function () {
    function PanelConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Panel configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false,
                                },
                            },
                        },
                    ],
                },
            },
        ];
        this.entity = {
            type: 'panel',
        };
    }
    return PanelConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/password.ts":
/*!***************************************************!*\
  !*** ./src/app/element-config/config/password.ts ***!
  \***************************************************/
/*! exports provided: PasswordConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordConfig", function() { return PasswordConfig; });
var PasswordConfig = /** @class */ (function () {
    function PasswordConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Password configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'minLength',
                                        type: 'number',
                                        label: 'Minimum length',
                                        options: {
                                            hint: 'The minimum characters that must be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'maxLength',
                                        type: 'number',
                                        label: 'Maximum length',
                                        options: {
                                            hint: 'The maximum characters that can be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'password',
            options: {
                disabled: false
            }
        };
    }
    return PasswordConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/phone.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/phone.ts ***!
  \************************************************/
/*! exports provided: PhoneConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneConfig", function() { return PhoneConfig; });
/* harmony import */ var _text_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-mask */ "./src/app/element-config/config/text-mask.ts");

var PhoneConfig = /** @class */ (function () {
    function PhoneConfig() {
        this.entity = {
            type: 'phone',
        };
        this.layout = new _text_mask__WEBPACK_IMPORTED_MODULE_0__["TextMaskConfig"]().layout;
        this.layout.map(function (f) {
            if (f.type === 'heading') {
                f.label = 'Phone configuration';
            }
            if (f.name === 'options') {
                f.options.fields.map(function (o) {
                    if (o.name === 'hint' || o.name === 'inputMask') {
                        o.options.disabled = true;
                    }
                    if (o.name === 'validation') {
                        o.options.fields.map(function (v) {
                            if (v.name === 'pattern' || v.name === 'patternValMsg') {
                                v.options.disabled = true;
                            }
                        });
                    }
                });
            }
        });
    }
    PhoneConfig.hint = '(xxx) xxx-xxxx';
    PhoneConfig.inputMask = '(000) 000-0000';
    PhoneConfig.pattern = '\\d{10}';
    PhoneConfig.patternValMsg = 'Phone must be 10 digits';
    return PhoneConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/radio.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/config/radio.ts ***!
  \************************************************/
/*! exports provided: RadioConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioConfig", function() { return RadioConfig; });
var RadioConfig = /** @class */ (function () {
    function RadioConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Radio configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give the user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'vertical',
                            type: 'radio',
                            label: 'List will be...',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Vertical',
                                        value: true
                                    },
                                    {
                                        label: 'Horizontal',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'disabled',
                            type: 'radio',
                            label: 'Default state',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Disabled',
                                        value: true
                                    },
                                    {
                                        label: 'Enabled',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'items',
                            type: 'array',
                            label: 'Items',
                            options: {
                                validation: {
                                    requiredMin: 2
                                },
                                fields: [
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Value',
                                        options: {
                                            hint: "The value stored (e.g. 'NJ')",
                                            validation: {
                                                required: true
                                            }
                                        }
                                    },
                                    {
                                        name: 'label',
                                        type: 'text',
                                        label: 'Label',
                                        options: {
                                            hint: "What the user sees (e.g. 'New Jersey')",
                                            validation: {
                                                required: true
                                            }
                                        }
                                    },
                                    {
                                        name: 'options',
                                        type: 'panel',
                                        label: 'Options',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'specify',
                                                    type: 'panel',
                                                    label: 'Other specify',
                                                    options: {
                                                        fields: [
                                                            {
                                                                name: 'type',
                                                                type: 'select',
                                                                label: 'Element type',
                                                                options: {
                                                                    validation: {
                                                                        required: false
                                                                    },
                                                                    items: [
                                                                        {
                                                                            label: 'text',
                                                                            value: 'text'
                                                                        }
                                                                    ],
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                name: 'name',
                                                                type: 'text',
                                                                label: 'Name',
                                                                options: {
                                                                    hint: 'A unique element name',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'label',
                                                                type: 'text',
                                                                label: 'Label',
                                                                options: {
                                                                    hint: 'The text the user sees',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'options',
                                                                type: 'panel',
                                                                label: 'Options',
                                                                options: {
                                                                    fields: [
                                                                        {
                                                                            name: 'hint',
                                                                            type: 'text',
                                                                            label: 'Hint',
                                                                            options: {
                                                                                hint: 'Give the user a hint',
                                                                                validation: {
                                                                                    required: false
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'validation',
                                                                            type: 'fieldset',
                                                                            label: 'Validation',
                                                                            options: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'requiredIf',
                                                                                        type: 'fieldset',
                                                                                        label: 'Required If?',
                                                                                        options: {
                                                                                            fields: [
                                                                                                {
                                                                                                    name: 'property',
                                                                                                    type: 'text',
                                                                                                    label: 'Property name',
                                                                                                    options: {
                                                                                                        hint: 'Property name of field dependency.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    name: 'value',
                                                                                                    type: 'text',
                                                                                                    label: 'Property value',
                                                                                                    options: {
                                                                                                        hint: 'Value of dependent field.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        name: 'minLength',
                                                                                        type: 'number',
                                                                                        label: 'Minimum number of characters',
                                                                                        options: {
                                                                                            validation: {
                                                                                                required: false,
                                                                                                min: '0'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        name: 'maxLength',
                                                                                        type: 'number',
                                                                                        label: 'Maximum number of characters',
                                                                                        options: {
                                                                                            validation: {
                                                                                                required: false,
                                                                                                min: '0'
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'radio'
        };
    }
    return RadioConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/select.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/select.ts ***!
  \*************************************************/
/*! exports provided: SelectConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectConfig", function() { return SelectConfig; });
var SelectConfig = /** @class */ (function () {
    function SelectConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Select configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'What the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide additional instructions if necessary'
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'items',
                            type: 'array',
                            label: 'Items',
                            options: {
                                validation: {
                                    required: true
                                },
                                hint: 'Enter items',
                                fields: [
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Value',
                                        options: {
                                            validation: {
                                                required: true
                                            },
                                            hint: 'Enter value'
                                        }
                                    },
                                    {
                                        name: 'label',
                                        type: 'text',
                                        label: 'Label',
                                        options: {
                                            validation: {
                                                required: true
                                            },
                                            hint: 'Enter label'
                                        }
                                    },
                                    {
                                        name: 'options',
                                        type: 'panel',
                                        label: 'Options',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'specify',
                                                    type: 'panel',
                                                    label: 'Other specify',
                                                    options: {
                                                        fields: [
                                                            {
                                                                name: 'type',
                                                                type: 'select',
                                                                label: 'Element Type',
                                                                options: {
                                                                    validation: {
                                                                        required: false
                                                                    },
                                                                    items: [
                                                                        {
                                                                            label: 'Text',
                                                                            value: 'text'
                                                                        }
                                                                    ],
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                name: 'name',
                                                                type: 'text',
                                                                label: 'Name',
                                                                options: {
                                                                    hint: 'A unique element name',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'label',
                                                                type: 'text',
                                                                label: 'Label',
                                                                options: {
                                                                    hint: 'The text the user sees',
                                                                    validation: {
                                                                        required: false
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: 'options',
                                                                type: 'panel',
                                                                label: 'Options',
                                                                options: {
                                                                    fields: [
                                                                        {
                                                                            name: 'hint',
                                                                            type: 'text',
                                                                            label: 'Hint',
                                                                            options: {
                                                                                hint: 'Give the user a hint',
                                                                                validation: {
                                                                                    required: false
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            name: 'validation',
                                                                            type: 'fieldset',
                                                                            label: 'Validation',
                                                                            options: {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'requiredIf',
                                                                                        type: 'fieldset',
                                                                                        label: 'Required If?',
                                                                                        options: {
                                                                                            fields: [
                                                                                                {
                                                                                                    name: 'property',
                                                                                                    type: 'text',
                                                                                                    label: 'Property name',
                                                                                                    options: {
                                                                                                        hint: 'Property name of field dependency.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    name: 'value',
                                                                                                    type: 'text',
                                                                                                    label: 'Property value',
                                                                                                    options: {
                                                                                                        hint: 'Value of dependent field.',
                                                                                                        validation: {
                                                                                                            required: false
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'select',
            options: {
                level: 1
            }
        };
    }
    return SelectConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/slide-toggle.ts":
/*!*******************************************************!*\
  !*** ./src/app/element-config/config/slide-toggle.ts ***!
  \*******************************************************/
/*! exports provided: SlideToggleConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideToggleConfig", function() { return SlideToggleConfig; });
var SlideToggleConfig = /** @class */ (function () {
    function SlideToggleConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Slide Toggle configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'align',
                            type: 'radio',
                            label: 'Align toggle to...',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Start',
                                        value: 'after'
                                    },
                                    {
                                        label: 'End',
                                        value: 'before'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'color',
                            type: 'radio',
                            label: 'Color',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Accent',
                                        value: 'accent'
                                    },
                                    {
                                        label: 'Primary',
                                        value: 'primary'
                                    },
                                    {
                                        label: 'Warn',
                                        value: 'warn'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'disabled',
                            type: 'radio',
                            label: 'Default state',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Disabled',
                                        value: true
                                    },
                                    {
                                        label: 'Enabled',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'slide-toggle',
            options: {
                disabled: false,
                align: 'after',
                color: 'accent'
            }
        };
    }
    return SlideToggleConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/slider.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/slider.ts ***!
  \*************************************************/
/*! exports provided: SliderConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderConfig", function() { return SliderConfig; });
var SliderConfig = /** @class */ (function () {
    function SliderConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Slider configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'min',
                                        type: 'number',
                                        label: 'Minimum value',
                                        options: {
                                            hint: 'The minimum value allowed',
                                            validation: {
                                                required: true,
                                                min: 0
                                            }
                                        }
                                    },
                                    {
                                        name: 'max',
                                        type: 'number',
                                        label: 'Maximum value',
                                        options: {
                                            hint: 'The maximum value allowed',
                                            validation: {
                                                required: true,
                                                min: 1
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'step',
                            type: 'number',
                            label: 'Increment',
                            options: {
                                hint: 'Thumb moves in increments of ...',
                                validation: {
                                    required: true,
                                    min: 0
                                }
                            }
                        },
                        {
                            name: 'thumbLabel',
                            type: 'radio',
                            label: 'Display thumb label?',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true,
                                    disabled: true
                                },
                                items: [
                                    {
                                        label: 'Yes',
                                        value: true
                                    },
                                    {
                                        label: 'No',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'vertical',
                            type: 'radio',
                            label: 'Orientation',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true
                                },
                                items: [
                                    {
                                        label: 'Vertical',
                                        value: true
                                    },
                                    {
                                        label: 'Horizontal',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'invert',
                            type: 'radio',
                            label: 'Invert slider?',
                            options: {
                                align: 'after',
                                vertical: true,
                                validation: {
                                    required: true,
                                    disabled: true
                                },
                                items: [
                                    {
                                        label: 'Yes',
                                        value: true
                                    },
                                    {
                                        label: 'No',
                                        value: false
                                    }
                                ]
                            }
                        },
                        {
                            name: 'tickInterval',
                            type: 'text',
                            label: 'Tick marks',
                            options: {
                                disabled: true,
                                hint: 'Show tick marks along thumb track',
                                validation: {
                                    required: true
                                }
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'slider',
            options: {
                validation: {
                    min: 0,
                    max: 10
                },
                step: 1,
                thumbLabel: true,
                vertical: false,
                invert: false,
                tickInterval: 'auto'
            }
        };
    }
    return SliderConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/ssn.ts":
/*!**********************************************!*\
  !*** ./src/app/element-config/config/ssn.ts ***!
  \**********************************************/
/*! exports provided: SsnConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsnConfig", function() { return SsnConfig; });
/* harmony import */ var _text_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-mask */ "./src/app/element-config/config/text-mask.ts");

var SsnConfig = /** @class */ (function () {
    function SsnConfig() {
        this.entity = {
            type: 'ssn',
        };
        this.layout = new _text_mask__WEBPACK_IMPORTED_MODULE_0__["TextMaskConfig"]().layout;
        this.layout.map(function (f) {
            if (f.type === 'heading') {
                f.label = 'SSN configuration';
            }
            if (f.name === 'options') {
                f.options.fields.map(function (o) {
                    if (o.name === 'hint' || o.name === 'inputMask') {
                        o.options.disabled = true;
                    }
                    if (o.name === 'validation') {
                        o.options.fields.map(function (v) {
                            if (v.name === 'pattern' || v.name === 'patternValMsg') {
                                v.options.disabled = true;
                            }
                        });
                    }
                });
            }
        });
    }
    SsnConfig.hint = 'xxx-xx-xxxx';
    SsnConfig.inputMask = '000-00-0000';
    SsnConfig.pattern = '^(?!219-09-9999|219099999|078-05-1120|078051120)(?!666|000|9\\d{2})\\d{3}-?(?!00)\\d{2}-?(?!0{4})\\d{4}$';
    SsnConfig.patternValMsg = 'Invalid SSN entered. Visit the <a href="https://secure.ssa.gov/poms.nsf/lnx/0110201035" ' +
        'target="_blank">Social Security Admnistration</a> for more information.';
    return SsnConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/states.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/states.ts ***!
  \*************************************************/
/*! exports provided: StatesConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatesConfig", function() { return StatesConfig; });
var StatesConfig = /** @class */ (function () {
    function StatesConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'States configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'What the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide additional instructions if necessary'
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'states'
        };
    }
    StatesConfig.states = [
        {
            value: 'AL',
            label: 'Alabama',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'AK',
            label: 'Alaska',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'AZ',
            label: 'Arizona',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'AR',
            label: 'Arkansas',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'CA',
            label: 'California',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'CO',
            label: 'Colorado',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'CT',
            label: 'Connecticut',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'DE',
            label: 'Delaware',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'DC',
            label: 'District of Columbia',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'FL',
            label: 'Florida',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'GA',
            label: 'Georgia',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'HI',
            label: 'Hawaii',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'ID',
            label: 'Idaho',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'IL',
            label: 'Illinois',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'IN',
            label: 'Indiana',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'IA',
            label: 'Iowa',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'KS',
            label: 'Kansas',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'KY',
            label: 'Kentucky',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'LA',
            label: 'Louisiana',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'ME',
            label: 'Maine',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MD',
            label: 'Maryland',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MA',
            label: 'Massachusetts',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MI',
            label: 'Michigan',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MN',
            label: 'Minnesota',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MS',
            label: 'Mississippi',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MO',
            label: 'Missouri',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'MT',
            label: 'Montana',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NE',
            label: 'Nebraska',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NV',
            label: 'Nevada',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NH',
            label: 'New Hampshire',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NJ',
            label: 'New Jersey',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NM',
            label: 'New Mexico',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NY',
            label: 'New York',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'NC',
            label: 'North Carolina',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'ND',
            label: 'North Dakota',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'OH',
            label: 'Ohio',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'OK',
            label: 'Oklahoma',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'OR',
            label: 'Oregon',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'PA',
            label: 'Pennsylvania',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'RI',
            label: 'Rhode Island',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'SC',
            label: 'South Carolina',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'SD',
            label: 'South Dakota',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'TN',
            label: 'Tennessee',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'TX',
            label: 'Texas',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'UT',
            label: 'Utah',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'VT',
            label: 'Vermont',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'VA',
            label: 'Virginia',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'WA',
            label: 'Washington',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'WV',
            label: 'West Virginia',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'WI',
            label: 'Wisconsin',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        },
        {
            value: 'WY',
            label: 'Wyoming',
            options: {
                specify: {
                    options: {
                        validation: {
                            requiredIf: {}
                        }
                    }
                }
            }
        }
    ];
    return StatesConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/static-panel.ts":
/*!*******************************************************!*\
  !*** ./src/app/element-config/config/static-panel.ts ***!
  \*******************************************************/
/*! exports provided: StaticPanelConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticPanelConfig", function() { return StaticPanelConfig; });
var StaticPanelConfig = /** @class */ (function () {
    function StaticPanelConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Panel configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false,
                                },
                            },
                        },
                    ],
                },
            },
        ];
        this.entity = {
            type: 'panel',
        };
    }
    return StaticPanelConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/static.ts":
/*!*************************************************!*\
  !*** ./src/app/element-config/config/static.ts ***!
  \*************************************************/
/*! exports provided: StaticConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticConfig", function() { return StaticConfig; });
var StaticConfig = /** @class */ (function () {
    function StaticConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Static text configuration',
                options: {
                    level: 1,
                },
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true,
                    },
                    disabled: true,
                },
            },
            {
                name: 'label',
                type: 'textarea',
                label: 'Label',
                options: {
                    hint: 'What the user sees',
                    validation: {
                        required: true,
                    },
                },
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'showIf',
                            type: 'fieldset',
                            label: 'Show If?',
                            options: {
                                fields: [
                                    {
                                        name: 'property',
                                        type: 'text',
                                        label: 'Property name',
                                        options: {
                                            hint: 'Property name of field dependency.',
                                            validation: {
                                                required: false,
                                            },
                                        },
                                    },
                                    {
                                        name: 'value',
                                        type: 'text',
                                        label: 'Property value',
                                        options: {
                                            hint: 'Value of dependent field.',
                                            validation: {
                                                required: false,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        ];
        this.entity = {
            type: 'static',
        };
    }
    return StaticConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/text-mask.ts":
/*!****************************************************!*\
  !*** ./src/app/element-config/config/text-mask.ts ***!
  \****************************************************/
/*! exports provided: TextMaskConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextMaskConfig", function() { return TextMaskConfig; });
var TextMaskConfig = /** @class */ (function () {
    function TextMaskConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Text mask configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'inputMask',
                            type: 'text',
                            label: 'Input mask',
                            options: {
                                hint: 'Enter the input mask.',
                                validation: {
                                    required: true
                                }
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'minLength',
                                        type: 'number',
                                        label: 'Minimum length',
                                        options: {
                                            hint: 'The minimum characters that must be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'maxLength',
                                        type: 'number',
                                        label: 'Maximum length',
                                        options: {
                                            hint: 'The maximum characters that can be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'pattern',
                                        type: 'text',
                                        label: 'Pattern',
                                        options: {
                                            hint: 'The pattern that can be entered.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'patternValMsg',
                                        type: 'text',
                                        label: 'Pattern validation message',
                                        options: {
                                            hint: 'Error message for text not matching pattern.',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'text-mask',
            options: {
                disabled: false
            }
        };
    }
    return TextMaskConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/text.ts":
/*!***********************************************!*\
  !*** ./src/app/element-config/config/text.ts ***!
  \***********************************************/
/*! exports provided: TextConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextConfig", function() { return TextConfig; });
var TextConfig = /** @class */ (function () {
    function TextConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Text configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'autocomplete',
                            type: 'checkbox',
                            label: 'Autocomplete?',
                            options: {
                                align: 'after',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'items',
                            type: 'array',
                            label: 'Autocomplete items',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Enter items',
                                fields: [
                                    {
                                        name: 'label',
                                        type: 'text',
                                        label: 'Label',
                                        options: {
                                            validation: {
                                                required: true
                                            },
                                            hint: 'Enter label'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'minLength',
                                        type: 'number',
                                        label: 'Minimum length',
                                        options: {
                                            hint: 'The minimum characters that must be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'maxLength',
                                        type: 'number',
                                        label: 'Maximum length',
                                        options: {
                                            hint: 'The maximum characters that can be entered',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'text',
            options: {
                disabled: false
            }
        };
    }
    return TextConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/textarea.ts":
/*!***************************************************!*\
  !*** ./src/app/element-config/config/textarea.ts ***!
  \***************************************************/
/*! exports provided: TextareaConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextareaConfig", function() { return TextareaConfig; });
var TextareaConfig = /** @class */ (function () {
    function TextareaConfig() {
        this.layout = [
            {
                type: 'heading',
                label: 'Textarea configuration',
                options: {
                    level: 1
                }
            },
            {
                name: 'type',
                type: 'text',
                label: 'Element type',
                options: {
                    validation: {
                        required: true
                    },
                    disabled: true
                }
            },
            {
                name: 'name',
                type: 'text',
                label: 'Name',
                options: {
                    hint: 'A unique element name',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                options: {
                    hint: 'The text the user sees',
                    validation: {
                        required: true
                    }
                }
            },
            {
                name: 'options',
                type: 'panel',
                label: 'Options',
                options: {
                    fields: [
                        {
                            name: 'hint',
                            type: 'text',
                            label: 'Hint',
                            options: {
                                hint: 'Give user a hint',
                                validation: {
                                    required: false
                                }
                            }
                        },
                        {
                            name: 'defaultValue',
                            type: 'text',
                            label: 'Default value',
                            options: {
                                validation: {
                                    required: false
                                },
                                hint: 'Provide a default value'
                            }
                        },
                        {
                            name: 'validation',
                            type: 'fieldset',
                            label: 'Validation',
                            options: {
                                fields: [
                                    {
                                        name: 'required',
                                        type: 'checkbox',
                                        label: 'Required?',
                                        options: {
                                            align: 'after',
                                            validation: {
                                                required: false
                                            }
                                        }
                                    },
                                    {
                                        name: 'requiredIf',
                                        type: 'fieldset',
                                        label: 'Required If?',
                                        options: {
                                            fields: [
                                                {
                                                    name: 'property',
                                                    type: 'text',
                                                    label: 'Property name',
                                                    options: {
                                                        hint: 'Property name of field dependency.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'value',
                                                    type: 'text',
                                                    label: 'Property value',
                                                    options: {
                                                        hint: 'Value of dependent field.',
                                                        validation: {
                                                            required: false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ];
        this.entity = {
            type: 'textarea'
        };
    }
    return TextareaConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/time.ts":
/*!***********************************************!*\
  !*** ./src/app/element-config/config/time.ts ***!
  \***********************************************/
/*! exports provided: TimeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeConfig", function() { return TimeConfig; });
/* harmony import */ var _text_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-mask */ "./src/app/element-config/config/text-mask.ts");

var TimeConfig = /** @class */ (function () {
    function TimeConfig() {
        this.entity = {
            type: 'time',
        };
        this.layout = new _text_mask__WEBPACK_IMPORTED_MODULE_0__["TextMaskConfig"]().layout;
        this.layout.map(function (f) {
            if (f.type === 'heading') {
                f.label = 'Time configuration';
            }
            if (f.name === 'options') {
                f.options.fields.map(function (o) {
                    if (o.name === 'hint' || o.name === 'inputMask') {
                        o.options.disabled = true;
                    }
                    if (o.name === 'validation') {
                        o.options.fields.map(function (v) {
                            if (v.name === 'pattern' || v.name === 'patternValMsg') {
                                v.options.disabled = true;
                            }
                        });
                    }
                });
            }
        });
    }
    TimeConfig.hint = 'hh:mm AM|PM';
    TimeConfig.inputMask = '00:00 SS';
    TimeConfig.pattern = '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\\s(AM|am|PM|pm)$';
    TimeConfig.patternValMsg = 'Invalid Time format.';
    return TimeConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/type-select.ts":
/*!******************************************************!*\
  !*** ./src/app/element-config/config/type-select.ts ***!
  \******************************************************/
/*! exports provided: TypeSelectConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeSelectConfig", function() { return TypeSelectConfig; });
var TypeSelectConfig = /** @class */ (function () {
    function TypeSelectConfig() {
        this.layout = [
            {
                type: 'select',
                name: 'elementType',
                label: 'Element type',
                options: {
                    hint: 'Select element type',
                    validation: { required: true },
                    items: [
                        {
                            value: 'action-toolbar',
                            label: 'action-toolbar',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'address',
                            label: 'address',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'array',
                            label: 'array',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'button',
                            label: 'button',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'checkbox-group',
                            label: 'checkbox-group',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'checkbox',
                            label: 'checkbox',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'date',
                            label: 'date',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'email',
                            label: 'email',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'fieldset',
                            label: 'fieldset',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'heading',
                            label: 'heading',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'number',
                            label: 'number',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'panel',
                            label: 'panel',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'password',
                            label: 'password',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'phone',
                            label: 'phone',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'radio',
                            label: 'radio',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'select',
                            label: 'select',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'slide-toggle',
                            label: 'slide-toggle',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'slider',
                            label: 'slider',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'ssn',
                            label: 'ssn',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'states',
                            label: 'states',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'static',
                            label: 'static',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'text-mask',
                            label: 'text-mask',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'text',
                            label: 'text',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'textarea',
                            label: 'textarea',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'time',
                            label: 'time',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                        {
                            value: 'zip',
                            label: 'zip',
                            options: {
                                specify: {
                                    options: {
                                        validation: {},
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ];
    }
    return TypeSelectConfig;
}());



/***/ }),

/***/ "./src/app/element-config/config/zip.ts":
/*!**********************************************!*\
  !*** ./src/app/element-config/config/zip.ts ***!
  \**********************************************/
/*! exports provided: ZipConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipConfig", function() { return ZipConfig; });
/* harmony import */ var _text_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-mask */ "./src/app/element-config/config/text-mask.ts");

var ZipConfig = /** @class */ (function () {
    function ZipConfig() {
        this.entity = {
            type: 'zip',
        };
        this.layout = new _text_mask__WEBPACK_IMPORTED_MODULE_0__["TextMaskConfig"]().layout;
        this.layout.map(function (f) {
            if (f.type === 'heading') {
                f.label = 'Zip configuration';
            }
            if (f.name === 'options') {
                f.options.fields.map(function (o) {
                    if (o.name === 'hint' || o.name === 'inputMask') {
                        o.options.disabled = true;
                    }
                    if (o.name === 'validation') {
                        o.options.fields.map(function (v) {
                            if (v.name === 'pattern' || v.name === 'patternValMsg') {
                                v.options.disabled = true;
                            }
                        });
                    }
                });
            }
        });
    }
    ZipConfig.hint = 'xxxxx-xxxx';
    ZipConfig.inputMask = '00000-0000';
    ZipConfig.pattern = '^\\d{5}(\\d{4})?$';
    ZipConfig.patternValMsg = 'Zip must be 5 or 9 digits';
    return ZipConfig;
}());



/***/ }),

/***/ "./src/app/element-config/element-config.ts":
/*!**************************************************!*\
  !*** ./src/app/element-config/element-config.ts ***!
  \**************************************************/
/*! exports provided: ElementConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementConfig", function() { return ElementConfig; });
/* harmony import */ var _element_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-type */ "./src/app/element-config/element-type.ts");
/* harmony import */ var _config_action_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/action-toolbar */ "./src/app/element-config/config/action-toolbar.ts");
/* harmony import */ var _config_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/address */ "./src/app/element-config/config/address.ts");
/* harmony import */ var _config_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/array */ "./src/app/element-config/config/array.ts");
/* harmony import */ var _config_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/button */ "./src/app/element-config/config/button.ts");
/* harmony import */ var _config_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/checkbox */ "./src/app/element-config/config/checkbox.ts");
/* harmony import */ var _config_checkbox_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/checkbox-group */ "./src/app/element-config/config/checkbox-group.ts");
/* harmony import */ var _config_date__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/date */ "./src/app/element-config/config/date.ts");
/* harmony import */ var _config_email__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config/email */ "./src/app/element-config/config/email.ts");
/* harmony import */ var _config_fieldset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config/fieldset */ "./src/app/element-config/config/fieldset.ts");
/* harmony import */ var _config_heading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./config/heading */ "./src/app/element-config/config/heading.ts");
/* harmony import */ var _config_layout_editor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./config/layout-editor */ "./src/app/element-config/config/layout-editor.ts");
/* harmony import */ var _config_number__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config/number */ "./src/app/element-config/config/number.ts");
/* harmony import */ var _config_panel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./config/panel */ "./src/app/element-config/config/panel.ts");
/* harmony import */ var _config_password__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./config/password */ "./src/app/element-config/config/password.ts");
/* harmony import */ var _config_phone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./config/phone */ "./src/app/element-config/config/phone.ts");
/* harmony import */ var _config_radio__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./config/radio */ "./src/app/element-config/config/radio.ts");
/* harmony import */ var _config_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./config/select */ "./src/app/element-config/config/select.ts");
/* harmony import */ var _config_slide_toggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./config/slide-toggle */ "./src/app/element-config/config/slide-toggle.ts");
/* harmony import */ var _config_slider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./config/slider */ "./src/app/element-config/config/slider.ts");
/* harmony import */ var _config_ssn__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./config/ssn */ "./src/app/element-config/config/ssn.ts");
/* harmony import */ var _config_states__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./config/states */ "./src/app/element-config/config/states.ts");
/* harmony import */ var _config_static__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./config/static */ "./src/app/element-config/config/static.ts");
/* harmony import */ var _config_static_panel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./config/static-panel */ "./src/app/element-config/config/static-panel.ts");
/* harmony import */ var _config_text__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./config/text */ "./src/app/element-config/config/text.ts");
/* harmony import */ var _config_text_mask__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./config/text-mask */ "./src/app/element-config/config/text-mask.ts");
/* harmony import */ var _config_textarea__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./config/textarea */ "./src/app/element-config/config/textarea.ts");
/* harmony import */ var _config_time__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./config/time */ "./src/app/element-config/config/time.ts");
/* harmony import */ var _config_type_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./config/type-select */ "./src/app/element-config/config/type-select.ts");
/* harmony import */ var _config_zip__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./config/zip */ "./src/app/element-config/config/zip.ts");






























var ElementConfig = /** @class */ (function () {
    function ElementConfig() {
    }
    ElementConfig.includeLayoutEditor = function (element, includeEditor) {
        if (includeEditor) {
            var layoutEditor = ElementConfig.get(_element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].LayoutEditor).layout;
            element.layout
                .find(function (e) { return e.name === 'options'; })
                .options.fields.push(layoutEditor);
        }
        return element;
    };
    ElementConfig.get = function (elementType, includeEditor) {
        if (includeEditor === void 0) { includeEditor = false; }
        switch (elementType) {
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].ActionToolbar:
                return new _config_action_toolbar__WEBPACK_IMPORTED_MODULE_1__["ActionToolbarConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Address:
                return new _config_address__WEBPACK_IMPORTED_MODULE_2__["AddressConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Array:
                var array = new _config_array__WEBPACK_IMPORTED_MODULE_3__["ArrayConfig"]();
                return ElementConfig.includeLayoutEditor(array, includeEditor);
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Button:
                return new _config_button__WEBPACK_IMPORTED_MODULE_4__["ButtonConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Checkbox:
                return new _config_checkbox__WEBPACK_IMPORTED_MODULE_5__["CheckboxConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].CheckboxGroup:
                return new _config_checkbox_group__WEBPACK_IMPORTED_MODULE_6__["CheckboxGroupConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Date:
                return new _config_date__WEBPACK_IMPORTED_MODULE_7__["DateConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Email:
                return new _config_email__WEBPACK_IMPORTED_MODULE_8__["EmailConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Fieldset:
                var fieldset = new _config_fieldset__WEBPACK_IMPORTED_MODULE_9__["FieldsetConfig"]();
                return ElementConfig.includeLayoutEditor(fieldset, includeEditor);
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Heading:
                return new _config_heading__WEBPACK_IMPORTED_MODULE_10__["HeadingConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].LayoutEditor:
                return new _config_layout_editor__WEBPACK_IMPORTED_MODULE_11__["LayoutEditorConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Number:
                return new _config_number__WEBPACK_IMPORTED_MODULE_12__["NumberConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Panel:
                var panel = new _config_panel__WEBPACK_IMPORTED_MODULE_13__["PanelConfig"]();
                return ElementConfig.includeLayoutEditor(panel, includeEditor);
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Password:
                return new _config_password__WEBPACK_IMPORTED_MODULE_14__["PasswordConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Phone:
                return new _config_phone__WEBPACK_IMPORTED_MODULE_15__["PhoneConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Radio:
                return new _config_radio__WEBPACK_IMPORTED_MODULE_16__["RadioConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Select:
                return new _config_select__WEBPACK_IMPORTED_MODULE_17__["SelectConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Slider:
                return new _config_slider__WEBPACK_IMPORTED_MODULE_19__["SliderConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].SlideToggle:
                return new _config_slide_toggle__WEBPACK_IMPORTED_MODULE_18__["SlideToggleConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Ssn:
                return new _config_ssn__WEBPACK_IMPORTED_MODULE_20__["SsnConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].States:
                return new _config_states__WEBPACK_IMPORTED_MODULE_21__["StatesConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Static:
                return new _config_static__WEBPACK_IMPORTED_MODULE_22__["StaticConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].StaticPanel:
                var staticPanel = new _config_static_panel__WEBPACK_IMPORTED_MODULE_23__["StaticPanelConfig"]();
                return ElementConfig.includeLayoutEditor(staticPanel, includeEditor);
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Text:
                return new _config_text__WEBPACK_IMPORTED_MODULE_24__["TextConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Textarea:
                return new _config_textarea__WEBPACK_IMPORTED_MODULE_26__["TextareaConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].TextMask:
                return new _config_text_mask__WEBPACK_IMPORTED_MODULE_25__["TextMaskConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Time:
                return new _config_time__WEBPACK_IMPORTED_MODULE_27__["TimeConfig"]();
            case _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].Zip:
                return new _config_zip__WEBPACK_IMPORTED_MODULE_29__["ZipConfig"]();
            default:
                throw new Error("Trying to use an unsupported element type (" + elementType + ").");
        }
    };
    ElementConfig.getTypeSelection = function () {
        return new _config_type_select__WEBPACK_IMPORTED_MODULE_28__["TypeSelectConfig"]();
    };
    ElementConfig.hasNestedProperties = function (entity) {
        return (entity.options &&
            entity.options.fields &&
            Array.isArray(entity.options.fields) &&
            entity.type !== _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].CheckboxGroup);
    };
    ElementConfig.parseEntity = function (entity, push) {
        if (push === void 0) { push = true; }
        var configs = [];
        for (var _i = 0, entity_1 = entity; _i < entity_1.length; _i++) {
            var e = entity_1[_i];
            var elementConfig = this.get(e.type);
            if (this.hasNestedProperties(e)) {
                elementConfig.layout
                    .find(function (p) { return p.name === 'options'; })
                    .options.fields.push(this.parseEntity(e.options.fields, false));
            }
            configs.push(elementConfig.layout);
        }
        var config = this.get(_element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"].LayoutEditor).layout;
        config.options.fields = configs;
        if (!push) {
            return config;
        }
        var layout = [];
        layout.push(config);
        return layout;
    };
    return ElementConfig;
}());



/***/ }),

/***/ "./src/app/element-config/element-type.ts":
/*!************************************************!*\
  !*** ./src/app/element-config/element-type.ts ***!
  \************************************************/
/*! exports provided: ElementType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementType", function() { return ElementType; });
var ElementType;
(function (ElementType) {
    ElementType["ActionToolbar"] = "action-toolbar";
    ElementType["Address"] = "address";
    ElementType["Array"] = "array";
    ElementType["Button"] = "button";
    ElementType["Checkbox"] = "checkbox";
    ElementType["CheckboxGroup"] = "checkbox-group";
    ElementType["Date"] = "date";
    ElementType["Email"] = "email";
    ElementType["Fieldset"] = "fieldset";
    ElementType["Heading"] = "heading";
    ElementType["LayoutEditor"] = "layout-editor";
    ElementType["Number"] = "number";
    ElementType["Panel"] = "panel";
    ElementType["Password"] = "password";
    ElementType["Phone"] = "phone";
    ElementType["Radio"] = "radio";
    ElementType["Select"] = "select";
    ElementType["Slider"] = "slider";
    ElementType["SlideToggle"] = "slide-toggle";
    ElementType["Ssn"] = "ssn";
    ElementType["States"] = "states";
    ElementType["Static"] = "static";
    ElementType["StaticPanel"] = "static-panel";
    ElementType["Text"] = "text";
    ElementType["Textarea"] = "textarea";
    ElementType["TextMask"] = "text-mask";
    ElementType["Time"] = "time";
    ElementType["Zip"] = "zip";
})(ElementType || (ElementType = {}));


/***/ }),

/***/ "./src/app/element-config/index.ts":
/*!*****************************************!*\
  !*** ./src/app/element-config/index.ts ***!
  \*****************************************/
/*! exports provided: ElementType, ActionToolbarConfig, AddressConfig, ArrayConfig, ButtonConfig, CheckboxConfig, CheckboxGroupConfig, DateConfig, EmailConfig, FieldsetConfig, HeadingConfig, LayoutEditorConfig, NumberConfig, PanelConfig, PasswordConfig, PhoneConfig, RadioConfig, SelectConfig, SliderConfig, SlideToggleConfig, StatesConfig, StaticConfig, StaticPanelConfig, SsnConfig, TextConfig, TextareaConfig, TextMaskConfig, TimeConfig, TypeSelectConfig, ZipConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _element_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-type */ "./src/app/element-config/element-type.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElementType", function() { return _element_type__WEBPACK_IMPORTED_MODULE_0__["ElementType"]; });

/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/app/element-config/config/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActionToolbarConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["ActionToolbarConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddressConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["AddressConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["ArrayConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["ButtonConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["CheckboxConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["CheckboxGroupConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["DateConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["EmailConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldsetConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["FieldsetConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeadingConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["HeadingConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutEditorConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["LayoutEditorConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["NumberConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["PanelConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PasswordConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["PasswordConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["PhoneConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["RadioConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["SelectConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["SliderConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlideToggleConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["SlideToggleConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatesConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["StatesConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["StaticConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticPanelConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["StaticPanelConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SsnConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["SsnConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["TextConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextareaConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["TextareaConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextMaskConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["TextMaskConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["TimeConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeSelectConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["TypeSelectConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZipConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["ZipConfig"]; });

































/***/ }),

/***/ "./src/app/material/material.module.ts":
/*!*********************************************!*\
  !*** ./src/app/material/material.module.ts ***!
  \*********************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var MaterialModule = /** @class */ (function () {
    function MaterialModule(parentModule) {
        if (parentModule) {
            throw new Error('MaterialModule is already loaded. Import it in the SharedModule only');
        }
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_2__["CdkTableModule"],
            ],
            exports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_2__["CdkTableModule"],
            ],
            declarations: [],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()),
        __metadata("design:paramtypes", [MaterialModule])
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/shared/directives/index.ts":
/*!********************************************!*\
  !*** ./src/app/shared/directives/index.ts ***!
  \********************************************/
/*! exports provided: MaximumDateValidatorDirective, MaximumNumberValidatorDirective, MinimumDateValidatorDirective, MinimumNumberValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _maximum_date_maximum_date_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maximum-date/maximum-date.directive */ "./src/app/shared/directives/maximum-date/maximum-date.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaximumDateValidatorDirective", function() { return _maximum_date_maximum_date_directive__WEBPACK_IMPORTED_MODULE_0__["MaximumDateValidatorDirective"]; });

/* harmony import */ var _maximum_number_maximum_number_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maximum-number/maximum-number.directive */ "./src/app/shared/directives/maximum-number/maximum-number.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaximumNumberValidatorDirective", function() { return _maximum_number_maximum_number_directive__WEBPACK_IMPORTED_MODULE_1__["MaximumNumberValidatorDirective"]; });

/* harmony import */ var _minimum_date_minimum_date_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minimum-date/minimum-date.directive */ "./src/app/shared/directives/minimum-date/minimum-date.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MinimumDateValidatorDirective", function() { return _minimum_date_minimum_date_directive__WEBPACK_IMPORTED_MODULE_2__["MinimumDateValidatorDirective"]; });

/* harmony import */ var _minimum_number_minimum_number_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./minimum-number/minimum-number.directive */ "./src/app/shared/directives/minimum-number/minimum-number.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MinimumNumberValidatorDirective", function() { return _minimum_number_minimum_number_directive__WEBPACK_IMPORTED_MODULE_3__["MinimumNumberValidatorDirective"]; });







/***/ }),

/***/ "./src/app/shared/directives/maximum-date/maximum-date.directive.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/directives/maximum-date/maximum-date.directive.ts ***!
  \**************************************************************************/
/*! exports provided: MaximumDateValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaximumDateValidatorDirective", function() { return MaximumDateValidatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MaximumDateValidatorDirective = /** @class */ (function () {
    function MaximumDateValidatorDirective() {
    }
    MaximumDateValidatorDirective_1 = MaximumDateValidatorDirective;
    MaximumDateValidatorDirective.prototype.validate = function (control) {
        if (!control.value || !this.maxDate) {
            return null; // don't validate empty values to allow optional controls
        }
        var value = new Date(control.value);
        var max = new Date(this.maxDate);
        // Controls with NaN values after parsing should be treated as not having a
        // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
        // !isDate(value) && !isDate(max) &&
        return value > max ? { max: { max: max, actual: control.value } } : null;
    };
    var MaximumDateValidatorDirective_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MaximumDateValidatorDirective.prototype, "maxDate", void 0);
    MaximumDateValidatorDirective = MaximumDateValidatorDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[dynamicMaxDate],[maxDate][formControlName],[maxDate][formControl],[maxDate][ngModel]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MaximumDateValidatorDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MaximumDateValidatorDirective);
    return MaximumDateValidatorDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/maximum-number/maximum-number.directive.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/directives/maximum-number/maximum-number.directive.ts ***!
  \******************************************************************************/
/*! exports provided: MaximumNumberValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaximumNumberValidatorDirective", function() { return MaximumNumberValidatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MaximumNumberValidatorDirective = /** @class */ (function () {
    function MaximumNumberValidatorDirective() {
    }
    MaximumNumberValidatorDirective_1 = MaximumNumberValidatorDirective;
    MaximumNumberValidatorDirective.prototype.validate = function (control) {
        if (!control.value || !this.maxNumber) {
            return null; // don't validate empty values to allow optional controls
        }
        var value = parseFloat(control.value);
        var max = parseFloat(this.maxNumber);
        // Controls with NaN values after parsing should be treated as not having a
        // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
        return !isNaN(value) && !isNaN(max) && value > max
            ? { max: { max: max, actual: control.value } }
            : null;
    };
    var MaximumNumberValidatorDirective_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MaximumNumberValidatorDirective.prototype, "maxNumber", void 0);
    MaximumNumberValidatorDirective = MaximumNumberValidatorDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[dynamicMin],[maxNumber][formControlName],[maxNumber][formControl],[maxNumber][ngModel]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MaximumNumberValidatorDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MaximumNumberValidatorDirective);
    return MaximumNumberValidatorDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/minimum-date/minimum-date.directive.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/directives/minimum-date/minimum-date.directive.ts ***!
  \**************************************************************************/
/*! exports provided: MinimumDateValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinimumDateValidatorDirective", function() { return MinimumDateValidatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MinimumDateValidatorDirective = /** @class */ (function () {
    function MinimumDateValidatorDirective() {
    }
    MinimumDateValidatorDirective_1 = MinimumDateValidatorDirective;
    MinimumDateValidatorDirective.prototype.validate = function (control) {
        if (!control.value || !this.minDate) {
            return null; // don't validate empty values to allow optional controls
        }
        var value = new Date(control.value);
        var min = new Date(this.minDate);
        // Controls with NaN values after parsing should be treated as not having a
        // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
        // !isDate(value) && !isDate(min) &&
        return value < min ? { min: { min: min, actual: control.value } } : null;
    };
    var MinimumDateValidatorDirective_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MinimumDateValidatorDirective.prototype, "minDate", void 0);
    MinimumDateValidatorDirective = MinimumDateValidatorDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[dynamicMinDate],[minDate][formControlName],[minDate][formControl],[minDate][ngModel]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MinimumDateValidatorDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MinimumDateValidatorDirective);
    return MinimumDateValidatorDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/minimum-number/minimum-number.directive.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/directives/minimum-number/minimum-number.directive.ts ***!
  \******************************************************************************/
/*! exports provided: MinimumNumberValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinimumNumberValidatorDirective", function() { return MinimumNumberValidatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MinimumNumberValidatorDirective = /** @class */ (function () {
    function MinimumNumberValidatorDirective() {
    }
    MinimumNumberValidatorDirective_1 = MinimumNumberValidatorDirective;
    MinimumNumberValidatorDirective.prototype.validate = function (control) {
        if (!control.value || !this.minNumber) {
            return null; // don't validate empty values to allow optional controls
        }
        var value = parseFloat(control.value);
        var min = parseFloat(this.minNumber);
        // Controls with NaN values after parsing should be treated as not having a
        // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
        return !isNaN(value) && !isNaN(min) && value < min
            ? { min: { min: min, actual: control.value } }
            : null;
    };
    var MinimumNumberValidatorDirective_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MinimumNumberValidatorDirective.prototype, "minNumber", void 0);
    MinimumNumberValidatorDirective = MinimumNumberValidatorDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[dynamicMin],[minNumber][formControlName],[minNumber][formControl],[minNumber][ngModel]',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MinimumNumberValidatorDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MinimumNumberValidatorDirective);
    return MinimumNumberValidatorDirective;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/build/ngx-mask.module.js");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives */ "./src/app/shared/directives/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// hold the common components, directives, and pipes
// and share them with the modules that need them.


// modules that consolidate commonly used stuff



var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"], ngx_mask__WEBPACK_IMPORTED_MODULE_2__["NgxMaskModule"].forRoot()],
            declarations: [
                _directives__WEBPACK_IMPORTED_MODULE_4__["MinimumNumberValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MinimumDateValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MaximumNumberValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MaximumDateValidatorDirective"]
            ],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_2__["NgxMaskModule"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MinimumNumberValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MinimumDateValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MaximumNumberValidatorDirective"],
                _directives__WEBPACK_IMPORTED_MODULE_4__["MaximumDateValidatorDirective"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _demo_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../demo/app.module */ "./demo/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_demo_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Project\Mathmatica\dynamic-data\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map