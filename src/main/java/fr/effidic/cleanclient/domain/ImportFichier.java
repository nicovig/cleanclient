package fr.effidic.cleanclient.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A ImportFichier.
 */
@Entity
@Table(name = "import_fichier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImportFichier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "traitement_id")
    private Long traitementId;
    
    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_fin")
    private Instant dateFin;

    @OneToMany(mappedBy = "importFichier")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ImportLigne> importLignes = new HashSet<>();

    @ManyToOne
    private User user;
    
    @Transient
    @JsonSerialize
    @JsonDeserialize
    private String frontKey;
    
    @Column(name = "hash_link")
    private String hash;
    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTraitementId() {
        return traitementId;
    }

    public ImportFichier traitementId(Long traitementId) {
        this.traitementId = traitementId;
        return this;
    }

    public void setTraitementId(Long vraiTraitementId) {
        this.traitementId = vraiTraitementId;
    }
    
    


    public Instant getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Instant dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Instant getDateFin() {
		return dateFin;
	}

	public void setDateFin(Instant dateFin) {
		this.dateFin = dateFin;
	}

	public Set<ImportLigne> getImportLignes() {
        return importLignes;
    }

    public ImportFichier importLignes(Set<ImportLigne> importLignes) {
        this.importLignes = importLignes;
        return this;
    }

    public ImportFichier addImportLigne(ImportLigne importLigne) {
        this.importLignes.add(importLigne);
        importLigne.setImportFichier(this);
        return this;
    }

    public ImportFichier removeImportLigne(ImportLigne importLigne) {
        this.importLignes.remove(importLigne);
        importLigne.setImportFichier(null);
        return this;
    }

    public void setImportLignes(Set<ImportLigne> importLignes) {
        this.importLignes = importLignes;
    }

    public User getUser() {
        return user;
    }

    public ImportFichier user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    public String getHash() {
        return hash;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImportFichier)) {
            return false;
        }
        return id != null && id.equals(((ImportFichier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
    
	public String getFrontKey() {
		return frontKey;
	}

	public void setFrontKey(String frontKey) {
		this.frontKey = frontKey;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	@Override
	public String toString() {
		return "ImportFichier [id=" + id + ", traitementId=" + traitementId + ", dateDebut=" + dateDebut + ", dateFin="
				+ dateFin + ", user=" + user + ", frontKey=" + frontKey + ", hash=" + hash + "]";
	}

	
}
