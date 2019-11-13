package fr.effidic.cleanclient.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ImportLigne.
 */
@Entity
@Table(name = "import_ligne")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImportLigne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "statut")
    private String statut;

    @Column(name = "matching_method")
    private String matchingMethod;

    @Column(name = "id_externe")
    private String idExterne;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "cp")
    private String cp;

    @Column(name = "ville")
    private String ville;

    @Column(name = "siret")
    private String siret;

    @Column(name = "geoloc_score")
    private Double geolocScore;

    @Column(name = "geoloc_label")
    private String geolocLabel;

    @Column(name = "geoloc_housenumber")
    private String geolocHousenumber;

    @Column(name = "geoloc_street")
    private String geolocStreet;

    @Column(name = "geoloc_postcode")
    private String geolocPostcode;

    @Column(name = "geoloc_city")
    private String geolocCity;

    @Column(name = "geoloc_latitude")
    private String geolocLatitude;

    @Column(name = "geoloc_longitude")
    private String geolocLongitude;

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

    @Column(name = "elastic_score")
    private Double elasticScore;

    @ManyToOne
    @JsonIgnoreProperties("importLignes")
    private ImportFichier importFichier;

    @OneToMany(mappedBy = "importLigne")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LigneProspect> ligneProspects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatut() {
        return statut;
    }

    public ImportLigne statut(String statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getMatchingMethod() {
        return matchingMethod;
    }

    public ImportLigne matchingMethod(String matchingMethod) {
        this.matchingMethod = matchingMethod;
        return this;
    }

    public void setMatchingMethod(String matchingMethod) {
        this.matchingMethod = matchingMethod;
    }

    public String getIdExterne() {
        return idExterne;
    }

    public ImportLigne idExterne(String idExterne) {
        this.idExterne = idExterne;
        return this;
    }

    public void setIdExterne(String idExterne) {
        this.idExterne = idExterne;
    }

    public String getNom() {
        return nom;
    }

    public ImportLigne nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public ImportLigne adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCp() {
        return cp;
    }

    public ImportLigne cp(String cp) {
        this.cp = cp;
        return this;
    }

    public void setCp(String cp) {
        this.cp = cp;
    }

    public String getVille() {
        return ville;
    }

    public ImportLigne ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getSiret() {
        return siret;
    }

    public ImportLigne siret(String siret) {
        this.siret = siret;
        return this;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public Double getGeolocScore() {
        return geolocScore;
    }

    public ImportLigne geolocScore(Double geolocScore) {
        this.geolocScore = geolocScore;
        return this;
    }

    public void setGeolocScore(Double geolocScore) {
        this.geolocScore = geolocScore;
    }

    public String getGeolocLabel() {
        return geolocLabel;
    }

    public ImportLigne geolocLabel(String geolocLabel) {
        this.geolocLabel = geolocLabel;
        return this;
    }

    public void setGeolocLabel(String geolocLabel) {
        this.geolocLabel = geolocLabel;
    }

    public String getGeolocHousenumber() {
        return geolocHousenumber;
    }

    public ImportLigne geolocHousenumber(String geolocHousenumber) {
        this.geolocHousenumber = geolocHousenumber;
        return this;
    }

    public void setGeolocHousenumber(String geolocHousenumber) {
        this.geolocHousenumber = geolocHousenumber;
    }

    public String getGeolocStreet() {
        return geolocStreet;
    }

    public ImportLigne geolocStreet(String geolocStreet) {
        this.geolocStreet = geolocStreet;
        return this;
    }

    public void setGeolocStreet(String geolocStreet) {
        this.geolocStreet = geolocStreet;
    }

    public String getGeolocPostcode() {
        return geolocPostcode;
    }

    public ImportLigne geolocPostcode(String geolocPostcode) {
        this.geolocPostcode = geolocPostcode;
        return this;
    }

    public void setGeolocPostcode(String geolocPostcode) {
        this.geolocPostcode = geolocPostcode;
    }

    public String getGeolocCity() {
        return geolocCity;
    }

    public ImportLigne geolocCity(String geolocCity) {
        this.geolocCity = geolocCity;
        return this;
    }

    public void setGeolocCity(String geolocCity) {
        this.geolocCity = geolocCity;
    }

    public String getGeolocLatitude() {
        return geolocLatitude;
    }

    public ImportLigne geolocLatitude(String geolocLatitude) {
        this.geolocLatitude = geolocLatitude;
        return this;
    }

    public void setGeolocLatitude(String geolocLatitude) {
        this.geolocLatitude = geolocLatitude;
    }

    public String getGeolocLongitude() {
        return geolocLongitude;
    }

    public ImportLigne geolocLongitude(String geolocLongitude) {
        this.geolocLongitude = geolocLongitude;
        return this;
    }

    public void setGeolocLongitude(String geolocLongitude) {
        this.geolocLongitude = geolocLongitude;
    }

    public String getSireneSiret() {
        return sireneSiret;
    }

    public ImportLigne sireneSiret(String sireneSiret) {
        this.sireneSiret = sireneSiret;
        return this;
    }

    public void setSireneSiret(String sireneSiret) {
        this.sireneSiret = sireneSiret;
    }

    public String getSireneDenomination() {
        return sireneDenomination;
    }

    public ImportLigne sireneDenomination(String sireneDenomination) {
        this.sireneDenomination = sireneDenomination;
        return this;
    }

    public void setSireneDenomination(String sireneDenomination) {
        this.sireneDenomination = sireneDenomination;
    }

    public String getSireneHousenumber() {
        return sireneHousenumber;
    }

    public ImportLigne sireneHousenumber(String sireneHousenumber) {
        this.sireneHousenumber = sireneHousenumber;
        return this;
    }

    public void setSireneHousenumber(String sireneHousenumber) {
        this.sireneHousenumber = sireneHousenumber;
    }

    public String getSireneStreet() {
        return sireneStreet;
    }

    public ImportLigne sireneStreet(String sireneStreet) {
        this.sireneStreet = sireneStreet;
        return this;
    }

    public void setSireneStreet(String sireneStreet) {
        this.sireneStreet = sireneStreet;
    }

    public String getSireneCodepostal() {
        return sireneCodepostal;
    }

    public ImportLigne sireneCodepostal(String sireneCodepostal) {
        this.sireneCodepostal = sireneCodepostal;
        return this;
    }

    public void setSireneCodepostal(String sireneCodepostal) {
        this.sireneCodepostal = sireneCodepostal;
    }

    public String getSireneVille() {
        return sireneVille;
    }

    public ImportLigne sireneVille(String sireneVille) {
        this.sireneVille = sireneVille;
        return this;
    }

    public void setSireneVille(String sireneVille) {
        this.sireneVille = sireneVille;
    }

    public String getSireneLatitude() {
        return sireneLatitude;
    }

    public ImportLigne sireneLatitude(String sireneLatitude) {
        this.sireneLatitude = sireneLatitude;
        return this;
    }

    public void setSireneLatitude(String sireneLatitude) {
        this.sireneLatitude = sireneLatitude;
    }

    public String getSireneLongitude() {
        return sireneLongitude;
    }

    public ImportLigne sireneLongitude(String sireneLongitude) {
        this.sireneLongitude = sireneLongitude;
        return this;
    }

    public void setSireneLongitude(String sireneLongitude) {
        this.sireneLongitude = sireneLongitude;
    }

    public String getSireneEtatadministratif() {
        return sireneEtatadministratif;
    }

    public ImportLigne sireneEtatadministratif(String sireneEtatadministratif) {
        this.sireneEtatadministratif = sireneEtatadministratif;
        return this;
    }

    public void setSireneEtatadministratif(String sireneEtatadministratif) {
        this.sireneEtatadministratif = sireneEtatadministratif;
    }

    public String getSireneNomenclature() {
        return sireneNomenclature;
    }

    public ImportLigne sireneNomenclature(String sireneNomenclature) {
        this.sireneNomenclature = sireneNomenclature;
        return this;
    }

    public void setSireneNomenclature(String sireneNomenclature) {
        this.sireneNomenclature = sireneNomenclature;
    }

    public String getSireneTrancheeffectif() {
        return sireneTrancheeffectif;
    }

    public ImportLigne sireneTrancheeffectif(String sireneTrancheeffectif) {
        this.sireneTrancheeffectif = sireneTrancheeffectif;
        return this;
    }

    public void setSireneTrancheeffectif(String sireneTrancheeffectif) {
        this.sireneTrancheeffectif = sireneTrancheeffectif;
    }

    public Double getElasticScore() {
        return elasticScore;
    }

    public ImportLigne elasticScore(Double elasticScore) {
        this.elasticScore = elasticScore;
        return this;
    }

    public void setElasticScore(Double elasticScore) {
        this.elasticScore = elasticScore;
    }

    public ImportFichier getImportFichier() {
        return importFichier;
    }

    public ImportLigne importFichier(ImportFichier importFichier) {
        this.importFichier = importFichier;
        return this;
    }

    public void setImportFichier(ImportFichier importFichier) {
        this.importFichier = importFichier;
    }

    public Set<LigneProspect> getLigneProspects() {
        return ligneProspects;
    }

    public ImportLigne ligneProspects(Set<LigneProspect> ligneProspects) {
        this.ligneProspects = ligneProspects;
        return this;
    }

    public ImportLigne addLigneProspect(LigneProspect ligneProspect) {
        this.ligneProspects.add(ligneProspect);
        ligneProspect.setImportLigne(this);
        return this;
    }

    public ImportLigne removeLigneProspect(LigneProspect ligneProspect) {
        this.ligneProspects.remove(ligneProspect);
        ligneProspect.setImportLigne(null);
        return this;
    }

    public void setLigneProspects(Set<LigneProspect> ligneProspects) {
        this.ligneProspects = ligneProspects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImportLigne)) {
            return false;
        }
        return id != null && id.equals(((ImportLigne) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ImportLigne{" +
            "id=" + getId() +
            ", statut='" + getStatut() + "'" +
            ", matchingMethod='" + getMatchingMethod() + "'" +
            ", idExterne='" + getIdExterne() + "'" +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", cp='" + getCp() + "'" +
            ", ville='" + getVille() + "'" +
            ", siret='" + getSiret() + "'" +
            ", geolocScore=" + getGeolocScore() +
            ", geolocLabel='" + getGeolocLabel() + "'" +
            ", geolocHousenumber='" + getGeolocHousenumber() + "'" +
            ", geolocStreet='" + getGeolocStreet() + "'" +
            ", geolocPostcode='" + getGeolocPostcode() + "'" +
            ", geolocCity='" + getGeolocCity() + "'" +
            ", geolocLatitude='" + getGeolocLatitude() + "'" +
            ", geolocLongitude='" + getGeolocLongitude() + "'" +
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
            ", elasticScore=" + getElasticScore() +
            "}";
    }
}
