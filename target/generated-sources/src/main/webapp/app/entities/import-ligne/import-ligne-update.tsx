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
                  <Label id="externalIdLabel" for="import-ligne-externalId">
                    <Translate contentKey="cleanclientApp.importLigne.externalId">External Id</Translate>
                  </Label>
                  <AvField id="import-ligne-externalId" type="text" name="externalId" />
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
