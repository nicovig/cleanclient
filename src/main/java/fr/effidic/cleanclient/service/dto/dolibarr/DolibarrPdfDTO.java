package fr.effidic.cleanclient.service.dto.dolibarr;

public class DolibarrPdfDTO {
	
	private String content;
	
	public DolibarrPdfDTO() {
	}

	public DolibarrPdfDTO(String content) {
		super();
		this.content = content;
	}

	public String getDolibarrBase64() {
		return content;
	}

	public void setDolibarrBase64(String content) {
		this.content = content;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "DolibarrPdfDTO [content=" + content + "]";
	}

}
