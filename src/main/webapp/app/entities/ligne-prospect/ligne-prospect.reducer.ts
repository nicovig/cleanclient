import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILigneProspect, defaultValue } from 'app/shared/model/ligne-prospect.model';

export const ACTION_TYPES = {
  FETCH_LIGNEPROSPECT_LIST: 'ligneProspect/FETCH_LIGNEPROSPECT_LIST',
  FETCH_LIGNEPROSPECT: 'ligneProspect/FETCH_LIGNEPROSPECT',
  CREATE_LIGNEPROSPECT: 'ligneProspect/CREATE_LIGNEPROSPECT',
  UPDATE_LIGNEPROSPECT: 'ligneProspect/UPDATE_LIGNEPROSPECT',
  DELETE_LIGNEPROSPECT: 'ligneProspect/DELETE_LIGNEPROSPECT',
  RESET: 'ligneProspect/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILigneProspect>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LigneProspectState = Readonly<typeof initialState>;

// Reducer

export default (state: LigneProspectState = initialState, action): LigneProspectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LIGNEPROSPECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LIGNEPROSPECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LIGNEPROSPECT):
    case REQUEST(ACTION_TYPES.UPDATE_LIGNEPROSPECT):
    case REQUEST(ACTION_TYPES.DELETE_LIGNEPROSPECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LIGNEPROSPECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LIGNEPROSPECT):
    case FAILURE(ACTION_TYPES.CREATE_LIGNEPROSPECT):
    case FAILURE(ACTION_TYPES.UPDATE_LIGNEPROSPECT):
    case FAILURE(ACTION_TYPES.DELETE_LIGNEPROSPECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEPROSPECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LIGNEPROSPECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LIGNEPROSPECT):
    case SUCCESS(ACTION_TYPES.UPDATE_LIGNEPROSPECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LIGNEPROSPECT):
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

const apiUrl = 'api/ligne-prospects';

// Actions

export const getEntities: ICrudGetAllAction<ILigneProspect> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LIGNEPROSPECT_LIST,
  payload: axios.get<ILigneProspect>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILigneProspect> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LIGNEPROSPECT,
    payload: axios.get<ILigneProspect>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILigneProspect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LIGNEPROSPECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILigneProspect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LIGNEPROSPECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILigneProspect> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LIGNEPROSPECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
