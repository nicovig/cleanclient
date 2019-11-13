package fr.effidic.cleanclient.repository;

import fr.effidic.cleanclient.domain.Facture;
import fr.effidic.cleanclient.domain.ImportFichier;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ImportFichier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImportFichierRepository extends JpaRepository<ImportFichier, Long> {

    @Query("select importFichier from ImportFichier importFichier where importFichier.user.login = ?#{principal.username}")
    List<ImportFichier> findByUserIsCurrentUser();
    
    @Query("select importFichier from ImportFichier importFichier where importFichier.user.id = :id")
    List<ImportFichier> findByUser(@Param("id") Long id);

    @Query("select importFichier from ImportFichier importFichier join fetch importFichier.importLignes where importFichier.id = :id")
    ImportFichier findByIdWithLignes(@Param("id") Long id);
    
    @Query("select importFichier from ImportFichier importFichier where importFichier.hash = :hash")
    Optional<ImportFichier> findByH(@Param("hash") String hash);
    
    
}
