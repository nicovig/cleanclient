import './import-fichier-detail.scss';

import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Card, Button, CardTitle, CardText, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSampleResult, getEntity } from './import-fichier.reducer';
import ReactTable from 'react-table';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar, faThumbsUp, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons/faWindowClose';
import {ImportFichierResultMap} from './import-fichier-result-map';
import ImportFichierResultEchec from './import-fichier-result-echec';
import { IImportLigne } from 'app/shared/model/import-ligne.model';

export interface IImportFichierResultProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportFichierResultState {
  rows: any[];
  columns: Array<{ Header: string; accessor: string }>;
  
}

export class ImportFichierResult extends React.Component<IImportFichierResultProps, IImportFichierResultState> {
  hash;
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
    } else {
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
        if (item.nom == ""){
          item.nom = "-donnée manquante-";
        }
        if (item.adresse == ""){
          item.adresse = "-donnée manquante-";
        }
        if (item.cp == ""){
          item.cp = "-donnée manquante-";
        }
        if (item.ville == ""){
          item.ville = "-donnée manquante-";
        }
        if (item.siret == ""){
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
            return (
              <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                  const data = [...echecs];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        //ex: this.setState({ data });
                        this.saveEntity();

                              }
                }
                dangerouslySetInnerHTML={{
                  __html: echecs[cellInfo.index] ? echecs[cellInfo.index][cellInfo.column.id] : ''
                }}
              />
            );
          }
        };
      });
      return {
        rowsEchecs: echecs,
        columnsEchecs
      };
    } else {
      return {
        rowsEchecs: [],
        columnsEchecs: []
      };
    }
  }

  getImportFichier = () => {
    
    this.props.getEntity()

  }

  saveEntity = () => {
    const { rows } = this.state;
    let importLigneArray: IImportLigne[] = [];

    rows.forEach(element => {
      const row: IImportLigne = {
        nom: element.nom,
        adresse: element.adresse,
        cp: element.codepostal,
        ville: element.ville,
        siret: element.siret
      };
      importLigneArray.push(row);
    });

    const entity: IImportFichier = {
      dateDebut: moment(),
      importLignes: importLigneArray,
      frontKey: frontKey
    };
    this.props.createEntity(entity);
  };

  handleUpload = () => {
    this.props.history.push('/upload');
  };

  render() {
    const { result } = this.props;
    const { rows, columns } = this.formatTable();
    const { rowsEchecs, columnsEchecs } = this.formatTableEchecs();
    return (
      <Container>
        <div className="text-container">
          <div className="text-animation">
            <span>Résultat du traitement</span>
          </div>
        </div>
        <Row>
          <Col sm="4">
            <Card body>
              <FontAwesomeIcon icon={faThumbsUp} size="5x" color="#dfda01" className="icon" pull="left" />
              <p />
              <CardTitle className="cardsTitle">
                {result.localisationClients ? result.localisationClients.length : ''} Clients rapprochés
              </CardTitle>
              {result.nombreEtablissementFermes && result.nombreEtablissementFermes > 0 && (
                <CardText className="cardsTextDemenage">dont {result.nombreEtablissementFermes} établissements ont fermé</CardText>
              )}
              <AnchorLink className="anchorButton" href="#clean">
                Exporter le fichier
              </AnchorLink>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <FontAwesomeIcon icon={faSearchDollar} size="5x" color="#dfda01" className="icon" pull="left" />
              <p />
              <CardTitle className="cardsTitle">
                {result.localisationProspects ? result.localisationProspects.length : ''} Prospects trouvés
              </CardTitle>
              <CardText>Sur la carte sont affichés des prospects intéressants, en fonction de vos clients existants.</CardText>
              <AnchorLink href="#map" className="anchorButton">
                Où sont mes prospects ?
              </AnchorLink>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <FontAwesomeIcon icon={faEyeSlash} size="5x" color="#dfda01" className="icon" pull="left" />
              <p />
              <CardTitle className="cardsTitle">{result.echecs ? result.echecs.length : ''} Clients non-rapprochés</CardTitle>
              <CardText>
                Nous n'avons pas pû trouver tous vos clients. Pour un traitement optimal, vous pouvez remplir manuellement certains champs
                et refaire un import.
              </CardText>
              <AnchorLink href="#unclean" className="anchorButton">
                Voir les entreprises non-rapprochées
              </AnchorLink>
            </Card>
          </Col>
        </Row>
        <br />
        <div id="clean" />
        <br />
        <br />
        <br />
        <Col md="12">
          <div className="etatTotal">Échantillon du fichier nettoyé</div>
          <ReactTable
            showPagination={false}
            data={rows}
            columns={columns}
            sortable={false}
            style={{
              width: '67.5rem'
            }}
            pageSize={rows.length}
            getTrProps={(state, rowInfo, column) => {
              return {
                style: {
                  opacity: rowInfo.index < 3 ? 1 : rowInfo.index === 3 ? 0.45 : 0.1
                }
              };
            }}
          />
          <br />
          <Row>
            <Col sm="4" />
            <Col sm="4">
              <Button onClick={() => this._goToExport()} className="float-none">
                Importer le fichier nettoyé
              </Button>
            </Col>
            <Col sm="4" />
          </Row>
        </Col>
        <br />
        <div id="map" />
        <br />
        <br />
        <br />
        <Col md="12">
          <div className="etatTotal">Cartographie de mes clients</div>
          <ImportFichierResultMap result={this.props.result} />
            </Col>
        <br />
        <div id="unclean" />
        <br />
        <Col md="12">
          <div className="etatTotal">Clients non rapprochés</div>
          <ImportFichierResultEchec data={rowsEchecs} columns={columnsEchecs} /> 
          <Row>
            <Col sm="4" />
            <Col sm="4">
              <Button className="float-none" onClick={this.handleUpload}>
                Refaire un nettoyage des données
              </Button>
            </Col>
            <Col sm="4" />
          </Row>
        </Col>
        <br />
        <div />
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

const mapStateToProps = ({ importFichier }: IRootState) => ({
  result: importFichier.result,
  importFichier : importFichier.entity

});

const mapDispatchToProps = { getSampleResult, getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportFichierResult);
