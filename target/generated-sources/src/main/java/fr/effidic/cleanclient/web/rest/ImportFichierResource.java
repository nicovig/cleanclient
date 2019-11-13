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
import fr.effidic.cleanclient.service.StatusService;
import fr.effidic.cleanclient.service.dto.ExportDTO;
import fr.effidic.cleanclient.service.dto.StatusDTO;
import fr.effidic.cleanclient.service.dto.LocalisationDTO;
import fr.effidic.cleanclient.service.dto.ResultDTO;
import fr.effidic.cleanclient.service.TalendService;
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
    
    private final StatusService statusService;
    
    private TalendService talendService;


    public ImportFichierResource(ImportFichierRepository importFichierRepository, 
    							 ImportLigneRepository importLigneRepository, 
    							 UserRepository userRepository, 
    							 StatusService statusService,
    							 TalendService talendService) {
        this.importFichierRepository = importFichierRepository;
        this.importLigneRepository = importLigneRepository;
        this.userRepository = userRepository;
        this.statusService = statusService;
        this.talendService = talendService;
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
        	log.debug("REST request to save ImportFichier : {}");
            
            if (importFichier.getId() != null) {
                throw new BadRequestAlertException("A new importFichier cannot already have an ID", ENTITY_NAME, "idexists");
            }
            Optional<User> u = this.userRepository.findOneByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
            importFichier.setUser(u.orElse(null));
           
                  
		} catch (Exception BadRequestAlertException) {
			
		}
        
        ImportFichier result = importFichierRepository.save(importFichier);
        
        Set<ImportLigne> imports = importFichier.getImportLignes();
        for (Iterator iterator = imports.iterator(); iterator.hasNext();) {
			ImportLigne importLigne = (ImportLigne) iterator.next();
			importLigne.setImportFichier(importFichier);
			log.debug(importLigne.toString());
		}
        importLigneRepository.saveAll(imports);
        
        talendService.doPostImport(importFichier); 
        
        return ResponseEntity.created(new URI("/api/import-fichiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
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
        //return importFichierRepository.findAll();
    }

    /**
     * {@code GET  /import-fichiers/:id} : get the "id" importFichier.
     *
     * @param id the id of the importFichier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the importFichier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/import-fichiers/{id}")
    public ResponseEntity<ImportFichier> getImportFichier(@PathVariable Long id) {
        log.debug("REST request to get ImportFichier : {}", id);
        
        //objet contenant le détail
        Optional<ImportFichier> importFichier = importFichierRepository.findById(id);
        //objet vide si pas l'user créateur
        Optional<ImportFichier> importFichierVoid = null;     
        //Récupération de l'utilisateur en session
        Optional<User> u = this.userRepository.findOneByLogin(SecurityContextHolder.getContext().getAuthentication().getName());

        if(importFichier.isPresent()) {
             
        	User user = u.get();
        	
        	if(importFichier.get().getUser().getId() == user.getId()) {
       		return ResponseUtil.wrapOrNotFound(importFichier);
        	}
	        else {
	        return ResponseUtil.wrapOrNotFound(importFichierVoid);
	        }
        }
        else {
        	return ResponseUtil.wrapOrNotFound(importFichier);
        }
      }
    
    @GetMapping("/import-fichiers/{id}/status")
    public StatusDTO getImportFichierStatus(@PathVariable Long id) { 	
    	log.debug("REST request to get ImportFichierStatus : {}", id);    	    	
    	//A partir de l'ID => retrouver l'objet => retrouver le traitementId
    	Optional<ImportFichier> importFichier = importFichierRepository.findById(id); 	
    	//GET de TalendService
	    return talendService.doGetStatus(importFichier);   
      }
    
    /*
    @GetMapping("/import-fichiers/{id}/result")
    public List<ExportDTO> getExport(@PathVariable Long id) {
    	System.out.println("Passage dans le getExport avec l'id d'ImportFichier = "+id);
    	Optional<ImportFichier> importFichier = importFichierRepository.findById(id);
    	int traitementId = importFichier.get().getTraitementId();  	
    	return talendService.doGetExport(traitementId);
    }
    */
    
    @GetMapping("/import-fichiers/{id}/result")
    public ResultDTO getResult(@PathVariable Long id) {
    	System.out.println("Passage dans le getResult avec l'id d'ImportFichier = "+id);
    	Optional<ImportFichier> importFichier = importFichierRepository.findById(id);
    	int traitementId = importFichier.get().getTraitementId();  	
    	return talendService.doGetResult(traitementId);
    }
    

    /**
     * {@code DELETE  /import-fichiers/:id} : delete the "id" importFichier.
     *
     * @param id the id of the importFichier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/import-fichiers/{id}")
    public ResponseEntity<Void> deleteImportFichier(@PathVariable Long id) {
        log.debug("REST request to delete ImportFichier : {}", id);
        importFichierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
