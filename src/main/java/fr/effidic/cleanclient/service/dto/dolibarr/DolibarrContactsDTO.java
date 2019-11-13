package fr.effidic.cleanclient.service.dto.dolibarr;

public class DolibarrContactsDTO {
//se base sur le JSON attendu de Dolibarr pour créer une fiche client
//	{
//	    "id": "1",
//	    "country": "France",
//	    "lastname": "Dupond",
//	    "firstname": "",
//	    "socname": null,
//	    "mail": ""
//	}
	
	private String id;
	private String country;
	private String lastname;
	private String firstname;
	private String socname;
	private String mail;
	
	public DolibarrContactsDTO() {
		
	}

	public DolibarrContactsDTO(String id, String country, String lastname, String firstname, String socname,
			String mail) {
		super();
		this.id = id;
		this.country = country;
		this.lastname = lastname;
		this.firstname = firstname;
		this.socname = socname;
		this.mail = mail;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getSocname() {
		return socname;
	}

	public void setSocname(String socname) {
		this.socname = socname;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Override
	public String toString() {
		return "DolibarrContactsDTO [id=" + id + ", country=" + country + ", lastname=" + lastname + ", firstname="
				+ firstname + ", socname=" + socname + ", mail=" + mail + "]";
	}
	
	
	
}
