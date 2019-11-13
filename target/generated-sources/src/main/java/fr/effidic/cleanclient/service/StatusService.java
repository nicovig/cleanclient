package fr.effidic.cleanclient.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import fr.effidic.cleanclient.service.dto.StatusDTO;
import fr.effidic.cleanclient.service.TalendService;


@Service
@Transactional
public class StatusService {

    private final Logger log = LoggerFactory.getLogger(StatusService.class);
    
    private TalendService talendService;
    
    public StatusService() {
        
    }
    
    public StatusDTO createStatus(Long id,
    							  int nbClientsTotal,
    							  int nbClientsTraites,
    							  int nbClientsTrouves,
    							  int nbClientsAConfirmer,
    							  int nbClientsEchec,
    							  int nbProspects) {
    	
		StatusDTO status = new StatusDTO();
    	
		status.setIdImportFichier(id);
		status.setNbClientsTotal(nbClientsTotal);
		status.setNbClientsTraites(nbClientsTraites);
		status.setNbClientsTrouves(nbClientsTrouves);
		status.setNbClientsAConfirmer(nbClientsAConfirmer);
		status.setNbClientsEchec(nbClientsEchec);
		status.setNbProspects(nbProspects);
    	return status;
    }
     
}
;