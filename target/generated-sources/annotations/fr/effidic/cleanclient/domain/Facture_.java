package fr.effidic.cleanclient.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Facture.class)
public abstract class Facture_ {

	public static volatile SingularAttribute<Facture, String> mailUser;
	public static volatile SingularAttribute<Facture, String> ville;
	public static volatile SingularAttribute<Facture, String> rue;
	public static volatile SingularAttribute<Facture, String> mail;
	public static volatile SingularAttribute<Facture, ImportFichier> importFichier;
	public static volatile SingularAttribute<Facture, Boolean> paye;
	public static volatile SingularAttribute<Facture, String> telephone;
	public static volatile SingularAttribute<Facture, Float> montant;
	public static volatile SingularAttribute<Facture, String> passwordUser;
	public static volatile SingularAttribute<Facture, String> noVoie;
	public static volatile SingularAttribute<Facture, Integer> invoicesNum;
	public static volatile SingularAttribute<Facture, String> siret;
	public static volatile SingularAttribute<Facture, String> nom;
	public static volatile SingularAttribute<Facture, String> cp;
	public static volatile SingularAttribute<Facture, String> loginUser;
	public static volatile SingularAttribute<Facture, String> raisonSociale;
	public static volatile SingularAttribute<Facture, Boolean> particulier;
	public static volatile SingularAttribute<Facture, Long> id;
	public static volatile SingularAttribute<Facture, String> prenom;
	public static volatile SingularAttribute<Facture, Float> tva;

	public static final String MAIL_USER = "mailUser";
	public static final String VILLE = "ville";
	public static final String RUE = "rue";
	public static final String MAIL = "mail";
	public static final String IMPORT_FICHIER = "importFichier";
	public static final String PAYE = "paye";
	public static final String TELEPHONE = "telephone";
	public static final String MONTANT = "montant";
	public static final String PASSWORD_USER = "passwordUser";
	public static final String NO_VOIE = "noVoie";
	public static final String INVOICES_NUM = "invoicesNum";
	public static final String SIRET = "siret";
	public static final String NOM = "nom";
	public static final String CP = "cp";
	public static final String LOGIN_USER = "loginUser";
	public static final String RAISON_SOCIALE = "raisonSociale";
	public static final String PARTICULIER = "particulier";
	public static final String ID = "id";
	public static final String PRENOM = "prenom";
	public static final String TVA = "tva";

}

