package co.edu.utp.misiontic.equipo8.inventario.service.impl;

import org.springframework.stereotype.Service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductResponse;
import co.edu.utp.misiontic.equipo8.inventario.model.entity.Product;
import co.edu.utp.misiontic.equipo8.inventario.model.repository.ProductRepository;
import co.edu.utp.misiontic.equipo8.inventario.service.ProductService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    
    @Override
    public ProductResponse createProduct(ProductRequest product) {
        
        var productOp = productRepository.findByDescription(product.getDescription()); 
        if(productOp.isPresent()){
            throw new RuntimeException("El producto ya existe");
        }

        var productDb = new Product();
        productDb.setDescription(product.getDescription());
        productDb.setCategory(product.getCategory());
        productDb.setStock(product.getStock());
        productDb.setPrice_unit(product.getPrice_unit());
        productDb.setActive(product.getActive());
        productDb.setDate_creation(product.getDate_creation());
        productDb = productRepository.save(productDb);

        // var userOp = userRepository.findById(username)

        return ProductResponse.builder()
            .id(productDb.getId())
            .description(productDb.getDescription())
            .category(productDb.getCategory())
            .stock(productDb.getStock())
            .price_unit(productDb.getPrice_unit())
            .active(productDb.getActive())
            .date_creation(productDb.getDate_creation())
            .build();
    }

    @Override
    public ProductResponse updateUser(ProductRequest product) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ProductRequest deleteUser(Integer id) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
