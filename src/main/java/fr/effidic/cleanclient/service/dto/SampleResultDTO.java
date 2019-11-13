package fr.effidic.cleanclient.service.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import fr.effidic.cleanclient.domain.ImportLigne;

public class SampleResultDTO {
	
	private List<ImportLigne> echantillonClients;
	private List<ImportLigne> echantillonProspects;
	private List<LocalisationDTO> localisationClients;
	private List<ImportLigne> echecs;
	private List<LocalisationDTO> localisationProspects;
	private Long nombreEtablissementFermes;
	private Long nombreEtablissementDemenages;
	
	public SampleResultDTO() {

	}
	
	

	public SampleResultDTO(List<ImportLigne> echantillonClients, List<ImportLigne> echantillonProspects,
			List<LocalisationDTO> localisationsClients, List<ImportLigne> echecs,
			List<LocalisationDTO> localisationsProspects) {
		super();
		this.echantillonClients = echantillonClients;
		this.echantillonProspects = echantillonProspects;
		this.localisationClients = localisationsClients;
		this.echecs = echecs;
		this.localisationProspects = localisationsProspects;
	}


	public SampleResultDTO mapImportLigneToSampleResultDTO(List<ImportLigne> importLignes) {
		if(importLignes == null || importLignes.isEmpty()) return new SampleResultDTO();
		Integer nombreClientsMatched = importLignes.stream().filter(map -> map.getStatut().equals("MATCHED"))
				.collect(Collectors.toList()).size();
		Long nombreEtablissementFermes = importLignes.stream().filter(map -> map.getStatut().equals("MATCHED") && !map.getSireneEtatadministratif().equals("A")).count();
		List<ImportLigne> echantillonClients = importLignes.stream().filter(map -> map.getStatut().equals("MATCHED"))
				.collect(Collectors.toList()).subList(0, Math.min(5, nombreClientsMatched ));
		List<LocalisationDTO> localisationClients = importLignes.stream()
				.filter(item -> item.getSireneLatitude() != null && item.getSireneLongitude() != null)
				.map(item -> LocalisationDTO.mapImportLignetoLocalisationDTO(item))
				.collect(Collectors.toList());
		List<LocalisationDTO> localisationProspects = importLignes.stream()
				.flatMap(item2 -> item2.getLigneProspects().stream())
				.filter(item -> item.getSireneLatitude() != null && item.getSireneLongitude() != null)
				.map(item -> LocalisationDTO.mapLigneProspecttoLocalisationDTO(item))
				.collect(Collectors.toList());
		List<ImportLigne> echecs = importLignes.stream().filter(map -> !map.getStatut().equals("MATCHED"))
				.collect(Collectors.toList());
		SampleResultDTO toReturn = new SampleResultDTO();
		toReturn.setEchantillonClients(echantillonClients);
		toReturn.setEchecs(echecs);
		toReturn.setLocalisationClients(localisationClients);
		toReturn.setLocalisationProspects(localisationProspects);
		toReturn.setNombreEtablissementFermes(nombreEtablissementFermes);
		return toReturn;
		
	}



	public List<ImportLigne> getEchantillonClients() {
		return echantillonClients;
	}



	public void setEchantillonClients(List<ImportLigne> echantillonClients) {
		this.echantillonClients = echantillonClients;
	}



	public List<ImportLigne> getEchantillonProspects() {
		return echantillonProspects;
	}



	public void setEchantillonProspects(List<ImportLigne> echantillonProspects) {
		this.echantillonProspects = echantillonProspects;
	}



	public List<LocalisationDTO> getLocalisationClients() {
		return localisationClients;
	}



	public void setLocalisationClients(List<LocalisationDTO> localisationClients) {
		this.localisationClients = localisationClients;
	}



	public List<ImportLigne> getEchecs() {
		return echecs;
	}



	public void setEchecs(List<ImportLigne> echecs) {
		this.echecs = echecs;
	}



	public List<LocalisationDTO> getLocalisationProspects() {
		return localisationProspects;
	}



	public void setLocalisationProspects(List<LocalisationDTO> localisationProspects) {
		this.localisationProspects = localisationProspects;
	}
	
	



	public Long getNombreEtablissementFermes() {
		return nombreEtablissementFermes;
	}



	public void setNombreEtablissementFermes(Long nombreEtablissementFermes2) {
		this.nombreEtablissementFermes = nombreEtablissementFermes2;
	}



	public Long getNombreEtablissementDemenages() {
		return nombreEtablissementDemenages;
	}



	public void setNombreEtablissementDemenages(Long nombreEtablissementDemenages) {
		this.nombreEtablissementDemenages = nombreEtablissementDemenages;
	}



	@Override
	public String toString() {
		return "ResultDTO [echantillonClients=" + echantillonClients + ", echantillonProspects=" + echantillonProspects
				+ ", localisationClients=" + localisationClients + ", echecs=" + echecs + ", localisationProspects="
				+ localisationProspects + "]";
	}


	
	
}
