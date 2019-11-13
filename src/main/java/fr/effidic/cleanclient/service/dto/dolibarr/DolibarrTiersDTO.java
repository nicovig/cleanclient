package fr.effidic.cleanclient.service.dto.dolibarr;

import java.sql.Timestamp;

public class DolibarrTiersDTO {
//se base sur le JSON attendu de Dolibarr pour créer une fiche entreprise
//	{
//	    "name": "Toto",
//	    "particulier": null,
//	    "address": "",
//	    "town": null,
//	    "phone": null,
//	    "email": "toto@toto.fr",
//	    "date_modification": 1562579142,
//	    "date_creation": 1562586342,
//	    "country": "France",
//	    "absolute_creditnote": "0"
//	}	
	
	private String name;
	private boolean particulier;
	private String address;
	private String town;
	private String phone;
	private String email;
	private Timestamp dateModification;
	private Timestamp dateCreation;
	private String country;
	private String absoluteCreditnote;
	
	public DolibarrTiersDTO() {
		
	}
	
	public DolibarrTiersDTO(String name, boolean particulier, String address, String town, String phone, String email,
			Timestamp dateModification, Timestamp dateCreation, String country, String absoluteCreditnote) {
		super();
		this.name = name;
		this.particulier = particulier;
		this.address = address;
		this.town = town;
		this.phone = phone;
		this.email = email;
		this.dateModification = dateModification;
		this.dateCreation = dateCreation;
		this.country = country;
		this.absoluteCreditnote = absoluteCreditnote;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isParticulier() {
		return particulier;
	}

	public void setParticulier(boolean particulier) {
		this.particulier = particulier;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Timestamp getDateModification() {
		return dateModification;
	}

	public void setDateModification(Timestamp dateModification) {
		this.dateModification = dateModification;
	}

	public Timestamp getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Timestamp dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAbsoluteCreditnote() {
		return absoluteCreditnote;
	}

	public void setAbsoluteCreditnote(String absoluteCreditnote) {
		this.absoluteCreditnote = absoluteCreditnote;
	}

	@Override
	public String toString() {
		return "DolibarrTiersDTO [name=" + name + ", particulier=" + particulier + ", address=" + address + ", town="
				+ town + ", phone=" + phone + ", email=" + email + ", dateModification=" + dateModification
				+ ", dateCreation=" + dateCreation + ", country=" + country + ", absoluteCreditnote="
				+ absoluteCreditnote + "]";
	}
	
}
