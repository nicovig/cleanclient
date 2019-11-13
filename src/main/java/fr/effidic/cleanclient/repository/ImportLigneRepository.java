package fr.effidic.cleanclient.repository;

import fr.effidic.cleanclient.domain.ImportLigne;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ImportLigne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImportLigneRepository extends JpaRepository<ImportLigne, Long> {

}
