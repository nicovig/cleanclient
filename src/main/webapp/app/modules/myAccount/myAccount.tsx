import React from 'react';

import { Col, Row, Card, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntitiesFacture, getFacturePdf } from 'app/entities/facture/facture.reducer';
import { getEntitiesImportFichier, getFullResult } from 'app/entities/import-fichier/import-fichier.reducer';
import { TextFormat } from 'react-jhipster';
import { MyAccountFullResultMap } from './myAccount-fullresult-map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_TIMESTAMP_FORMAT } from 'app/config/constants';
import { faPoll, faFileInvoice } from '@fortawesome/free-solid-svg-icons'; 
import {ImportFichierResultMap} from 'app/entities/import-fichier/import-fichier-result-map'

export interface ImyAccountSettingsProps extends StateProps, DispatchProps {

}

export interface ImyAccountSettingsState {
  mapped:boolean;
  resultView:number;
}

export class myaccount extends React.Component<ImyAccountSettingsProps, ImyAccountSettingsState> {

  constructor(props) {
    super(props);
    this.state = {
      mapped:false,
      resultView:0
    };
  }

  componentDidMount() {
    this.props.getEntitiesImportFichier();
    this.props.getEntitiesFacture();
  } 

  handleClickFacture = (id) => {
    this.props.getFacturePdf(id);
  }

  handleClickView = (id) => {
    if(this.state.resultView != id){
      this.setState({mapped : true});
      this.setState({resultView : id });
      this.props.getFullResult(id);
    }
    
  }


  render() {
    const { account, importsFichiers, facture, fullResult } = this.props;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2>
                Bienvenue sur votre compte, {account.login}
            </h2>
          </Col>
        </Row>
        <br/>
        <Row>
            <Col md="3">
                <Row>
                    <Card>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faPoll} size="5x" color="#dfda01" className="icon" />
                            </Col>
                            <Col>
                                <h2>Vos traitements</h2>
                            </Col>
                        </Row>
                        <ListGroup>
                          {importsFichiers.map((item) =>
                            <ListGroupItem format={APP_TIMESTAMP_FORMAT}>
                            Traitement {item.id} du <TextFormat type="date" value={item.dateDebut} format={APP_TIMESTAMP_FORMAT}/>
                            <br/>
                            <a onClick={() => this.handleClickView(item.traitementId)}>{'Voir'}</a> / <a>Télécharger</a>
                            </ListGroupItem>
                            )}
                            
                        </ListGroup>
                    </Card>
                </Row>
                <br/>
                <Row >
                    <Card>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faFileInvoice} size="5x" color="#dfda01" className="icon" />
                            </Col>
                            <Col>
                                <h2>Vos factures</h2>
                            </Col>
                        </Row>
                        <ListGroup>
                          {facture.map((item) =>
                            <ListGroupItem>
                            Facture {item.id} du <TextFormat type="date" value={item.importFichier.dateDebut} format={APP_TIMESTAMP_FORMAT}/>
                            <br/>        
                            <a onClick={() => this.handleClickFacture(item.importFichier.id)}>{'Télécharger'}</a>
                            </ListGroupItem>
                          )}
                        </ListGroup>
                    </Card>
                </Row>
            </Col>
            <Col md="9">
              <MyAccountFullResultMap fullResult={fullResult} mapped={this.state.mapped}
              /> 
            </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, importFichier, facture }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  importsFichiers: importFichier.entities,
  facture: facture.entities,
  fullResult : importFichier.fullResult
});

const mapDispatchToProps = { getEntitiesImportFichier, getEntitiesFacture, getFacturePdf, getFullResult };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myaccount);
