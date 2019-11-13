package fr.effidic.cleanclient.service.dto;



import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.LigneProspect;

public class LocalisationDTO {
	
	private String nom;
	private String adresse;
	private String cp;
	private String ville;
	
	private Double elasticScore;
	
	private String latitude;
	private String longitude;
	
	private String trancheeffectif;
	private String nomenclature;
	
	public LocalisationDTO(){
		
	}


	
	public LocalisationDTO(String nom, String adresse, String cp, String ville, Double elasticScore, String latitude,
			String longitude) {
		super();
		this.nom = nom;
		this.adresse = adresse;
		this.cp = cp;
		this.ville = ville;
		this.elasticScore = elasticScore;
		this.latitude = latitude;
		this.longitude = longitude;
	}



	public LocalisationDTO(ExportDTO export) {
		super();
		this.latitude = export.getLatitude();
		this.longitude = export.getLongitude();
	}



	public LocalisationDTO(String sireneLatitude, String sireneLongitude) {
		this.latitude = sireneLatitude;
		this.longitude = sireneLongitude;
	}



	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}
	
	
	
	public Double getElasticScore() {
		return elasticScore;
	}

	public void setElasticScore(Double elasticScore) {
		this.elasticScore = elasticScore;
	}
	

	public String getTrancheeffectif() {
		return trancheeffectif;
	}



	public void setTrancheeffectif(String trancheeffectif) {
		this.trancheeffectif = trancheeffectif;
	}



	public String getNomenclature() {
		return nomenclature;
	}



	public void setNomenclature(String nomenclature) {
		this.nomenclature = nomenclature;
	}



	public static LocalisationDTO mapImportLignetoLocalisationDTO(ImportLigne importLigne) {
		LocalisationDTO localisationDTO= new LocalisationDTO();
		localisationDTO.setAdresse(importLigne.getAdresse());
		localisationDTO.setCp(importLigne.getCp());
		localisationDTO.setLatitude(importLigne.getSireneLatitude());
		localisationDTO.setLongitude(importLigne.getSireneLongitude());
		localisationDTO.setNom(importLigne.getNom());
		localisationDTO.setVille(importLigne.getVille());
		localisationDTO.setElasticScore(importLigne.getElasticScore());
		localisationDTO.setNomenclature(importLigne.getSireneNomenclature());
		localisationDTO.setTrancheeffectif(importLigne.getSireneTrancheeffectif());
		return localisationDTO;
		
	}
	
	public static LocalisationDTO mapLigneProspecttoLocalisationDTO(LigneProspect ligneProspect) {
		LocalisationDTO localisationDTO= new LocalisationDTO();
		localisationDTO.setLatitude(ligneProspect.getSireneLatitude());
		localisationDTO.setLongitude(ligneProspect.getSireneLongitude());
		localisationDTO.setNom(ligneProspect.getSireneDenomination());
		localisationDTO.setVille(ligneProspect.getSireneVille());
		localisationDTO.setNomenclature(ligneProspect.getSireneNomenclature());
		localisationDTO.setTrancheeffectif(ligneProspect.getSireneTrancheeffectif());
		return localisationDTO;
		
	}


	@Override
	public String toString() {
		return "LocalisationDTO [nom=" + nom + ", adresse=" + adresse + ", cp=" + cp + ", ville=" + ville
				+ ", elasticScore=" + elasticScore + ", latitude=" + latitude + ", longitude=" + longitude
				+ ", trancheeffectif=" + trancheeffectif + ", nomenclature=" + nomenclature + "]";
	}

	
	
	

}
