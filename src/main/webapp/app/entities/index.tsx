import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImportFichier from './import-fichier';
import ImportLigne from './import-ligne';
import LigneProspect from './ligne-prospect';
import Facture from './facture';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/import-fichier`} component={ImportFichier} />
      <ErrorBoundaryRoute path={`${match.url}/import-ligne`} component={ImportLigne} />
      <ErrorBoundaryRoute path={`${match.url}/ligne-prospect`} component={LigneProspect} />
      <ErrorBoundaryRoute path={`${match.url}/facture`} component={Facture} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
