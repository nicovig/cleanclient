import React from 'react';
import { Button, InputGroup, Col, Row, Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { ILocalisation } from 'app/shared/model/localisation.model';

export interface IResultMapInfo {
  localisation: ILocalisation;
}

class ResultMapInfo extends React.Component<IResultMapInfo> {
  constructor(props) {
    super(props);
  }

  render() {
    const { localisation } = this.props;
    return (
      <Card >
        {(localisation.nom && (
          <div>
            <CardTitle>{localisation.nom}</CardTitle>
            <CardSubtitle>
              {localisation.adresse}
            </CardSubtitle>
            <CardSubtitle>
              {localisation.cp}{' '}{localisation.ville}
            </CardSubtitle>
            <CardSubtitle>
              Activité : {localisation.nomenclature}
            </CardSubtitle>
            <CardSubtitle>
              Tranche d'effectifs : {localisation.trancheeffectif}
            </CardSubtitle>
          </div>
        )) || (
          <div>
            <CardTitle>Passez sur les marqueurs pour voir les entreprises rapprochées</CardTitle>
            <CardSubtitle />
          </div>
        )}
      </Card>
    );
  }
}
export default ResultMapInfo;
