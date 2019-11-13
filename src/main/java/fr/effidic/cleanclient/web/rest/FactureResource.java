package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.domain.Facture;
import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.User;
import fr.effidic.cleanclient.repository.FactureRepository;
import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.service.DolibarrService;
import fr.effidic.cleanclient.service.CartobizbeService;
import fr.effidic.cleanclient.service.MailService;
import fr.effidic.cleanclient.service.UserService;
import fr.effidic.cleanclient.service.dto.EtablissementSearchDTO;
import fr.effidic.cleanclient.service.dto.UserDTO;
import fr.effidic.cleanclient.service.dto.dolibarr.*;
import fr.effidic.cleanclient.web.rest.errors.BadRequestAlertException;
import fr.effidic.cleanclient.web.rest.vm.ManagedUserVM;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.effidic.cleanclient.domain.Facture}.
 */
@RestController
@RequestMapping("/api")
public class FactureResource {

    private final Logger log = LoggerFactory.getLogger(FactureResource.class);

    private static final String ENTITY_NAME = "facture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    private final FactureRepository factureRepository;
    
    private final ImportFichierRepository importFichierRepository;
    
    private final CartobizbeService cartobizbeService;
    
    private final DolibarrService dolibarrService;
    
    private final MailService mailService;
    
    private final UserService userService;
    
    private final static String application = "CleanClient";
    private final static String productTypeService = "1";
      
    public FactureResource(FactureRepository factureRepository, 
    					   ImportFichierRepository importFichierRepository,
    					   CartobizbeService cartobizbeService,
    					   DolibarrService dolibarrService,
    					   MailService mailService,
    					   UserService userService
    					   ){
    						this.importFichierRepository = importFichierRepository;
        					this.factureRepository = factureRepository;
        					this.cartobizbeService = cartobizbeService;
        					this.dolibarrService = dolibarrService;
        					this.mailService = mailService;
        					this.userService = userService;
        				    }

    /**
     * {@code POST  /factures} : Create a new facture.
     *
     * @param facture the facture to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facture, or with status {@code 400 (Bad Request)} if the facture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */	
    @PostMapping("/billing/{hash}")
    public String createFacture(@PathVariable String hash, @RequestBody Facture facture) throws URISyntaxException {
    	
    	Optional<ImportFichier> importFichierTmp = importFichierRepository.findByH(hash);
    	ImportFichier importFichier = importFichierTmp.get();
    	facture.setImportFichier(importFichier);
    	
        log.debug("REST request to save Facture : {}", facture);
        if (facture.getId() != null) {
            throw new BadRequestAlertException("A new facture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        factureRepository.save(facture);
        
        //Création d'un Tiers
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        DolibarrTiersDTO dolibarrTiersDTO = new DolibarrTiersDTO(); 
        dolibarrTiersDTO.setName(facture.getRaisonSociale());
        dolibarrTiersDTO.setParticulier(facture.isParticulier());
        dolibarrTiersDTO.setAddress(facture.getNoVoie() + " "+facture.getRue()+" "+facture.getCp());
        dolibarrTiersDTO.setTown(facture.getVille());
        dolibarrTiersDTO.setPhone(facture.getTelephone());
        dolibarrTiersDTO.setEmail(facture.getMail());
        dolibarrTiersDTO.setDateModification(timestamp);
        dolibarrTiersDTO.setDateCreation(timestamp);
        dolibarrTiersDTO.setCountry("France");
        dolibarrTiersDTO.setAbsoluteCreditnote("0");        
        String tiersNum = this.dolibarrService.postTiers(dolibarrTiersDTO);
        
        //Création d'un contact       
        DolibarrContactsDTO dolibarrContactsDTO = new DolibarrContactsDTO();	
        dolibarrContactsDTO.setId(facture.getId().toString());
        dolibarrContactsDTO.setCountry("France");
        dolibarrContactsDTO.setLastname(facture.getNom());
        dolibarrContactsDTO.setFirstname(facture.getPrenom());
        dolibarrContactsDTO.setSocname(facture.getRaisonSociale());
        dolibarrContactsDTO.setMail(facture.getMail());
        this.dolibarrService.postContacts(dolibarrContactsDTO);
        
        //Création de la facture    
        DolibarrFactureDTO dolibarrFactureDTO = new DolibarrFactureDTO();
    	
    	String[] products = {application};
    	Lines lines = new Lines();
    	lines.setProductType(productTypeService);
    	lines.setTvaTx(0);//facture.getTva().toString()
    	lines.setTotalHt(0);//facture.getMontant().toString()
    	lines.setTotalTtc(0);//String.valueOf(totalTTC)
    	lines.setFkAccountingAccount("0"); 
	
    	String[] contactsIds = {};  	
        dolibarrFactureDTO.setSocid(tiersNum);
        dolibarrFactureDTO.setProducts(products);
        dolibarrFactureDTO.addLines(lines);
        dolibarrFactureDTO.setMulticurrencyCode("EUR");
        dolibarrFactureDTO.setModelpdf("crabe");
        dolibarrFactureDTO.setUserValid("1");
        dolibarrFactureDTO.setContactsIds(contactsIds);
        int invoicesNum =  this.dolibarrService.postFacture(dolibarrFactureDTO);
        facture.setInvoicesNum(invoicesNum);
        this.factureRepository.save(facture);
        
        //Validation + récup facnumber
        DolibarrDocumentNameDTO facnumber = this.dolibarrService.postValidate(facture.getInvoicesNum());
        
        DolibarrBuildDocDTO dolibarrBuildDocDTO = new DolibarrBuildDocDTO();
        dolibarrBuildDocDTO.setModulePart("invoice");
        dolibarrBuildDocDTO.setOriginalFile(facnumber.getFacnumber());
        dolibarrBuildDocDTO.setDoctemplate(dolibarrFactureDTO.getModelpdf());
        dolibarrBuildDocDTO.setLangcode("fr");
        this.dolibarrService.putBuildDoc(dolibarrBuildDocDTO);
        
        //base64
        DolibarrPdfDTO base64 = this.dolibarrService.getDocument(facnumber.getFacnumber().toString());  
        String base64String = base64.getDolibarrBase64(); 
        byte[] base64Byte = Base64.getDecoder().decode(base64String.getBytes(StandardCharsets.UTF_8));
        
        //depository
        String dirName = facture.getImportFichier().getId().toString();
         
		File dir = new File("C:\\jhipster\\cleanclient\\tmp\\Nettoyage_"+dirName);
		dir.mkdir();
	    File file = new File("C:\\jhipster\\cleanclient\\tmp\\Nettoyage_"+dirName+"\\facture.pdf");
	    try (FileOutputStream fos = new FileOutputStream(file)) {
	        fos.write(base64Byte);
	    }
	    catch(Exception ex)    
	    {
	        ex.printStackTrace();
	    }
	    
	    //user
	    ManagedUserVM managedUserVM = new ManagedUserVM();
	    managedUserVM.setPassword(facture.getPasswordUser());
	    
	    UserDTO userDTO = new UserDTO();
	    userDTO.setLogin(facture.getLoginUser());
	    userDTO.setFirstName(facture.getPrenom());
	    userDTO.setLastName(facture.getNom());
	    userDTO.setEmail(facture.getMail());
	    userDTO.setActivated(false);
	    userDTO.setLangKey("fr");
	    User user = userService.registerUser(userDTO, managedUserVM.getPassword());

        importFichier.setUser(user);
        importFichierRepository.save(importFichier);
        
        
        facture.setPasswordUser(null);
        facture.setLoginUser(null);
        factureRepository.save(facture);

        List<ImportLigne> result = cartobizbeService.getFullResult(importFichier.getTraitementId());

        mailService.sendActivationEmail(user, facture, result);

        return base64String;
    }
    
    /**
     * {@code PUT  /factures} : Updates an existing facture.
     *
     * @param facture the facture to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facture,
     * or with status {@code 400 (Bad Request)} if the facture is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facture couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/factures")
    public ResponseEntity<Facture> updateFacture(@RequestBody Facture facture) throws URISyntaxException {
        log.debug("REST request to update Facture : {}", facture);
        if (facture.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Facture result = factureRepository.save(facture);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facture.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /factures} : get all the factures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of factures in body.
     *//*
    @GetMapping("/factures")
    public List<Facture> getAllFactures() {
        log.debug("REST request to get all Factures");
        return factureRepository.findAll();
    }*/
    

    /**
     * {@code GET  /factures/:id} : get the "id" facture.
     *
     * @param id the id of the facture to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facture, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/factures/{id}")
    public ResponseEntity<Facture> getFacture(@PathVariable Long id) {
        log.debug("REST request to get Facture : {}", id);
        Optional<Facture> facture = factureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facture);
    }
  
    @GetMapping("/factures/etablissement/search")
    public List<EtablissementSearchDTO> search(@RequestParam("raisonSociale") String raisonSociale) {	
    	return cartobizbeService.getFactureRefresh(raisonSociale);
    }
    
    /**
     * {@code DELETE  /factures/:id} : delete the "id" facture.
     *
     * @param id the id of the facture to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/factures/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        log.debug("REST request to delete Facture : {}", id);
        factureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
