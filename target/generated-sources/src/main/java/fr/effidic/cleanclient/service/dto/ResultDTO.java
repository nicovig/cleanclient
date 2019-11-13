package fr.effidic.cleanclient.service.dto;

import java.util.List;

public class ResultDTO {
	
	private List<ExportDTO> echantillon;
	private List<LocalisationDTO> localisationsClients;
	private List<ExportDTO> echecs;
	private List<LocalisationDTO> localisationsProspects;
	
	public ResultDTO() {

	}
	
	public ResultDTO(List<ExportDTO> echantillon, List<LocalisationDTO> localisationsClients) {
		super();
		this.echantillon = echantillon;
		this.localisationsClients = localisationsClients;
	}
	
	public ResultDTO(List<ExportDTO> echantillon, List<LocalisationDTO> localisationsClients, List<ExportDTO> echecs) {
		super();
		this.echantillon = echantillon;
		this.localisationsClients = localisationsClients;
		this.echecs = echecs;
	}
	
	
	public ResultDTO(List<ExportDTO> echantillon, List<LocalisationDTO> localisationsClients, List<ExportDTO> echecs,
			List<LocalisationDTO> localisationsProspects) {
		super();
		this.echantillon = echantillon;
		this.localisationsClients = localisationsClients;
		this.echecs = echecs;
		this.localisationsProspects = localisationsProspects;
	}

	public List<ExportDTO> getEchantillon() {
		return echantillon;
	}

	public void setEchantillon(List<ExportDTO> echantillon) {
		this.echantillon = echantillon;
	}

	public List<LocalisationDTO> getLocalisationsClients() {
		return localisationsClients;
	}

	public void setLocalisationsClients(List<LocalisationDTO> localisationsClients) {
		this.localisationsClients = localisationsClients;
	}

	public List<ExportDTO> getEchecs() {
		return echecs;
	}

	public void setEchecs(List<ExportDTO> echecs) {
		this.echecs = echecs;
	}

	public List<LocalisationDTO> getLocalisationsProspects() {
		return localisationsProspects;
	}

	public void setLocalisationsProspects(List<LocalisationDTO> localisationsProspects) {
		this.localisationsProspects = localisationsProspects;
	}

	@Override
	public String toString() {
		return "ResultDTO [echantillon=" + echantillon + ", localisationsClients=" + localisationsClients + ", echecs="
				+ echecs + ", localisationsProspects=" + localisationsProspects + "]";
	}
	
}
