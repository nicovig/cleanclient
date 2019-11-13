import React from 'react';
import { Row, Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import { UPLOAD_MODELE } from './upload-constants';

export class UploadModelDownload extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _downloadUploadModel() {
    const data = UPLOAD_MODELE;

    const wsAssets = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsAssets, 'Clients');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Modèle Clients.xlsx');
  }

  render() {
    return <a onClick={this._downloadUploadModel}>{' Cliquez ici pour un modèle'}</a>;
  }
}
