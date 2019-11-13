import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFacture, ISearchResult, defaultValue } from 'app/shared/model/facture.model';

export const ACTION_TYPES = {
  FETCH_FACTURE_LIST: 'facture/FETCH_FACTURE_LIST',
  FETCH_FACTURE: 'facture/FETCH_FACTURE',
  FETCH_FACTURE_PDF: 'facture/FETCH_FACTURE_PDF',
  FETCH_FACTURE_SEARCH: 'facture/FETCH_FACTURE_SEARCH',
  RESET_FACTURE_SEARCH: 'facture/RESET_FACTURE_SEARCH',
  CREATE_FACTURE: 'facture/CREATE_FACTURE',
  UPDATE_FACTURE: 'facture/UPDATE_FACTURE',
  DELETE_FACTURE: 'facture/DELETE_FACTURE',
  RESET: 'facture/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFacture>,
  searchResult: [] as ReadonlyArray<ISearchResult>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  pdfBase64 : '',
  pdf: Blob
};

export type FactureState = Readonly<typeof initialState>;

// Reducer

export default (state: FactureState = initialState, action): FactureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FACTURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FACTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FACTURE):
    case REQUEST(ACTION_TYPES.UPDATE_FACTURE):
    case REQUEST(ACTION_TYPES.DELETE_FACTURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FACTURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FACTURE):
    case FAILURE(ACTION_TYPES.CREATE_FACTURE):
    case FAILURE(ACTION_TYPES.UPDATE_FACTURE):
    case FAILURE(ACTION_TYPES.DELETE_FACTURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACTURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACTURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACTURE_SEARCH):
      return {
        ...state,
        loading: false,
        searchResult: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACTURE_PDF):
      return {
        ...state,
        loading: false,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FACTURE):
    case SUCCESS(ACTION_TYPES.UPDATE_FACTURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        pdfBase64: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FACTURE):
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
      case ACTION_TYPES.RESET_FACTURE_SEARCH:
        return {
          ...state,
          searchResult: []
        };
    default:
      return state;
  }
};

const apiUrl = 'api/factures';

// Actions

export const getEntitiesFacture: ICrudGetAllAction<IFacture> = (page, size, sort) => {
  const requestUrl = `api/myaccount/facture`;
  return {
    type: ACTION_TYPES.FETCH_FACTURE_LIST,
    payload: axios.get<IFacture>(requestUrl)
  };
};


export const getEntity: ICrudGetAction<IFacture> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FACTURE,
    payload: axios.get<IFacture>(requestUrl)
  };
};

export const getSearch: ICrudGetAction<IFacture> = raisonSociale => {
  const requestUrl = `${apiUrl}/etablissement/search`;
  return {
    type: ACTION_TYPES.FETCH_FACTURE_SEARCH,
    payload: axios.get<IFacture>(requestUrl, {params : raisonSociale})
  };
};

export const getFacturePdf = folder_root_name => {
  const requestUrl = `api/myaccount/facturePdf`;
  return {
    type: ACTION_TYPES.FETCH_FACTURE_PDF,
    payload: axios({
      url: requestUrl, //your url
      params: { folder_root_name : folder_root_name},
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'facture.pdf'); //or any other extension
       document.body.appendChild(link);
       link.click();
    })
  };
};

export const createEntity: ICrudPutAction<IFacture> = entity => async dispatch => {  
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FACTURE,
    payload: axios.post(`api/billing/${entity.hash}`, cleanEntity(entity))
  });
  dispatch(getEntitiesFacture());
  return result;
};

export const updateEntity: ICrudPutAction<IFacture> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FACTURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntitiesFacture());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFacture> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FACTURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntitiesFacture());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const resetFactureSearch = () => ({
  type: ACTION_TYPES.RESET_FACTURE_SEARCH
});