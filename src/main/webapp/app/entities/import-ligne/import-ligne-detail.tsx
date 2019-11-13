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
              <span id="statut">
                <Translate contentKey="cleanclientApp.importLigne.statut">Statut</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.statut}</dd>
            <dt>
              <span id="matchingMethod">
                <Translate contentKey="cleanclientApp.importLigne.matchingMethod">Matching Method</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.matchingMethod}</dd>
            <dt>
              <span id="idExterne">
                <Translate contentKey="cleanclientApp.importLigne.idExterne">Id Externe</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.idExterne}</dd>
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
              <span id="geolocScore">
                <Translate contentKey="cleanclientApp.importLigne.geolocScore">Geoloc Score</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocScore}</dd>
            <dt>
              <span id="geolocLabel">
                <Translate contentKey="cleanclientApp.importLigne.geolocLabel">Geoloc Label</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocLabel}</dd>
            <dt>
              <span id="geolocHousenumber">
                <Translate contentKey="cleanclientApp.importLigne.geolocHousenumber">Geoloc Housenumber</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocHousenumber}</dd>
            <dt>
              <span id="geolocStreet">
                <Translate contentKey="cleanclientApp.importLigne.geolocStreet">Geoloc Street</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocStreet}</dd>
            <dt>
              <span id="geolocPostcode">
                <Translate contentKey="cleanclientApp.importLigne.geolocPostcode">Geoloc Postcode</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocPostcode}</dd>
            <dt>
              <span id="geolocCity">
                <Translate contentKey="cleanclientApp.importLigne.geolocCity">Geoloc City</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocCity}</dd>
            <dt>
              <span id="geolocLatitude">
                <Translate contentKey="cleanclientApp.importLigne.geolocLatitude">Geoloc Latitude</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocLatitude}</dd>
            <dt>
              <span id="geolocLongitude">
                <Translate contentKey="cleanclientApp.importLigne.geolocLongitude">Geoloc Longitude</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.geolocLongitude}</dd>
            <dt>
              <span id="sireneSiret">
                <Translate contentKey="cleanclientApp.importLigne.sireneSiret">Sirene Siret</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneSiret}</dd>
            <dt>
              <span id="sireneDenomination">
                <Translate contentKey="cleanclientApp.importLigne.sireneDenomination">Sirene Denomination</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneDenomination}</dd>
            <dt>
              <span id="sireneHousenumber">
                <Translate contentKey="cleanclientApp.importLigne.sireneHousenumber">Sirene Housenumber</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneHousenumber}</dd>
            <dt>
              <span id="sireneStreet">
                <Translate contentKey="cleanclientApp.importLigne.sireneStreet">Sirene Street</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneStreet}</dd>
            <dt>
              <span id="sireneCodepostal">
                <Translate contentKey="cleanclientApp.importLigne.sireneCodepostal">Sirene Codepostal</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneCodepostal}</dd>
            <dt>
              <span id="sireneVille">
                <Translate contentKey="cleanclientApp.importLigne.sireneVille">Sirene Ville</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneVille}</dd>
            <dt>
              <span id="sireneLatitude">
                <Translate contentKey="cleanclientApp.importLigne.sireneLatitude">Sirene Latitude</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneLatitude}</dd>
            <dt>
              <span id="sireneLongitude">
                <Translate contentKey="cleanclientApp.importLigne.sireneLongitude">Sirene Longitude</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneLongitude}</dd>
            <dt>
              <span id="sireneEtatadministratif">
                <Translate contentKey="cleanclientApp.importLigne.sireneEtatadministratif">Sirene Etatadministratif</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneEtatadministratif}</dd>
            <dt>
              <span id="sireneNomenclature">
                <Translate contentKey="cleanclientApp.importLigne.sireneNomenclature">Sirene Nomenclature</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneNomenclature}</dd>
            <dt>
              <span id="sireneTrancheeffectif">
                <Translate contentKey="cleanclientApp.importLigne.sireneTrancheeffectif">Sirene Trancheeffectif</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.sireneTrancheeffectif}</dd>
            <dt>
              <span id="elasticScore">
                <Translate contentKey="cleanclientApp.importLigne.elasticScore">Elastic Score</Translate>
              </span>
            </dt>
            <dd>{importLigneEntity.elasticScore}</dd>
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
