package fr.effidic.cleanclient.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.service.dto.ExportDTO;
import fr.effidic.cleanclient.service.dto.LocalisationDTO;
import fr.effidic.cleanclient.service.dto.ResultDTO;
import fr.effidic.cleanclient.service.dto.StatusDTO;
import fr.effidic.cleanclient.service.dto.TraitementIdDTO;
import fr.effidic.cleanclient.service.StatusService;

@Service
@Transactional
public class TalendService {

    private final Logger log = LoggerFactory.getLogger(TalendService.class);
    
    private ImportFichierRepository importFichierRepository;
    
    private StatusService statusService;
    
    ResponseEntity<TraitementIdDTO> response = null;
    
	public TalendService( ImportFichierRepository importFichierRepository, StatusService statusService) {
		this.importFichierRepository = importFichierRepository;
		this.statusService =  statusService;
	}

	public void doPostImport(ImportFichier importFichier) {
		
		TraitementIdDTO traitementId= null;
		int vraiTraitementId = 0;		
		String url = "http://10.49.117.19:8040/services/geobiz/clean";		
		ImportFichier importFichierAvecLignes = this.importFichierRepository.findByIdWithLignes(importFichier.getId());
		HttpEntity<ImportFichier> request = new HttpEntity<ImportFichier>(importFichierAvecLignes);
		RestTemplate restTemplate = new RestTemplate();	
		
		ResponseEntity<TraitementIdDTO> response = null;
		
	    try{
	    //response = XXX 	===> résultat de l'appel
	    response = restTemplate.exchange(url, HttpMethod.POST, request, TraitementIdDTO.class);
	    traitementId = response.getBody();
	    vraiTraitementId = traitementId.getTraitementId();	    
	    importFichier.setTraitementId(vraiTraitementId);
		this.importFichierRepository.save(importFichier);	 
	       
		}
		catch(Exception ex){ 
			ex.printStackTrace();
		}
	}
	
	public StatusDTO doGetStatus(Optional<ImportFichier> importFichier) {
		
		ImportFichier importFichierGet = importFichier.get();
		StatusDTO status= null;
		int traitementId = importFichierGet.getTraitementId();
		String url = "http://10.49.117.19:8040/services/geobiz/clean/status/"+traitementId;
		HttpEntity<StatusDTO> request = new HttpEntity<StatusDTO>(status);
		RestTemplate restTemplate = new RestTemplate();			
		ResponseEntity<StatusDTO> response = null;
		
	    try{
	    response = restTemplate.exchange(url, HttpMethod.GET, request, StatusDTO.class);
	    status = response.getBody();   
    	
		}
		catch(Exception ex){ 
			ex.printStackTrace();
		}
	    
	    return status;
	}
	
	public List<ExportDTO> doGetExport(int traitementId) {
			
		List<ExportDTO> export = null;
		String url = "http://10.49.117.19:8040/services/geobiz/clean/result/ "+traitementId;
		HttpEntity<List<ExportDTO>> request = new HttpEntity<List<ExportDTO>>(export);
		RestTemplate restTemplate = new RestTemplate();			
		ResponseEntity<List<ExportDTO>> response = null;
		
	    try{
	    response = restTemplate.exchange(url, HttpMethod.GET, request, new ParameterizedTypeReference<List<ExportDTO>>(){} );
	    export = response.getBody();  
    	
		}
		catch(Exception ex){ 
			ex.printStackTrace();
		}
		
		return export;
		
	}
	
	
	public List<LocalisationDTO> doGetLocalisation(List<ExportDTO> result){
		List<LocalisationDTO> geolocTotal = new ArrayList<LocalisationDTO>();
		for (int i = 0; i < result.size(); i++) {
			if (result.get(i) != null) {
				LocalisationDTO geolocTpm = new LocalisationDTO(result.get(i));
				geolocTotal.add(geolocTpm);
			}					
		}
		return geolocTotal;
		
	}
	
	public ResultDTO doGetResult(int traitementId) {
		ArrayList<ExportDTO> resultFull = (ArrayList<ExportDTO>) this.doGetExport(traitementId);
		
		List<ExportDTO> echantillon = resultFull.subList(0, Math.min(5, resultFull.size()-1));
		List<ExportDTO> echecs = resultFull
								.stream()
								.filter(map -> map.getSireneSiret()==null)
								.collect(Collectors.toList());
		System.out.println("print de ECHECS "+echecs);
		List<LocalisationDTO> localisations = this.doGetLocalisation(resultFull);
		
		ResultDTO result = new ResultDTO(echantillon, localisations, echecs);	
		
		return result;
	}
}
