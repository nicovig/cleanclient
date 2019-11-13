package fr.effidic.cleanclient.service.dto.dolibarr;

public class DolibarrDocumentNameDTO {
	
	private String facnumber;
	
	public DolibarrDocumentNameDTO() {
		
	}

	public DolibarrDocumentNameDTO(String facnumber) {
		super();
		this.facnumber = facnumber;		
	}

	public String getFacnumber() {
		return facnumber;
	}

	public void setFacnumber(String facnumber) {
		this.facnumber = facnumber;
	}
}
