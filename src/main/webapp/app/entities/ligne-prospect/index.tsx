import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneProspect from './ligne-prospect';
import LigneProspectDetail from './ligne-prospect-detail';
import LigneProspectUpdate from './ligne-prospect-update';
import LigneProspectDeleteDialog from './ligne-prospect-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LigneProspectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LigneProspectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneProspectDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneProspect} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LigneProspectDeleteDialog} />
  </>
);

export default Routes;
