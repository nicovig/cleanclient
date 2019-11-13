package fr.effidic.cleanclient.service.dto.dolibarr;

public class DolibarrInvoiceNumDTO {
	
	private int invoiceNum;
	
	public DolibarrInvoiceNumDTO() {
	}

	public DolibarrInvoiceNumDTO(int invoiceNum) {
		super();
		this.invoiceNum = invoiceNum;
	}

	public int getDolibarrInvoiceNumDTO() {
		return invoiceNum;
	}

	public void setDolibarrInvoiceNumDTO(int invoiceNum) {
		this.invoiceNum = invoiceNum;
	}
}