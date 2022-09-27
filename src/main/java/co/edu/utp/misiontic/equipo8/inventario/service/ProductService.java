package co.edu.utp.misiontic.equipo8.inventario.service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductResponse;

public interface ProductService {
    ProductResponse createProduct(ProductRequest product);

    ProductResponse updateUser(ProductRequest product);

    ProductRequest deleteUser(Integer id);
}
