package fr.effidic.cleanclient.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import fr.effidic.cleanclient.config.ApplicationProperties;
import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.LigneProspect;
import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.repository.ImportLigneRepository;
import fr.effidic.cleanclient.repository.LigneProspectRepository;
import fr.effidic.cleanclient.service.dto.EtablissementSearchDTO;
import fr.effidic.cleanclient.service.dto.ExportDTO;
import fr.effidic.cleanclient.service.dto.ImportFichierStatutDTO;
import fr.effidic.cleanclient.service.dto.LocalisationDTO;
import fr.effidic.cleanclient.service.dto.ProspectDTO;
import fr.effidic.cleanclient.service.dto.ProspectStatusDTO;
import fr.effidic.cleanclient.service.dto.SampleResultDTO;
import fr.effidic.cleanclient.service.dto.StatutDTO;
import fr.effidic.cleanclient.service.dto.TraitementIdDTO;

@Service
@Transactional
public class    CartobizbeService {

	private final Logger log = LoggerFactory.getLogger(CartobizbeService.class);

	private final ImportFichierRepository importFichierRepository;
	private final ImportLigneRepository importLigneRepository;
	private final LigneProspectRepository ligneProspectRepository;

	private final ApplicationProperties applicationProperties;

	public CartobizbeService(ImportFichierRepository importFichierRepository,
			ImportLigneRepository importLigneRepository, LigneProspectRepository ligneProspectRepository,
			ApplicationProperties applicationProperties) {
		this.importFichierRepository = importFichierRepository;
		this.importLigneRepository = importLigneRepository;
		this.ligneProspectRepository = ligneProspectRepository;
		this.applicationProperties = applicationProperties;
	}

	public Long postImport(ImportFichier importFichier) {

		Long vraiTraitementId = null;
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/import-fichiers";
		ImportFichier importFichierAvecLignes = this.importFichierRepository.findByIdWithLignes(importFichier.getId());
		HttpEntity<ImportFichier> request = new HttpEntity<ImportFichier>(importFichierAvecLignes);
		RestTemplate restTemplate = new RestTemplate();


		try {
			// response = XXX ===> résultat de l'appel
			ResponseEntity<ImportFichier> response = restTemplate.exchange(url, HttpMethod.POST, request, ImportFichier.class);
			ImportFichier retour= response.getBody();
			vraiTraitementId = retour.getId();
			importFichier.setTraitementId(vraiTraitementId);
			this.importFichierRepository.save(importFichier);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return vraiTraitementId;
	}

	public boolean launchImport(Long traitementId) {
		HttpEntity<String> request = null;
		RestTemplate restTemplate = new RestTemplate();
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/import-fichiers/" + traitementId
				+ "/prospect/launch";

		try {
			// response = XXX ===> résultat de l'appel
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
			return response.getStatusCode().equals(HttpStatus.OK);
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public ImportFichierStatutDTO getStatut(ImportFichier importFichier) {

		ImportFichierStatutDTO importFichierStatutDTO = new ImportFichierStatutDTO();
		Long traitementId = importFichier.getTraitementId();
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/import-fichiers/" + traitementId+"/statut";
		HttpEntity<ImportFichierStatutDTO> request = null;
		RestTemplate restTemplate = new RestTemplate();

		try {
			ResponseEntity<ImportFichierStatutDTO> response = restTemplate.exchange(url, HttpMethod.GET, request,
					ImportFichierStatutDTO.class);
			importFichierStatutDTO = response.getBody();
			return importFichierStatutDTO;
		} catch (Exception ex) {
			ex.printStackTrace();
			return importFichierStatutDTO;
		}
	}

	public List<ExportDTO> getExport(int traitementId) {
		List<ExportDTO> export = null;
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/geobiz/clean/result/ "
				+ traitementId;
		HttpEntity<List<ExportDTO>> request = new HttpEntity<List<ExportDTO>>(export);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<List<ExportDTO>> response = null;

		try {
			response = restTemplate.exchange(url, HttpMethod.GET, request,
					new ParameterizedTypeReference<List<ExportDTO>>() {
					});
			export = response.getBody();

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return export;
	}


	public SampleResultDTO getSampleResult(ImportFichier importFichier) {
		List<ImportLigne> result = null;
		SampleResultDTO sampleResult = new SampleResultDTO();
		Long traitementId = importFichier.getTraitementId();
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/import-fichiers/" + traitementId
				+ "/result";
		HttpEntity<List<ImportLigne>> request = new HttpEntity<List<ImportLigne>>(result);
		RestTemplate restTemplate = new RestTemplate();

		try {
			ResponseEntity<List<ImportLigne>> response = restTemplate.exchange(url, HttpMethod.GET, request,
					new ParameterizedTypeReference<List<ImportLigne>>() {
					});
			result = response.getBody();
			return sampleResult.mapImportLigneToSampleResultDTO(result);
		} catch (Exception ex) {
			ex.printStackTrace();
			return sampleResult;
		}

	}

	public List<ImportLigne> getFullResult(Long traitementId) {
		List<ImportLigne> export = new ArrayList<ImportLigne>();
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/import-fichiers/" + traitementId
				+ "/result";
		HttpEntity<List<ImportLigne>> request = new HttpEntity<List<ImportLigne>>(export);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<List<ImportLigne>> response = null;
		try {
			response = restTemplate.exchange(url, HttpMethod.GET, request,
					new ParameterizedTypeReference<List<ImportLigne>>() {
					});
			export = response.getBody();
			return export;

		} catch (Exception ex) {
			ex.printStackTrace();
			return export;
		} 
	}

	/*
	 * public ImportFichier doLaunchProspect(Long id) { // TODO Auto-generated
	 * method stub ImportFichier importFichier =
	 * this.importFichierRepository.findById(id).orElse(null); if (importFichier !=
	 * null && importFichier.getTraitementId() == null) {
	 * 
	 * String url = this.applicationProperties.getTalendEsb().getServiceUrl() +
	 * "/geobiz/prospect/search/ " + importFichier.getTraitementId(); RestTemplate
	 * restTemplate = new RestTemplate(); try { ResponseEntity<TraitementIdDTO>
	 * response = restTemplate.getForEntity(url, TraitementIdDTO.class);
	 * TraitementIdDTO traitement_prospect_id = response.getBody();
	 * importFichier.setTraitementProspectId(traitement_prospect_id.getTraitementId(
	 * )); this.importFichierRepository.save(importFichier); } catch (Exception ex)
	 * { ex.printStackTrace(); return null; } return importFichier; } else {
	 * ImportFichier importFichier =
	 * this.importFichierRepository.findById(id).orElse(null); if (importFichier !=
	 * null && importFichier.getTraitementProspectId() == null) {
	 * importFichier.setTraitementProspectId(3);
	 * this.importFichierRepository.save(importFichier); return importFichier; }
	 * else { return null; } }
	 * 
	 * }
	 */
	public List<EtablissementSearchDTO> getFactureRefresh(String raisonSociale) {
		List<EtablissementSearchDTO> etablissementsDTO = new ArrayList<EtablissementSearchDTO>();
		String url = this.applicationProperties.getTalendEsb().getServiceUrl() + "/search/etablissement?query="
				+ raisonSociale;
		HttpEntity<List<EtablissementSearchDTO>> request = new HttpEntity<List<EtablissementSearchDTO>>(
				etablissementsDTO);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<List<EtablissementSearchDTO>> response = null;
		try {

			response = restTemplate.exchange(url, HttpMethod.GET, request,
					new ParameterizedTypeReference<List<EtablissementSearchDTO>>() {
					});
			etablissementsDTO = response.getBody();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return etablissementsDTO;

	}
}
