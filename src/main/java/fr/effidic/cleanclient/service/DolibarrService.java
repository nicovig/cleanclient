package fr.effidic.cleanclient.service;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.effidic.cleanclient.config.ApplicationProperties;
import fr.effidic.cleanclient.config.RequestResponseLoggingInterceptor;
import fr.effidic.cleanclient.service.dto.dolibarr.*;

@Service
@Transactional
public class DolibarrService {
	
	private final Logger log = LoggerFactory.getLogger(CartobizbeService.class);
	
	private final ApplicationProperties applicationProperties;
	
	public DolibarrService(ApplicationProperties applicationProperties) {
		this.applicationProperties = applicationProperties;
	}
	
	
	public String postTiers(DolibarrTiersDTO dolibarrTiersDTO) {
		
		String url = this.applicationProperties.getDolibarr().getUrl() + "/thirdparties/";
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Integer> response= null;
		HttpHeaders header = new HttpHeaders();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		HttpEntity<DolibarrTiersDTO> request = new HttpEntity<DolibarrTiersDTO>(dolibarrTiersDTO, header);
			
		try {						
			response = restTemplate.exchange(url, HttpMethod.POST, request, Integer.class);			 	
			System.out.println("fin passage postTiers");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return response.getBody().toString();

	}
	
	public void postContacts(DolibarrContactsDTO dolibarrContactsDTO) {
		
		String url = this.applicationProperties.getDolibarr().getUrl() + "/contacts/";	
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders header = new HttpHeaders();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		HttpEntity<DolibarrContactsDTO> request = new HttpEntity<DolibarrContactsDTO>(dolibarrContactsDTO, header);
			
		try {					
			restTemplate.exchange(url, HttpMethod.POST, request, Integer.class);
			System.out.println("fin passage postContacts");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	public int postFacture(DolibarrFactureDTO dolibarrFactureDTO) {
	
		//Sert à print le JSON envoyé
		ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
		 RestTemplate restTemplate = new RestTemplate(factory);
		restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));
		//
		ResponseEntity<Integer> response= null;
		String url = this.applicationProperties.getDolibarr().getUrl() + "/invoices/";
		HttpHeaders header = new HttpHeaders();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		HttpEntity<DolibarrFactureDTO> request = new HttpEntity<DolibarrFactureDTO>(dolibarrFactureDTO, header);
		int invoiceNum = 0;
		try {					
			response = restTemplate.exchange(url, HttpMethod.POST , request, Integer.class);
			invoiceNum = response.getBody();
			System.out.println("fin passage postFacture");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return invoiceNum;
	}
	
	public DolibarrDocumentNameDTO postValidate(int invoiceNum) {		
		String url = this.applicationProperties.getDolibarr().getUrl() + "/invoices/"+invoiceNum+"/validate";
		DolibarrDocumentNameDTO facnumber = new DolibarrDocumentNameDTO();
		ResponseEntity<DolibarrDocumentNameDTO> reponse = new ResponseEntity<DolibarrDocumentNameDTO>(HttpStatus.OK);
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders header = new HttpHeaders();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		HttpEntity<String> request = new HttpEntity<String>(header);
			
		try {					
			reponse = restTemplate.exchange(url, HttpMethod.POST, request, DolibarrDocumentNameDTO.class);
			if ( reponse.getStatusCode().OK != null ) {
				facnumber = reponse.getBody();
				System.out.println("status code postValidate OK");
			}
			else {			
			}		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return facnumber;
	}
	
	public void putBuildDoc(DolibarrBuildDocDTO dolibarrBuildDocDTO) {
		
		//PRINT de la requête PUT
		ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
		 RestTemplate restTemplate = new RestTemplate(factory);
		restTemplate.setInterceptors(Collections.singletonList(new RequestResponseLoggingInterceptor()));
		//
		String url = this.applicationProperties.getDolibarr().getUrl() + "documents/builddoc";
		HttpHeaders header = new HttpHeaders();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		ResponseEntity<String> reponse = null;	
		HttpEntity<DolibarrBuildDocDTO> request = new HttpEntity<DolibarrBuildDocDTO>(dolibarrBuildDocDTO, header);
		try {				
			reponse = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
			
			if ( reponse.getStatusCode().OK != null ) {
				System.out.println("status code putBuildDoc OK");
			}
			else {			
			}					
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();	
		}	
	}
		
	
	
	public DolibarrPdfDTO getDocument(String facnumber) {	
		String url = 
		        this.applicationProperties.getDolibarr().getUrl() +
		        "documents/download?module_part=invoice&original_file="+facnumber+"/"+facnumber+".pdf";
		HttpHeaders header = new HttpHeaders();
		RestTemplate restTemplate = new RestTemplate();
		header.add(this.applicationProperties.getDolibarr().getKey(), this.applicationProperties.getDolibarr().getAPIkey());
		DolibarrPdfDTO retour = new DolibarrPdfDTO();
		ResponseEntity<DolibarrPdfDTO> reponse = null;
		HttpEntity<DolibarrPdfDTO> request = new HttpEntity<DolibarrPdfDTO>(retour, header);
		try {					
			reponse = restTemplate.exchange(url, HttpMethod.GET, request, DolibarrPdfDTO.class);
			retour = reponse.getBody();
			System.out.println("fin passage getDocument");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retour;
	}
	
	
}
