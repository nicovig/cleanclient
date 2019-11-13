package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.repository.ImportLigneRepository;
import fr.effidic.cleanclient.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.effidic.cleanclient.domain.ImportLigne}.
 */
@RestController
@RequestMapping("/api")
public class ImportLigneResource {

    private final Logger log = LoggerFactory.getLogger(ImportLigneResource.class);

    private static final String ENTITY_NAME = "importLigne";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImportLigneRepository importLigneRepository;

    public ImportLigneResource(ImportLigneRepository importLigneRepository) {
        this.importLigneRepository = importLigneRepository;
    }

    /**
     * {@code POST  /import-lignes} : Create a new importLigne.
     *
     * @param importLigne the importLigne to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new importLigne, or with status {@code 400 (Bad Request)} if the importLigne has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/import-lignes")
    public ResponseEntity<ImportLigne> createImportLigne(@RequestBody ImportLigne importLigne) throws URISyntaxException {
        log.debug("REST request to save ImportLigne : {}", importLigne);
        if (importLigne.getId() != null) {
            throw new BadRequestAlertException("A new importLigne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImportLigne result = importLigneRepository.save(importLigne);
        return ResponseEntity.created(new URI("/api/import-lignes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /import-lignes} : Updates an existing importLigne.
     *
     * @param importLigne the importLigne to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated importLigne,
     * or with status {@code 400 (Bad Request)} if the importLigne is not valid,
     * or with status {@code 500 (Internal Server Error)} if the importLigne couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/import-lignes")
    public ResponseEntity<ImportLigne> updateImportLigne(@RequestBody ImportLigne importLigne) throws URISyntaxException {
        log.debug("REST request to update ImportLigne : {}", importLigne);
        if (importLigne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImportLigne result = importLigneRepository.save(importLigne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, importLigne.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /import-lignes} : get all the importLignes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of importLignes in body.
     */
    @GetMapping("/import-lignes")
    public List<ImportLigne> getAllImportLignes() {
        log.debug("REST request to get all ImportLignes");
        return importLigneRepository.findAll();
    }

    /**
     * {@code GET  /import-lignes/:id} : get the "id" importLigne.
     *
     * @param id the id of the importLigne to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the importLigne, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/import-lignes/{id}")
    public ResponseEntity<ImportLigne> getImportLigne(@PathVariable Long id) {
        log.debug("REST request to get ImportLigne : {}", id);
        Optional<ImportLigne> importLigne = importLigneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(importLigne);
    }

    /**
     * {@code DELETE  /import-lignes/:id} : delete the "id" importLigne.
     *
     * @param id the id of the importLigne to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/import-lignes/{id}")
    public ResponseEntity<Void> deleteImportLigne(@PathVariable Long id) {
        log.debug("REST request to delete ImportLigne : {}", id);
        importLigneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
