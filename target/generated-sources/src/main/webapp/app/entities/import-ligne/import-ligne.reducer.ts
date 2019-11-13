import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImportLigne, defaultValue } from 'app/shared/model/import-ligne.model';

export const ACTION_TYPES = {
  FETCH_IMPORTLIGNE_LIST: 'importLigne/FETCH_IMPORTLIGNE_LIST',
  FETCH_IMPORTLIGNE: 'importLigne/FETCH_IMPORTLIGNE',
  CREATE_IMPORTLIGNE: 'importLigne/CREATE_IMPORTLIGNE',
  UPDATE_IMPORTLIGNE: 'importLigne/UPDATE_IMPORTLIGNE',
  DELETE_IMPORTLIGNE: 'importLigne/DELETE_IMPORTLIGNE',
  RESET: 'importLigne/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImportLigne>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImportLigneState = Readonly<typeof initialState>;

// Reducer

export default (state: ImportLigneState = initialState, action): ImportLigneState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMPORTLIGNE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMPORTLIGNE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMPORTLIGNE):
    case REQUEST(ACTION_TYPES.UPDATE_IMPORTLIGNE):
    case REQUEST(ACTION_TYPES.DELETE_IMPORTLIGNE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMPORTLIGNE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMPORTLIGNE):
    case FAILURE(ACTION_TYPES.CREATE_IMPORTLIGNE):
    case FAILURE(ACTION_TYPES.UPDATE_IMPORTLIGNE):
    case FAILURE(ACTION_TYPES.DELETE_IMPORTLIGNE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMPORTLIGNE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMPORTLIGNE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMPORTLIGNE):
    case SUCCESS(ACTION_TYPES.UPDATE_IMPORTLIGNE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMPORTLIGNE):
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

const apiUrl = 'api/import-lignes';

// Actions

export const getEntities: ICrudGetAllAction<IImportLigne> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMPORTLIGNE_LIST,
  payload: axios.get<IImportLigne>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImportLigne> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMPORTLIGNE,
    payload: axios.get<IImportLigne>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImportLigne> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMPORTLIGNE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImportLigne> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMPORTLIGNE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImportLigne> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMPORTLIGNE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
