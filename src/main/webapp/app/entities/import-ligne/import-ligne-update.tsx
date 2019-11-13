import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImportFichier } from 'app/shared/model/import-fichier.model';
import { getEntities as getImportFichiers } from 'app/entities/import-fichier/import-fichier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './import-ligne.reducer';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImportLigneUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportLigneUpdateState {
  isNew: boolean;
  importFichierId: string;
}

export class ImportLigneUpdate extends React.Component<IImportLigneUpdateProps, IImportLigneUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      importFichierId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getImportFichiers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { importLigneEntity } = this.props;
      const entity = {
        ...importLigneEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/import-ligne');
  };

  render() {
    const { importLigneEntity, importFichiers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cleanclientApp.importLigne.home.createOrEditLabel">
              <Translate contentKey="cleanclientApp.importLigne.home.createOrEditLabel">Create or edit a ImportLigne</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : importLigneEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="import-ligne-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="import-ligne-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statutLabel" for="import-ligne-statut">
                    <Translate contentKey="cleanclientApp.importLigne.statut">Statut</Translate>
                  </Label>
                  <AvField id="import-ligne-statut" type="text" name="statut" />
                </AvGroup>
                <AvGroup>
                  <Label id="matchingMethodLabel" for="import-ligne-matchingMethod">
                    <Translate contentKey="cleanclientApp.importLigne.matchingMethod">Matching Method</Translate>
                  </Label>
                  <AvField id="import-ligne-matchingMethod" type="text" name="matchingMethod" />
                </AvGroup>
                <AvGroup>
                  <Label id="idExterneLabel" for="import-ligne-idExterne">
                    <Translate contentKey="cleanclientApp.importLigne.idExterne">Id Externe</Translate>
                  </Label>
                  <AvField id="import-ligne-idExterne" type="text" name="idExterne" />
                </AvGroup>
                <AvGroup>
                  <Label id="nomLabel" for="import-ligne-nom">
                    <Translate contentKey="cleanclientApp.importLigne.nom">Nom</Translate>
                  </Label>
                  <AvField id="import-ligne-nom" type="text" name="nom" />
                </AvGroup>
                <AvGroup>
                  <Label id="adresseLabel" for="import-ligne-adresse">
                    <Translate contentKey="cleanclientApp.importLigne.adresse">Adresse</Translate>
                  </Label>
                  <AvField id="import-ligne-adresse" type="text" name="adresse" />
                </AvGroup>
                <AvGroup>
                  <Label id="cpLabel" for="import-ligne-cp">
                    <Translate contentKey="cleanclientApp.importLigne.cp">Cp</Translate>
                  </Label>
                  <AvField id="import-ligne-cp" type="text" name="cp" />
                </AvGroup>
                <AvGroup>
                  <Label id="villeLabel" for="import-ligne-ville">
                    <Translate contentKey="cleanclientApp.importLigne.ville">Ville</Translate>
                  </Label>
                  <AvField id="import-ligne-ville" type="text" name="ville" />
                </AvGroup>
                <AvGroup>
                  <Label id="siretLabel" for="import-ligne-siret">
                    <Translate contentKey="cleanclientApp.importLigne.siret">Siret</Translate>
                  </Label>
                  <AvField id="import-ligne-siret" type="text" name="siret" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocScoreLabel" for="import-ligne-geolocScore">
                    <Translate contentKey="cleanclientApp.importLigne.geolocScore">Geoloc Score</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocScore" type="string" className="form-control" name="geolocScore" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocLabelLabel" for="import-ligne-geolocLabel">
                    <Translate contentKey="cleanclientApp.importLigne.geolocLabel">Geoloc Label</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocLabel" type="text" name="geolocLabel" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocHousenumberLabel" for="import-ligne-geolocHousenumber">
                    <Translate contentKey="cleanclientApp.importLigne.geolocHousenumber">Geoloc Housenumber</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocHousenumber" type="text" name="geolocHousenumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocStreetLabel" for="import-ligne-geolocStreet">
                    <Translate contentKey="cleanclientApp.importLigne.geolocStreet">Geoloc Street</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocStreet" type="text" name="geolocStreet" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocPostcodeLabel" for="import-ligne-geolocPostcode">
                    <Translate contentKey="cleanclientApp.importLigne.geolocPostcode">Geoloc Postcode</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocPostcode" type="text" name="geolocPostcode" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocCityLabel" for="import-ligne-geolocCity">
                    <Translate contentKey="cleanclientApp.importLigne.geolocCity">Geoloc City</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocCity" type="text" name="geolocCity" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocLatitudeLabel" for="import-ligne-geolocLatitude">
                    <Translate contentKey="cleanclientApp.importLigne.geolocLatitude">Geoloc Latitude</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocLatitude" type="text" name="geolocLatitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="geolocLongitudeLabel" for="import-ligne-geolocLongitude">
                    <Translate contentKey="cleanclientApp.importLigne.geolocLongitude">Geoloc Longitude</Translate>
                  </Label>
                  <AvField id="import-ligne-geolocLongitude" type="text" name="geolocLongitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneSiretLabel" for="import-ligne-sireneSiret">
                    <Translate contentKey="cleanclientApp.importLigne.sireneSiret">Sirene Siret</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneSiret" type="text" name="sireneSiret" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneDenominationLabel" for="import-ligne-sireneDenomination">
                    <Translate contentKey="cleanclientApp.importLigne.sireneDenomination">Sirene Denomination</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneDenomination" type="text" name="sireneDenomination" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneHousenumberLabel" for="import-ligne-sireneHousenumber">
                    <Translate contentKey="cleanclientApp.importLigne.sireneHousenumber">Sirene Housenumber</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneHousenumber" type="text" name="sireneHousenumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneStreetLabel" for="import-ligne-sireneStreet">
                    <Translate contentKey="cleanclientApp.importLigne.sireneStreet">Sirene Street</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneStreet" type="text" name="sireneStreet" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneCodepostalLabel" for="import-ligne-sireneCodepostal">
                    <Translate contentKey="cleanclientApp.importLigne.sireneCodepostal">Sirene Codepostal</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneCodepostal" type="text" name="sireneCodepostal" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneVilleLabel" for="import-ligne-sireneVille">
                    <Translate contentKey="cleanclientApp.importLigne.sireneVille">Sirene Ville</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneVille" type="text" name="sireneVille" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneLatitudeLabel" for="import-ligne-sireneLatitude">
                    <Translate contentKey="cleanclientApp.importLigne.sireneLatitude">Sirene Latitude</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneLatitude" type="text" name="sireneLatitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneLongitudeLabel" for="import-ligne-sireneLongitude">
                    <Translate contentKey="cleanclientApp.importLigne.sireneLongitude">Sirene Longitude</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneLongitude" type="text" name="sireneLongitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneEtatadministratifLabel" for="import-ligne-sireneEtatadministratif">
                    <Translate contentKey="cleanclientApp.importLigne.sireneEtatadministratif">Sirene Etatadministratif</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneEtatadministratif" type="text" name="sireneEtatadministratif" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneNomenclatureLabel" for="import-ligne-sireneNomenclature">
                    <Translate contentKey="cleanclientApp.importLigne.sireneNomenclature">Sirene Nomenclature</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneNomenclature" type="text" name="sireneNomenclature" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneTrancheeffectifLabel" for="import-ligne-sireneTrancheeffectif">
                    <Translate contentKey="cleanclientApp.importLigne.sireneTrancheeffectif">Sirene Trancheeffectif</Translate>
                  </Label>
                  <AvField id="import-ligne-sireneTrancheeffectif" type="text" name="sireneTrancheeffectif" />
                </AvGroup>
                <AvGroup>
                  <Label id="elasticScoreLabel" for="import-ligne-elasticScore">
                    <Translate contentKey="cleanclientApp.importLigne.elasticScore">Elastic Score</Translate>
                  </Label>
                  <AvField id="import-ligne-elasticScore" type="string" className="form-control" name="elasticScore" />
                </AvGroup>
                <AvGroup>
                  <Label for="import-ligne-importFichier">
                    <Translate contentKey="cleanclientApp.importLigne.importFichier">Import Fichier</Translate>
                  </Label>
                  <AvInput id="import-ligne-importFichier" type="select" className="form-control" name="importFichier.id">
                    <option value="" key="0" />
                    {importFichiers
                      ? importFichiers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/import-ligne" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  importFichiers: storeState.importFichier.entities,
  importLigneEntity: storeState.importLigne.entity,
  loading: storeState.importLigne.loading,
  updating: storeState.importLigne.updating,
  updateSuccess: storeState.importLigne.updateSuccess
});

const mapDispatchToProps = {
  getImportFichiers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportLigneUpdate);
