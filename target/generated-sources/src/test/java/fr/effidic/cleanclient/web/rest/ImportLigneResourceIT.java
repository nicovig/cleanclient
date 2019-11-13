package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.CleanclientApp;
import fr.effidic.cleanclient.domain.ImportLigne;
import fr.effidic.cleanclient.repository.ImportLigneRepository;
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
import java.util.List;

import static fr.effidic.cleanclient.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ImportLigneResource} REST controller.
 */
@SpringBootTest(classes = CleanclientApp.class)
public class ImportLigneResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_CP = "AAAAAAAAAA";
    private static final String UPDATED_CP = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRET = "AAAAAAAAAA";
    private static final String UPDATED_SIRET = "BBBBBBBBBB";

    private static final String DEFAULT_EXTERNAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNAL_ID = "BBBBBBBBBB";

    @Autowired
    private ImportLigneRepository importLigneRepository;

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

    private MockMvc restImportLigneMockMvc;

    private ImportLigne importLigne;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImportLigneResource importLigneResource = new ImportLigneResource(importLigneRepository);
        this.restImportLigneMockMvc = MockMvcBuilders.standaloneSetup(importLigneResource)
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
    public static ImportLigne createEntity(EntityManager em) {
        ImportLigne importLigne = new ImportLigne()
            .nom(DEFAULT_NOM)
            .adresse(DEFAULT_ADRESSE)
            .cp(DEFAULT_CP)
            .ville(DEFAULT_VILLE)
            .siret(DEFAULT_SIRET)
            .externalId(DEFAULT_EXTERNAL_ID);
        return importLigne;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImportLigne createUpdatedEntity(EntityManager em) {
        ImportLigne importLigne = new ImportLigne()
            .nom(UPDATED_NOM)
            .adresse(UPDATED_ADRESSE)
            .cp(UPDATED_CP)
            .ville(UPDATED_VILLE)
            .siret(UPDATED_SIRET)
            .externalId(UPDATED_EXTERNAL_ID);
        return importLigne;
    }

    @BeforeEach
    public void initTest() {
        importLigne = createEntity(em);
    }

    @Test
    @Transactional
    public void createImportLigne() throws Exception {
        int databaseSizeBeforeCreate = importLigneRepository.findAll().size();

        // Create the ImportLigne
        restImportLigneMockMvc.perform(post("/api/import-lignes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importLigne)))
            .andExpect(status().isCreated());

        // Validate the ImportLigne in the database
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeCreate + 1);
        ImportLigne testImportLigne = importLigneList.get(importLigneList.size() - 1);
        assertThat(testImportLigne.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testImportLigne.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testImportLigne.getCp()).isEqualTo(DEFAULT_CP);
        assertThat(testImportLigne.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testImportLigne.getSiret()).isEqualTo(DEFAULT_SIRET);
        assertThat(testImportLigne.getExternalId()).isEqualTo(DEFAULT_EXTERNAL_ID);
    }

    @Test
    @Transactional
    public void createImportLigneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = importLigneRepository.findAll().size();

        // Create the ImportLigne with an existing ID
        importLigne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImportLigneMockMvc.perform(post("/api/import-lignes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importLigne)))
            .andExpect(status().isBadRequest());

        // Validate the ImportLigne in the database
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImportLignes() throws Exception {
        // Initialize the database
        importLigneRepository.saveAndFlush(importLigne);

        // Get all the importLigneList
        restImportLigneMockMvc.perform(get("/api/import-lignes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(importLigne.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].siret").value(hasItem(DEFAULT_SIRET.toString())))
            .andExpect(jsonPath("$.[*].externalId").value(hasItem(DEFAULT_EXTERNAL_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getImportLigne() throws Exception {
        // Initialize the database
        importLigneRepository.saveAndFlush(importLigne);

        // Get the importLigne
        restImportLigneMockMvc.perform(get("/api/import-lignes/{id}", importLigne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(importLigne.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.siret").value(DEFAULT_SIRET.toString()))
            .andExpect(jsonPath("$.externalId").value(DEFAULT_EXTERNAL_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImportLigne() throws Exception {
        // Get the importLigne
        restImportLigneMockMvc.perform(get("/api/import-lignes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImportLigne() throws Exception {
        // Initialize the database
        importLigneRepository.saveAndFlush(importLigne);

        int databaseSizeBeforeUpdate = importLigneRepository.findAll().size();

        // Update the importLigne
        ImportLigne updatedImportLigne = importLigneRepository.findById(importLigne.getId()).get();
        // Disconnect from session so that the updates on updatedImportLigne are not directly saved in db
        em.detach(updatedImportLigne);
        updatedImportLigne
            .nom(UPDATED_NOM)
            .adresse(UPDATED_ADRESSE)
            .cp(UPDATED_CP)
            .ville(UPDATED_VILLE)
            .siret(UPDATED_SIRET)
            .externalId(UPDATED_EXTERNAL_ID);

        restImportLigneMockMvc.perform(put("/api/import-lignes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImportLigne)))
            .andExpect(status().isOk());

        // Validate the ImportLigne in the database
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeUpdate);
        ImportLigne testImportLigne = importLigneList.get(importLigneList.size() - 1);
        assertThat(testImportLigne.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testImportLigne.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testImportLigne.getCp()).isEqualTo(UPDATED_CP);
        assertThat(testImportLigne.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testImportLigne.getSiret()).isEqualTo(UPDATED_SIRET);
        assertThat(testImportLigne.getExternalId()).isEqualTo(UPDATED_EXTERNAL_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingImportLigne() throws Exception {
        int databaseSizeBeforeUpdate = importLigneRepository.findAll().size();

        // Create the ImportLigne

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImportLigneMockMvc.perform(put("/api/import-lignes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(importLigne)))
            .andExpect(status().isBadRequest());

        // Validate the ImportLigne in the database
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImportLigne() throws Exception {
        // Initialize the database
        importLigneRepository.saveAndFlush(importLigne);

        int databaseSizeBeforeDelete = importLigneRepository.findAll().size();

        // Delete the importLigne
        restImportLigneMockMvc.perform(delete("/api/import-lignes/{id}", importLigne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImportLigne.class);
        ImportLigne importLigne1 = new ImportLigne();
        importLigne1.setId(1L);
        ImportLigne importLigne2 = new ImportLigne();
        importLigne2.setId(importLigne1.getId());
        assertThat(importLigne1).isEqualTo(importLigne2);
        importLigne2.setId(2L);
        assertThat(importLigne1).isNotEqualTo(importLigne2);
        importLigne1.setId(null);
        assertThat(importLigne1).isNotEqualTo(importLigne2);
    }
}
