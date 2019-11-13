package fr.effidic.cleanclient.service.dto;

public class LocalisationDTO {
	
	private String latitude;
	private String longitude;
	
	public LocalisationDTO(){
		
	}

	public LocalisationDTO(String latitude, String longitude) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public LocalisationDTO(ExportDTO export) {
		super();
		this.latitude = export.getLatitude();
		this.longitude = export.getLongitude();
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


	@Override
	public String toString() {
		return "LocalisationDTO [latitude=" + latitude + ", longitude=" + longitude + "]";
	}
	
	

}
