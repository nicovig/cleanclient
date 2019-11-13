import { IExport } from './export.model';
import { ILocalisation } from './localisation.model';

export interface IResult{
    echantillon ?: IExport[],
    localisationsClients ?: ILocalisation[],
    echecs ?: IExport[],
    localisationsProspects ?: ILocalisation[],
}

export const defaultValue: Readonly<IResult> = {};