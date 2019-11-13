import './import-fichier-detail.scss';

import React from 'react';
import { Container } from 'reactstrap';
import ReactTable from 'react-table';
import { IImportLigne } from 'app/shared/model/import-ligne.model';


export interface IImportFichierResultEchecProps {
    data;
    columns;
}

export class ImportFichierResultEchec extends React.Component<IImportFichierResultEchecProps> {


  render() {
    return (    
          <ReactTable
            className="table"
            showPagination={false}
            sortable={false}
            data={this.props.data}
            columns={this.props.columns}
            style={{
              height: '400px',
              width: '67.5rem'
            }}
            pageSize={this.props.data.length}
          />
    );
  }
}

export default ImportFichierResultEchec;
