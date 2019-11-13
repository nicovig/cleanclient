import React from 'react';
import { Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { saveAs } from 'file-saver';
import { UPLOAD_HEADERS } from './upload-constants';

export interface IUploadStructureControlProp {
  columns: any[];
  sayFileOk;
  isFileOk: boolean;
}
export class UploadStructureControl extends React.Component<IUploadStructureControlProp> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _getUnmatchedColumns(columns) {
    const unmatchedColumns = UPLOAD_HEADERS.filter(item => columns.findIndex(item2 => item2 === item) === -1) || [];
    if (this.props.isFileOk !== (unmatchedColumns.length === 0)) this.props.sayFileOk(unmatchedColumns.length === 0);
    return unmatchedColumns;
  }
  render() {
    const unmatchedColumns = this._getUnmatchedColumns(this.props.columns);
    return (
      unmatchedColumns.length > 0 && (
        <Alert color="danger">
          <Translate contentKey="upload.errorStructure">Import your B to B Customers excel file</Translate>
          <ul>
            {unmatchedColumns.map((item, i) => (
              <li key={`itemerror-${i}`} className="justify-content-between">
                {item}
              </li>
            ))}
          </ul>
        </Alert>
      )
    );
  }
}
