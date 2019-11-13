import { IImportFichier } from 'app/shared/model/import-fichier.model';

export interface IFacture {
  id?: number;
  particulier?: boolean;
  raisonSociale?: string;
  siret?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  noVoie?: string;
  rue?: string;
  cp?: string;
  ville?: string;
  mail?: string;
  paye?: boolean;
  tva?: number;
  montant?: number;
  hash?:string;
  importFichier?: IImportFichier;
  loginUser?: string;
  mailUser?: string;
  passwordUser?: string;
}

export interface ISearchResult {
  denomination : string;
  housenumber : string;
  street : string;
  codepostal : string;
  ville : string;
  siret : string;
}

export const defaultValue: Readonly<IFacture> = {
  particulier: false,
  paye: false
};
