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
public class StatusDTO {
	
	private long idImportFichier;
	
	private int nbClientsTotal;
	
	private int nbClientsTraites;
	
	private int nbClientsTrouves;
	
	private int nbClientsAConfirmer;
	
	private int nbClientsEchec;
	
	private int nbProspects;
	
	public StatusDTO() {
		
	}
	
	public StatusDTO(int idImportFichier, int nbClientsTotal, int nbClientsTraites, int nbClientsTrouves, int nbClientsAConfirmer,
			int nbClientsEchec, int nbProspects) {
		super();
		this.idImportFichier = idImportFichier;
		this.nbClientsTotal = nbClientsTotal;
		this.nbClientsTraites = nbClientsTraites;
		this.nbClientsTrouves = nbClientsTrouves;
		this.nbClientsAConfirmer = nbClientsAConfirmer;
		this.nbClientsEchec = nbClientsEchec;
		this.nbProspects = nbProspects;
	}
	
	public long getIdImportFichier() {
		return idImportFichier;
	}
	
	public void setIdImportFichier(Long id) {
		this.idImportFichier = id;
	}

	public int getNbClientsTotal() {
		return nbClientsTotal;
	}

	public void setNbClientsTotal(int nbClientsTotal) {
		this.nbClientsTotal = nbClientsTotal;
	}

	public int getNbClientsTraites() {
		return nbClientsTraites;
	}

	public void setNbClientsTraites(int nbClientsTraites) {
		this.nbClientsTraites = nbClientsTraites;
	}

	public int getNbClientsTrouves() {
		return nbClientsTrouves;
	}

	public void setNbClientsTrouves(int nbClientsTrouves) {
		this.nbClientsTrouves = nbClientsTrouves;
	}

	public int getNbClientsAConfirmer() {
		return nbClientsAConfirmer;
	}

	public void setNbClientsAConfirmer(int nbClientsAConfirmer) {
		this.nbClientsAConfirmer = nbClientsAConfirmer;
	}

	public int getNbClientsEchec() {
		return nbClientsEchec;
	}

	public void setNbClientsEchec(int nbClientsEchec) {
		this.nbClientsEchec = nbClientsEchec;
	}

	public int getNbProspects() {
		return nbProspects;
	}

	public void setNbProspects(int nbProspects) {
		this.nbProspects = nbProspects;
	}

	@Override
	public String toString() {
		return "StatusDTO [nbClientsTotal=" + nbClientsTotal + ", nbClientsTraites=" + nbClientsTraites
				+ ", nbClientsTrouves=" + nbClientsTrouves + ", nbClientsAConfirmer=" + nbClientsAConfirmer
				+ ", nbClientsEchec=" + nbClientsEchec + ", nbProspects=" + nbProspects + "]";
	}



}
