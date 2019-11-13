package fr.effidic.cleanclient.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.security.crypto.codec.Hex;

import javax.persistence.*;
import javax.xml.bind.DatatypeConverter;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

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
    private Integer traitementId;

    @Column(name = "date_de_debut")
    private Instant dateDeDebut;
    
    @Column(name = "hash_link")
    private String hash;

    @OneToMany(mappedBy = "importFichier")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ImportLigne> importLignes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("importFichiers")
    private User user;
    
    

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTraitementId() {
        return traitementId;
    }

    public ImportFichier traitementId(Integer traitementId) {
        this.traitementId = traitementId;
        return this;
    }

    public void setTraitementId(Integer traitementId) {
        this.traitementId = traitementId;
    }

    public Instant getDateDeDebut() {
        return dateDeDebut;
    }

    public ImportFichier dateDeDebut(Instant dateDeDebut) {
        this.dateDeDebut = dateDeDebut;
        return this;
    }

    public void setDateDeDebut(Instant dateDeDebut) {
        this.dateDeDebut = dateDeDebut;
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

    public void setHash(Long id) {
    	
    	String idS =  Long.toString(id);
    	String hash =null;
    	
    	try {
    		System.out.println("passage dans le try du hash");
			MessageDigest md = MessageDigest.getInstance("SHA-256");			
			byte[] digest = md.digest(idS.getBytes(StandardCharsets.UTF_8));
			hash = DatatypeConverter.printHexBinary(digest).toLowerCase();	
			System.out.println("print du hash en sortie du try"+hash);
    	} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 	
    	this.hash = hash; 
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
    

    @Override
    public String toString() {
        return "ImportFichier{" +
            "id=" + getId() +
            ", traitementId=" + getTraitementId() +
            ", dateDeDebut='" + getDateDeDebut() + "'" +
            "}";
    }
}
