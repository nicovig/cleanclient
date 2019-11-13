import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './import-ligne.reducer';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImportLigneDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImportLigneDetail extends React.Component<IImportLigneDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { importLigneEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cleanclientApp.importLigne.detail.title">ImportLigne</Translate> [<b>{importLigneEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">
                <Translate contentKey="cleanclientApp.importLigne.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.nom}</dd>
            <dt>
              <span id="adresse">
                <Translate contentKey="cleanclientApp.importLigne.adresse">Adresse</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.adresse}</dd>
            <dt>
              <span id="cp">
                <Translate contentKey="cleanclientApp.importLigne.cp">Cp</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.cp}</dd>
            <dt>
              <span id="ville">
                <Translate contentKey="cleanclientApp.importLigne.ville">Ville</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.ville}</dd>
            <dt>
              <span id="siret">
                <Translate contentKey="cleanclientApp.importLigne.siret">Siret</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.siret}</dd>
            <dt>
              <span id="externalId">
                <Translate contentKey="cleanclientApp.importLigne.externalId">External Id</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.externalId}</dd>
            <dt>
              <Translate contentKey="cleanclientApp.importLigne.importFichier">Import Fichier</Translate>
            </dt>
            <dd>{importLigneEntity.importFichier ? importLigneEntity.importFichier.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/import-ligne" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/import-ligne/${importLigneEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ importLigne }: IRootState) => ({
  importLigneEntity: importLigne.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportLigneDetail);
