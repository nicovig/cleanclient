package fr.effidic.cleanclient.service.dto.dolibarr;
import java.util.ArrayList;
import java.util.Arrays;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import fr.effidic.cleanclient.service.dto.dolibarr.Lines;;


public class DolibarrFactureDTO {		
//se base sur le JSON attendu de Dolibarr pour créer une facture
//	{
//	    "socid": "1",
//	    "products": ["CleanClient"],
//	    "lines": [
//	        { ...
//	        }
//	    ],
//	    "multicurrency_code": "EUR",
//	    "modelpdf": "crabe",
//	    "user_valid": "1",
//	    "contacts_ids": []
//	}
	
	@JsonProperty("socid")
	private String socid;
	
	@JsonProperty("products")
	private String[] products;
	
	@JsonProperty("lines")
	private ArrayList<Lines> lines = new ArrayList<Lines>();
	
	@JsonProperty("multicurrency_code")
	private String multicurrencyCode;
	
	@JsonProperty("modelpdf")
	private String modelpdf;
	
	@JsonProperty("user_valid")
	private String userValid;
	
	@JsonProperty("contacts_ids")
	private String[] contactsIds;
	
	public DolibarrFactureDTO() {
		
	}

	public DolibarrFactureDTO(String socid, 
							 String[] products, 
							  ArrayList<Lines> lines, 
							  String multicurrencyCode, 
							  String modelpdf,
							  String userValid, 
							  String[] contactsIds) {
		super();
		this.socid = socid;
		this.products = products;
		this.lines = lines;
		this.multicurrencyCode = multicurrencyCode;
		this.modelpdf = modelpdf;
		this.userValid = userValid;
		this.contactsIds = contactsIds;
	}

	@JsonProperty("socid")
	public String getSocid() {
		return socid;
	}

	@JsonProperty("socid")
	public void setSocid(String socid) {
		this.socid = socid;
	}
	
	@JsonProperty("products")
	public String[] getProducts() {
		return products;
	}

	@JsonProperty("products")
	public void setProducts(String[] products) {
		this.products = products;
	}

	@JsonProperty("multicurrency_code")
	public String getMulticurrencyCode() {
		return multicurrencyCode;
	}

	@JsonProperty("multicurrency_code")
	public void setMulticurrencyCode(String multicurrencyCode) {
		this.multicurrencyCode = multicurrencyCode;
	}

	@JsonProperty("modelpdf")
	public String getModelpdf() {
		return modelpdf;
	}

	@JsonProperty("modelpdf")
	public void setModelpdf(String modelpdf) {
		this.modelpdf = modelpdf;
	}

	@JsonProperty("user_valid")
	public String getUserValid() {
		return userValid;
	}

	@JsonProperty("user_valid")
	public void setUserValid(String userValid) {
		this.userValid = userValid;
	}

	@JsonProperty("contacts_ids")
	public String[] getContactsIds() {
		return contactsIds;
	}

	@JsonProperty("contacts_ids")
	public void setContactsIds(String[] contactsIds) {
		this.contactsIds = contactsIds;
	}
	
	@JsonProperty("lines")
    public ArrayList<Lines> getLines() {
		return lines;
	}

	@JsonProperty("lines")
	public void setLines(ArrayList<Lines> lines) {
		this.lines = lines;
	}

	public DolibarrFactureDTO addLines(Lines lines) {
        this.lines.add(lines);
        return this;
    }

    public DolibarrFactureDTO removeLines(Lines lines) {
        this.lines.remove(lines);
        return this;
    }

	@Override
	public String toString() {
		return "DolibarrFactureDTO [socid=" + socid + ", products=" + Arrays.toString(products) + ", lines=" + lines
				+ ", multicurrencyCode=" + multicurrencyCode + ", modelpdf=" + modelpdf + ", userValid=" + userValid
				+ ", contactsIds=" + Arrays.toString(contactsIds) + "]";
	}
	
}

