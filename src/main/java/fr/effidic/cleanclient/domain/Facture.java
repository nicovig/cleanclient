package fr.effidic.cleanclient.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Blob;

/**
 * A Facture.
 */
@Entity
@Table(name = "facture")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Facture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "particulier")
    private Boolean particulier;

    @Column(name = "raison_sociale")
    private String raisonSociale;

    @Column(name = "siret")
    private String siret;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "no_voie")
    private String noVoie;

    @Column(name = "rue")
    private String rue;

    @Column(name = "cp")
    private String cp;

    @Column(name = "ville")
    private String ville;

    @Column(name = "mail")
    private String mail;

    @Column(name = "paye")
    private Boolean paye;

    @Column(name = "tva")
    private Float tva;

    @Column(name = "montant")
    private Float montant;
    
    @Column(name = "invoices_num")
    private int invoicesNum;
    
	@Column(name = "login_user")
	private String loginUser;
	
	@Column(name = "mail_user")
	private String mailUser;
	
	@Column(name = "password_user")
	private String passwordUser;
    
	@OneToOne
    @JoinColumn(unique = true)
    private ImportFichier importFichier;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isParticulier() {
        return particulier;
    }

    public Facture particulier(Boolean particulier) {
        this.particulier = particulier;
        return this;
    }

    public void setParticulier(Boolean particulier) {
        this.particulier = particulier;
    }

    public String getRaisonSociale() {
        return raisonSociale;
    }

    public Facture raisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public String getSiret() {
        return siret;
    }

    public Facture siret(String siret) {
        this.siret = siret;
        return this;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public String getNom() {
        return nom;
    }

    public Facture nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Facture prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return telephone;
    }

    public Facture telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getNoVoie() {
        return noVoie;
    }

    public Facture noVoie(String noVoie) {
        this.noVoie = noVoie;
        return this;
    }

    public void setNoVoie(String noVoie) {
        this.noVoie = noVoie;
    }

    public String getRue() {
        return rue;
    }

    public Facture rue(String rue) {
        this.rue = rue;
        return this;
    }

    public void setRue(String rue) {
        this.rue = rue;
    }

    public String getCp() {
        return cp;
    }

    public Facture cp(String cp) {
        this.cp = cp;
        return this;
    }

    public void setCp(String cp) {
        this.cp = cp;
    }

    public String getVille() {
        return ville;
    }

    public Facture ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getMail() {
        return mail;
    }

    public Facture mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Boolean isPaye() {
        return paye;
    }

    public Facture paye(Boolean paye) {
        this.paye = paye;
        return this;
    }

    public void setPaye(Boolean paye) {
        this.paye = paye;
    }

    public Float getTva() {
        return tva;
    }

    public Facture tva(Float tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Float tva) {
        this.tva = tva;
    }

    public Float getMontant() {
        return montant;
    }

    public Facture montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public ImportFichier getImportFichier() {
        return importFichier;
    }

    public Facture importFichier(ImportFichier importFichier) {
        this.importFichier = importFichier;
        return this;
    }

    public void setImportFichier(ImportFichier importFichier) {
        this.importFichier = importFichier;
    }
    
    public Facture invoicesNum(int invoicesNum) {
        this.invoicesNum = invoicesNum;
        return this;
    }

    public void setInvoicesNum(int invoicesNum) {
        this.invoicesNum = invoicesNum;
    }

    public int getInvoicesNum() {
        return invoicesNum;
    }
    
    public String getLoginUser() {
		return loginUser;
	}

	public void setLoginUser(String loginUser) {
		this.loginUser = loginUser;
	}

	public String getMailUser() {
		return mailUser;
	}

	public void setMailUser(String mailUser) {
		this.mailUser = mailUser;
	}

	public String getPasswordUser() {
		return passwordUser;
	}

	public void setPasswordUser(String passwordUser) {
		this.passwordUser = passwordUser;
	}
    
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facture)) {
            return false;
        }
        return id != null && id.equals(((Facture) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

	@Override
	public String toString() {
		return "Facture [id=" + id + ", particulier=" + particulier + ", raisonSociale=" + raisonSociale + ", siret="
				+ siret + ", nom=" + nom + ", prenom=" + prenom + ", telephone=" + telephone + ", noVoie=" + noVoie
				+ ", rue=" + rue + ", cp=" + cp + ", ville=" + ville + ", mail=" + mail + ", paye=" + paye + ", tva="
				+ tva + ", montant=" + montant + ", invoicesNum=" + invoicesNum + ", importFichier=" + importFichier
				+ ", loginUser=" + loginUser + ", mailUser=" + mailUser + ", passwordUser=" + passwordUser + "]";
	}

    

   }

