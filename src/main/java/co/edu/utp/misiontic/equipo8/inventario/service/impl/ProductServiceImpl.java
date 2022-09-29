package co.edu.utp.misiontic.equipo8.inventario.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductResponse;
import co.edu.utp.misiontic.equipo8.inventario.model.entity.Product;
import co.edu.utp.misiontic.equipo8.inventario.model.repository.ProductRepository;
import co.edu.utp.misiontic.equipo8.inventario.model.repository.UserRepository;
import co.edu.utp.misiontic.equipo8.inventario.service.ProductService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

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
    public ProductResponse getKeywordResult(String keyword) {
        var productOp = productRepository.findByDescription(keyword);
        if (productOp.isEmpty()) {
            throw new RuntimeException("El producto no existe");
        }
        var product = productOp.get();
        return ProductResponse.builder()
                .id(product.getId())
                .description(product.getDescription())
                .category(product.getCategory())
                .stock(product.getStock())
                .price_unit(product.getPrice_unit())
                .active(product.getActive())
                .date_creation(product.getDate_creation())
                .build();
    }


    @Override
    public ProductResponse getProductById(Integer id) {
        var productOp = productRepository.findById(id);
        if (productOp.isEmpty()) {
            throw new RuntimeException("El producto no existe");
        }
        var product = productOp.get();
        return ProductResponse.builder()
                .id(product.getId())
                .description(product.getDescription())
                .category(product.getCategory())
                .stock(product.getStock())
                .price_unit(product.getPrice_unit())
                .active(product.getActive())
                .date_creation(product.getDate_creation())
                .build();
    }

    
    @Override
    public ProductResponse createProduct(ProductRequest product) {
        var productOp = productRepository.findByDescription(product.getDescription()); 
        if(productOp.isPresent()){
            throw new RuntimeException("El producto ya existe");
        }

        var userOp = userRepository.findById(product.getUserId());
        if(userOp.isEmpty()){
            throw new RuntimeException("El usuario no existe");
        }
        
        var productDb = new Product();
        productDb.setDescription(product.getDescription());
        productDb.setCategory(product.getCategory());
        productDb.setStock(product.getStock());
        productDb.setPrice_unit(product.getPrice_unit());
        productDb.setActive(product.getActive());
        productDb.setDate_creation(product.getDate_creation());
        productDb.setUser(userOp.get());
        productDb = productRepository.save(productDb); 
        
        return getProductById(productDb.getId());
    }


    @Override
    public ProductResponse updateProduct(ProductRequest product) {
        var productOp = productRepository.findById(product.getId());
        if(productOp.isEmpty()){
            throw new RuntimeException("El id no existe");
        }
        // var productDescr = productRepository.findByDescription(product.getDescription()); 
        // if (productDescr.get().getId() != productOp.get().getId()) {
        //     throw new RuntimeException("El producto ya existe");
        // }
        // var productDescr = productRepository.findByDescription(product.getDescription()); 
        // if (productDescr.get().getId() != productOp.get().getId()) {
        //     throw new RuntimeException("El producto ya existe");
        // }
        var userOp = userRepository.findById(product.getUserId());
        if(userOp.isEmpty()){
            throw new RuntimeException("El usuario no existe");
        }

        var productDb = productOp.get();
        productDb.setDescription(product.getDescription());
        productDb.setCategory(product.getCategory());
        productDb.setStock(product.getStock());
        productDb.setPrice_unit(product.getPrice_unit());
        productDb.setActive(product.getActive());
        productDb.setDate_creation(product.getDate_creation());
        productDb.setUser(userOp.get());
        productDb = productRepository.save(productDb); 
        
        return getProductById(productDb.getId());
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
