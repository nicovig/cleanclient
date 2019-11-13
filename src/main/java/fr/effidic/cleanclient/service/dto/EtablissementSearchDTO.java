package fr.effidic.cleanclient.service.dto;

public class EtablissementSearchDTO {
	
	private String denomination;
	private String housenumber;
	private String street;
	private String codepostal;
	private String ville;
	private String siret;
	
	public EtablissementSearchDTO(){
		
	}

	public EtablissementSearchDTO(String denomination, 
								  String housenumber, 
								  String street, 
								  String codepostal,
								  String ville, 
								  String siret) {
		super();
		this.denomination = denomination;
		this.housenumber = housenumber;
		this.street = street;
		this.codepostal = codepostal;
		this.ville = ville;
		this.siret = siret;
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

	public String getSiret() {
		return siret;
	}

	public void setSiret(String siret) {
		this.siret = siret;
	}

	@Override
	public String toString() {
		return "EtablissementSearchDTO [denomination=" + denomination + ", housenumber=" + housenumber + ", street="
				+ street + ", codepostal=" + codepostal + ", ville=" + ville + ", siret=" + siret + "]";
	}

}
