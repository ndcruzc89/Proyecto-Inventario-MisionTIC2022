package co.edu.utp.misiontic.equipo8.inventario.service;

import java.util.List;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductResponse;

public interface ProductService {

    List<ProductResponse> getAllProducts();

    void createProduct(ProductRequest product);

    void updateProduct(ProductRequest product);

    void deleteProduct(Integer id);
}
