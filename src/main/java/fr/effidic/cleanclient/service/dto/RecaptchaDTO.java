package fr.effidic.cleanclient.service.dto;

public class RecaptchaDTO {
	
	private Boolean success;
	private String challenge_ts;
	private String hostname;
	
	public RecaptchaDTO() {
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getChallenge_ts() {
		return challenge_ts;
	}

	public void setChallenge_ts(String challenge_ts) {
		this.challenge_ts = challenge_ts;
	}

	public String getHostname() {
		return hostname;
	}

	public void setHostname(String hostname) {
		this.hostname = hostname;
	}

	@Override
	public String toString() {
		return "RecaptchaDTO [success=" + success + ", challenge_ts=" + challenge_ts + ", hostname=" + hostname + "]";
	}



	

}
