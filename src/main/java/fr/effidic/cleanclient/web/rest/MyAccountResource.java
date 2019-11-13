package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.repository.UserRepository;
import fr.effidic.cleanclient.service.CartobizbeService;
import io.jsonwebtoken.io.IOException;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.effidic.cleanclient.domain.Facture;
import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.domain.User;
import fr.effidic.cleanclient.repository.FactureRepository;


/**
 * REST controller for managing {@link fr.effidic.cleanclient.domain.ImportFichier}.
 */
@RestController
@RequestMapping("/api")
public class MyAccountResource {
	
    private final ImportFichierRepository importFichierRepository;
    
    private final FactureRepository factureRepository;
    
    private final UserRepository userRepository;
    
    private final CartobizbeService cartobizbeService;
        
    public MyAccountResource(ImportFichierRepository importFichierRepository, 
    							 FactureRepository factureRepository,
    							 UserRepository userRepository,
    							 CartobizbeService cartobizbeService) {
        this.importFichierRepository = importFichierRepository;
        this.factureRepository = factureRepository;
        this.userRepository = userRepository;
        this.cartobizbeService = cartobizbeService;
    }
    
    @GetMapping("/myaccount/facture")
    public List<Facture> getFactureByUser(){
    	Optional<User> u = this.userRepository.findOneByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
    	return factureRepository.findByUser(u.get().getLogin());
    }
    
    @GetMapping("/myaccount/importfichier")
    public List<ImportFichier> getAllImportFichiers() {
    	Optional<User> u = this.userRepository.findOneByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        return importFichierRepository.findByUser(u.get().getId());
    }
    @GetMapping("/myaccount/resultMap")
    public List<ImportLigne> getImportFichier(@RequestParam("traitementId") Long traitementId){
    	List<ImportLigne> result = cartobizbeService.getFullResult(traitementId);
    	return result;
    }
    
    @GetMapping("/myaccount/facturePdf")
    public ResponseEntity<Resource> queryExtractRootFacture( @RequestParam("folder_root_name") 
    												  String folder_root_name) throws java.io.IOException {

    	String tmp = "C:\\jhipster\\cleanclient\\tmp\\Nettoyage_";
    	 
    	File depository = new File(tmp+1051+"\\facture.pdf");
    
        Path path = Paths.get(depository.getAbsolutePath());
        ByteArrayResource resource =null;
        try {
             resource = new ByteArrayResource(Files.readAllBytes(path));
                 
        } catch (IOException e) {
                 // TODO Auto-generated catch block
              e.printStackTrace();
        }
     
          return ResponseEntity.ok()
                 .contentLength(depository.length())
                 .contentType(MediaType.parseMediaType("application/pdf"))
                 .body(resource);
        }
    

}
