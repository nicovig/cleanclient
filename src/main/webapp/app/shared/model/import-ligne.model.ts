import { IImportFichier } from 'app/shared/model/import-fichier.model';
import { ILigneProspect } from 'app/shared/model/ligne-prospect.model';

export interface IImportLigne {
  id?: number;
  statut?: string;
  matchingMethod?: string;
  idExterne?: string;
  nom?: string;
  adresse?: string;
  cp?: string;
  ville?: string;
  siret?: string;
  geolocScore?: number;
  geolocLabel?: string;
  geolocHousenumber?: string;
  geolocStreet?: string;
  geolocPostcode?: string;
  geolocCity?: string;
  geolocLatitude?: string;
  geolocLongitude?: string;
  sireneSiret?: string;
  sireneDenomination?: string;
  sireneHousenumber?: string;
  sireneStreet?: string;
  sireneCodepostal?: string;
  sireneVille?: string;
  sireneLatitude?: string;
  sireneLongitude?: string;
  sireneEtatadministratif?: string;
  sireneNomenclature?: string;
  sireneTrancheeffectif?: string;
  elasticScore?: number;
  importFichier?: IImportFichier;
  ligneProspects?: ILigneProspect[];
}

export const defaultValue: Readonly<IImportLigne> = {};
