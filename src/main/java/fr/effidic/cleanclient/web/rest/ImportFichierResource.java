package fr.effidic.cleanclient.web.rest;


import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.User;
import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.repository.ImportLigneRepository;
import fr.effidic.cleanclient.repository.UserRepository;
import fr.effidic.cleanclient.security.ImportFichierSecurity;
import fr.effidic.cleanclient.service.dto.StatutDTO;
import fr.effidic.cleanclient.service.dto.ImportFichierStatutDTO;
import fr.effidic.cleanclient.service.dto.ProspectStatusDTO;
import fr.effidic.cleanclient.service.dto.SampleResultDTO;
import fr.effidic.cleanclient.service.RecaptchaService;
import fr.effidic.cleanclient.service.CartobizbeService;
import fr.effidic.cleanclient.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.effidic.cleanclient.domain.ImportFichier}.
 */
@RestController
@RequestMapping("/api")
public class ImportFichierResource {

    private final Logger log = LoggerFactory.getLogger(ImportFichierResource.class);

    private static final String ENTITY_NAME = "importFichier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImportFichierRepository importFichierRepository;
    
    private final ImportLigneRepository importLigneRepository;
    
    private final UserRepository userRepository;
        
    private final CartobizbeService cartobizbeService;
    
    private final RecaptchaService recaptchaService;
    
    private final ImportFichierSecurity importFichierSecurity;


    public ImportFichierResource(ImportFichierRepository importFichierRepository, 
    							 ImportLigneRepository importLigneRepository, 
    							 UserRepository userRepository, 
    							 CartobizbeService talendService,RecaptchaService recaptchaService,
    							 ImportFichierSecurity importFichierSecurity) {
        this.importFichierRepository = importFichierRepository;
        this.importLigneRepository = importLigneRepository;
        this.userRepository = userRepository;
        this.cartobizbeService = talendService;
        this.recaptchaService = recaptchaService;
        this.importFichierSecurity = importFichierSecurity;
        
    }

    /**
     * {@code POST  /import-fichiers} : Create a new importFichier.
     *
     * @param importFichier the importFichier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new importFichier, or with status {@code 400 (Bad Request)} if the importFichier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/import-fichiers")
    public ResponseEntity<ImportFichier> createImportFichier(@RequestBody ImportFichier importFichier) throws URISyntaxException{
        
    	try {
        	log.debug("REST request to save ImportFichier : {}",importFichier);
            
            if (importFichier.getId() != null) {
                throw new BadRequestAlertException("A new importFichier cannot already have an ID", ENTITY_NAME, "idexists");
            }
            if (importFichier.getFrontKey() == null ) {
                throw new BadRequestAlertException("Missing frontKey param", ENTITY_NAME, "missingfrontkey");
            }
            if (!this.recaptchaService.checkRecaptcha(importFichier.getFrontKey())) {
                throw new BadRequestAlertException("frontKey is invalid", ENTITY_NAME, "invalidfrontkey");
            }    
            
        importFichier.setHash(this.importFichierSecurity.hashImportFichier());
        importFichier = this.importFichierRepository.save(importFichier);
        
        Set<ImportLigne> imports = importFichier.getImportLignes();
        for (Iterator iterator = imports.iterator(); iterator.hasNext();) {
			ImportLigne importLigne = (ImportLigne) iterator.next();
			importLigne.adresse(importLigne.getAdresse()!=null? importLigne.getAdresse().replace("\r", " ").replace("\n", " ").trim():null);
			importLigne.cp(importLigne.getCp()!=null? importLigne.getCp().replace("\r", "").replace("\n", "").replace(" ", "").trim():null);
			importLigne.siret(importLigne.getSiret()!=null? importLigne.getSiret().replace("\r", "").replace("\n", "").replace(" ", "").trim():null);
			importLigne.ville(importLigne.getVille()!=null? importLigne.getVille().replace("\r", " ").replace("\n", " ").trim():null);
			importLigne.nom(importLigne.getNom()!=null? importLigne.getNom().replace("\r", " ").replace("\n", " ").trim():null);
			importLigne.setImportFichier(importFichier);
		}
        this.importLigneRepository.saveAll(imports);      
        Long traitementId = this.cartobizbeService.postImport(importFichier); 
        this.cartobizbeService.launchImport(traitementId);
        return ResponseEntity.created(new URI("/api/import-fichiers/" + importFichier.getHash()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, importFichier.getHash()))
            .body(importFichier);
        }
        catch(Exception e) {
        	e.printStackTrace();
        	return ResponseEntity.badRequest().build();
        }
    }

    /**
     * {@code PUT  /import-fichiers} : Updates an existing importFichier.
     *
     * @param importFichier the importFichier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated importFichier,
     * or with status {@code 400 (Bad Request)} if the importFichier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the importFichier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/import-fichiers")
    public ResponseEntity<ImportFichier> updateImportFichier(@RequestBody ImportFichier importFichier) throws URISyntaxException {
        log.debug("REST request to update ImportFichier : {}", importFichier);
        if (importFichier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImportFichier result = importFichierRepository.save(importFichier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, importFichier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /import-fichiers} : get all the importFichiers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of importFichiers in body.
     */
    @GetMapping("/import-fichiers")
    public List<ImportFichier> getAllImportFichiers() {
        log.debug("REST request to get all ImportFichiers");
        return importFichierRepository.findByUserIsCurrentUser();
    }
    
    /**
     * {@code GET  /import-fichiers/:hash} : get the "hash" importFichier.
     *
     * @param hash the hash of the importFichier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the importFichier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/import-fichiers/{hash}")
    public ResponseEntity<ImportFichier> getImportFichier(@PathVariable String hash) {
        log.debug("REST request to get ImportFichier : {}", hash);
        
        //objet contenant le détail
        Optional<ImportFichier> importFichier = importFichierRepository.findByH(hash);
        //objet vide si pas l'user créateur
        Optional<ImportFichier> importFichierVoid = null;     
        //Récupération de l'utilisateur en session
        Optional<User> u = this.userRepository.findOneByLogin(SecurityContextHolder.getContext().getAuthentication().getName());

       	return ResponseUtil.wrapOrNotFound(importFichier);

      }
    
    @GetMapping("/import-fichiers/{hash}/status")
    public ResponseEntity<ImportFichierStatutDTO> getImportFichierStatut(@PathVariable String hash) { 	
    	log.debug("REST request to get ImportFichierStatus : {}", hash);    	    	
    	//A partir de l'ID => retrouver l'objet => retrouver le traitementId
    	Optional<ImportFichier> importFichier = importFichierRepository.findByH(hash); 	
    	if(importFichier.isPresent() && importFichier.get().getTraitementId()!=null) {
    		return ResponseEntity.ok().body(cartobizbeService.getStatut(importFichier.get()));
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
      }
    
    
    @GetMapping("/import-fichiers/{hash}/sampleResult")
    public ResponseEntity<SampleResultDTO> getImportFichierSampleResult(@PathVariable String hash) {
    	Optional<ImportFichier> importFichier = importFichierRepository.findByH(hash);
    	if(importFichier.isPresent()) {
    		return ResponseEntity.ok().body(cartobizbeService.getSampleResult(importFichier.get()));
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @GetMapping("/import-fichiers/{hash}/fullResult")
    public ResponseEntity<List<ImportLigne>> getImportFichierFullResult(@PathVariable String hash) {
    	Optional<ImportFichier> importFichier = importFichierRepository.findByH(hash);
    	if(importFichier.isPresent()) {
    		return ResponseEntity.ok().body(cartobizbeService.getFullResult(importFichier.get().getTraitementId() ));
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    

    /**
     * {@code DELETE  /import-fichiers/:hash} : delete the "hash" importFichier.
     *
     * @param hash the hash of the importFichier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/import-fichiers/{hash}")
    public ResponseEntity<Void> deleteImportFichier(@PathVariable String hash) {
        log.debug("REST request to delete ImportFichier : {}", hash);
        Optional<ImportFichier> importFichier = importFichierRepository.findByH(hash);
        importFichierRepository.deleteById(importFichier.get().getId());
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, importFichier.get().getId().toString() )).build();
    }
}
