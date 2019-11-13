import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ButtonGroup } from 'reactstrap';
import { Translate } from 'react-jhipster';

export interface IUploadModalSheetState {
  modal: boolean;
}

export interface IUploadModalSheetProp {
  excelWorkbook: any;
  cancelModal;
  chooseSheet;
  excelSheetsChosen: string;
}

export class UploadModalSheet extends React.Component<IUploadModalSheetProp, IUploadModalSheetState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidMount() {
    document.title = 'Choisissez votre feuille excel';
  }

  // currying : permet de découper en 2 la fonction. Donc dans le jsx on peut passer un paramètre à cette fonction sans que ce soit interprété comment un appel à la fonction
  _chooseSheet = sheet => evt => {
    this.props.chooseSheet(sheet);
  };

  _automaticChooseSheet = sheet => {
    this.props.chooseSheet(sheet);
  };

  _cancelModal = () => {
    this.props.cancelModal();
  };

  _isChoiceModalNecessary = () => {
    const excelSheets = this.props.excelWorkbook.SheetNames || [];
    const modal = excelSheets.length > 1 ? true : false;
    if (excelSheets.length === 1) {
      this._automaticChooseSheet(excelSheets[0]);
      return false;
    } else {
      if (excelSheets.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    const excelSheets = this.props.excelWorkbook.SheetNames || [];
    return (
      <div>
        <Modal
          isOpen={this._isChoiceModalNecessary() || this.props.excelSheetsChosen !== ''}
          toggle={this._cancelModal}
          className="text-center"
        >
          <ModalHeader toggle={this._cancelModal}>
            <Translate contentKey="upload.modal.title">Import your B to B Customers excel file</Translate>
          </ModalHeader>
          <ModalBody className="text-center">
            <ButtonGroup vertical>
              {excelSheets.map((item, i) => (
                <Button key={`item-${i}`} color="primary" onClick={this._chooseSheet(item)}>
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
