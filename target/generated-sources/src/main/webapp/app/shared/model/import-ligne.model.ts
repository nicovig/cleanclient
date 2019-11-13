import { IImportFichier } from 'app/shared/model/import-fichier.model';

export interface IImportLigne {
  id?: number;
  nom?: string;
  adresse?: string;
  cp?: string;
  ville?: string;
  siret?: string;
  externalId?: string;
  importFichier?: IImportFichier;
}

export const defaultValue: Readonly<IImportLigne> = {};
