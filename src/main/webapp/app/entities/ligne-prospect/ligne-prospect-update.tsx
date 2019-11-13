import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImportLigne } from 'app/shared/model/import-ligne.model';
import { getEntities as getImportLignes } from 'app/entities/import-ligne/import-ligne.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-prospect.reducer';
import { ILigneProspect } from 'app/shared/model/ligne-prospect.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILigneProspectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILigneProspectUpdateState {
  isNew: boolean;
  importLigneId: string;
}

export class LigneProspectUpdate extends React.Component<ILigneProspectUpdateProps, ILigneProspectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      importLigneId: '0',
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

    this.props.getImportLignes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ligneProspectEntity } = this.props;
      const entity = {
        ...ligneProspectEntity,
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
    this.props.history.push('/entity/ligne-prospect');
  };

  render() {
    const { ligneProspectEntity, importLignes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cleanclientApp.ligneProspect.home.createOrEditLabel">
              <Translate contentKey="cleanclientApp.ligneProspect.home.createOrEditLabel">Create or edit a LigneProspect</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ligneProspectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="ligne-prospect-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ligne-prospect-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sireneSiretLabel" for="ligne-prospect-sireneSiret">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneSiret">Sirene Siret</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneSiret" type="text" name="sireneSiret" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneDenominationLabel" for="ligne-prospect-sireneDenomination">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneDenomination">Sirene Denomination</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneDenomination" type="text" name="sireneDenomination" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneHousenumberLabel" for="ligne-prospect-sireneHousenumber">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneHousenumber">Sirene Housenumber</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneHousenumber" type="text" name="sireneHousenumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneStreetLabel" for="ligne-prospect-sireneStreet">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneStreet">Sirene Street</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneStreet" type="text" name="sireneStreet" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneCodepostalLabel" for="ligne-prospect-sireneCodepostal">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneCodepostal">Sirene Codepostal</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneCodepostal" type="text" name="sireneCodepostal" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneVilleLabel" for="ligne-prospect-sireneVille">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneVille">Sirene Ville</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneVille" type="text" name="sireneVille" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneLatitudeLabel" for="ligne-prospect-sireneLatitude">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneLatitude">Sirene Latitude</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneLatitude" type="text" name="sireneLatitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneLongitudeLabel" for="ligne-prospect-sireneLongitude">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneLongitude">Sirene Longitude</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneLongitude" type="text" name="sireneLongitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneEtatadministratifLabel" for="ligne-prospect-sireneEtatadministratif">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneEtatadministratif">Sirene Etatadministratif</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneEtatadministratif" type="text" name="sireneEtatadministratif" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneNomenclatureLabel" for="ligne-prospect-sireneNomenclature">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneNomenclature">Sirene Nomenclature</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneNomenclature" type="text" name="sireneNomenclature" />
                </AvGroup>
                <AvGroup>
                  <Label id="sireneTrancheeffectifLabel" for="ligne-prospect-sireneTrancheeffectif">
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneTrancheeffectif">Sirene Trancheeffectif</Translate>
                  </Label>
                  <AvField id="ligne-prospect-sireneTrancheeffectif" type="text" name="sireneTrancheeffectif" />
                </AvGroup>
                <AvGroup>
                  <Label for="ligne-prospect-importLigne">
                    <Translate contentKey="cleanclientApp.ligneProspect.importLigne">Import Ligne</Translate>
                  </Label>
                  <AvInput id="ligne-prospect-importLigne" type="select" className="form-control" name="importLigne.id">
                    <option value="" key="0" />
                    {importLignes
                      ? importLignes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ligne-prospect" replace color="info">
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
  importLignes: storeState.importLigne.entities,
  ligneProspectEntity: storeState.ligneProspect.entity,
  loading: storeState.ligneProspect.loading,
  updating: storeState.ligneProspect.updating,
  updateSuccess: storeState.ligneProspect.updateSuccess
});

const mapDispatchToProps = {
  getImportLignes,
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
)(LigneProspectUpdate);
