webpackHotUpdate("main",{

/***/ "./src/main/webapp/app/entities/import-fichier/import-fichier-result.tsx":
/*!*******************************************************************************!*\
  !*** ./src/main/webapp/app/entities/import-fichier/import-fichier-result.tsx ***!
  \*******************************************************************************/
/*! exports provided: ImportFichierResult, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportFichierResult", function() { return ImportFichierResult; });
/* harmony import */ var _import_fichier_detail_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import-fichier-detail.scss */ "./src/main/webapp/app/entities/import-fichier/import-fichier-detail.scss");
/* harmony import */ var _import_fichier_detail_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_import_fichier_detail_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _import_fichier_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./import-fichier.reducer */ "./src/main/webapp/app/entities/import-fichier/import-fichier.reducer.ts");
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-anchor-link-smooth-scroll */ "./node_modules/react-anchor-link-smooth-scroll/lib/anchor-link.js");
/* harmony import */ var react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _import_fichier_result_map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./import-fichier-result-map */ "./src/main/webapp/app/entities/import-fichier/import-fichier-result-map.tsx");
/* harmony import */ var _import_fichier_result_echec__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./import-fichier-result-echec */ "./src/main/webapp/app/entities/import-fichier/import-fichier-result-echec.tsx");












class ImportFichierResult extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
    constructor() {
        super(...arguments);
        this.getImportFichier = () => {
            this.props.getEntity();
        };
        this.saveEntity = () => {
            const { rows } = this.state;
            let importLigneArray = [];
            rows.forEach(element => {
                const row = {
                    nom: element.nom,
                    adresse: element.adresse,
                    cp: element.codepostal,
                    ville: element.ville,
                    siret: element.siret
                };
                importLigneArray.push(row);
            });
            const entity = {
                dateDebut: moment(),
                importLignes: importLigneArray,
                frontKey: frontKey
            };
            this.props.createEntity(entity);
        };
        this.handleUpload = () => {
            this.props.history.push('/upload');
        };
    }
    componentDidMount() {
        this.props.getSampleResult(this.props.match.params.id);
    }
    _goToExport() {
        this.props.history.push('/billing/' + this.props.match.params.id);
    }
    formatTable() {
        const { result } = this.props;
        if (result && result.echantillonClients && result.echantillonClients.length > 0) {
            const echantillon = result.echantillonClients.map(item => {
                return {
                    Nom: item.sireneDenomination,
                    Numéro: item.sireneHousenumber,
                    Rue: item.sireneStreet,
                    CP: item.sireneCodepostal,
                    Ville: item.sireneVille,
                    SIRET: item.sireneSiret,
                    Lattitude: item.sireneLatitude,
                    Longitude: item.sireneLongitude
                };
            });
            /*React Table*/
            const columns = Object.keys(echantillon[0]).map(key => {
                return {
                    Header: key,
                    accessor: key
                };
            });
            return {
                rows: echantillon,
                columns
            };
        }
        else {
            return {
                rows: [],
                columns: []
            };
        }
    }
    formatTableEchecs() {
        const { result } = this.props;
        if (result && result.echecs && result.echecs.length > 0) {
            console.log(result.echecs);
            const echecs = result.echecs.map(item => {
                if (item.nom == "") {
                    item.nom = "-donnée manquante-";
                }
                if (item.adresse == "") {
                    item.adresse = "-donnée manquante-";
                }
                if (item.cp == "") {
                    item.cp = "-donnée manquante-";
                }
                if (item.ville == "") {
                    item.ville = "-donnée manquante-";
                }
                if (item.siret == "") {
                    item.siret = "-donnée manquante-";
                }
                return {
                    Nom: item.nom,
                    Adresse: item.adresse,
                    CP: item.cp,
                    Ville: item.ville,
                    SIRET: item.siret
                };
            });
            /*React Table*/
            const columnsEchecs = Object.keys(echecs[0]).map(key => {
                return {
                    Header: key,
                    accessor: key,
                    Cell: (cellInfo) => {
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { backgroundColor: "#fafafa" }, contentEditable: true, suppressContentEditableWarning: true, onBlur: e => {
                                const data = [...echecs];
                                data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                                //ex: this.setState({ data });
                                this.saveEntity();
                            }, dangerouslySetInnerHTML: {
                                __html: echecs[cellInfo.index] ? echecs[cellInfo.index][cellInfo.column.id] : ''
                            } }));
                    }
                };
            });
            return {
                rowsEchecs: echecs,
                columnsEchecs
            };
        }
        else {
            return {
                rowsEchecs: [],
                columnsEchecs: []
            };
        }
    }
    render() {
        const { result } = this.props;
        const { rows, columns } = this.formatTable();
        const { rowsEchecs, columnsEchecs } = this.formatTableEchecs();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Container"], null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "text-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "text-animation" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "R\u00E9sultat du traitement"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Card"], { body: true },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faThumbsUp"], size: "5x", color: "#dfda01", className: "icon", pull: "left" }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardTitle"], { className: "cardsTitle" },
                            result.localisationClients ? result.localisationClients.length : '',
                            " Clients rapproch\u00E9s"),
                        result.nombreEtablissementFermes && result.nombreEtablissementFermes > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardText"], { className: "cardsTextDemenage" },
                            "dont ",
                            result.nombreEtablissementFermes,
                            " \u00E9tablissements ont ferm\u00E9")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9___default.a, { className: "anchorButton", href: "#clean" }, "Exporter le fichier"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Card"], { body: true },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faSearchDollar"], size: "5x", color: "#dfda01", className: "icon", pull: "left" }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardTitle"], { className: "cardsTitle" },
                            result.localisationProspects ? result.localisationProspects.length : '',
                            " Prospects trouv\u00E9s"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardText"], null, "Sur la carte sont affich\u00E9s des prospects int\u00E9ressants, en fonction de vos clients existants."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9___default.a, { href: "#map", className: "anchorButton" }, "O\u00F9 sont mes prospects ?"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Card"], { body: true },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], { icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faEyeSlash"], size: "5x", color: "#dfda01", className: "icon", pull: "left" }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardTitle"], { className: "cardsTitle" },
                            result.echecs ? result.echecs.length : '',
                            " Clients non-rapproch\u00E9s"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["CardText"], null, "Nous n'avons pas p\u00FB trouver tous vos clients. Pour un traitement optimal, vous pouvez remplir manuellement certains champs et refaire un import."),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_anchor_link_smooth_scroll__WEBPACK_IMPORTED_MODULE_9___default.a, { href: "#unclean", className: "anchorButton" }, "Voir les entreprises non-rapproch\u00E9es")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "clean" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "etatTotal" }, "\u00C9chantillon du fichier nettoy\u00E9"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_table__WEBPACK_IMPORTED_MODULE_5__["default"], { showPagination: false, data: rows, columns: columns, sortable: false, style: {
                        width: '67.5rem'
                    }, pageSize: rows.length, getTrProps: (state, rowInfo, column) => {
                        return {
                            style: {
                                opacity: rowInfo.index < 3 ? 1 : rowInfo.index === 3 ? 0.45 : 0.1
                            }
                        };
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { onClick: () => this._goToExport(), className: "float-none" }, "Importer le fichier nettoy\u00E9")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "map" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "etatTotal" }, "Cartographie de mes clients"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_import_fichier_result_map__WEBPACK_IMPORTED_MODULE_10__["ImportFichierResultMap"], { result: this.props.result })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "unclean" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "12" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "etatTotal" }, "Clients non rapproch\u00E9s"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_import_fichier_result_echec__WEBPACK_IMPORTED_MODULE_11__["default"], { data: rowsEchecs, columns: columnsEchecs }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { className: "float-none", onClick: this.handleUpload }, "Refaire un nettoyage des donn\u00E9es")),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { sm: "4" }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null)));
    }
}
const mapStateToProps = ({ importFichier }) => ({
    result: importFichier.result,
    importFichier: importFichier.entity
});
const mapDispatchToProps = { getSampleResult: _import_fichier_reducer__WEBPACK_IMPORTED_MODULE_4__["getSampleResult"], getEntity: _import_fichier_reducer__WEBPACK_IMPORTED_MODULE_4__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ImportFichierResult));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\entities\\import-fichier\\import-fichier-result.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "C:\\jhipster\\cleanclient\\src\\main\\webapp\\app\\entities\\import-fichier\\import-fichier-result.tsx"); } })(); 

/***/ })

})
//# sourceMappingURL=main.d0ba70049a45560a7416.hot-update.js.map