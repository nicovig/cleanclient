import React, { Component } from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Card, Button, CardTitle, CardText, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import {  getEntity, getEntityStatus, getSampleResult } from 'app/entities/import-fichier/import-fichier.reducer';

export interface IPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPaymentState {

}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {

  render() {
    return (
      <div>
          Toto
      </div>
    );
  }
}

const mapStateToProps = ({ importFichier }: IRootState) => ({
    importFichierEntity: importFichier.entity,
    status: importFichier.status,
    result: importFichier.result
  });
  
  const mapDispatchToProps = { getEntity, getEntityStatus, getSampleResult };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Payment);