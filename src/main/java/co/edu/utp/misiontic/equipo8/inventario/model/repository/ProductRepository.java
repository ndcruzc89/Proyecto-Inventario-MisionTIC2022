package co.edu.utp.misiontic.equipo8.inventario.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.utp.misiontic.equipo8.inventario.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

   
    
    Optional<Product> findByDescription(String description);
