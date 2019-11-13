package fr.effidic.cleanclient.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A LigneProspect.
 */
@Entity
@Table(name = "ligne_prospect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LigneProspect implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sirene_siret")
    private String sireneSiret;

    @Column(name = "sirene_denomination")
    private String sireneDenomination;

    @Column(name = "sirene_housenumber")
    private String sireneHousenumber;

    @Column(name = "sirene_street")
    private String sireneStreet;

    @Column(name = "sirene_codepostal")
    private String sireneCodepostal;

    @Column(name = "sirene_ville")
    private String sireneVille;

    @Column(name = "sirene_latitude")
    private String sireneLatitude;

    @Column(name = "sirene_longitude")
    private String sireneLongitude;

    @Column(name = "sirene_etatadministratif")
    private String sireneEtatadministratif;

    @Column(name = "sirene_nomenclature")
    private String sireneNomenclature;

    @Column(name = "sirene_trancheeffectif")
    private String sireneTrancheeffectif;

    @ManyToOne
    @JsonIgnoreProperties("ligneProspects")
    private ImportLigne importLigne;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSireneSiret() {
        return sireneSiret;
    }

    public LigneProspect sireneSiret(String sireneSiret) {
        this.sireneSiret = sireneSiret;
        return this;
    }

    public void setSireneSiret(String sireneSiret) {
        this.sireneSiret = sireneSiret;
    }

    public String getSireneDenomination() {
        return sireneDenomination;
    }

    public LigneProspect sireneDenomination(String sireneDenomination) {
        this.sireneDenomination = sireneDenomination;
        return this;
    }

    public void setSireneDenomination(String sireneDenomination) {
        this.sireneDenomination = sireneDenomination;
    }

    public String getSireneHousenumber() {
        return sireneHousenumber;
    }

    public LigneProspect sireneHousenumber(String sireneHousenumber) {
        this.sireneHousenumber = sireneHousenumber;
        return this;
    }

    public void setSireneHousenumber(String sireneHousenumber) {
        this.sireneHousenumber = sireneHousenumber;
    }

    public String getSireneStreet() {
        return sireneStreet;
    }

    public LigneProspect sireneStreet(String sireneStreet) {
        this.sireneStreet = sireneStreet;
        return this;
    }

    public void setSireneStreet(String sireneStreet) {
        this.sireneStreet = sireneStreet;
    }

    public String getSireneCodepostal() {
        return sireneCodepostal;
    }

    public LigneProspect sireneCodepostal(String sireneCodepostal) {
        this.sireneCodepostal = sireneCodepostal;
        return this;
    }

    public void setSireneCodepostal(String sireneCodepostal) {
        this.sireneCodepostal = sireneCodepostal;
    }

    public String getSireneVille() {
        return sireneVille;
    }

    public LigneProspect sireneVille(String sireneVille) {
        this.sireneVille = sireneVille;
        return this;
    }

    public void setSireneVille(String sireneVille) {
        this.sireneVille = sireneVille;
    }

    public String getSireneLatitude() {
        return sireneLatitude;
    }

    public LigneProspect sireneLatitude(String sireneLatitude) {
        this.sireneLatitude = sireneLatitude;
        return this;
    }

    public void setSireneLatitude(String sireneLatitude) {
        this.sireneLatitude = sireneLatitude;
    }

    public String getSireneLongitude() {
        return sireneLongitude;
    }

    public LigneProspect sireneLongitude(String sireneLongitude) {
        this.sireneLongitude = sireneLongitude;
        return this;
    }

    public void setSireneLongitude(String sireneLongitude) {
        this.sireneLongitude = sireneLongitude;
    }

    public String getSireneEtatadministratif() {
        return sireneEtatadministratif;
    }

    public LigneProspect sireneEtatadministratif(String sireneEtatadministratif) {
        this.sireneEtatadministratif = sireneEtatadministratif;
        return this;
    }

    public void setSireneEtatadministratif(String sireneEtatadministratif) {
        this.sireneEtatadministratif = sireneEtatadministratif;
    }

    public String getSireneNomenclature() {
        return sireneNomenclature;
    }

    public LigneProspect sireneNomenclature(String sireneNomenclature) {
        this.sireneNomenclature = sireneNomenclature;
        return this;
    }

    public void setSireneNomenclature(String sireneNomenclature) {
        this.sireneNomenclature = sireneNomenclature;
    }

    public String getSireneTrancheeffectif() {
        return sireneTrancheeffectif;
    }

    public LigneProspect sireneTrancheeffectif(String sireneTrancheeffectif) {
        this.sireneTrancheeffectif = sireneTrancheeffectif;
        return this;
    }

    public void setSireneTrancheeffectif(String sireneTrancheeffectif) {
        this.sireneTrancheeffectif = sireneTrancheeffectif;
    }

    public ImportLigne getImportLigne() {
        return importLigne;
    }

    public LigneProspect importLigne(ImportLigne importLigne) {
        this.importLigne = importLigne;
        return this;
    }

    public void setImportLigne(ImportLigne importLigne) {
        this.importLigne = importLigne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneProspect)) {
            return false;
        }
        return id != null && id.equals(((LigneProspect) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LigneProspect{" +
            "id=" + getId() +
            ", sireneSiret='" + getSireneSiret() + "'" +
            ", sireneDenomination='" + getSireneDenomination() + "'" +
            ", sireneHousenumber='" + getSireneHousenumber() + "'" +
            ", sireneStreet='" + getSireneStreet() + "'" +
            ", sireneCodepostal='" + getSireneCodepostal() + "'" +
            ", sireneVille='" + getSireneVille() + "'" +
            ", sireneLatitude='" + getSireneLatitude() + "'" +
            ", sireneLongitude='" + getSireneLongitude() + "'" +
            ", sireneEtatadministratif='" + getSireneEtatadministratif() + "'" +
            ", sireneNomenclature='" + getSireneNomenclature() + "'" +
            ", sireneTrancheeffectif='" + getSireneTrancheeffectif() + "'" +
            "}";
    }
}
