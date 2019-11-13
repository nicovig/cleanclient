import './import-fichier-detail.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Progress, Table, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntityByHash, getEntityStatus } from './import-fichier.reducer';

export interface IImportFichierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportFichierDetailState {
  intervalStatutClientId: any;
  intervalStatutProspectId: any;
}

export class ImportFichierDetail extends React.Component<IImportFichierDetailProps, IImportFichierDetailState> {
  componentDidMount() {
    this.props.getEntityByHash(this.props.match.params.id);
    const inter = setInterval(() => this._checkStatus(), 1000);
    this.setState({ intervalStatutClientId: inter });
    this.props.getEntityStatus(this.props.match.params.id);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalStatutClientId);
  }

  _checkStatus = () => {
    this.props.getEntityStatus(this.props.match.params.id);
    if (
      this.props.status.geolocStatut.isFinished &&
      this.props.status.cleanStatut.isFinished &&
      this.props.status.prospectStatut.isFinished
    ) {
      clearInterval(this.state.intervalStatutClientId);
      setTimeout(() => this.props.history.push('/entity/import-fichier/' + this.props.hash + '/result'), 500);
    }
  };

  render() {
    const { status } = this.props;
    return (
      <Container body className="text-center">
        {status.geolocStatut && (
          <div>
            {status.geolocStatut.isFinished && status.cleanStatut.isFinished && status.prospectStatut.isFinished ? (
              <div className="text-container">
                <div className="text-animation">
                  <span>Nettoyage terminé</span>
                </div>
              </div>
            ) : (
              <div className="spinner">
                <div className="dot1" />
                <div className="dot2" />
              </div>
            )}

            <div className="text-center">
              Traitement des lignes clients : {status.cleanStatut.nombreTraite || 0} / {status.cleanStatut.nombreATraite}
            </div>
            <Progress
              className="progress"
              value={Math.round(((status.cleanStatut.nombreTraite || 0) * 100) / status.cleanStatut.nombreATraite)}
              max={100}
            />
            {status.prospectStatut.isStarted && (
              <div>
                <div className="text-center">
                  Recherche de prospects autour de vos clients existants ({status.prospectStatut.nombreTraite || 0} /{' '}
                  {status.prospectStatut.nombreATraite})
                </div>
                <Progress className="progress" value={status.prospectStatut.nombreTraite} max={status.prospectStatut.nombreATraite} />
              </div>
            )}
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ importFichier }: IRootState) => ({
  importFichierEntity: importFichier.entity,
  status: importFichier.status,
  hash: importFichier.entity.hash
});

const mapDispatchToProps = { getEntityByHash, getEntityStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportFichierDetail);
