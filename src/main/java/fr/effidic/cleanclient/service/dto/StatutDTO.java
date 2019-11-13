package fr.effidic.cleanclient.service.dto;

/**
 * A DTO representing a user, with his authorities.
 */
public class StatutDTO {

    Integer queueSize;
	Boolean isStarted;
	Boolean isFinished;
	Boolean isAsked;
    Long nombreATraite;
    Long nombreTraite;

    public StatutDTO() {
        // Empty constructor needed for Jackson.
    }

	public Long getNombreATraite() {
		return nombreATraite;
	}

	public void setNombreATraite(Long nombreLigneATraiter) {
		this.nombreATraite = nombreLigneATraiter;
	}

	public Long getNombreTraite() {
		return nombreTraite;
	}

	public void setNombreTraite(Long nombreLigneTraite) {
		this.nombreTraite = nombreLigneTraite;
	}

	


	public Boolean getIsStarted() {
		return isStarted;
	}

	public void setIsStarted(Boolean isStarted) {
		this.isStarted = isStarted;
	}

	public Integer getQueueSize() {
		return queueSize;
	}

	public void setQueueSize(Integer queueSize) {
		this.queueSize = queueSize;
	}
	

	
	public Boolean getIsAsked() {
		return isAsked;
	}

	public void setIsAsked(Boolean isAsked) {
		this.isAsked = isAsked;
	}
	
	

	
	public Boolean getIsFinished() {
		return isFinished;
	}

	public void setIsFinished(Boolean isFinished) {
		this.isFinished = isFinished;
	}

	@Override
	public String toString() {
		return "StatutDTO [queueSize=" + queueSize + ", isStarted=" + isStarted + ", isFinished=" + isFinished
				+ ", isAsked=" + isAsked + ", nombreATraite=" + nombreATraite + ", nombreTraite=" + nombreTraite + "]";
	}
    
	
    
    

}
