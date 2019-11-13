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

    private static final String DEFAULT_STATUT = "AAAAAAAAAA";
    private static final String UPDATED_STATUT = "BBBBBBBBBB";

    private static final String DEFAULT_MATCHING_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_MATCHING_METHOD = "BBBBBBBBBB";

    private static final String DEFAULT_ID_EXTERNE = "AAAAAAAAAA";
    private static final String UPDATED_ID_EXTERNE = "BBBBBBBBBB";

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

    private static final Double DEFAULT_GEOLOC_SCORE = 1D;
    private static final Double UPDATED_GEOLOC_SCORE = 2D;

    private static final String DEFAULT_GEOLOC_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_HOUSENUMBER = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_HOUSENUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_STREET = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_POSTCODE = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_POSTCODE = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_CITY = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_GEOLOC_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_GEOLOC_LONGITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_SIRET = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_SIRET = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_DENOMINATION = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_DENOMINATION = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_HOUSENUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_HOUSENUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_STREET = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_CODEPOSTAL = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_CODEPOSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_VILLE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_LONGITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_ETATADMINISTRATIF = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_ETATADMINISTRATIF = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_NOMENCLATURE = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_NOMENCLATURE = "BBBBBBBBBB";

    private static final String DEFAULT_SIRENE_TRANCHEEFFECTIF = "AAAAAAAAAA";
    private static final String UPDATED_SIRENE_TRANCHEEFFECTIF = "BBBBBBBBBB";

    private static final Double DEFAULT_ELASTIC_SCORE = 1D;
    private static final Double UPDATED_ELASTIC_SCORE = 2D;

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
            .statut(DEFAULT_STATUT)
            .matchingMethod(DEFAULT_MATCHING_METHOD)
            .idExterne(DEFAULT_ID_EXTERNE)
            .nom(DEFAULT_NOM)
            .adresse(DEFAULT_ADRESSE)
            .cp(DEFAULT_CP)
            .ville(DEFAULT_VILLE)
            .siret(DEFAULT_SIRET)
            .geolocScore(DEFAULT_GEOLOC_SCORE)
            .geolocLabel(DEFAULT_GEOLOC_LABEL)
            .geolocHousenumber(DEFAULT_GEOLOC_HOUSENUMBER)
            .geolocStreet(DEFAULT_GEOLOC_STREET)
            .geolocPostcode(DEFAULT_GEOLOC_POSTCODE)
            .geolocCity(DEFAULT_GEOLOC_CITY)
            .geolocLatitude(DEFAULT_GEOLOC_LATITUDE)
            .geolocLongitude(DEFAULT_GEOLOC_LONGITUDE)
            .sireneSiret(DEFAULT_SIRENE_SIRET)
            .sireneDenomination(DEFAULT_SIRENE_DENOMINATION)
            .sireneHousenumber(DEFAULT_SIRENE_HOUSENUMBER)
            .sireneStreet(DEFAULT_SIRENE_STREET)
            .sireneCodepostal(DEFAULT_SIRENE_CODEPOSTAL)
            .sireneVille(DEFAULT_SIRENE_VILLE)
            .sireneLatitude(DEFAULT_SIRENE_LATITUDE)
            .sireneLongitude(DEFAULT_SIRENE_LONGITUDE)
            .sireneEtatadministratif(DEFAULT_SIRENE_ETATADMINISTRATIF)
            .sireneNomenclature(DEFAULT_SIRENE_NOMENCLATURE)
            .sireneTrancheeffectif(DEFAULT_SIRENE_TRANCHEEFFECTIF)
            .elasticScore(DEFAULT_ELASTIC_SCORE);
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
            .statut(UPDATED_STATUT)
            .matchingMethod(UPDATED_MATCHING_METHOD)
            .idExterne(UPDATED_ID_EXTERNE)
            .nom(UPDATED_NOM)
            .adresse(UPDATED_ADRESSE)
            .cp(UPDATED_CP)
            .ville(UPDATED_VILLE)
            .siret(UPDATED_SIRET)
            .geolocScore(UPDATED_GEOLOC_SCORE)
            .geolocLabel(UPDATED_GEOLOC_LABEL)
            .geolocHousenumber(UPDATED_GEOLOC_HOUSENUMBER)
            .geolocStreet(UPDATED_GEOLOC_STREET)
            .geolocPostcode(UPDATED_GEOLOC_POSTCODE)
            .geolocCity(UPDATED_GEOLOC_CITY)
            .geolocLatitude(UPDATED_GEOLOC_LATITUDE)
            .geolocLongitude(UPDATED_GEOLOC_LONGITUDE)
            .sireneSiret(UPDATED_SIRENE_SIRET)
            .sireneDenomination(UPDATED_SIRENE_DENOMINATION)
            .sireneHousenumber(UPDATED_SIRENE_HOUSENUMBER)
            .sireneStreet(UPDATED_SIRENE_STREET)
            .sireneCodepostal(UPDATED_SIRENE_CODEPOSTAL)
            .sireneVille(UPDATED_SIRENE_VILLE)
            .sireneLatitude(UPDATED_SIRENE_LATITUDE)
            .sireneLongitude(UPDATED_SIRENE_LONGITUDE)
            .sireneEtatadministratif(UPDATED_SIRENE_ETATADMINISTRATIF)
            .sireneNomenclature(UPDATED_SIRENE_NOMENCLATURE)
            .sireneTrancheeffectif(UPDATED_SIRENE_TRANCHEEFFECTIF)
            .elasticScore(UPDATED_ELASTIC_SCORE);
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
        assertThat(testImportLigne.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testImportLigne.getMatchingMethod()).isEqualTo(DEFAULT_MATCHING_METHOD);
        assertThat(testImportLigne.getIdExterne()).isEqualTo(DEFAULT_ID_EXTERNE);
        assertThat(testImportLigne.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testImportLigne.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testImportLigne.getCp()).isEqualTo(DEFAULT_CP);
        assertThat(testImportLigne.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testImportLigne.getSiret()).isEqualTo(DEFAULT_SIRET);
        assertThat(testImportLigne.getGeolocScore()).isEqualTo(DEFAULT_GEOLOC_SCORE);
        assertThat(testImportLigne.getGeolocLabel()).isEqualTo(DEFAULT_GEOLOC_LABEL);
        assertThat(testImportLigne.getGeolocHousenumber()).isEqualTo(DEFAULT_GEOLOC_HOUSENUMBER);
        assertThat(testImportLigne.getGeolocStreet()).isEqualTo(DEFAULT_GEOLOC_STREET);
        assertThat(testImportLigne.getGeolocPostcode()).isEqualTo(DEFAULT_GEOLOC_POSTCODE);
        assertThat(testImportLigne.getGeolocCity()).isEqualTo(DEFAULT_GEOLOC_CITY);
        assertThat(testImportLigne.getGeolocLatitude()).isEqualTo(DEFAULT_GEOLOC_LATITUDE);
        assertThat(testImportLigne.getGeolocLongitude()).isEqualTo(DEFAULT_GEOLOC_LONGITUDE);
        assertThat(testImportLigne.getSireneSiret()).isEqualTo(DEFAULT_SIRENE_SIRET);
        assertThat(testImportLigne.getSireneDenomination()).isEqualTo(DEFAULT_SIRENE_DENOMINATION);
        assertThat(testImportLigne.getSireneHousenumber()).isEqualTo(DEFAULT_SIRENE_HOUSENUMBER);
        assertThat(testImportLigne.getSireneStreet()).isEqualTo(DEFAULT_SIRENE_STREET);
        assertThat(testImportLigne.getSireneCodepostal()).isEqualTo(DEFAULT_SIRENE_CODEPOSTAL);
        assertThat(testImportLigne.getSireneVille()).isEqualTo(DEFAULT_SIRENE_VILLE);
        assertThat(testImportLigne.getSireneLatitude()).isEqualTo(DEFAULT_SIRENE_LATITUDE);
        assertThat(testImportLigne.getSireneLongitude()).isEqualTo(DEFAULT_SIRENE_LONGITUDE);
        assertThat(testImportLigne.getSireneEtatadministratif()).isEqualTo(DEFAULT_SIRENE_ETATADMINISTRATIF);
        assertThat(testImportLigne.getSireneNomenclature()).isEqualTo(DEFAULT_SIRENE_NOMENCLATURE);
        assertThat(testImportLigne.getSireneTrancheeffectif()).isEqualTo(DEFAULT_SIRENE_TRANCHEEFFECTIF);
        assertThat(testImportLigne.getElasticScore()).isEqualTo(DEFAULT_ELASTIC_SCORE);
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
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].matchingMethod").value(hasItem(DEFAULT_MATCHING_METHOD.toString())))
            .andExpect(jsonPath("$.[*].idExterne").value(hasItem(DEFAULT_ID_EXTERNE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.toString())))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE.toString())))
            .andExpect(jsonPath("$.[*].siret").value(hasItem(DEFAULT_SIRET.toString())))
            .andExpect(jsonPath("$.[*].geolocScore").value(hasItem(DEFAULT_GEOLOC_SCORE.doubleValue())))
            .andExpect(jsonPath("$.[*].geolocLabel").value(hasItem(DEFAULT_GEOLOC_LABEL.toString())))
            .andExpect(jsonPath("$.[*].geolocHousenumber").value(hasItem(DEFAULT_GEOLOC_HOUSENUMBER.toString())))
            .andExpect(jsonPath("$.[*].geolocStreet").value(hasItem(DEFAULT_GEOLOC_STREET.toString())))
            .andExpect(jsonPath("$.[*].geolocPostcode").value(hasItem(DEFAULT_GEOLOC_POSTCODE.toString())))
            .andExpect(jsonPath("$.[*].geolocCity").value(hasItem(DEFAULT_GEOLOC_CITY.toString())))
            .andExpect(jsonPath("$.[*].geolocLatitude").value(hasItem(DEFAULT_GEOLOC_LATITUDE.toString())))
            .andExpect(jsonPath("$.[*].geolocLongitude").value(hasItem(DEFAULT_GEOLOC_LONGITUDE.toString())))
            .andExpect(jsonPath("$.[*].sireneSiret").value(hasItem(DEFAULT_SIRENE_SIRET.toString())))
            .andExpect(jsonPath("$.[*].sireneDenomination").value(hasItem(DEFAULT_SIRENE_DENOMINATION.toString())))
            .andExpect(jsonPath("$.[*].sireneHousenumber").value(hasItem(DEFAULT_SIRENE_HOUSENUMBER.toString())))
            .andExpect(jsonPath("$.[*].sireneStreet").value(hasItem(DEFAULT_SIRENE_STREET.toString())))
            .andExpect(jsonPath("$.[*].sireneCodepostal").value(hasItem(DEFAULT_SIRENE_CODEPOSTAL.toString())))
            .andExpect(jsonPath("$.[*].sireneVille").value(hasItem(DEFAULT_SIRENE_VILLE.toString())))
            .andExpect(jsonPath("$.[*].sireneLatitude").value(hasItem(DEFAULT_SIRENE_LATITUDE.toString())))
            .andExpect(jsonPath("$.[*].sireneLongitude").value(hasItem(DEFAULT_SIRENE_LONGITUDE.toString())))
            .andExpect(jsonPath("$.[*].sireneEtatadministratif").value(hasItem(DEFAULT_SIRENE_ETATADMINISTRATIF.toString())))
            .andExpect(jsonPath("$.[*].sireneNomenclature").value(hasItem(DEFAULT_SIRENE_NOMENCLATURE.toString())))
            .andExpect(jsonPath("$.[*].sireneTrancheeffectif").value(hasItem(DEFAULT_SIRENE_TRANCHEEFFECTIF.toString())))
            .andExpect(jsonPath("$.[*].elasticScore").value(hasItem(DEFAULT_ELASTIC_SCORE.doubleValue())));
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
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.matchingMethod").value(DEFAULT_MATCHING_METHOD.toString()))
            .andExpect(jsonPath("$.idExterne").value(DEFAULT_ID_EXTERNE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.toString()))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE.toString()))
            .andExpect(jsonPath("$.siret").value(DEFAULT_SIRET.toString()))
            .andExpect(jsonPath("$.geolocScore").value(DEFAULT_GEOLOC_SCORE.doubleValue()))
            .andExpect(jsonPath("$.geolocLabel").value(DEFAULT_GEOLOC_LABEL.toString()))
            .andExpect(jsonPath("$.geolocHousenumber").value(DEFAULT_GEOLOC_HOUSENUMBER.toString()))
            .andExpect(jsonPath("$.geolocStreet").value(DEFAULT_GEOLOC_STREET.toString()))
            .andExpect(jsonPath("$.geolocPostcode").value(DEFAULT_GEOLOC_POSTCODE.toString()))
            .andExpect(jsonPath("$.geolocCity").value(DEFAULT_GEOLOC_CITY.toString()))
            .andExpect(jsonPath("$.geolocLatitude").value(DEFAULT_GEOLOC_LATITUDE.toString()))
            .andExpect(jsonPath("$.geolocLongitude").value(DEFAULT_GEOLOC_LONGITUDE.toString()))
            .andExpect(jsonPath("$.sireneSiret").value(DEFAULT_SIRENE_SIRET.toString()))
            .andExpect(jsonPath("$.sireneDenomination").value(DEFAULT_SIRENE_DENOMINATION.toString()))
            .andExpect(jsonPath("$.sireneHousenumber").value(DEFAULT_SIRENE_HOUSENUMBER.toString()))
            .andExpect(jsonPath("$.sireneStreet").value(DEFAULT_SIRENE_STREET.toString()))
            .andExpect(jsonPath("$.sireneCodepostal").value(DEFAULT_SIRENE_CODEPOSTAL.toString()))
            .andExpect(jsonPath("$.sireneVille").value(DEFAULT_SIRENE_VILLE.toString()))
            .andExpect(jsonPath("$.sireneLatitude").value(DEFAULT_SIRENE_LATITUDE.toString()))
            .andExpect(jsonPath("$.sireneLongitude").value(DEFAULT_SIRENE_LONGITUDE.toString()))
            .andExpect(jsonPath("$.sireneEtatadministratif").value(DEFAULT_SIRENE_ETATADMINISTRATIF.toString()))
            .andExpect(jsonPath("$.sireneNomenclature").value(DEFAULT_SIRENE_NOMENCLATURE.toString()))
            .andExpect(jsonPath("$.sireneTrancheeffectif").value(DEFAULT_SIRENE_TRANCHEEFFECTIF.toString()))
            .andExpect(jsonPath("$.elasticScore").value(DEFAULT_ELASTIC_SCORE.doubleValue()));
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
            .statut(UPDATED_STATUT)
            .matchingMethod(UPDATED_MATCHING_METHOD)
            .idExterne(UPDATED_ID_EXTERNE)
            .nom(UPDATED_NOM)
            .adresse(UPDATED_ADRESSE)
            .cp(UPDATED_CP)
            .ville(UPDATED_VILLE)
            .siret(UPDATED_SIRET)
            .geolocScore(UPDATED_GEOLOC_SCORE)
            .geolocLabel(UPDATED_GEOLOC_LABEL)
            .geolocHousenumber(UPDATED_GEOLOC_HOUSENUMBER)
            .geolocStreet(UPDATED_GEOLOC_STREET)
            .geolocPostcode(UPDATED_GEOLOC_POSTCODE)
            .geolocCity(UPDATED_GEOLOC_CITY)
            .geolocLatitude(UPDATED_GEOLOC_LATITUDE)
            .geolocLongitude(UPDATED_GEOLOC_LONGITUDE)
            .sireneSiret(UPDATED_SIRENE_SIRET)
            .sireneDenomination(UPDATED_SIRENE_DENOMINATION)
            .sireneHousenumber(UPDATED_SIRENE_HOUSENUMBER)
            .sireneStreet(UPDATED_SIRENE_STREET)
            .sireneCodepostal(UPDATED_SIRENE_CODEPOSTAL)
            .sireneVille(UPDATED_SIRENE_VILLE)
            .sireneLatitude(UPDATED_SIRENE_LATITUDE)
            .sireneLongitude(UPDATED_SIRENE_LONGITUDE)
            .sireneEtatadministratif(UPDATED_SIRENE_ETATADMINISTRATIF)
            .sireneNomenclature(UPDATED_SIRENE_NOMENCLATURE)
            .sireneTrancheeffectif(UPDATED_SIRENE_TRANCHEEFFECTIF)
            .elasticScore(UPDATED_ELASTIC_SCORE);

        restImportLigneMockMvc.perform(put("/api/import-lignes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImportLigne)))
            .andExpect(status().isOk());

        // Validate the ImportLigne in the database
        List<ImportLigne> importLigneList = importLigneRepository.findAll();
        assertThat(importLigneList).hasSize(databaseSizeBeforeUpdate);
        ImportLigne testImportLigne = importLigneList.get(importLigneList.size() - 1);
        assertThat(testImportLigne.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testImportLigne.getMatchingMethod()).isEqualTo(UPDATED_MATCHING_METHOD);
        assertThat(testImportLigne.getIdExterne()).isEqualTo(UPDATED_ID_EXTERNE);
        assertThat(testImportLigne.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testImportLigne.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testImportLigne.getCp()).isEqualTo(UPDATED_CP);
        assertThat(testImportLigne.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testImportLigne.getSiret()).isEqualTo(UPDATED_SIRET);
        assertThat(testImportLigne.getGeolocScore()).isEqualTo(UPDATED_GEOLOC_SCORE);
        assertThat(testImportLigne.getGeolocLabel()).isEqualTo(UPDATED_GEOLOC_LABEL);
        assertThat(testImportLigne.getGeolocHousenumber()).isEqualTo(UPDATED_GEOLOC_HOUSENUMBER);
        assertThat(testImportLigne.getGeolocStreet()).isEqualTo(UPDATED_GEOLOC_STREET);
        assertThat(testImportLigne.getGeolocPostcode()).isEqualTo(UPDATED_GEOLOC_POSTCODE);
        assertThat(testImportLigne.getGeolocCity()).isEqualTo(UPDATED_GEOLOC_CITY);
        assertThat(testImportLigne.getGeolocLatitude()).isEqualTo(UPDATED_GEOLOC_LATITUDE);
        assertThat(testImportLigne.getGeolocLongitude()).isEqualTo(UPDATED_GEOLOC_LONGITUDE);
        assertThat(testImportLigne.getSireneSiret()).isEqualTo(UPDATED_SIRENE_SIRET);
        assertThat(testImportLigne.getSireneDenomination()).isEqualTo(UPDATED_SIRENE_DENOMINATION);
        assertThat(testImportLigne.getSireneHousenumber()).isEqualTo(UPDATED_SIRENE_HOUSENUMBER);
        assertThat(testImportLigne.getSireneStreet()).isEqualTo(UPDATED_SIRENE_STREET);
        assertThat(testImportLigne.getSireneCodepostal()).isEqualTo(UPDATED_SIRENE_CODEPOSTAL);
        assertThat(testImportLigne.getSireneVille()).isEqualTo(UPDATED_SIRENE_VILLE);
        assertThat(testImportLigne.getSireneLatitude()).isEqualTo(UPDATED_SIRENE_LATITUDE);
        assertThat(testImportLigne.getSireneLongitude()).isEqualTo(UPDATED_SIRENE_LONGITUDE);
        assertThat(testImportLigne.getSireneEtatadministratif()).isEqualTo(UPDATED_SIRENE_ETATADMINISTRATIF);
        assertThat(testImportLigne.getSireneNomenclature()).isEqualTo(UPDATED_SIRENE_NOMENCLATURE);
        assertThat(testImportLigne.getSireneTrancheeffectif()).isEqualTo(UPDATED_SIRENE_TRANCHEEFFECTIF);
        assertThat(testImportLigne.getElasticScore()).isEqualTo(UPDATED_ELASTIC_SCORE);
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

        // Validate the database contains one less item
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
