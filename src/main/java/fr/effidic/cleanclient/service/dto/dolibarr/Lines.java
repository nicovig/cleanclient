package fr.effidic.cleanclient.service.dto.dolibarr;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Lines {
//se base sur le JSON attendu de Dolibarr pour créer une facture	
//    "lines": [
//    {
//        "product_type": "0",
//        "tva_tx": "20.000",
//        "total_ht": "500.00000000",
//        "total_ttc": "600.00000000",
//        "fk_accounting_account": "0"
//    }
//],

	private String productType;	
	private float tvaTx;
	private float totalHt;
	private float totalTtc;	
	private String fkAccountingAccount;
	
	public Lines() {
		
	}
	
	public Lines(String productType, 
				 float tvaTx, 
				 float totalHt, 
				 float totalTtc,
				 String fkAccountingAccount) {
		super();
		this.productType = productType;
		this.tvaTx = tvaTx;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.fkAccountingAccount = fkAccountingAccount;
	}

	@JsonProperty("product_type")
	public String getProductType() {
		return productType;
	}

	@JsonProperty("product_type")
	public void setProductType(String productType) {
		this.productType = productType;
	}

	@JsonProperty("tva_tx")
	public float getTvaTx() {
		return tvaTx;
	}

	@JsonProperty("tva_tx")
	public void setTvaTx(float tvaTx) {
		this.tvaTx = tvaTx;
	}

	@JsonProperty("total_ht")
	public float getTotalHt() {
		return totalHt;
	}

	@JsonProperty("total_ht")
	public void setTotalHt(float totalHt) {
		this.totalHt = totalHt;
	}

	@JsonProperty("total_ttc")
	public float getTotalTtc() {
		return totalTtc;
	}

	@JsonProperty("total_ttc")
	public void setTotalTtc(float totalTtc) {
		this.totalTtc = totalTtc;
	}

	@JsonProperty("fk_accounting_account")
	public String getFkAccountingAccount() {
		return fkAccountingAccount;
	}

	@JsonProperty("fk_accounting_account")
	public void setFkAccountingAccount(String fkAccountingAccount) {
		this.fkAccountingAccount = fkAccountingAccount;
	}

	@Override
	public String toString() {
		return "Lines [productType=" + productType + ", tvaTx=" + tvaTx + ", totalHt=" + totalHt + ", totalTtc="
				+ totalTtc + ", fkAccountingAccount=" + fkAccountingAccount + "]";
	}

}
