import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImportFichier, IImportFichierStatus, IImportFichierExport, defaultValue } from 'app/shared/model/import-fichier.model';
import { IResult } from 'app/shared/model/result.model';

export const ACTION_TYPES = {
  FETCH_IMPORTFICHIER_LIST: 'importFichier/FETCH_IMPORTFICHIER_LIST',
  FETCH_IMPORTFICHIER: 'importFichier/FETCH_IMPORTFICHIER',
  FETCH_IMPORTFICHIER_STATUS: 'importFichier/STATUS',
  FETCH_IMPORTFICHIER_EXPORT: 'importFichier/EXPORT',
  FETCH_IMPORTFICHIER_RESULT: 'importFichier/RESULT',
  CREATE_IMPORTFICHIER: 'importFichier/CREATE_IMPORTFICHIER',
  UPDATE_IMPORTFICHIER: 'importFichier/UPDATE_IMPORTFICHIER',
  DELETE_IMPORTFICHIER: 'importFichier/DELETE_IMPORTFICHIER',
  RESET: 'importFichier/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImportFichier>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  status: {} as IImportFichierStatus,
  data: [] as Array<IImportFichierExport>,
  result: {} as IResult
};

export type ImportFichierState = Readonly<typeof initialState>;

// Reducer

export default (state: ImportFichierState = initialState, action): ImportFichierState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMPORTFICHIER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMPORTFICHIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMPORTFICHIER):
    case REQUEST(ACTION_TYPES.UPDATE_IMPORTFICHIER):
    case REQUEST(ACTION_TYPES.DELETE_IMPORTFICHIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMPORTFICHIER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMPORTFICHIER):
    case FAILURE(ACTION_TYPES.CREATE_IMPORTFICHIER):
    case FAILURE(ACTION_TYPES.UPDATE_IMPORTFICHIER):
    case FAILURE(ACTION_TYPES.DELETE_IMPORTFICHIER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMPORTFICHIER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMPORTFICHIER_STATUS):
      return {
        ...state,
        loading: false,
        status: action.payload.data
      };
    /*
  case SUCCESS(ACTION_TYPES.FETCH_IMPORTFICHIER_EXPORT):
    return {
      ...state,
      loading: false,
      data: action.payload.data
    }; 
    */
    case SUCCESS(ACTION_TYPES.FETCH_IMPORTFICHIER_RESULT):
      return {
        ...state,
        loading: false,
        result: action.payload.data
      };

    case SUCCESS(ACTION_TYPES.FETCH_IMPORTFICHIER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMPORTFICHIER):
    case SUCCESS(ACTION_TYPES.UPDATE_IMPORTFICHIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMPORTFICHIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/import-fichiers';

// Actions

export const getEntities: ICrudGetAllAction<IImportFichier> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMPORTFICHIER_LIST,
  payload: axios.get<IImportFichier>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImportFichier> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMPORTFICHIER,
    payload: axios.get<IImportFichier>(requestUrl)
  };
};

export const getEntityStatus: ICrudGetAction<IImportFichier> = id => {
  const requestUrl = `${apiUrl}/${id}/status`;
  return {
    type: ACTION_TYPES.FETCH_IMPORTFICHIER_STATUS,
    payload: axios.get<IImportFichier>(requestUrl)
  };
};
/*
export const getEntityExport: ICrudGetAction<IImportFichier> = id => {
  const requestUrl = `${apiUrl}/${id}/result`;
  return {
    type: ACTION_TYPES.FETCH_IMPORTFICHIER_EXPORT,
    payload: axios.get<IImportFichier>(requestUrl)
  };
};*/

export const getResult: ICrudGetAction<IResult> = id => {
  const requestUrl = `${apiUrl}/${id}/result`;
  return {
    type: ACTION_TYPES.FETCH_IMPORTFICHIER_RESULT,
    payload: axios.get<IResult>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImportFichier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMPORTFICHIER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImportFichier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMPORTFICHIER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImportFichier> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMPORTFICHIER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
