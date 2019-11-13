package fr.effidic.cleanclient.domain;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ImportFichier.class)
public abstract class ImportFichier_ {

	public static volatile SingularAttribute<ImportFichier, Instant> dateDebut;
	public static volatile SingularAttribute<ImportFichier, Long> id;
	public static volatile SingularAttribute<ImportFichier, Instant> dateFin;
	public static volatile SingularAttribute<ImportFichier, Long> traitementId;
	public static volatile SetAttribute<ImportFichier, ImportLigne> importLignes;
	public static volatile SingularAttribute<ImportFichier, User> user;
	public static volatile SingularAttribute<ImportFichier, String> hash;

	public static final String DATE_DEBUT = "dateDebut";
	public static final String ID = "id";
	public static final String DATE_FIN = "dateFin";
	public static final String TRAITEMENT_ID = "traitementId";
	public static final String IMPORT_LIGNES = "importLignes";
	public static final String USER = "user";
	public static final String HASH = "hash";

}

