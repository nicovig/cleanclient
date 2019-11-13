import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import {RESULTS} from './home-demo-data';

import { Card, CardText, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import { ImportFichierResultMap } from 'app/entities/import-fichier/import-fichier-result-map';
import ImportFichierResultEchec  from 'app/entities/import-fichier/import-fichier-result-echec';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }
  render() {
    const { account } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <h2 className="text-center">
              <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
            </h2>
            <p className="text-center">
              <Translate contentKey="home.subtitle">This is your homepage</Translate>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card body className="text-center">
              <CardTitle>Nettoyage B to B</CardTitle>
              <CardSubtitle>Nettoyez vos fichiers clients</CardSubtitle>
              <CardText>Nous dédoublonnons, identifions et nettoyons vos données clients</CardText>
              <Button tag={Link} to={`/upload`}>
                Essayer
              </Button>
            </Card>
          </Col>
          <Col md="4">
            <Card body className="text-center">
              <CardTitle>Cartographie interactive</CardTitle>
              <CardSubtitle>Parcourez la France selon vos secteurs d'activité</CardSubtitle>
              <CardText>Nous dédoublonnons, identifions et nettoyons vos données clients</CardText>
              <Button tag={Link} to={`/`}>
                Essayer
              </Button>
            </Card>
          </Col>
          <Col md="4">
            <Card body className="text-center">
              <CardTitle>Recherche de prospects</CardTitle>
              <CardSubtitle>Vos futurs clients connaissent vos clients</CardSubtitle>
              <CardText>Par analyse géographique et de secteur d'activités, nous trouvons vos futurs clients</CardText>
              <Button tag={Link} to={`/`}>
                Essayer
              </Button>
            </Card>
          </Col>
        </Row>
        {/*<Row>
          <Col md="12">
            <ImportFichierResultMap result={RESULTS} />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <ImportFichierResultEchec echecs={RESULTS.echecs} />
          </Col>
        </Row>*/}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
