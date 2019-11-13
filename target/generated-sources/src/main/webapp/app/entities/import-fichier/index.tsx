import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImportFichier from './import-fichier';
import ImportFichierDetail from './import-fichier-detail';
import ImportFichierResult from './import-fichier-result';
import ImportFichierUpdate from './import-fichier-update';
import ImportFichierDeleteDialog from './import-fichier-delete-dialog';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImportFichierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImportFichierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImportFichierDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/result`} component={ImportFichierResult} />
      <ErrorBoundaryRoute path={match.url} component={ImportFichier} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImportFichierDeleteDialog} />
  </>
);

export default Routes;
