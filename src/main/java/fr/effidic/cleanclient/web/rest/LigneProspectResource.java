package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.domain.LigneProspect;
import fr.effidic.cleanclient.repository.LigneProspectRepository;
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
 * REST controller for managing {@link fr.effidic.cleanclient.domain.LigneProspect}.
 */
@RestController
@RequestMapping("/api")
public class LigneProspectResource {

    private final Logger log = LoggerFactory.getLogger(LigneProspectResource.class);

    private static final String ENTITY_NAME = "ligneProspect";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneProspectRepository ligneProspectRepository;

    public LigneProspectResource(LigneProspectRepository ligneProspectRepository) {
        this.ligneProspectRepository = ligneProspectRepository;
    }

    /**
     * {@code POST  /ligne-prospects} : Create a new ligneProspect.
     *
     * @param ligneProspect the ligneProspect to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneProspect, or with status {@code 400 (Bad Request)} if the ligneProspect has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-prospects")
    public ResponseEntity<LigneProspect> createLigneProspect(@RequestBody LigneProspect ligneProspect) throws URISyntaxException {
        log.debug("REST request to save LigneProspect : {}", ligneProspect);
        if (ligneProspect.getId() != null) {
            throw new BadRequestAlertException("A new ligneProspect cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneProspect result = ligneProspectRepository.save(ligneProspect);
        return ResponseEntity.created(new URI("/api/ligne-prospects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-prospects} : Updates an existing ligneProspect.
     *
     * @param ligneProspect the ligneProspect to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneProspect,
     * or with status {@code 400 (Bad Request)} if the ligneProspect is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneProspect couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-prospects")
    public ResponseEntity<LigneProspect> updateLigneProspect(@RequestBody LigneProspect ligneProspect) throws URISyntaxException {
        log.debug("REST request to update LigneProspect : {}", ligneProspect);
        if (ligneProspect.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneProspect result = ligneProspectRepository.save(ligneProspect);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneProspect.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-prospects} : get all the ligneProspects.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneProspects in body.
     */
    @GetMapping("/ligne-prospects")
    public List<LigneProspect> getAllLigneProspects() {
        log.debug("REST request to get all LigneProspects");
        return ligneProspectRepository.findAll();
    }

    /**
     * {@code GET  /ligne-prospects/:id} : get the "id" ligneProspect.
     *
     * @param id the id of the ligneProspect to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneProspect, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-prospects/{id}")
    public ResponseEntity<LigneProspect> getLigneProspect(@PathVariable Long id) {
        log.debug("REST request to get LigneProspect : {}", id);
        Optional<LigneProspect> ligneProspect = ligneProspectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneProspect);
    }

    /**
     * {@code DELETE  /ligne-prospects/:id} : delete the "id" ligneProspect.
     *
     * @param id the id of the ligneProspect to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-prospects/{id}")
    public ResponseEntity<Void> deleteLigneProspect(@PathVariable Long id) {
        log.debug("REST request to delete LigneProspect : {}", id);
        ligneProspectRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
