import { Moment } from 'moment';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
import { IUser } from 'app/shared/model/user.model';

export interface IImportFichier {
  id?: number,
  traitementId?: number,
  dateDeDebut?: Moment,
  importLignes?: IImportLigne[],
  user?: IUser

}
export interface IImportFichierStatus {
  nbClientsTotal: number,
  nbClientsTraites: number,
  nbClientsTrouves: number,
  nbClientsAConfirmer: number,
  nbClientsEchec: number,
  nbProspects: number
}

export interface IImportFichierExport {
  nom: string,
  adresse: string,
  codepostal: string,
  ville: string,
  siret: string
}

export const defaultValue: Readonly<IImportFichier> = {};
