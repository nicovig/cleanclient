import './upload.scss';
import { IImportFichier } from 'app/shared/model/import-fichier.model';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
import {createEntity, getEntity} from 'app/entities/import-fichier/import-fichier.reducer';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Button } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import ReactTable from 'react-table';
// tslint:disable-next-line
import 'react-table/react-table.css';
import { UploadModalSheet } from './upload-modal-sheet';
import { UploadModelDownload } from './upload-model-download';
import { UploadStructureControl } from './upload-structure-control';
import moment from 'moment';

export interface IUploadProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUploadState {
  rows: any[];
  columns: Array<{ Header: string; accessor: string }>;
  filename: '';
  excelSheets: String[];
  excelWorkbook: any;
  excelSheetsChosen: '';
  isFileOk: boolean;
}

export class Upload extends React.Component<IUploadProp, IUploadState> {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columns: [],
      filename: '',
      excelSheets: [],
      excelWorkbook: {},
      excelSheetsChosen: '',
      isFileOk: false,
      
    };
  }

  componentDidMount() {
    this.props.getSession();
    document.title = 'Importez vos données clients';
  }


    componentWillUpdate(nextProps) {
      if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
        this.props.history.push('/entity/import-fichier/'+nextProps.importFichierEntity.id);
      }
    }

  _handleFileInputChange = evt => {
    const f = evt.target.files[0];

    this.setState({ filename: f.name });

    const reader = new FileReader();

    reader.onload = evt2 => {
      const fr = evt2.target as FileReader;
      // tslint:disable-next-line
      const bstr = fr.result;

      const wb = XLSX.read(bstr, { type: 'binary' });
      this.setState({ excelWorkbook: wb });
    };
    reader.readAsBinaryString(f);
  };

  _clickFileInput = evt => {
    const fileUpload = document.getElementById('fileUploadButton');
    fileUpload.click();
  };

  _chooseSheet = sheetName => {
    const wb = this.state.excelWorkbook;
    const sheetIndex = wb.SheetNames.findIndex(item => item === sheetName);
    if (sheetIndex !== -1) {
      const wsname = wb.SheetNames[sheetIndex];
      const ws = wb.Sheets[wsname];

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
      /* Update state */
      if (data.length > 0) {
        this.setState({ rows: data });
        const columns = Object.keys(data[0]).map((key) => {
          return {
            Header: key,
            accessor: key
          };
        });
        // tslint:disable-next-line
        this.setState({ columns: columns });
      }
      this._cancelModal();
    } else {
    }
  };

  _cancelModal = () => {
    moment.now;
    this.setState({ excelWorkbook: {} });
  };

  _downloadUploadModel = () => {};

  _sayFileOk = isFileOk => {
    this.setState({ isFileOk: isFileOk });
  };

  saveEntity = () => {
    const { rows } = this.state 
    let importLigneArray:IImportLigne[] = [];
 
    rows.forEach( element => {
      const row: IImportLigne = {
        nom : element.nom,
        adresse : element.adresse,
        cp : element.codepostal,
        ville : element.ville,
        siret : element.siret
      }
      importLigneArray.push(row)
    });
 
    const entity : IImportFichier = {
      dateDeDebut : moment(),
      importLignes : importLigneArray
    };
 
    this.props.createEntity( entity );
    };

  getFichierCree = () => {
    const entity : IImportFichier = { } 

    this.props.getEntity(entity.id);

    return entity
  }  

  render() {
    const { rows } = this.state;
    const { columns } = this.state;
    return (
      <div>
        <Row>
          <Col md="12">
            <h2 className="text-center">
              <Translate contentKey="upload.title">Import your B to B Customers excel file</Translate>
            </h2>
          </Col>
          <Col md={{ size: 6, offset: 3 }}>
            <Alert color="warning">
              <Translate contentKey="upload.warning">Import your B to B Customers excel file</Translate>
              <UploadModelDownload />
            </Alert>
          </Col>
          <Col md={{ size: 6, offset: 3 }}>
            <Alert color="success">
              <Translate contentKey="upload.advice">Import your B to B Customers excel file</Translate>
            </Alert>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Input
              type="file"
              name="fileUploadButton"
              id="fileUploadButton"
              placeholder="with a placeholder"
              onChange={this._handleFileInputChange}
              // tslint:disable-next-line
              onClick={event => {
                event.target.value = null;
              }}
            />
            <Button color="primary" onClick={this._clickFileInput}>
              {rows.length === 0 ? (
                <Translate contentKey="upload.buttonLabel">Import your B to B Customers excel file</Translate>
              ) : (
                <Translate contentKey="upload.buttonModifyLabel">Import your B to B Customers excel file</Translate>
              )}
            </Button>
            <UploadModalSheet cancelModal={this._cancelModal} excelWorkbook={this.state.excelWorkbook} chooseSheet={this._chooseSheet} />
          </Col>
        </Row>
        {rows.length > 0 && (
          <Row className="upload-preview">
            <Col md="12">
              <h2 className="text-center">
                <Translate contentKey="upload.preview">Preview</Translate>
                {this.state.filename}
              </h2>
            </Col>
            <Col md={{ size: 4, offset: 4 }}>
              {this.state.isFileOk && (
                <Alert className="clearfix" color="success">
                <Translate contentKey="upload.file-is-ok">Import your B to B Customers excel file</Translate>
                <Button color="success" 
                        className="float-right" 
                        onClick={this.saveEntity}
                        ><Translate contentKey="upload.launch">Launch</Translate>
                </Button>
                </Alert>
              )}
            </Col>
            <Col md={{ size: 6, offset: 3 }}>
              <UploadStructureControl
                columns={columns.map(item => item.accessor)}
                sayFileOk={this._sayFileOk}
                isFileOk={this.state.isFileOk}
              />
            </Col>
            <Col md="12">
              <ReactTable
                showPagination={false}
                data={rows}
                columns={columns}
                style={{
                  height: Math.min(40 + rows.length * 40, 400) + 'px'
                }}
                pageSize={rows.length}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  importFichierEntity: storeState.importFichier.entity,
  updateSuccess: storeState.importFichier.updateSuccess
});

const mapDispatchToProps = { getSession, createEntity, getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
