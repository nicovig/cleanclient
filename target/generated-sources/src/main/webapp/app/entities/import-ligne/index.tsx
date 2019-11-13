import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImportLigne from './import-ligne';
import ImportLigneDetail from './import-ligne-detail';
import ImportLigneUpdate from './import-ligne-update';
import ImportLigneDeleteDialog from './import-ligne-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImportLigneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImportLigneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImportLigneDetail} />
      <ErrorBoundaryRoute path={match.url} component={ImportLigne} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImportLigneDeleteDialog} />
  </>
);

export default Routes;
