import { IResult } from 'app/shared/model/result.model';

export const RESULTS: IResult = {
  localisationClients: [{ adresse: '8 rue des champs', 
  ville: 'Angers', cp : '49000' ,nom: 'sarl toto', longitude: '-0.505297', latitude: '47.455349' }],
  echecs:[
    {nom : 'toto non trouvé', adresse : 'rue des paques', cp : '45567', ville : 'itoin', siret:'46598713268478'},
    {nom : 'tata non trouvé', adresse : 'rue des joutes', cp : '78567', ville : 'laville', siret:'465987768478'},
      
  ]
};
