import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './import-fichier.reducer';
import { IImportFichier } from 'app/shared/model/import-fichier.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT } from 'app/config/constants';

export interface IImportFichierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ImportFichier extends React.Component<IImportFichierProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { importFichierList, match } = this.props;
    return (
      <div>
        <h2 id="import-fichier-heading">
          <Translate contentKey="cleanclientApp.importFichier.home.title">Import Fichiers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cleanclientApp.importFichier.home.createLabel">Create new Import Fichier</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importFichier.traitementId">Traitement Id</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importFichier.dateDeDebut">Date De Debut</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importFichier.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {importFichierList.map((importFichier, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${importFichier.id}`} color="link" size="sm">
                      {importFichier.id}
                    </Button>
                  </td>
                  <td>{importFichier.traitementId}</td>
                  <td>
                    <TextFormat type="date" value={importFichier.dateDeDebut} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{importFichier.user ? importFichier.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${importFichier.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${importFichier.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${importFichier.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ importFichier }: IRootState) => ({
  importFichierList: importFichier.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportFichier);
