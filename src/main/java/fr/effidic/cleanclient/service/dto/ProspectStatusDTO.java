package fr.effidic.cleanclient.service.dto;

/**
 * DTO de l'objet status
 * envoi du JSON demandé :
 *  status : {
    nbClientsTotal: 0,
    nbClientsTraites: 0,
    nbClientsTrouves: 0,
    nbClientsAConfirmer: 0,
    nbClientEchec: 0,
    nbProspects: 0
  }
 */
public class ProspectStatusDTO {
	
	
	private int nbClientsTodo;
	
	private int nbClientsDone;
	
	private int nbProspects;
	
	public ProspectStatusDTO() {
		
	}
	
	

	public ProspectStatusDTO(int nbClientsTodo, int nbClientsDone, int nbProspects) {
		super();
		this.nbClientsTodo = nbClientsTodo;
		this.nbClientsDone = nbClientsDone;
		this.nbProspects = nbProspects;
	}



	public int getNbClientsTodo() {
		return nbClientsTodo;
	}

	public void setNbClientsTodo(int nbClientsTodo) {
		this.nbClientsTodo = nbClientsTodo;
	}

	public int getNbClientsDone() {
		return nbClientsDone;
	}

	public void setNbClientsDone(int nbClientsDone) {
		this.nbClientsDone = nbClientsDone;
	}

	public int getNbProspects() {
		return nbProspects;
	}

	public void setNbProspects(int nbProspects) {
		this.nbProspects = nbProspects;
	}



	@Override
	public String toString() {
		return "ProspectStatusDTO [nbClientsTodo=" + nbClientsTodo + ", nbClientsDone=" + nbClientsDone
				+ ", nbProspects=" + nbProspects + "]";
	}
	
	



}
