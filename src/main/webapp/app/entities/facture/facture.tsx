import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './facture.reducer';
import { IFacture } from 'app/shared/model/facture.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFactureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Facture extends React.Component<IFactureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { factureList, match } = this.props;
    return (
      <div>
        <h2 id="facture-heading">
          <Translate contentKey="cleanclientApp.facture.home.title">Factures</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cleanclientApp.facture.home.createLabel">Create new Facture</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {factureList && factureList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.particulier">Particulier</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.raisonSociale">Raison Sociale</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.siret">Siret</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.prenom">Prenom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.telephone">Telephone</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.noVoie">No Voie</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.rue">Rue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.cp">Cp</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.ville">Ville</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.mail">Mail</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.paye">Paye</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.tva">Tva</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.montant">Montant</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.facture.importFichier">Import Fichier</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {factureList.map((facture, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${facture.id}`} color="link" size="sm">
                        {facture.id}
                      </Button>
                    </td>
                    <td>{facture.particulier ? 'true' : 'false'}</td>
                    <td>{facture.raisonSociale}</td>
                    <td>{facture.siret}</td>
                    <td>{facture.nom}</td>
                    <td>{facture.prenom}</td>
                    <td>{facture.telephone}</td>
                    <td>{facture.noVoie}</td>
                    <td>{facture.rue}</td>
                    <td>{facture.cp}</td>
                    <td>{facture.ville}</td>
                    <td>{facture.mail}</td>
                    <td>{facture.paye ? 'true' : 'false'}</td>
                    <td>{facture.tva}</td>
                    <td>{facture.montant}</td>
                    <td>
                      {facture.importFichier ? (
                        <Link to={`import-fichier/${facture.importFichier.id}`}>{facture.importFichier.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${facture.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${facture.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${facture.id}/delete`} color="danger" size="sm">
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
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="cleanclientApp.facture.home.notFound">No Factures found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ facture }: IRootState) => ({
  factureList: facture.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facture);
