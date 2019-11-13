package fr.effidic.cleanclient.web.rest;

import fr.effidic.cleanclient.CleanclientApp;
import fr.effidic.cleanclient.domain.LigneProspect;
import fr.effidic.cleanclient.repository.LigneProspectRepository;
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
 * Integration tests for the {@Link LigneProspectResource} REST controller.
 */
@SpringBootTest(classes = CleanclientApp.class)
public class LigneProspectResourceIT {

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

    @Autowired
    private LigneProspectRepository ligneProspectRepository;

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

    private MockMvc restLigneProspectMockMvc;

    private LigneProspect ligneProspect;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LigneProspectResource ligneProspectResource = new LigneProspectResource(ligneProspectRepository);
        this.restLigneProspectMockMvc = MockMvcBuilders.standaloneSetup(ligneProspectResource)
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
    public static LigneProspect createEntity(EntityManager em) {
        LigneProspect ligneProspect = new LigneProspect()
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
            .sireneTrancheeffectif(DEFAULT_SIRENE_TRANCHEEFFECTIF);
        return ligneProspect;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneProspect createUpdatedEntity(EntityManager em) {
        LigneProspect ligneProspect = new LigneProspect()
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
            .sireneTrancheeffectif(UPDATED_SIRENE_TRANCHEEFFECTIF);
        return ligneProspect;
    }

    @BeforeEach
    public void initTest() {
        ligneProspect = createEntity(em);
    }

    @Test
    @Transactional
    public void createLigneProspect() throws Exception {
        int databaseSizeBeforeCreate = ligneProspectRepository.findAll().size();

        // Create the LigneProspect
        restLigneProspectMockMvc.perform(post("/api/ligne-prospects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneProspect)))
            .andExpect(status().isCreated());

        // Validate the LigneProspect in the database
        List<LigneProspect> ligneProspectList = ligneProspectRepository.findAll();
        assertThat(ligneProspectList).hasSize(databaseSizeBeforeCreate + 1);
        LigneProspect testLigneProspect = ligneProspectList.get(ligneProspectList.size() - 1);
        assertThat(testLigneProspect.getSireneSiret()).isEqualTo(DEFAULT_SIRENE_SIRET);
        assertThat(testLigneProspect.getSireneDenomination()).isEqualTo(DEFAULT_SIRENE_DENOMINATION);
        assertThat(testLigneProspect.getSireneHousenumber()).isEqualTo(DEFAULT_SIRENE_HOUSENUMBER);
        assertThat(testLigneProspect.getSireneStreet()).isEqualTo(DEFAULT_SIRENE_STREET);
        assertThat(testLigneProspect.getSireneCodepostal()).isEqualTo(DEFAULT_SIRENE_CODEPOSTAL);
        assertThat(testLigneProspect.getSireneVille()).isEqualTo(DEFAULT_SIRENE_VILLE);
        assertThat(testLigneProspect.getSireneLatitude()).isEqualTo(DEFAULT_SIRENE_LATITUDE);
        assertThat(testLigneProspect.getSireneLongitude()).isEqualTo(DEFAULT_SIRENE_LONGITUDE);
        assertThat(testLigneProspect.getSireneEtatadministratif()).isEqualTo(DEFAULT_SIRENE_ETATADMINISTRATIF);
        assertThat(testLigneProspect.getSireneNomenclature()).isEqualTo(DEFAULT_SIRENE_NOMENCLATURE);
        assertThat(testLigneProspect.getSireneTrancheeffectif()).isEqualTo(DEFAULT_SIRENE_TRANCHEEFFECTIF);
    }

    @Test
    @Transactional
    public void createLigneProspectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneProspectRepository.findAll().size();

        // Create the LigneProspect with an existing ID
        ligneProspect.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneProspectMockMvc.perform(post("/api/ligne-prospects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneProspect)))
            .andExpect(status().isBadRequest());

        // Validate the LigneProspect in the database
        List<LigneProspect> ligneProspectList = ligneProspectRepository.findAll();
        assertThat(ligneProspectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLigneProspects() throws Exception {
        // Initialize the database
        ligneProspectRepository.saveAndFlush(ligneProspect);

        // Get all the ligneProspectList
        restLigneProspectMockMvc.perform(get("/api/ligne-prospects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneProspect.getId().intValue())))
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
            .andExpect(jsonPath("$.[*].sireneTrancheeffectif").value(hasItem(DEFAULT_SIRENE_TRANCHEEFFECTIF.toString())));
    }
    
    @Test
    @Transactional
    public void getLigneProspect() throws Exception {
        // Initialize the database
        ligneProspectRepository.saveAndFlush(ligneProspect);

        // Get the ligneProspect
        restLigneProspectMockMvc.perform(get("/api/ligne-prospects/{id}", ligneProspect.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ligneProspect.getId().intValue()))
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
            .andExpect(jsonPath("$.sireneTrancheeffectif").value(DEFAULT_SIRENE_TRANCHEEFFECTIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLigneProspect() throws Exception {
        // Get the ligneProspect
        restLigneProspectMockMvc.perform(get("/api/ligne-prospects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLigneProspect() throws Exception {
        // Initialize the database
        ligneProspectRepository.saveAndFlush(ligneProspect);

        int databaseSizeBeforeUpdate = ligneProspectRepository.findAll().size();

        // Update the ligneProspect
        LigneProspect updatedLigneProspect = ligneProspectRepository.findById(ligneProspect.getId()).get();
        // Disconnect from session so that the updates on updatedLigneProspect are not directly saved in db
        em.detach(updatedLigneProspect);
        updatedLigneProspect
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
            .sireneTrancheeffectif(UPDATED_SIRENE_TRANCHEEFFECTIF);

        restLigneProspectMockMvc.perform(put("/api/ligne-prospects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneProspect)))
            .andExpect(status().isOk());

        // Validate the LigneProspect in the database
        List<LigneProspect> ligneProspectList = ligneProspectRepository.findAll();
        assertThat(ligneProspectList).hasSize(databaseSizeBeforeUpdate);
        LigneProspect testLigneProspect = ligneProspectList.get(ligneProspectList.size() - 1);
        assertThat(testLigneProspect.getSireneSiret()).isEqualTo(UPDATED_SIRENE_SIRET);
        assertThat(testLigneProspect.getSireneDenomination()).isEqualTo(UPDATED_SIRENE_DENOMINATION);
        assertThat(testLigneProspect.getSireneHousenumber()).isEqualTo(UPDATED_SIRENE_HOUSENUMBER);
        assertThat(testLigneProspect.getSireneStreet()).isEqualTo(UPDATED_SIRENE_STREET);
        assertThat(testLigneProspect.getSireneCodepostal()).isEqualTo(UPDATED_SIRENE_CODEPOSTAL);
        assertThat(testLigneProspect.getSireneVille()).isEqualTo(UPDATED_SIRENE_VILLE);
        assertThat(testLigneProspect.getSireneLatitude()).isEqualTo(UPDATED_SIRENE_LATITUDE);
        assertThat(testLigneProspect.getSireneLongitude()).isEqualTo(UPDATED_SIRENE_LONGITUDE);
        assertThat(testLigneProspect.getSireneEtatadministratif()).isEqualTo(UPDATED_SIRENE_ETATADMINISTRATIF);
        assertThat(testLigneProspect.getSireneNomenclature()).isEqualTo(UPDATED_SIRENE_NOMENCLATURE);
        assertThat(testLigneProspect.getSireneTrancheeffectif()).isEqualTo(UPDATED_SIRENE_TRANCHEEFFECTIF);
    }

    @Test
    @Transactional
    public void updateNonExistingLigneProspect() throws Exception {
        int databaseSizeBeforeUpdate = ligneProspectRepository.findAll().size();

        // Create the LigneProspect

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneProspectMockMvc.perform(put("/api/ligne-prospects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ligneProspect)))
            .andExpect(status().isBadRequest());

        // Validate the LigneProspect in the database
        List<LigneProspect> ligneProspectList = ligneProspectRepository.findAll();
        assertThat(ligneProspectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLigneProspect() throws Exception {
        // Initialize the database
        ligneProspectRepository.saveAndFlush(ligneProspect);

        int databaseSizeBeforeDelete = ligneProspectRepository.findAll().size();

        // Delete the ligneProspect
        restLigneProspectMockMvc.perform(delete("/api/ligne-prospects/{id}", ligneProspect.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneProspect> ligneProspectList = ligneProspectRepository.findAll();
        assertThat(ligneProspectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneProspect.class);
        LigneProspect ligneProspect1 = new LigneProspect();
        ligneProspect1.setId(1L);
        LigneProspect ligneProspect2 = new LigneProspect();
        ligneProspect2.setId(ligneProspect1.getId());
        assertThat(ligneProspect1).isEqualTo(ligneProspect2);
        ligneProspect2.setId(2L);
        assertThat(ligneProspect1).isNotEqualTo(ligneProspect2);
        ligneProspect1.setId(null);
        assertThat(ligneProspect1).isNotEqualTo(ligneProspect2);
    }
}
