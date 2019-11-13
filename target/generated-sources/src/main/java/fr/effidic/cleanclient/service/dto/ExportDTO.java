package fr.effidic.cleanclient.service.dto;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExportDTO {
	
	@Nullable
		private String externalId;
		private String nom;
		private String adresse;
		private String codepostal;
		private String ville;
		private String siret;
		private String sireneDenomination;
		private String sireneHousenumber;
		private String sireneStreet;
		private String sireneCodepostal;
		private String sireneVille;
		private String latitude;
		private String longitude;
		private String sireneSiret; //n°de SIRET de l'entreprise rapprochée
		private boolean isFound;
	
	
	
	public ExportDTO() {
		
	}
	
	public ExportDTO(String externalId, String nom, String adresse, String codepostal, String ville, String siret,
			String sireneDenomination, String sireneHousenumber, String sireneStreet, String sireneCodepostal,
			String sireneVille, String latitude, String longitude, String sireneSiret, boolean isFound) {
		super();
		this.externalId = externalId;
		this.nom = nom;
		this.adresse = adresse;
		this.codepostal = codepostal;
		this.ville = ville;
		this.siret = siret;
		this.sireneDenomination = sireneDenomination;
		this.sireneHousenumber = sireneHousenumber;
		this.sireneStreet = sireneStreet;
		this.sireneCodepostal = sireneCodepostal;
		this.sireneVille = sireneVille;
		this.latitude = latitude;
		this.longitude = longitude;
		this.sireneSiret = sireneSiret;
		this.isFound = isFound;
	}
	public String getExternalId() {
		return externalId;
	}
	public void setExternalId(String externalId) {
		this.externalId = externalId;
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
	public String getCodepostal() {
		return codepostal;
	}
	public void setCodepostal(String codepostal) {
		this.codepostal = codepostal;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	public String getSiret() {
		return siret;
	}
	public void setSiret(String siret) {
		this.siret = siret;
	}
	public String getSireneDenomination() {
		return sireneDenomination;
	}
	public void setSireneDenomination(String sireneDenomination) {
		this.sireneDenomination = sireneDenomination;
	}
	public String getSireneHousenumber() {
		return sireneHousenumber;
	}
	public void setSireneHousenumber(String sireneHousenumber) {
		this.sireneHousenumber = sireneHousenumber;
	}
	public String getSireneStreet() {
		return sireneStreet;
	}
	public void setSireneStreet(String sireneStreet) {
		this.sireneStreet = sireneStreet;
	}
	public String getSireneCodepostal() {
		return sireneCodepostal;
	}
	public void setSireneCodepostal(String sireneCodepostal) {
		this.sireneCodepostal = sireneCodepostal;
	}
	public String getSireneVille() {
		return sireneVille;
	}
	public void setSireneVille(String sireneVille) {
		this.sireneVille = sireneVille;
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
	public String getSireneSiret() {
		return sireneSiret;
	}
	public void setSireneSiret(String sireneSiret) {
		this.sireneSiret = sireneSiret;
	}
	public boolean getIsFound() {
		return isFound;
	}
	public void setIsFound(boolean isFound) {
		this.isFound = isFound;
	}

	@Override
	public String toString() {
		return "ExportDTO [externalId=" + externalId + ", nom=" + nom + ", adresse=" + adresse + ", codepostal="
				+ codepostal + ", ville=" + ville + ", siret=" + siret + ", sireneDenomination=" + sireneDenomination
				+ ", sireneHousenumber=" + sireneHousenumber + ", sireneStreet=" + sireneStreet + ", sireneCodepostal="
				+ sireneCodepostal + ", sireneVille=" + sireneVille + ", latitude=" + latitude + ", longitude="
				+ longitude + ", sireneSiret=" + sireneSiret + ", isFound = " + isFound +"]";
	}


}
