import React from 'react';
import { Button, InputGroup, Col, Row, Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { ILocalisation } from 'app/shared/model/localisation.model';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
import './myAccount.scss';


export interface IMyAccountFullResultMapInfo {
  infoEts: IImportLigne;
  mapped:boolean;
}

class MyAccountFullResultMapInfo extends React.Component<IMyAccountFullResultMapInfo> {
  constructor(props) {
    super(props);
  }

  render() {
    const { infoEts, mapped } = this.props;
    return (
      <div>
          {(infoEts.sireneDenomination && (
            <Card className="hoverbox">
              <CardTitle>{infoEts.sireneDenomination}</CardTitle>
              <CardSubtitle>
                {infoEts.sireneVille}{' '}{infoEts.sireneCodepostal}
              </CardSubtitle>
              <CardSubtitle>
                {infoEts.sireneStreet}
              </CardSubtitle>
              <CardSubtitle>
                Activité : {infoEts.sireneNomenclature}
              </CardSubtitle>
              <CardSubtitle>
                Tranche d'effectifs : {infoEts.sireneTrancheeffectif}
              </CardSubtitle>
              </Card >
          )) || mapped && (
            <Card className="hoverbox">
              <CardTitle>Passez sur les marqueurs pour voir les entreprises rapprochées et les prospects trouvés</CardTitle>
              <CardSubtitle /> 
            </Card >
          )}
        </div>
    );
  }
}
export default MyAccountFullResultMapInfo;
