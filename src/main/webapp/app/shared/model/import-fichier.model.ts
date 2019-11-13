import { Moment } from 'moment';
import { IImportLigne } from 'app/shared/model/import-ligne.model';
import { IUser } from 'app/shared/model/user.model';

export interface IImportFichier {
  id?: number,
  traitementId?: number,
  dateDebut?: Moment,
  dateFin?: Moment,
  importLignes?: IImportLigne[],
  user?: IUser,
  hash?: string,
  frontKey?: string
}
export interface IImportFichierStatutDTO {
  importFichier: IImportFichier,
  geolocStatut: IStatutDTO,
  cleanStatut: IStatutDTO,
  prospectStatut: IStatutDTO
}

export interface IStatutDTO {
  queueSize: number,
  isStarted: boolean,
  isFinished: boolean,
  isAsked: boolean,
  nombreATraite: number,
  nombreTraite: number
}


export interface IImportFichierExport {
  nom: string,
  adresse: string,
  codepostal: string,
  ville: string,
  siret: string
}

export const defaultValue: Readonly<IImportFichier> = {};
