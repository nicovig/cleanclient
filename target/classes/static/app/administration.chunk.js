(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["administration"],{

/***/ "./src/main/webapp/app/modules/administration/audits/audits.tsx":
/*!**********************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/audits/audits.tsx ***!
  \**********************************************************************/
/*! exports provided: AuditsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuditsPage", function() { return AuditsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/shared/util/pagination.constants */ "./src/main/webapp/app/shared/util/pagination.constants.ts");
/* harmony import */ var _administration_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");








const previousMonth = () => {
    const now = new Date();
    const fromDate = now.getMonth() === 0
        ? new Date(now.getFullYear() - 1, 11, now.getDate())
        : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return fromDate.toISOString().slice(0, 10);
};
const today = () => {
    // Today + 1 day - needed if the current day must be included
    const day = new Date();
    day.setDate(day.getDate() + 1);
    const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return toDate.toISOString().slice(0, 10);
};
class AuditsPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = Object.assign({}, Object(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["getSortState"])(this.props.location, app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_6__["ITEMS_PER_PAGE"]), { fromDate: previousMonth(), toDate: today() });
        this.onChangeFromDate = evt => {
            this.setState({
                fromDate: evt.target.value
            }, () => this.getAudits());
        };
        this.onChangeToDate = evt => {
            this.setState({
                toDate: evt.target.value
            }, () => this.getAudits());
        };
        this.sort = prop => () => {
            this.setState({
                order: this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            }, () => this.transition());
        };
        this.transition = () => {
            this.getAudits();
            this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
        };
        this.handlePagination = activePage => this.setState({ activePage }, () => this.transition());
        this.getAudits = () => {
            const { activePage, itemsPerPage, sort, order, fromDate, toDate } = this.state;
            this.props.getAudits(activePage - 1, itemsPerPage, `${sort},${order}`, fromDate, toDate);
        };
    }
    componentDidMount() {
        this.getAudits();
    }
    render() {
        const { audits, totalItems } = this.props;
        const { fromDate, toDate } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "audits-page-heading" }, "Audits"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.filter.from" }, "from")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Input"], { type: "date", value: fromDate, onChange: this.onChangeFromDate, name: "fromDate", id: "fromDate" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.filter.to" }, "to")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Input"], { type: "date", value: toDate, onChange: this.onChangeToDate, name: "toDate", id: "toDate" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], { striped: true, responsive: true },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { onClick: this.sort('auditEventDate') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.table.header.date" }, "Date"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { onClick: this.sort('principal') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.table.header.principal" }, "User"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { onClick: this.sort('auditEventType') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.table.header.status" }, "State"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "audits.table.header.data" }, "Extra data")))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, audits.map((audit, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `audit-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["TextFormat"], { value: audit.timestamp, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_TIMESTAMP_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, audit.principal),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, audit.type),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        audit.data ? audit.data.message : null,
                        audit.data ? audit.data.remoteAddress : null)))))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["JhiPagination"], { items: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["getPaginationItemsNumber"])(totalItems, this.state.itemsPerPage), activePage: this.state.activePage, onSelect: this.handlePagination, maxButtons: 5 }))));
    }
}
const mapStateToProps = (storeState) => ({
    audits: storeState.administration.audits,
    totalItems: storeState.administration.totalItems
});
const mapDispatchToProps = { getAudits: _administration_reducer__WEBPACK_IMPORTED_MODULE_7__["getAudits"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AuditsPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\audits\\audits.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\audits\\audits.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/configuration/configuration.tsx":
/*!************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/configuration/configuration.tsx ***!
  \************************************************************************************/
/*! exports provided: ConfigurationPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationPage", function() { return ConfigurationPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _administration_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");





class ConfigurationPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            filter: '',
            reversePrefix: false,
            reverseProperties: false
        };
        this.setFilter = evt => {
            this.setState({
                filter: evt.target.value
            });
        };
        this.envFilterFn = configProp => configProp.toUpperCase().includes(this.state.filter.toUpperCase());
        this.propsFilterFn = configProp => configProp.prefix.toUpperCase().includes(this.state.filter.toUpperCase());
        this.reversePrefix = () => {
            this.setState({
                reversePrefix: !this.state.reversePrefix
            });
        };
        this.reverseProperties = () => {
            this.setState({
                reverseProperties: !this.state.reverseProperties
            });
        };
        this.getContextList = contexts => Object.values(contexts)
            .map((v) => v.beans)
            .reduce((acc, e) => (Object.assign({}, acc, e)));
    }
    componentDidMount() {
        this.props.getConfigurations();
        this.props.getEnv();
    }
    render() {
        const { configuration } = this.props;
        const { filter } = this.state;
        const configProps = configuration && configuration.configProps ? configuration.configProps : {};
        const env = configuration && configuration.env ? configuration.env : {};
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "configuration-page-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "configuration.title" }, "Configuration")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "configuration.filter" }, "Filter")),
            ' ',
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Input"], { type: "search", value: filter, onChange: this.setFilter, name: "search", id: "search" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Spring configuration"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], { className: "table table-striped table-bordered table-responsive d-table" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { onClick: this.reversePrefix },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "configuration.table.prefix" }, "Prefix")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { onClick: this.reverseProperties },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "configuration.table.properties" }, "Properties")))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, configProps.contexts
                    ? Object.values(this.getContextList(configProps.contexts))
                        .filter(this.propsFilterFn)
                        .map((property, propIndex) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: propIndex },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, property['prefix']),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Object.keys(property['properties']).map((propKey, index) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], { key: index },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "4" }, propKey),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "8" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Badge"], { className: "float-right badge-secondary break" }, JSON.stringify(property['properties'][propKey]))))))))))
                    : null)),
            env.propertySources
                ? env.propertySources.map((envKey, envIndex) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { key: envIndex },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, envKey.name)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Table"], { className: "table table-sm table-striped table-bordered table-responsive d-table" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: envIndex },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "w-40" }, "Property"),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "w-60" }, "Value"))),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, Object.keys(envKey.properties)
                            .filter(this.envFilterFn)
                            .map((propKey, propIndex) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: propIndex },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "break" }, propKey),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "break" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "float-right badge badge-secondary break" }, envKey.properties[propKey].value))))))))))
                : null));
    }
}
const mapStateToProps = ({ administration }) => ({
    configuration: administration.configuration,
    isFetching: administration.loading
});
const mapDispatchToProps = { getConfigurations: _administration_reducer__WEBPACK_IMPORTED_MODULE_4__["getConfigurations"], getEnv: _administration_reducer__WEBPACK_IMPORTED_MODULE_4__["getEnv"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ConfigurationPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\configuration\\configuration.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\configuration\\configuration.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/docs/docs.tsx":
/*!******************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/docs/docs.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const DocsPage = () => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", { src: "../swagger-ui/index.html", width: "100%", height: "800", title: "Swagger UI", seamless: true, style: { border: 'none' } })));
/* harmony default export */ __webpack_exports__["default"] = (DocsPage);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\docs\\docs.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\docs\\docs.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/health/health-modal.tsx":
/*!****************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/health/health-modal.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");


const formatDiskSpaceOutput = rawValue => {
    // Should display storage space in an human readable unit
    const val = rawValue / 1073741824;
    if (val > 1) {
        // Value
        return val.toFixed(2) + ' GB';
    }
    else {
        return (rawValue / 1048576).toFixed(2) + ' MB';
    }
};
const HealthModal = ({ handleClose, healthObject, showModal }) => {
    const data = healthObject.details || {};
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], { isOpen: showModal, modalTransition: { timeout: 20 }, backdropTransition: { timeout: 10 }, toggle: handleClose },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalHeader"], { toggle: handleClose }, healthObject.name),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalBody"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Table"], { bordered: true },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Value"))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, Object.keys(data).map((key, index) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: index },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, key),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, healthObject.name === 'diskSpace' ? formatDiskSpaceOutput(data[key]) : JSON.stringify(data[key])))))))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalFooter"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], { color: "primary", onClick: handleClose }, "Close"))));
};
/* harmony default export */ __webpack_exports__["default"] = (HealthModal);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\health\\health-modal.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\health\\health-modal.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/health/health.tsx":
/*!**********************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/health/health.tsx ***!
  \**********************************************************************/
/*! exports provided: HealthPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthPage", function() { return HealthPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _administration_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");
/* harmony import */ var _health_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./health-modal */ "./src/main/webapp/app/modules/administration/health/health-modal.tsx");







class HealthPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            healthObject: {},
            showModal: false
        };
        this.getSystemHealth = () => {
            if (!this.props.isFetching) {
                this.props.systemHealth();
            }
        };
        this.getSystemHealthInfo = (name, healthObject) => () => {
            this.setState({
                showModal: true,
                healthObject: Object.assign({}, healthObject, { name })
            });
        };
        this.handleClose = () => {
            this.setState({
                showModal: false
            });
        };
        this.renderModal = () => {
            const { healthObject } = this.state;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_health_modal__WEBPACK_IMPORTED_MODULE_6__["default"], { healthObject: healthObject, handleClose: this.handleClose, showModal: this.state.showModal });
        };
    }
    componentDidMount() {
        this.props.systemHealth();
    }
    render() {
        const { health, isFetching } = this.props;
        const data = (health || {}).details || {};
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "health-page-heading" }, "Health Checks"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: this.getSystemHealth, color: isFetching ? 'btn btn-danger' : 'btn btn-primary', disabled: isFetching },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "sync" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { component: "span", contentKey: "health.refresh.button" }, "Refresh"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { bordered: true },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Service Name"),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Details"))),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, Object.keys(data).map((configPropKey, configPropIndex) => configPropKey !== 'status' ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: configPropIndex },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, configPropKey),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Badge"], { color: data[configPropKey].status !== 'UP' ? 'danger' : 'success' }, data[configPropKey].status)),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, data[configPropKey].details ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { onClick: this.getSystemHealthInfo(configPropKey, data[configPropKey]) },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "eye" }))) : null))) : null))))),
            this.renderModal()));
    }
}
const mapStateToProps = (storeState) => ({
    health: storeState.administration.health,
    isFetching: storeState.administration.loading
});
const mapDispatchToProps = { systemHealth: _administration_reducer__WEBPACK_IMPORTED_MODULE_5__["systemHealth"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(HealthPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\health\\health.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\health\\health.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/index.tsx":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/index.tsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _user_management__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-management */ "./src/main/webapp/app/modules/administration/user-management/index.tsx");
/* harmony import */ var _logs_logs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logs/logs */ "./src/main/webapp/app/modules/administration/logs/logs.tsx");
/* harmony import */ var _health_health__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./health/health */ "./src/main/webapp/app/modules/administration/health/health.tsx");
/* harmony import */ var _metrics_metrics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./metrics/metrics */ "./src/main/webapp/app/modules/administration/metrics/metrics.tsx");
/* harmony import */ var _configuration_configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configuration/configuration */ "./src/main/webapp/app/modules/administration/configuration/configuration.tsx");
/* harmony import */ var _audits_audits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./audits/audits */ "./src/main/webapp/app/modules/administration/audits/audits.tsx");
/* harmony import */ var _docs_docs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./docs/docs */ "./src/main/webapp/app/modules/administration/docs/docs.tsx");









const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { path: `${match.url}/user-management`, component: _user_management__WEBPACK_IMPORTED_MODULE_2__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/health`, component: _health_health__WEBPACK_IMPORTED_MODULE_4__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/metrics`, component: _metrics_metrics__WEBPACK_IMPORTED_MODULE_5__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/docs`, component: _docs_docs__WEBPACK_IMPORTED_MODULE_8__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/configuration`, component: _configuration_configuration__WEBPACK_IMPORTED_MODULE_6__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/audits`, component: _audits_audits__WEBPACK_IMPORTED_MODULE_7__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_1__["default"], { exact: true, path: `${match.url}/logs`, component: _logs_logs__WEBPACK_IMPORTED_MODULE_3__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/logs/logs.tsx":
/*!******************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/logs/logs.tsx ***!
  \******************************************************************/
/*! exports provided: LogsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsPage", function() { return LogsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _administration_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");




class LogsPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            filter: ''
        };
        this.getLogs = () => {
            if (!this.props.isFetching) {
                this.props.getLoggers();
            }
        };
        this.changeLevel = (loggerName, level) => () => {
            this.props.changeLogLevel(loggerName, level);
        };
        this.setFilter = evt => {
            this.setState({
                filter: evt.target.value
            });
        };
        this.getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light');
        this.filterFn = l => l.name.toUpperCase().includes(this.state.filter.toUpperCase());
    }
    componentDidMount() {
        this.props.getLoggers();
    }
    render() {
        const { logs, isFetching } = this.props;
        const { filter } = this.state;
        const loggers = logs ? Object.entries(logs.loggers).map(e => ({ name: e[0], level: e[1].effectiveLevel })) : [];
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "logs-page-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "logs.title" }, "Logs")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "logs.nbloggers", interpolate: { total: loggers.length } },
                    "There are ",
                    loggers.length.toString(),
                    " loggers.")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "logs.filter" }, "Filter")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { type: "text", value: filter, onChange: this.setFilter, className: "form-control", disabled: isFetching }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", { className: "table table-sm table-striped table-bordered" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { title: "click to order" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "logs.table.name" }, "Name"))),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Translate"], { contentKey: "logs.table.level" }, "Level"))))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, loggers.filter(this.filterFn).map((logger, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `log-row-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, logger.name)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'TRACE'), className: this.getClassName(logger.level, 'TRACE', 'primary') }, "TRACE"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'DEBUG'), className: this.getClassName(logger.level, 'DEBUG', 'success') }, "DEBUG"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'INFO'), className: this.getClassName(logger.level, 'INFO', 'info') }, "INFO"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'WARN'), className: this.getClassName(logger.level, 'WARN', 'warning') }, "WARN"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'ERROR'), className: this.getClassName(logger.level, 'ERROR', 'danger') }, "ERROR"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isFetching, onClick: this.changeLevel(logger.name, 'OFF'), className: this.getClassName(logger.level, 'OFF', 'secondary') }, "OFF")))))))));
    }
}
const mapStateToProps = ({ administration }) => ({
    logs: administration.logs,
    isFetching: administration.loading
});
const mapDispatchToProps = { getLoggers: _administration_reducer__WEBPACK_IMPORTED_MODULE_3__["getLoggers"], changeLogLevel: _administration_reducer__WEBPACK_IMPORTED_MODULE_3__["changeLogLevel"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(LogsPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\logs\\logs.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\logs\\logs.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/metrics/metrics.tsx":
/*!************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/metrics/metrics.tsx ***!
  \************************************************************************/
/*! exports provided: MetricsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricsPage", function() { return MetricsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var _administration_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");







class MetricsPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false
        };
        this.getMetrics = () => {
            if (!this.props.isFetching) {
                this.props.systemMetrics();
                this.props.systemThreadDump();
            }
        };
    }
    componentDidMount() {
        this.props.systemMetrics();
        this.props.systemThreadDump();
    }
    render() {
        const { metrics, threadDump, isFetching } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "metrics-page-heading" }, "Application Metrics"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { onClick: this.getMetrics, color: isFetching ? 'btn btn-danger' : 'btn btn-primary', disabled: isFetching },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "sync" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { component: "span", contentKey: "health.refresh.button" }, "Refresh"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { sm: "12" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "JVM Metrics"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "4" }, metrics && metrics.jvm ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["JvmMemory"], { jvmMetrics: metrics.jvm, wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"] }) : ''),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "4" }, threadDump ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["JvmThreads"], { jvmThreads: threadDump, wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"] }) : ''),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "4" }, metrics && metrics.processMetrics ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["SystemMetrics"], { systemMetrics: metrics.processMetrics, wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"], timestampFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_TIMESTAMP_FORMAT"] })) : (''))))),
            metrics && metrics.garbageCollector ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["GarbageCollectorMetrics"], { garbageCollectorMetrics: metrics.garbageCollector, wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"] })) : (''),
            metrics && metrics['http.server.requests'] ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["HttpRequestMetrics"], { requestMetrics: metrics['http.server.requests'], twoDigitAfterPointFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT"], wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"] })) : (''),
            metrics && metrics.endpointsRequests ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["EndpointsRequestsMetrics"], { endpointsRequestsMetrics: metrics.endpointsRequests, wholeNumberFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_WHOLE_NUMBER_FORMAT"] })) : (''),
            metrics.cache ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { sm: "12" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["CacheMetrics"], { cacheMetrics: metrics.cache, twoDigitAfterPointFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT"] })))) : (''),
            metrics.databases && JSON.stringify(metrics.databases) !== '{}' ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { sm: "12" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["DatasourceMetrics"], { datasourceMetrics: metrics.databases, twoDigitAfterPointFormat: app_config_constants__WEBPACK_IMPORTED_MODULE_5__["APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT"] })))) : ('')));
    }
}
const mapStateToProps = (storeState) => ({
    metrics: storeState.administration.metrics,
    isFetching: storeState.administration.loading,
    threadDump: storeState.administration.threadDump
});
const mapDispatchToProps = { systemMetrics: _administration_reducer__WEBPACK_IMPORTED_MODULE_6__["systemMetrics"], systemThreadDump: _administration_reducer__WEBPACK_IMPORTED_MODULE_6__["systemThreadDump"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(MetricsPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\metrics\\metrics.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\metrics\\metrics.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/index.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/index.tsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _user_management__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-management */ "./src/main/webapp/app/modules/administration/user-management/user-management.tsx");
/* harmony import */ var _user_management_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-management-detail */ "./src/main/webapp/app/modules/administration/user-management/user-management-detail.tsx");
/* harmony import */ var _user_management_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-management-update */ "./src/main/webapp/app/modules/administration/user-management/user-management-update.tsx");
/* harmony import */ var _user_management_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-management-delete-dialog */ "./src/main/webapp/app/modules/administration/user-management/user-management-delete-dialog.tsx");







const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/new`, component: _user_management_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:login/edit`, component: _user_management_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:login`, component: _user_management_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _user_management__WEBPACK_IMPORTED_MODULE_3__["default"] })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}/:login/delete`, component: _user_management_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management-delete-dialog.tsx":
/*!******************************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management-delete-dialog.tsx ***!
  \******************************************************************************************************/
/*! exports provided: UserManagementDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementDeleteDialog", function() { return UserManagementDeleteDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _user_management_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");






class UserManagementDeleteDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.confirmDelete = event => {
            this.props.deleteUser(this.props.user.login);
            this.handleClose(event);
        };
        this.handleClose = event => {
            event.stopPropagation();
            this.props.history.goBack();
        };
    }
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }
    render() {
        const { user } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], { toggle: this.handleClose },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "entity.delete.title" }, "Confirm delete operation")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "userManagement.delete.question", interpolate: { login: user.login } }, "Are you sure you want to delete this User?")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "entity.action.cancel" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_3__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))));
    }
}
const mapStateToProps = (storeState) => ({
    user: storeState.userManagement.user
});
const mapDispatchToProps = { getUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_5__["getUser"], deleteUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_5__["deleteUser"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-delete-dialog.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management-detail.tsx":
/*!***********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management-detail.tsx ***!
  \***********************************************************************************************/
/*! exports provided: UserManagementDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementDetail", function() { return UserManagementDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_config_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/config/translation */ "./src/main/webapp/app/config/translation.ts");
/* harmony import */ var _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");









class UserManagementDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }
    render() {
        const { user } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.detail.title" }, "User"),
                " [",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, user.login),
                "]"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { size: "md" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.login" }, "Login")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, user.login),
                        "\u00A0",
                        user.activated ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Badge"], { color: "success" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.activated" }, "Activated"))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Badge"], { color: "danger" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.deactivated" }, "Deactivated")))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.firstName" }, "First Name")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.firstName),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.lastName" }, "Last Name")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.lastName),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.email" }, "Email")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.email),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.langKey" }, "Lang Key")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.langKey ? app_config_translation__WEBPACK_IMPORTED_MODULE_7__["languages"][user.langKey].name : undefined),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.createdBy" }, "Created By")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.createdBy),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.createdDate" }, "Created Date")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { value: user.createdDate, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_6__["APP_DATE_FORMAT"], blankOnInvalid: true })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.lastModifiedBy" }, "Last Modified By")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, user.lastModifiedBy),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.lastModifiedDate" }, "Last Modified Date")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { value: user.lastModifiedDate, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_6__["APP_DATE_FORMAT"], blankOnInvalid: true })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.profiles" }, "Profiles")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", { className: "list-unstyled" }, user.authorities
                            ? user.authorities.map((authority, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { key: `user-auth-${i}` },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Badge"], { color: "info" }, authority))))
                            : null)))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/admin/user-management", replace: true, color: "info" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "arrow-left" }),
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.back" }, "Back")))));
    }
}
const mapStateToProps = (storeState) => ({
    user: storeState.userManagement.user
});
const mapDispatchToProps = { getUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["getUser"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserManagementDetail));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-detail.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management-update.tsx":
/*!***********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management-update.tsx ***!
  \***********************************************************************************************/
/*! exports provided: UserManagementUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementUpdate", function() { return UserManagementUpdate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/config/translation */ "./src/main/webapp/app/config/translation.ts");
/* harmony import */ var _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");









class UserManagementUpdate extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isNew: !this.props.match.params || !this.props.match.params.login
        };
        this.saveUser = (event, values) => {
            if (this.state.isNew) {
                this.props.createUser(values);
            }
            else {
                this.props.updateUser(values);
            }
            this.handleClose();
        };
        this.handleClose = () => {
            this.props.history.push('/admin/user-management');
        };
    }
    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getUser(this.props.match.params.login);
        }
        this.props.getRoles();
    }
    componentWillUnmount() {
        this.props.reset();
    }
    render() {
        const isInvalid = false;
        const { user, loading, updating, roles } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.home.createOrEditLabel" }, "Create or edit a User")))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { onValidSubmit: this.saveUser },
                    user.id ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "id" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "global.field.id" }, "ID")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { type: "text", className: "form-control", name: "id", required: true, readOnly: true, value: user.id }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "login" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.login" }, "Login")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { type: "text", className: "form-control", name: "login", validate: {
                                required: {
                                    value: true,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('register.messages.validate.login.required')
                                },
                                pattern: {
                                    value: '^[_.@A-Za-z0-9-]*$',
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('register.messages.validate.login.pattern')
                                },
                                minLength: {
                                    value: 1,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('register.messages.validate.login.minlength')
                                },
                                maxLength: {
                                    value: 50,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('register.messages.validate.login.maxlength')
                                }
                            }, value: user.login })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "firstName" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.firstName" }, "First Name")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { type: "text", className: "form-control", name: "firstName", validate: {
                                maxLength: {
                                    value: 50,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('entity.validation.maxlength', { max: 50 })
                                }
                            }, value: user.firstName })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "lastName" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.lastName" }, "Last Name")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { type: "text", className: "form-control", name: "lastName", validate: {
                                maxLength: {
                                    value: 50,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('entity.validation.maxlength', { max: 50 })
                                }
                            }, value: user.lastName }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvFeedback"], null, "This field cannot be longer than 50 characters.")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { name: "email", label: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.email.label'), placeholder: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.form.email.placeholder'), type: "email", validate: {
                                required: {
                                    value: true,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.email.required')
                                },
                                email: {
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.email.invalid')
                                },
                                minLength: {
                                    value: 5,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.email.minlength')
                                },
                                maxLength: {
                                    value: 254,
                                    errorMessage: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["translate"])('global.messages.validate.email.maxlength')
                                }
                            }, value: user.email })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], { check: true },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { type: "checkbox", name: "activated", value: user.activated }),
                            ' ',
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.activated" }, "Activated"))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "langKey" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.langKey" }, "Language Key")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { type: "select", className: "form-control", name: "langKey", value: user.langKey }, app_config_translation__WEBPACK_IMPORTED_MODULE_7__["locales"].map(locale => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: locale, key: locale }, app_config_translation__WEBPACK_IMPORTED_MODULE_7__["languages"][locale].name))))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "authorities" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "userManagement.profiles" }, "Language Key")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { type: "select", className: "form-control", name: "authorities", value: user.authorities, multiple: true }, roles.map(role => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: role, key: role }, role))))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/admin/user-management", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.back" }, "Back"))),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", type: "submit", disabled: isInvalid || updating },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_5__["Translate"], { contentKey: "entity.action.save" }, "Save"))))))));
    }
}
const mapStateToProps = (storeState) => ({
    user: storeState.userManagement.user,
    roles: storeState.userManagement.authorities,
    loading: storeState.userManagement.loading,
    updating: storeState.userManagement.updating
});
const mapDispatchToProps = { getUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["getUser"], getRoles: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["getRoles"], updateUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["updateUser"], createUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["createUser"], reset: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserManagementUpdate));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management-update.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management.tsx":
/*!****************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management.tsx ***!
  \****************************************************************************************/
/*! exports provided: UserManagement, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagement", function() { return UserManagement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/shared/util/pagination.constants */ "./src/main/webapp/app/shared/util/pagination.constants.ts");
/* harmony import */ var _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");









class UserManagement extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = Object.assign({}, Object(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["getSortState"])(this.props.location, app_shared_util_pagination_constants__WEBPACK_IMPORTED_MODULE_7__["ITEMS_PER_PAGE"]));
        this.sort = prop => () => {
            this.setState({
                order: this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            }, () => this.sortUsers());
        };
        this.handlePagination = activePage => this.setState({ activePage }, () => this.sortUsers());
        this.getUsers = () => {
            const { activePage, itemsPerPage, sort, order } = this.state;
            this.props.getUsers(activePage - 1, itemsPerPage, `${sort},${order}`);
        };
        this.toggleActive = user => () => {
            this.props.updateUser(Object.assign({}, user, { activated: !user.activated }));
        };
    }
    componentDidMount() {
        this.getUsers();
    }
    sortUsers() {
        this.getUsers();
        this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
    }
    render() {
        const { users, account, match, totalItems } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "user-management-page-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.home.title" }, "Users"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: `${match.url}/new`, className: "btn btn-primary float-right jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "plus" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.home.createLabel" }, "Create a new user"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { responsive: true, striped: true },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('id') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "global.field.id" }, "ID"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('login') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.login" }, "Login"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('email') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.email" }, "Email"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('langKey') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.langKey" }, "Lang Key"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.profiles" }, "Profiles")),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('createdDate') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.createdDate" }, "Created Date"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { className: "hand", onClick: this.sort('lastModifiedBy') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.lastModifiedBy" }, "Last Modified By"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { id: "modified-date-sort", className: "hand", onClick: this.sort('lastModifiedDate') },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "userManagement.lastModifiedDate" }, "Last Modified Date"),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "sort" })),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, users.map((user, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { id: user.login, key: `user-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${user.login}`, color: "link", size: "sm" }, user.id)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.login),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.email),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.activated ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "success", onClick: this.toggleActive(user) }, "Activated")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "danger", onClick: this.toggleActive(user) }, "Deactivated"))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.langKey),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.authorities
                        ? user.authorities.map((authority, j) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { key: `user-auth-${i}-${j}` },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Badge"], { color: "info" }, authority))))
                        : null),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { value: user.createdDate, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_6__["APP_DATE_FORMAT"], blankOnInvalid: true })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.lastModifiedBy),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { value: user.lastModifiedDate, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_6__["APP_DATE_FORMAT"], blankOnInvalid: true })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "text-right" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${user.login}`, color: "info", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "eye" }),
                                ' ',
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.view" }, "View"))),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${user.login}/edit`, color: "primary", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                ' ',
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.edit" }, "Edit"))),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${user.login}/delete`, color: "danger", size: "sm", disabled: account.login === user.login },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                                ' ',
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["Translate"], { contentKey: "entity.action.delete" }, "Delete")))))))))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["JhiPagination"], { items: Object(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["getPaginationItemsNumber"])(totalItems, this.state.itemsPerPage), activePage: this.state.activePage, onSelect: this.handlePagination, maxButtons: 5 }))));
    }
}
const mapStateToProps = (storeState) => ({
    users: storeState.userManagement.users,
    totalItems: storeState.userManagement.totalItems,
    account: storeState.authentication.account
});
const mapDispatchToProps = { getUsers: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["getUsers"], updateUser: _user_management_reducer__WEBPACK_IMPORTED_MODULE_8__["updateUser"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserManagement));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\modules\\administration\\user-management\\user-management.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/util/pagination.constants.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/util/pagination.constants.ts ***!
  \*****************************************************************/
/*! exports provided: ITEMS_PER_PAGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEMS_PER_PAGE", function() { return ITEMS_PER_PAGE; });
const ITEMS_PER_PAGE = 20;


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\shared\\util\\pagination.constants.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\shared\\util\\pagination.constants.ts"); } })(); 

/***/ })

}]);
//# sourceMappingURL=administration.chunk.js.map