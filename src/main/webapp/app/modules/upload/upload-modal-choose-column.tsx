import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import Select from 'react-select';
import { UPLOAD_HEADERS, UPLOAD_MODELE } from './upload-constants';

export interface IUploadModalChooseColumnState {
  modal: boolean;
  columnMapping: Array<{ modeleColumn: string; chosenColumn: string }>;
}

export interface IUploadModalChooseColumnProp {
  excelWorkbook: any;
  cancelModal;
  columnChoices: Array<{ Header: string; accessor: string }>;
  validateColumnChoices;
  excelSheetsChosen: string;
}

export class UploadModalChooseColumn extends React.Component<IUploadModalChooseColumnProp, IUploadModalChooseColumnState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      columnMapping: []
    };
  }

  componentDidMount() {
    document.title = 'Précisez le mapping des colonnes';
    const smartMapping = UPLOAD_HEADERS.map(item => {
      const mapping = this._smartFind(item);
      return mapping;
    });
    this.setState({ columnMapping: smartMapping });
  }

  _cancelModal = () => {
    this.props.cancelModal();
  };

  _handleChange = item => selectedOption => {
    if (this.state.columnMapping.findIndex(item1 => item1.modeleColumn === item) === -1) {
      this.setState({ columnMapping: [...this.state.columnMapping, { modeleColumn: item, chosenColumn: selectedOption.value }] });
    } else {
      this.setState({
        columnMapping: [
          ...this.state.columnMapping.filter(item2 => item2.modeleColumn !== item),
          { modeleColumn: item, chosenColumn: selectedOption.value }
        ]
      });
    }
  };

  _validateColumnChoices = () => {
    this.props.validateColumnChoices(this.state.columnMapping);
  };

  _smartFind = itemModel => {
    const indexSmart = this.props.columnChoices.findIndex(
      item =>
        item.Header.toUpperCase()
          .replace('-', '')
          .replace('_', '') === itemModel.toUpperCase()
    );
    if (indexSmart !== -1) {
      return {
        modeleColumn: itemModel,
        chosenColumn: this.props.columnChoices[indexSmart].Header
      };
    } else {
      return {
        modeleColumn: itemModel,
        chosenColumn: ''
      };
    }
  };

  _getValueForSelect(item) {
    const index = this.state.columnMapping.findIndex(item1 => item1.modeleColumn === item);
    if (index === -1) {
      return {
        value: '',
        label: ''
      };
    } else {
      return {
        value: this.state.columnMapping[index].chosenColumn,
        label: this.state.columnMapping[index].chosenColumn
      };
    }
  }

  render() {
    const { columnChoices } = this.props;
    const options = columnChoices.map(item => {
      return {
        label: item.Header,
        value: item.Header
      };
    });
    return (
      <div>
        <Modal isOpen={this.props.excelSheetsChosen !== '' && this.props.columnChoices.length > 0} toggle={this._cancelModal}>
          <ModalHeader toggle={this._cancelModal}>
            <Translate contentKey="upload.modal-column.title">Import your B to B Customers excel file</Translate>
          </ModalHeader>
          <ModalBody>
            {UPLOAD_HEADERS.map((item, i) => (
              <div key={`item-${i}`}>
                <Row>
                  <Col md="6">
                    {item} ( ex : {UPLOAD_MODELE[0][item]} )
                  </Col>
                  <Col md="6">
                    <Select onChange={this._handleChange(item)} options={options} value={this._getValueForSelect(item)} />
                  </Col>
                </Row>
                <br />
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._validateColumnChoices}>
              Valider mon choix
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
