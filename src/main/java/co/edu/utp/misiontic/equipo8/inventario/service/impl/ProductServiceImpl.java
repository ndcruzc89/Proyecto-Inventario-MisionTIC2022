package co.edu.utp.misiontic.equipo8.inventario.service.impl;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> ProductResponse.builder()
                        .id(product.getId())
                        .description(product.getDescription())
                        .category(product.getCategory())
                        .stock(product.getStock())
                        .price_unit(product.getPrice_unit())
                        .active(product.getActive())
                        .date_creation(product.getDate_creation())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void createProduct(ProductRequest product) {
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
        System.out.println(productDb);
        productDb.setDate_creation(product.getDate_creation());
        productRepository.save(productDb);        
    }

    @Override
    public void updateProduct(ProductRequest product) {
        var productOp = productRepository.findById(product.getId());
        var productDescr = productRepository.findByDescription(product.getDescription()); 
        if (productDescr.get().getId() != productOp.get().getId()) {
            throw new RuntimeException("El producto ya existe");
        }
        var productDb = productOp.get();
        productDb.setDescription(product.getDescription());
        productDb.setCategory(product.getCategory());
        productDb.setStock(product.getStock());
        productDb.setPrice_unit(product.getPrice_unit());
        productDb.setActive(product.getActive());
        productDb.setDate_creation(product.getDate_creation());
        productRepository.save(productDb); 
    }

    @Override
    public void deleteProduct(Integer id) {
        var productOp = productRepository.findById(id);
        if (productOp.isEmpty()) {
            throw new RuntimeException("El producto no existe");
        }
        
        productRepository.delete(productOp.get());
        
    }
    
    
    
}
