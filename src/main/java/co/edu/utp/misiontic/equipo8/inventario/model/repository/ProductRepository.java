package co.edu.utp.misiontic.equipo8.inventario.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductResponse;
import co.edu.utp.misiontic.equipo8.inventario.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findByDescription(String description);

    // @Query("SELECT p FROM Producto p" 
    // + "WHERE p.descripcion LIKE %?1%"
    // + "OR p.categoria LIKE %?1%"
    // + "OR CONCAT(p.stock, '') LIKE %?1%"
    // + "OR CONCAT(p.precio_unidad, '')  LIKE %?1%")
    // List<ProductResponse> search(String keyword);

}