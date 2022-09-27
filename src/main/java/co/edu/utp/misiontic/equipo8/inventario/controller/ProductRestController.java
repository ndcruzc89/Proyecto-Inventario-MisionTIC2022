package co.edu.utp.misiontic.equipo8.inventario.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.ProductRequest;
import co.edu.utp.misiontic.equipo8.inventario.service.ProductService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/product")
public class ProductRestController {

    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> AddProduct(@RequestBody ProductRequest product) {
        try {
            var response = productService.createProduct(product);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }
}
