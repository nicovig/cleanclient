
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export interface IImportFichierModalViewState {
    modal: boolean;
    className: string;
  }

export interface IImportFichierModalViewProps {
   modal: boolean;
   className: string;
  }  

export class ImportFichierModalView extends React.Component<IImportFichierModalViewState, IImportFichierModalViewProps> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      className: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
            <FontAwesomeIcon icon="file-export" />
            {' '}Voir
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
          <ModalHeader>Vue du fichier nettoyé</ModalHeader>
          <ModalBody>
            <b>Ici tu mettras le titre que tu veux</b><br />
            Ici tu mettras ton tableau
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
                <FontAwesomeIcon icon="file-export" />
                {' '}Exporter
                </Button>
            <Button color="secondary" onClick={this.toggle}>Retour</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ImportFichierModalView;