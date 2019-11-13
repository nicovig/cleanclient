import './import-fichier-detail.scss';

import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Card, Button, CardTitle, CardText, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getEntity, getEntityStatus, getResult } from './import-fichier.reducer';
import ReactTable from 'react-table';
import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar, faThumbsUp, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AnchorLink from 'react-anchor-link-smooth-scroll'

export interface IImportFichierResultProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportFichierResultState {
  rows: any[];
  columns: Array<{ Header: string; accessor: string }>;
}

export class ImportFichierResult extends React.Component<IImportFichierResultProps, IImportFichierResultState> {  

  componentDidMount() {
    console.log('DIDMOUNT');
    this.props.getResult(this.props.match.params.id);
    this.props.getEntityStatus(this.props.match.params.id);

  }

  formatTable() {
    const { result } = this.props;
    if (result && result.echantillon && result.echantillon.length > 0) {
      const echantillon = result.echantillon.map(item => {
        return {
          Nom : item.sireneDenomination,
          Numéro : item.sireneHousenumber,
          Rue : item.sireneStreet,
          CP : item.sireneCodepostal,
          Ville : item.sireneVille,
          SIRET : item.sireneSiret,
          Lattitude : item.latitude,
          Longitude : item.longitude
        }
      })
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
      const echecs = result.echecs.map(item => {
        return {
          Nom : item.nom,
          Adresse : item.adresse,
          CP : item.codepostal,
          Ville : item.ville,
          SIRET : item.siret,
        }
      })
      /*React Table*/
      const columnsEchecs = Object.keys(echecs[0]).map(key => {
        return {
          Header: key,
          accessor: key
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

  mappingCarto(){
    const { result } = this.props;
    console.log('mapping carto')
 
    if (result && result.localisationsClients && result.localisationsClients.length > 0) {
      const geoloc = result.localisationsClients.filter(item1 => item1.latitude && item1.longitude).map((item,i) =>{
        console.log(item.latitude);
        return (
          <Marker className="markers"
                  position={[item.latitude, item.longitude]}
                  icon={greenIcon} 
                  key={"key"+i}
                  style={{
                    cursor: 'pointer'
                  }}
          >
          </Marker>
        )
      })
      console.log(geoloc);
    return geoloc
    }
}

  handleUpload = () => {
    this.props.history.push('/upload');
  }

  render() {
    const { status } = this.props;
    const { rows, columns } = this.formatTable();
    const { rowsEchecs, columnsEchecs } = this.formatTableEchecs();
    const centre = [46.912688 , 2.706299];
    const zoom = 6;          
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
              <FontAwesomeIcon icon={faThumbsUp}
                               size="5x"
                               color="#dfda01"
                               className="icon"
                               pull="left"
              ></FontAwesomeIcon>
              <p></p>
              <CardTitle className="cardsTitle">{status.nbClientsTrouves} Clients rapprochés</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>  
              <AnchorLink className="anchorButton" href='#clean'>Exporter le fichier</AnchorLink>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <FontAwesomeIcon icon={faSearchDollar}
                               size="5x"
                               color="#dfda01"
                               className="icon"
                               pull="left"
              ></FontAwesomeIcon>
              <p></p>
              <CardTitle className="cardsTitle">{status.nbProspects} Prospects trouvés</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <AnchorLink href='#map' className="anchorButton" >Où sont mes prospects ?</AnchorLink>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
            <FontAwesomeIcon icon={faEyeSlash}
                               size="5x"
                               color="#dfda01"
                               className="icon"
                               pull="left"
              ></FontAwesomeIcon>
              <p></p>
              <CardTitle className="cardsTitle">{status.nbClientsEchec} Clients non-rapprochés</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <AnchorLink href='#unclean' className="anchorButton" >Voir les entreprises non-rapprochées</AnchorLink>
            </Card>
          </Col>
        </Row>
        <br/>
        <div id="clean"></div>
        <br/>
        <br/>
        <br/>      
        <Col md="12">
        <div className="etatTotal">Échantillon du fichier nettoyé</div>
        <th/>
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
                  opacity: rowInfo.index < 3 ? 1 : rowInfo.index === 
                  3 ? 0.45 : 0.1
                }
              };
            }}  
          />
        <br/>
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">        
            <Button
              className="float-none"
            >Importer le fichier nettoyé
            </Button>
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        </Col>      
        <br />
        <div id="map"></div>
        <br/>
        <br/>
        <br/>
        <Col md="12"> 
        <div className="etatTotal">Cartographie de mes clients</div>
        <Map 
          center={centre}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          className="carto"
        >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.mappingCarto()}
        </Map>
        <br/>
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">        
            <Button
              className="float-none"
            >Importer le fichier des prospects
            </Button>
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        </Col>
        <br />
        <div id="unclean"></div>
        <br/>
        <br/>
        <br/>
        <Col md="12">
        <div className="etatTotal">Clients non rapprochés</div>
        <th/>
          <ReactTable
            className="table"
            showPagination={false}
            sortable={false}
            data={rowsEchecs}
            columns={columnsEchecs}
            style={{
              height: '400px',
              width: '67.5rem'
            }}
            pageSize={rowsEchecs.length}
          />
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">        
            <Button
              className="float-none"
              onClick={this.handleUpload}
            >Refaire un nettoyage des données
            </Button>
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        </Col>
        <br />
        <div></div>
        <br/>
        <br/>
        <br/>
      </Container>
    );
  }
} 

const mapStateToProps = ({ importFichier }: IRootState) => ({
  importFichierEntity: importFichier.entity,
  status: importFichier.status,
  result: importFichier.result
});

const mapDispatchToProps = { getEntity, getEntityStatus, getResult };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportFichierResult);

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
  });
const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    }); 

/*
        <Row>
          <Col>
            <Button onClick={this._handleClickExport} color="success">
              <FontAwesomeIcon icon="file-export" />
              <span className="d-none d-md-inline">
                Exporter
              </span>
            </Button>
          </Col>
        </Row> 

*/
/*
  _handleClickExport = () => {
    const { result } = this.props;
    if (result && result > 0) {
      // DL 
      this._downloadCleanUp();
    }
  }

  _downloadCleanUp = () => {

    console.log("passage dans _downloadCleanUp");
    const { result } = this.props;
    console.log(this.props.result);
    const wsAssets = XLSX.utils.json_to_sheet(result);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsAssets, 'Clients');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Fichier Nettoyé.xlsx');

  }
*/
