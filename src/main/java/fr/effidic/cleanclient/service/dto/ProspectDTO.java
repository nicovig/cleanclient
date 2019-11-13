package fr.effidic.cleanclient.service.dto;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProspectDTO {
	
	@Nullable
		private String siretClient;
		private String siretProspect;
		private String denomination;
		private String housenumber;
		private String street;
		private String codepostal;
		private String ville;
		private String latitude;
		private String longitude;
	
	
	
	public ProspectDTO() {
		
	}



	public String getSiretClient() {
		return siretClient;
	}



	public void setSiretClient(String siretClient) {
		this.siretClient = siretClient;
	}



	public String getSiretProspect() {
		return siretProspect;
	}



	public void setSiretProspect(String siretProspect) {
		this.siretProspect = siretProspect;
	}



	public String getDenomination() {
		return denomination;
	}



	public void setDenomination(String denomination) {
		this.denomination = denomination;
	}



	public String getHousenumber() {
		return housenumber;
	}



	public void setHousenumber(String housenumber) {
		this.housenumber = housenumber;
	}



	public String getStreet() {
		return street;
	}



	public void setStreet(String street) {
		this.street = street;
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



	public ProspectDTO(String siretClient, String siretProspect, String denomination, String housenumber, String street,
			String codepostal, String ville, String latitude, String longitude) {
		super();
		this.siretClient = siretClient;
		this.siretProspect = siretProspect;
		this.denomination = denomination;
		this.housenumber = housenumber;
		this.street = street;
		this.codepostal = codepostal;
		this.ville = ville;
		this.latitude = latitude;
		this.longitude = longitude;
	}



	@Override
	public String toString() {
		return "ProspectDTO [siretClient=" + siretClient + ", siretProspect=" + siretProspect + ", denomination="
				+ denomination + ", housenumber=" + housenumber + ", street=" + street + ", codepostal=" + codepostal
				+ ", ville=" + ville + ", latitude=" + latitude + ", longitude=" + longitude + "]";
	}
	
	


}
