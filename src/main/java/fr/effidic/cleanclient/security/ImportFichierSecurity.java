package fr.effidic.cleanclient.security;

import java.nio.charset.Charset;
import java.util.Random;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;
import fr.effidic.cleanclient.repository.ImportFichierRepository;



@Component("TalendService")
public class ImportFichierSecurity {
	
	public String hashImportFichier() {
		byte[] array = new byte[7]; // length is bounded by 7
	    new Random().nextBytes(array);
	    String generatedString = new String(array, Charset.forName("UTF-8"));
    	String tmstp = generatedString+System.currentTimeMillis();
    	String sha256hex = DigestUtils.sha256Hex(tmstp);
    	return sha256hex;
    		 	  
	}
}
