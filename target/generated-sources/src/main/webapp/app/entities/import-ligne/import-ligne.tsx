import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './import-ligne.reducer';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImportLigneProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ImportLigne extends React.Component<IImportLigneProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { importLigneList, match } = this.props;
    return (
      <div>
        <h2 id="import-ligne-heading">
          <Translate contentKey="cleanclientApp.importLigne.home.title">Import Lignes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cleanclientApp.importLigne.home.createLabel">Create new Import Ligne</Translate>
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
                  <Translate contentKey="cleanclientApp.importLigne.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.adresse">Adresse</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.cp">Cp</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.ville">Ville</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.siret">Siret</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.externalId">External Id</Translate>
                </th>
                <th>
                  <Translate contentKey="cleanclientApp.importLigne.importFichier">Import Fichier</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {importLigneList.map((importLigne, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${importLigne.id}`} color="link" size="sm">
                      {importLigne.id}
                    </Button>
                  </td>
                  <td>{importLigne.nom}</td>
                  <td>{importLigne.adresse}</td>
                  <td>{importLigne.cp}</td>
                  <td>{importLigne.ville}</td>
                  <td>{importLigne.siret}</td>
                  <td>{importLigne.externalId}</td>
                  <td>
                    {importLigne.importFichier ? (
                      <Link to={`import-fichier/${importLigne.importFichier.id}`}>{importLigne.importFichier.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${importLigne.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${importLigne.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${importLigne.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ importLigne }: IRootState) => ({
  importLigneList: importLigne.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportLigne);
