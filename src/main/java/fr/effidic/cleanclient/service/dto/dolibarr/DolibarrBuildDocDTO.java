package fr.effidic.cleanclient.service.dto.dolibarr;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DolibarrBuildDocDTO {
//Ce que Dolibarr attends :
//	{
//		  "module_part": "invoice",
//		  "original_file": "FA1907-0017",
//		  "doctemplate": "crabe",
//		  "langcode": "fr"
//		}
	
	private String modulePart;
	private String originalFile;
	private String doctemplate;
	private String langcode;
	
	public DolibarrBuildDocDTO() {
		
	}

	public DolibarrBuildDocDTO(String modulePart, String originalFile, String doctemplate, String langcode) {
		super();
		this.modulePart = modulePart;
		this.originalFile = originalFile;
		this.doctemplate = doctemplate;
		this.langcode = langcode;
	}

	@JsonProperty("module_part")
	public String getModulePart() {
		return modulePart;
	}

	@JsonProperty("module_part")
	public void setModulePart(String modulePart) {
		this.modulePart = modulePart;
	}

	@JsonProperty("original_file")
	public String getOriginalFile() {
		return originalFile;
	}

	@JsonProperty("original_file")
	public void setOriginalFile(String originalFile) {
		this.originalFile = originalFile;
	}

	@JsonProperty("doctemplate")
	public String getDoctemplate() {
		return doctemplate;
	}

	@JsonProperty("doctemplate")
	public void setDoctemplate(String doctemplate) {
		this.doctemplate = doctemplate;
	}

	@JsonProperty("langcode")
	public String getLangcode() {
		return langcode;
	}

	@JsonProperty("langcode")
	public void setLangcode(String langcode) {
		this.langcode = langcode;
	}

	@Override
	public String toString() {
		return "DolibarrBuildDocDTO [modulePart=" + modulePart + ", originalFile=" + originalFile + ", doctemplate="
				+ doctemplate + ", langcode=" + langcode + "]";
	}

}
