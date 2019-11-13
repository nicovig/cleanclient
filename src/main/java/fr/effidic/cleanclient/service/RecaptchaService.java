package fr.effidic.cleanclient.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import fr.effidic.cleanclient.config.ApplicationProperties;
import fr.effidic.cleanclient.service.dto.RecaptchaDTO;

@Service
@Transactional
public class RecaptchaService {

    private final Logger log = LoggerFactory.getLogger(RecaptchaService.class);
    
    private final ApplicationProperties applicationProperties;
    
    
    
	public RecaptchaService( ApplicationProperties applicationProperties ) {
		this.applicationProperties = applicationProperties;
	}

	public boolean checkRecaptcha(String frontKey) {
		boolean toReturn = false;
		
		RestTemplate restTemplate = new RestTemplate();
		String url = this.applicationProperties.getGoogleRecaptcha().getVerifyUrl();		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
		map.add("secret", this.applicationProperties.getGoogleRecaptcha().getServerKey());
		map.add("response", frontKey);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

		ResponseEntity<RecaptchaDTO> response = restTemplate.postForEntity( url, request , RecaptchaDTO.class );
		log.debug("google response body {}",response.getBody().toString());
	    RecaptchaDTO recaptchaDTO = response.getBody();
	    
	    if (recaptchaDTO != null) toReturn = recaptchaDTO.getSuccess();
	    
	    return toReturn;
	}
	
}
