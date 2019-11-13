import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './facture.reducer';
import { IFacture } from 'app/shared/model/facture.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFactureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FactureDetail extends React.Component<IFactureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { factureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cleanclientApp.facture.detail.title">Facture</Translate> [<b>{factureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="particulier">
                <Translate contentKey="cleanclientApp.facture.particulier">Particulier</Translate>
              </span>
            </dt>
            <dd>{factureEntity.particulier ? 'true' : 'false'}</dd>
            <dt>
              <span id="raisonSociale">
                <Translate contentKey="cleanclientApp.facture.raisonSociale">Raison Sociale</Translate>
              </span>
            </dt>
            <dd>{factureEntity.raisonSociale}</dd>
            <dt>
              <span id="siret">
                <Translate contentKey="cleanclientApp.facture.siret">Siret</Translate>
              </span>
            </dt>
            <dd>{factureEntity.siret}</dd>
            <dt>
              <span id="nom">
                <Translate contentKey="cleanclientApp.facture.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{factureEntity.nom}</dd>
            <dt>
              <span id="prenom">
                <Translate contentKey="cleanclientApp.facture.prenom">Prenom</Translate>
              </span>
            </dt>
            <dd>{factureEntity.prenom}</dd>
            <dt>
              <span id="telephone">
                <Translate contentKey="cleanclientApp.facture.telephone">Telephone</Translate>
              </span>
            </dt>
            <dd>{factureEntity.telephone}</dd>
            <dt>
              <span id="noVoie">
                <Translate contentKey="cleanclientApp.facture.noVoie">No Voie</Translate>
              </span>
            </dt>
            <dd>{factureEntity.noVoie}</dd>
            <dt>
              <span id="rue">
                <Translate contentKey="cleanclientApp.facture.rue">Rue</Translate>
              </span>
            </dt>
            <dd>{factureEntity.rue}</dd>
            <dt>
              <span id="cp">
                <Translate contentKey="cleanclientApp.facture.cp">Cp</Translate>
              </span>
            </dt>
            <dd>{factureEntity.cp}</dd>
            <dt>
              <span id="ville">
                <Translate contentKey="cleanclientApp.facture.ville">Ville</Translate>
              </span>
            </dt>
            <dd>{factureEntity.ville}</dd>
            <dt>
              <span id="mail">
                <Translate contentKey="cleanclientApp.facture.mail">Mail</Translate>
              </span>
            </dt>
            <dd>{factureEntity.mail}</dd>
            <dt>
              <span id="paye">
                <Translate contentKey="cleanclientApp.facture.paye">Paye</Translate>
              </span>
            </dt>
            <dd>{factureEntity.paye ? 'true' : 'false'}</dd>
            <dt>
              <span id="tva">
                <Translate contentKey="cleanclientApp.facture.tva">Tva</Translate>
              </span>
            </dt>
            <dd>{factureEntity.tva}</dd>
            <dt>
              <span id="montant">
                <Translate contentKey="cleanclientApp.facture.montant">Montant</Translate>
              </span>
            </dt>
            <dd>{factureEntity.montant}</dd>
            <dt>
              <Translate contentKey="cleanclientApp.facture.importFichier">Import Fichier</Translate>
            </dt>
            <dd>{factureEntity.importFichier ? factureEntity.importFichier.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/facture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/facture/${factureEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ facture }: IRootState) => ({
  factureEntity: facture.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FactureDetail);
