package fr.effidic.cleanclient.repository;

import fr.effidic.cleanclient.domain.Facture;
import fr.effidic.cleanclient.domain.ImportFichier;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Facture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
	
    @Query("select facture from Facture facture join fetch facture.importFichier importFichier where importFichier.id = :import_fichier_id")
    Facture findByImportFichierId(@Param("import_fichier_id") Long import_fichier_id);
	
    @Query("select facture from Facture facture where facture.mailUser = :mail")
    List<Facture> findByUser(@Param("mail") String mail);


}
