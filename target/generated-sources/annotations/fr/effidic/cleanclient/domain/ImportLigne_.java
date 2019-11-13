package fr.effidic.cleanclient.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ImportLigne.class)
public abstract class ImportLigne_ {

	public static volatile SingularAttribute<ImportLigne, String> geolocPostcode;
	public static volatile SingularAttribute<ImportLigne, String> sireneLatitude;
	public static volatile SingularAttribute<ImportLigne, String> sireneEtatadministratif;
	public static volatile SingularAttribute<ImportLigne, String> idExterne;
	public static volatile SingularAttribute<ImportLigne, String> matchingMethod;
	public static volatile SingularAttribute<ImportLigne, ImportFichier> importFichier;
	public static volatile SingularAttribute<ImportLigne, String> sireneHousenumber;
	public static volatile SingularAttribute<ImportLigne, String> nom;
	public static volatile SingularAttribute<ImportLigne, String> siret;
	public static volatile SingularAttribute<ImportLigne, String> sireneVille;
	public static volatile SingularAttribute<ImportLigne, String> sireneTrancheeffectif;
	public static volatile SingularAttribute<ImportLigne, String> geolocCity;
	public static volatile SingularAttribute<ImportLigne, String> sireneLongitude;
	public static volatile SingularAttribute<ImportLigne, Long> id;
	public static volatile SingularAttribute<ImportLigne, String> geolocLongitude;
	public static volatile SingularAttribute<ImportLigne, String> sireneSiret;
	public static volatile SingularAttribute<ImportLigne, String> geolocLatitude;
	public static volatile SingularAttribute<ImportLigne, String> ville;
	public static volatile SingularAttribute<ImportLigne, String> geolocStreet;
	public static volatile SingularAttribute<ImportLigne, String> sireneDenomination;
	public static volatile SingularAttribute<ImportLigne, String> cp;
	public static volatile SingularAttribute<ImportLigne, String> geolocLabel;
	public static volatile SingularAttribute<ImportLigne, Double> geolocScore;
	public static volatile SingularAttribute<ImportLigne, String> sireneCodepostal;
	public static volatile SingularAttribute<ImportLigne, Double> elasticScore;
	public static volatile SingularAttribute<ImportLigne, String> adresse;
	public static volatile SingularAttribute<ImportLigne, String> geolocHousenumber;
	public static volatile SingularAttribute<ImportLigne, String> sireneStreet;
	public static volatile SetAttribute<ImportLigne, LigneProspect> ligneProspects;
	public static volatile SingularAttribute<ImportLigne, String> sireneNomenclature;
	public static volatile SingularAttribute<ImportLigne, String> statut;

	public static final String GEOLOC_POSTCODE = "geolocPostcode";
	public static final String SIRENE_LATITUDE = "sireneLatitude";
	public static final String SIRENE_ETATADMINISTRATIF = "sireneEtatadministratif";
	public static final String ID_EXTERNE = "idExterne";
	public static final String MATCHING_METHOD = "matchingMethod";
	public static final String IMPORT_FICHIER = "importFichier";
	public static final String SIRENE_HOUSENUMBER = "sireneHousenumber";
	public static final String NOM = "nom";
	public static final String SIRET = "siret";
	public static final String SIRENE_VILLE = "sireneVille";
	public static final String SIRENE_TRANCHEEFFECTIF = "sireneTrancheeffectif";
	public static final String GEOLOC_CITY = "geolocCity";
	public static final String SIRENE_LONGITUDE = "sireneLongitude";
	public static final String ID = "id";
	public static final String GEOLOC_LONGITUDE = "geolocLongitude";
	public static final String SIRENE_SIRET = "sireneSiret";
	public static final String GEOLOC_LATITUDE = "geolocLatitude";
	public static final String VILLE = "ville";
	public static final String GEOLOC_STREET = "geolocStreet";
	public static final String SIRENE_DENOMINATION = "sireneDenomination";
	public static final String CP = "cp";
	public static final String GEOLOC_LABEL = "geolocLabel";
	public static final String GEOLOC_SCORE = "geolocScore";
	public static final String SIRENE_CODEPOSTAL = "sireneCodepostal";
	public static final String ELASTIC_SCORE = "elasticScore";
	public static final String ADRESSE = "adresse";
	public static final String GEOLOC_HOUSENUMBER = "geolocHousenumber";
	public static final String SIRENE_STREET = "sireneStreet";
	public static final String LIGNE_PROSPECTS = "ligneProspects";
	public static final String SIRENE_NOMENCLATURE = "sireneNomenclature";
	public static final String STATUT = "statut";

}

