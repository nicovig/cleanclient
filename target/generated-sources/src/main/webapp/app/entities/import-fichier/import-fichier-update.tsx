import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './import-fichier.reducer';
import { IImportFichier } from 'app/shared/model/import-fichier.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImportFichierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImportFichierUpdateState {
  isNew: boolean;
  userId: string;
}

export class ImportFichierUpdate extends React.Component<IImportFichierUpdateProps, IImportFichierUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.dateDeDebut = convertDateTimeToServer(values.dateDeDebut);

    if (errors.length === 0) {
      const { importFichierEntity } = this.props;
      const entity = {
        ...importFichierEntity,
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
    this.props.history.push('/entity/import-fichier');
  };

  render() {
    const { importFichierEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="cleanclientApp.importFichier.home.createOrEditLabel">
              <Translate contentKey="cleanclientApp.importFichier.home.createOrEditLabel">Create or edit a ImportFichier</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : importFichierEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="import-fichier-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="import-fichier-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="traitementIdLabel" for="import-fichier-traitementId">
                    <Translate contentKey="cleanclientApp.importFichier.traitementId">Traitement Id</Translate>
                  </Label>
                  <AvField id="import-fichier-traitementId" type="string" className="form-control" name="traitementId" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateDeDebutLabel" for="import-fichier-dateDeDebut">
                    <Translate contentKey="cleanclientApp.importFichier.dateDeDebut">Date De Debut</Translate>
                  </Label>
                  <AvInput
                    id="import-fichier-dateDeDebut"
                    type="datetime-local"
                    className="form-control"
                    name="dateDeDebut"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.importFichierEntity.dateDeDebut)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="import-fichier-user">
                    <Translate contentKey="cleanclientApp.importFichier.user">User</Translate>
                  </Label>
                  <AvInput id="import-fichier-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/import-fichier" replace color="info">
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
  users: storeState.userManagement.users,
  importFichierEntity: storeState.importFichier.entity,
  loading: storeState.importFichier.loading,
  updating: storeState.importFichier.updating,
  updateSuccess: storeState.importFichier.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(ImportFichierUpdate);
