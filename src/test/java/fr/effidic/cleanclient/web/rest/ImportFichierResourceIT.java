package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.CleanclientApp;
import fr.effidic.cleanclient.domain.ImportFichier;
import fr.effidic.cleanclient.repository.ImportFichierRepository;
import fr.effidic.cleanclient.repository.ImportLigneRepository;
import fr.effidic.cleanclient.repository.UserRepository;
import fr.effidic.cleanclient.service.StatusService;
import fr.effidic.cleanclient.service.CartobizbeService;
import fr.effidic.cleanclient.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.effidic.cleanclient.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ImportFichierResource} REST controller.
 */
@SpringBootTest(classes = CleanclientApp.class)
public class ImportFichierResourceIT {

    private static final Integer DEFAULT_TRAITEMENT_ID = 1;
    private static final Integer UPDATED_TRAITEMENT_ID = 2;

    private static final Instant DEFAULT_DATE_DE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ImportLigneRepository importLigneRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  StatusService statusService;
    @Autowired
    private CartobizbeService talendService;
    
    @Autowired
    private ImportFichierRepository importFichierRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restImportFichierMockMvc;

    private ImportFichier importFichier;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImportFichierResource importFichierResource = new ImportFichierResource(importFichierRepository,importLigneRepository,userRepository,statusService,talendService);
        this.restImportFichierMockMvc = MockMvcBuilders.standaloneSetup(importFichierResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImportFichier createEntity(EntityManager em) {
        ImportFichier importFichier = new ImportFichier()
            .traitementId(DEFAULT_TRAITEMENT_ID)
            .dateDeDebut(DEFAULT_DATE_DE_DEBUT);
        return importFichier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImportFichier createUpdatedEntity(EntityManager em) {
        ImportFichier importFichier = new ImportFichier()
            .traitementId(UPDATED_TRAITEMENT_ID)
            .dateDeDebut(UPDATED_DATE_DE_DEBUT);
        return importFichier;
    }

    @BeforeEach
    public void initTest() {
        importFichier = createEntity(em);
    }

    @Test
    @Transactional
    public void createImportFichier() throws Exception {
        int databaseSizeBeforeCreate = importFichierRepository.findAll().size();

        // Create the ImportFichier
        restImportFichierMockMvc.perform(post("/api/import-fichiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importFichier)))
            .andExpect(status().isCreated());

        // Validate the ImportFichier in the database
        List<ImportFichier> importFichierList = importFichierRepository.findAll();
        assertThat(importFichierList).hasSize(databaseSizeBeforeCreate + 1);
        ImportFichier testImportFichier = importFichierList.get(importFichierList.size() - 1);
        assertThat(testImportFichier.getTraitementId()).isEqualTo(DEFAULT_TRAITEMENT_ID);
        assertThat(testImportFichier.getDateDeDebut()).isEqualTo(DEFAULT_DATE_DE_DEBUT);
    }

    @Test
    @Transactional
    public void createImportFichierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = importFichierRepository.findAll().size();

        // Create the ImportFichier with an existing ID
        importFichier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImportFichierMockMvc.perform(post("/api/import-fichiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importFichier)))
            .andExpect(status().isBadRequest());

        // Validate the ImportFichier in the database
        List<ImportFichier> importFichierList = importFichierRepository.findAll();
        assertThat(importFichierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImportFichiers() throws Exception {
        // Initialize the database
        importFichierRepository.saveAndFlush(importFichier);

        // Get all the importFichierList
        restImportFichierMockMvc.perform(get("/api/import-fichiers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(importFichier.getId().intValue())))
            .andExpect(jsonPath("$.[*].traitementId").value(hasItem(DEFAULT_TRAITEMENT_ID)))
            .andExpect(jsonPath("$.[*].dateDeDebut").value(hasItem(DEFAULT_DATE_DE_DEBUT.toString())));
    }
    
    @Test
    @Transactional
    public void getImportFichier() throws Exception {
        // Initialize the database
        importFichierRepository.saveAndFlush(importFichier);

        // Get the importFichier
        restImportFichierMockMvc.perform(get("/api/import-fichiers/{id}", importFichier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(importFichier.getId().intValue()))
            .andExpect(jsonPath("$.traitementId").value(DEFAULT_TRAITEMENT_ID))
            .andExpect(jsonPath("$.dateDeDebut").value(DEFAULT_DATE_DE_DEBUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImportFichier() throws Exception {
        // Get the importFichier
        restImportFichierMockMvc.perform(get("/api/import-fichiers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImportFichier() throws Exception {
        // Initialize the database
        importFichierRepository.saveAndFlush(importFichier);

        int databaseSizeBeforeUpdate = importFichierRepository.findAll().size();

        // Update the importFichier
        ImportFichier updatedImportFichier = importFichierRepository.findById(importFichier.getId()).get();
        // Disconnect from session so that the updates on updatedImportFichier are not directly saved in db
        em.detach(updatedImportFichier);
        updatedImportFichier
            .traitementId(UPDATED_TRAITEMENT_ID)
            .dateDeDebut(UPDATED_DATE_DE_DEBUT);

        restImportFichierMockMvc.perform(put("/api/import-fichiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImportFichier)))
            .andExpect(status().isOk());

        // Validate the ImportFichier in the database
        List<ImportFichier> importFichierList = importFichierRepository.findAll();
        assertThat(importFichierList).hasSize(databaseSizeBeforeUpdate);
        ImportFichier testImportFichier = importFichierList.get(importFichierList.size() - 1);
        assertThat(testImportFichier.getTraitementId()).isEqualTo(UPDATED_TRAITEMENT_ID);
        assertThat(testImportFichier.getDateDeDebut()).isEqualTo(UPDATED_DATE_DE_DEBUT);
    }

    @Test
    @Transactional
    public void updateNonExistingImportFichier() throws Exception {
        int databaseSizeBeforeUpdate = importFichierRepository.findAll().size();

        // Create the ImportFichier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImportFichierMockMvc.perform(put("/api/import-fichiers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importFichier)))
            .andExpect(status().isBadRequest());

        // Validate the ImportFichier in the database
        List<ImportFichier> importFichierList = importFichierRepository.findAll();
        assertThat(importFichierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImportFichier() throws Exception {
        // Initialize the database
        importFichierRepository.saveAndFlush(importFichier);

        int databaseSizeBeforeDelete = importFichierRepository.findAll().size();

        // Delete the importFichier
        restImportFichierMockMvc.perform(delete("/api/import-fichiers/{id}", importFichier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ImportFichier> importFichierList = importFichierRepository.findAll();
        assertThat(importFichierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportFichier.class);
        ImportFichier importFichier1 = new ImportFichier();
        importFichier1.setId(1L);
        ImportFichier importFichier2 = new ImportFichier();
        importFichier2.setId(importFichier1.getId());
        assertThat(importFichier1).isEqualTo(importFichier2);
        importFichier2.setId(2L);
        assertThat(importFichier1).isNotEqualTo(importFichier2);
        importFichier1.setId(null);
        assertThat(importFichier1).isNotEqualTo(importFichier2);
    }
}
