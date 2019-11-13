import './import-fichier-detail.scss';

import React from 'react'; 
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Progress, Table, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, getEntityStatus } from './import-fichier.reducer';

export interface IImportFichierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportFichierDetailState {
  intervalId: any;
}

export class ImportFichierDetail extends React.Component<IImportFichierDetailProps, IImportFichierDetailState> {

  
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    const inter = setInterval( () => this._checkStatus(), 500 );
    this.setState({ intervalId: inter });
    //this.props.getEntityStatus(this.props.match.params.id)
  }
  
  _checkStatus = () => {
    this.props.getEntityStatus(this.props.match.params.id);

    console.log(this.props.status);
    if (this.props.status.nbClientsTraites && this.props.status.nbClientsTraites !== 0 && this.props.status.nbClientsTraites === this.props.status.nbClientsTotal) {
      console.log('je clear l intervale');
      clearInterval(this.state.intervalId); 
      this.props.history.push('/entity/import-fichier/'+this.props.match.params.id+'/result');
    }
  };

  render() {
    const { importFichierEntity, status } = this.props;
    return (
      <Container body className="text-center">
            {status.nbClientsTraites && status.nbClientsTraites !== 0 && status.nbClientsTraites === status.nbClientsTotal ? (
                      <div className="text-container">    
                        <div className="text-animation"> 
                          <span>Nettoyage terminé</span>
                        </div>
                      </div>
                        ) : 
                        (
                        <div className="spinner">
                          <div className="dot1"></div>
                          <div className="dot2"></div>
                        </div>   
                        )
            }
        <Table body className="text-left"> 
          <tbody>
            <div className="etatTotal">Nombre de clients à traiter : {status.nbClientsTotal}</div>
            <tr>
              <td><div className="value">{Math.round((status.nbClientsTraites*100)/status.nbClientsTotal)} %</div><p></p><Progress className="progress" value={Math.round((status.nbClientsTraites*100)/status.nbClientsTotal)} max={100}></Progress>
              </td>
            </tr> 
            <th/>
          </tbody>
        </Table> 
        <Table body className="text-left"> 
          <tbody>
            <div className="etatTotal">État</div>
            <tr>
              <td>Nombre de clients trouvés : {status.nbClientsTrouves}<p></p><Progress className="progress" value={Math.round((status.nbClientsTrouves*100)/status.nbClientsTotal)}></Progress>
              </td>
            </tr>
            <tr>
              <td>Nombre de clients à confirmer : {status.nbClientsAConfirmer}<p></p><Progress className="progress" value={Math.round((status.nbClientsAConfirmer*100)/status.nbClientsTotal)} max={100}></Progress>
              </td>
            </tr>
            <tr>
              <td>Nombre de clients non rapprochés : {status.nbClientsEchec}<p></p><Progress className="progress" value={Math.round((status.nbClientsEchec*100)/status.nbClientsTotal)} max={100}></Progress>
              </td>
            </tr>
            <th/>
          </tbody>
        </Table>
        <Table body className="text-left"> 
          <tbody>
            <div className="etatTotal">Prospects identifiés</div>
            <tr>
              <td><div className="value">{status.nbProspects}</div><p></p><Progress className="progress" value={status.nbProspects} max={status.nbClientsTotal}></Progress>
              </td>
            </tr> 
            <th/>
          </tbody>  
        </Table> 
        <br></br>
        <Row className="row">
            <Col>
              <Button tag={Link} to="/entity/import-fichier" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                    <Translate contentKey="entity.action.back">Back</Translate>
              </Button>
                &nbsp;
              <Button tag={Link} to={`/entity/import-fichier/${importFichierEntity.id}/edit`} replace color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <Translate contentKey="entity.action.edit">Edit</Translate>
              </Button>
            </Col>
          </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ importFichier }: IRootState) => ({
  importFichierEntity: importFichier.entity,
  status: importFichier.status,
});

const mapDispatchToProps = { getEntity, getEntityStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportFichierDetail);
