package fr.effidic.cleanclient.repository;

import fr.effidic.cleanclient.domain.LigneProspect;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LigneProspect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneProspectRepository extends JpaRepository<LigneProspect, Long> {

}
