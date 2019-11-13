import { IImportLigne } from 'app/shared/model/import-ligne.model';

export interface ILigneProspect {
  id?: number;
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
  importLigne?: IImportLigne;
}

export const defaultValue: Readonly<ILigneProspect> = {};
