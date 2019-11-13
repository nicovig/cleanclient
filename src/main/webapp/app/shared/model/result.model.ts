import { ILocalisation } from './localisation.model';
import { IImportLigne } from './import-ligne.model';
import { ILigneProspect } from './ligne-prospect.model';

export interface IResult{
    echantillonClients ?: IImportLigne[],
    echantillonProspects?: ILigneProspect[],
    localisationClients ?: ILocalisation[],
    localisationProspects ?: ILocalisation[],
    echecs ?: IImportLigne[],
    nombreEtablissementFermes ?: number,
    nombreEtablissementDemenages ?: number
}

export const defaultValue: Readonly<IResult> = {};