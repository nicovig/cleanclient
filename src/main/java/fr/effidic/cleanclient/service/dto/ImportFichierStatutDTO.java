package fr.effidic.cleanclient.service.dto;

import fr.effidic.cleanclient.domain.ImportFichier;

/**
 * A DTO representing a user, with his authorities.
 */
public class ImportFichierStatutDTO {

    
	ImportFichier importFichier;
    StatutDTO geolocStatut;
    StatutDTO cleanStatut;
    StatutDTO prospectStatut;
    

    public ImportFichierStatutDTO() {
        // Empty constructor needed for Jackson.
    }


	public ImportFichier getImportFichier() {
		return importFichier;
	}


	public void setImportFichier(ImportFichier importFichier) {
		this.importFichier = importFichier;
	}


	public StatutDTO getGeolocStatut() {
		return geolocStatut;
	}


	public void setGeolocStatut(StatutDTO geolocStatut) {
		this.geolocStatut = geolocStatut;
	}


	public StatutDTO getCleanStatut() {
		return cleanStatut;
	}


	public void setCleanStatut(StatutDTO cleanStatut) {
		this.cleanStatut = cleanStatut;
	}


	public StatutDTO getProspectStatut() {
		return prospectStatut;
	}


	public void setProspectStatut(StatutDTO prospectStatut) {
		this.prospectStatut = prospectStatut;
	}


	@Override
	public String toString() {
		return "ImportFichierStatutDTO [importFichier=" + importFichier + ", geolocStatut=" + geolocStatut
				+ ", cleanStatut=" + cleanStatut + ", prospectStatut=" + prospectStatut + "]";
	}

    
    
    
    

}
