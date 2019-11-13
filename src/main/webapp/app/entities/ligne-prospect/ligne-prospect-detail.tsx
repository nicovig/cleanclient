import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-prospect.reducer';
import { ILigneProspect } from 'app/shared/model/ligne-prospect.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneProspectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LigneProspectDetail extends React.Component<ILigneProspectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ligneProspectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="cleanclientApp.ligneProspect.detail.title">LigneProspect</Translate> [<b>{ligneProspectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sireneSiret">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneSiret">Sirene Siret</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneSiret}</dd>
            <dt>
              <span id="sireneDenomination">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneDenomination">Sirene Denomination</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneDenomination}</dd>
            <dt>
              <span id="sireneHousenumber">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneHousenumber">Sirene Housenumber</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneHousenumber}</dd>
            <dt>
              <span id="sireneStreet">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneStreet">Sirene Street</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneStreet}</dd>
            <dt>
              <span id="sireneCodepostal">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneCodepostal">Sirene Codepostal</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneCodepostal}</dd>
            <dt>
              <span id="sireneVille">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneVille">Sirene Ville</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneVille}</dd>
            <dt>
              <span id="sireneLatitude">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneLatitude">Sirene Latitude</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneLatitude}</dd>
            <dt>
              <span id="sireneLongitude">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneLongitude">Sirene Longitude</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneLongitude}</dd>
            <dt>
              <span id="sireneEtatadministratif">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneEtatadministratif">Sirene Etatadministratif</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneEtatadministratif}</dd>
            <dt>
              <span id="sireneNomenclature">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneNomenclature">Sirene Nomenclature</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneNomenclature}</dd>
            <dt>
              <span id="sireneTrancheeffectif">
                <Translate contentKey="cleanclientApp.ligneProspect.sireneTrancheeffectif">Sirene Trancheeffectif</Translate>
              </span>
            </dt>
            <dd>{ligneProspectEntity.sireneTrancheeffectif}</dd>
            <dt>
              <Translate contentKey="cleanclientApp.ligneProspect.importLigne">Import Ligne</Translate>
            </dt>
            <dd>{ligneProspectEntity.importLigne ? ligneProspectEntity.importLigne.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ligne-prospect" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ligne-prospect/${ligneProspectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ ligneProspect }: IRootState) => ({
  ligneProspectEntity: ligneProspect.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LigneProspectDetail);
