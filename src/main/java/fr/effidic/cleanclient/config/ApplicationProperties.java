package fr.effidic.cleanclient.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Cleanclient.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
		
	private final TalendEsb talendEsb = new TalendEsb();
	private final GoogleRecaptcha googleRecaptcha = new GoogleRecaptcha();
	private final Dolibarr dolibarr = new Dolibarr();
	private final Stripe stripe = new Stripe();
	
	public TalendEsb getTalendEsb() {
		return talendEsb;
	}
	
	public GoogleRecaptcha getGoogleRecaptcha() {
		return googleRecaptcha;
	}   
	
	public Dolibarr getDolibarr() {
		return dolibarr;
	}
	
	public Stripe getStripe() {
		return stripe;
	}
	
	public static class TalendEsb {
		
		private String serviceUrl = ApplicationDefaults.TalendEsb.serviceUrl;
		private String username = ApplicationDefaults.TalendEsb.username;
		private String password = ApplicationDefaults.TalendEsb.password;
		
		public String getServiceUrl() {
			return serviceUrl;
		}
		public void setServiceUrl(String serviceUrl) {
			this.serviceUrl = serviceUrl;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}			
	}
	
public static class Stripe {
	private String  publicKey = ApplicationDefaults.Stripe.publicKey;
	private String privateKey = ApplicationDefaults.Stripe.privateKey;
	public String getPublicKey() {
		return publicKey;
	}
	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}
	public String getPrivateKey() {
		return privateKey;
	}
	public void setPrivateKey(String privateKey) {
		this.privateKey = privateKey;
	}
	
	
}

		
public static class GoogleRecaptcha {
		
		private String frontKey = ApplicationDefaults.GoogleRecaptcha.frontKey;
		private String serverKey = ApplicationDefaults.GoogleRecaptcha.serverKey;
		private String verifyUrl = ApplicationDefaults.GoogleRecaptcha.verifyUrl;
		
		public String getFrontKey() {
			return frontKey;
		}
		public void setFrontKey(String frontKey) {
			this.frontKey = frontKey;
		}
		public String getServerKey() {
			return serverKey;
		}
		public void setServerKey(String serverKey) {
			this.serverKey = serverKey;
		}
		public String getVerifyUrl() {
			return verifyUrl;
		}
		public void setVerifyUrl(String verifyUrl) {
			this.verifyUrl = verifyUrl;
		}	
	}

public static class Dolibarr {
	
	private String key = ApplicationDefaults.Dolibarr.key;
	private String APIkey = ApplicationDefaults.Dolibarr.APIkey;
	private String url = ApplicationDefaults.Dolibarr.url;
	
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	
	public String getAPIkey() {
		return APIkey;
	}
	public void setAPIkey(String APIkey) {
		this.APIkey = APIkey;
	}
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

}

	public interface ApplicationDefaults {
	
	    interface TalendEsb {
	
	        String serviceUrl = "http://localhost:8040/services";
	        String username = "tadmin";
	        String password = "tadmin";
	    }
	    
	    interface GoogleRecaptcha {
	    	
	        String frontKey = "6LeTWKsUAAAAAHD97Pwcn1IclpqfMuvq_NDchnWb";
	        String serverKey = "6LeTWKsUAAAAAFDv5f1LM8y04XqMisQqN6WlCPjr";
	        String verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
	    }
	    
	    interface Dolibarr {
	    	String key = "DOLAPIKEY";
	    	String APIkey = "0WyZFu7E917Tnmj6I7md9oKcCZ6oOu9W" ;
	    	String url = "http://localhost/api/index.php/";
	    } 
	    
	    interface Stripe {
	    	String publicKey = "pk_test_OzxRgiyyGlRJVWQFLD87Sftb00oTS9Ggry";
	    	String privateKey = "sk_test_znPZ1nQlGAKRE2fCkn12CKZ700Agy3YOcJ" ;
	    }
	}
}
