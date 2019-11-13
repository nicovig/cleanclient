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
import { getEntity, updateEntity, createEntity, reset } from './facture.reducer';
import { IFacture } from 'app/shared/model/facture.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFactureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFactureUpdateState {
  isNew: boolean;
  importFichierId: string;
}

export class FactureUpdate extends React.Component<IFactureUpdateProps, IFactureUpdateState> {
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
      const { factureEntity } = this.props;
      const entity = {
        ...factureEntity,
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
    this.props.history.push('/entity/facture');
  };

  render() {
    const { factureEntity, importFichiers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cleanclientApp.facture.home.createOrEditLabel">
              <Translate contentKey="cleanclientApp.facture.home.createOrEditLabel">Create or edit a Facture</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : factureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="facture-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="facture-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="particulierLabel" check>
                    <AvInput id="facture-particulier" type="checkbox" className="form-control" name="particulier" />
                    <Translate contentKey="cleanclientApp.facture.particulier">Particulier</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="raisonSocialeLabel" for="facture-raisonSociale">
                    <Translate contentKey="cleanclientApp.facture.raisonSociale">Raison Sociale</Translate>
                  </Label>
                  <AvField id="facture-raisonSociale" type="text" name="raisonSociale" />
                </AvGroup>
                <AvGroup>
                  <Label id="siretLabel" for="facture-siret">
                    <Translate contentKey="cleanclientApp.facture.siret">Siret</Translate>
                  </Label>
                  <AvField id="facture-siret" type="text" name="siret" />
                </AvGroup>
                <AvGroup>
                  <Label id="nomLabel" for="facture-nom">
                    <Translate contentKey="cleanclientApp.facture.nom">Nom</Translate>
                  </Label>
                  <AvField id="facture-nom" type="text" name="nom" />
                </AvGroup>
                <AvGroup>
                  <Label id="prenomLabel" for="facture-prenom">
                    <Translate contentKey="cleanclientApp.facture.prenom">Prenom</Translate>
                  </Label>
                  <AvField id="facture-prenom" type="text" name="prenom" />
                </AvGroup>
                <AvGroup>
                  <Label id="telephoneLabel" for="facture-telephone">
                    <Translate contentKey="cleanclientApp.facture.telephone">Telephone</Translate>
                  </Label>
                  <AvField id="facture-telephone" type="text" name="telephone" />
                </AvGroup>
                <AvGroup>
                  <Label id="noVoieLabel" for="facture-noVoie">
                    <Translate contentKey="cleanclientApp.facture.noVoie">No Voie</Translate>
                  </Label>
                  <AvField id="facture-noVoie" type="text" name="noVoie" />
                </AvGroup>
                <AvGroup>
                  <Label id="rueLabel" for="facture-rue">
                    <Translate contentKey="cleanclientApp.facture.rue">Rue</Translate>
                  </Label>
                  <AvField id="facture-rue" type="text" name="rue" />
                </AvGroup>
                <AvGroup>
                  <Label id="cpLabel" for="facture-cp">
                    <Translate contentKey="cleanclientApp.facture.cp">Cp</Translate>
                  </Label>
                  <AvField id="facture-cp" type="text" name="cp" />
                </AvGroup>
                <AvGroup>
                  <Label id="villeLabel" for="facture-ville">
                    <Translate contentKey="cleanclientApp.facture.ville">Ville</Translate>
                  </Label>
                  <AvField id="facture-ville" type="text" name="ville" />
                </AvGroup>
                <AvGroup>
                  <Label id="mailLabel" for="facture-mail">
                    <Translate contentKey="cleanclientApp.facture.mail">Mail</Translate>
                  </Label>
                  <AvField id="facture-mail" type="text" name="mail" />
                </AvGroup>
                <AvGroup>
                  <Label id="payeLabel" check>
                    <AvInput id="facture-paye" type="checkbox" className="form-control" name="paye" />
                    <Translate contentKey="cleanclientApp.facture.paye">Paye</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="tvaLabel" for="facture-tva">
                    <Translate contentKey="cleanclientApp.facture.tva">Tva</Translate>
                  </Label>
                  <AvField id="facture-tva" type="string" className="form-control" name="tva" />
                </AvGroup>
                <AvGroup>
                  <Label id="montantLabel" for="facture-montant">
                    <Translate contentKey="cleanclientApp.facture.montant">Montant</Translate>
                  </Label>
                  <AvField id="facture-montant" type="string" className="form-control" name="montant" />
                </AvGroup>
                <AvGroup>
                  <Label for="facture-importFichier">
                    <Translate contentKey="cleanclientApp.facture.importFichier">Import Fichier</Translate>
                  </Label>
                  <AvInput id="facture-importFichier" type="select" className="form-control" name="importFichier.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/facture" replace color="info">
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
  factureEntity: storeState.facture.entity,
  loading: storeState.facture.loading,
  updating: storeState.facture.updating,
  updateSuccess: storeState.facture.updateSuccess
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
)(FactureUpdate);
