import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import {  ISearchResult } from 'app/shared/model/facture.model';

export interface IBillingModalProp {
    searchResult : ReadonlyArray<ISearchResult>;
    toggle;
    chooseResult;
}

export class BillingModal extends React.Component<IBillingModalProp> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.searchResult && this.props.searchResult.length>0} 
               className="text-center">
          <ModalHeader className="text-center">
            Votre entreprise est-elle présente ?
          </ModalHeader>
          <ModalBody className="text-center">
          <ButtonGroup vertical>
              {this.props.searchResult.map((item, i) => (
                <Button key={`item-${i}`} color="primary" onClick={() => this.props.chooseResult(item)}>
                  {item.denomination} - {item.ville}
                </Button>
              ))}
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.props.toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
