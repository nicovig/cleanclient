import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ligne-prospect.reducer';
import { ILigneProspect } from 'app/shared/model/ligne-prospect.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneProspectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class LigneProspect extends React.Component<ILigneProspectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { ligneProspectList, match } = this.props;
    return (
      <div>
        <h2 id="ligne-prospect-heading">
          <Translate contentKey="cleanclientApp.ligneProspect.home.title">Ligne Prospects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="cleanclientApp.ligneProspect.home.createLabel">Create new Ligne Prospect</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {ligneProspectList && ligneProspectList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneSiret">Sirene Siret</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneDenomination">Sirene Denomination</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneHousenumber">Sirene Housenumber</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneStreet">Sirene Street</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneCodepostal">Sirene Codepostal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneVille">Sirene Ville</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneLatitude">Sirene Latitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneLongitude">Sirene Longitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneEtatadministratif">Sirene Etatadministratif</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneNomenclature">Sirene Nomenclature</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.sireneTrancheeffectif">Sirene Trancheeffectif</Translate>
                  </th>
                  <th>
                    <Translate contentKey="cleanclientApp.ligneProspect.importLigne">Import Ligne</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ligneProspectList.map((ligneProspect, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${ligneProspect.id}`} color="link" size="sm">
                        {ligneProspect.id}
                      </Button>
                    </td>
                    <td>{ligneProspect.sireneSiret}</td>
                    <td>{ligneProspect.sireneDenomination}</td>
                    <td>{ligneProspect.sireneHousenumber}</td>
                    <td>{ligneProspect.sireneStreet}</td>
                    <td>{ligneProspect.sireneCodepostal}</td>
                    <td>{ligneProspect.sireneVille}</td>
                    <td>{ligneProspect.sireneLatitude}</td>
                    <td>{ligneProspect.sireneLongitude}</td>
                    <td>{ligneProspect.sireneEtatadministratif}</td>
                    <td>{ligneProspect.sireneNomenclature}</td>
                    <td>{ligneProspect.sireneTrancheeffectif}</td>
                    <td>
                      {ligneProspect.importLigne ? (
                        <Link to={`import-ligne/${ligneProspect.importLigne.id}`}>{ligneProspect.importLigne.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ligneProspect.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ligneProspect.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ligneProspect.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="cleanclientApp.ligneProspect.home.notFound">No Ligne Prospects found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ligneProspect }: IRootState) => ({
  ligneProspectList: ligneProspect.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LigneProspect);
