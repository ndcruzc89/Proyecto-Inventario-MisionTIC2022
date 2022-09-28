package co.edu.utp.misiontic.equipo8.inventario.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // @GetMapping("/{id}") 
    // public ResponseEntity<?> searchProduct(@PathVariable("id") String id) {
    //     var response = productService.getMovieById(id);
    //     return ResponseEntity.ok().body(response);
    // }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest product) {
        try {
            productService.createProduct(product);
            var response = productService.getAllProducts();
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> editProduct(@RequestBody ProductRequest product) {
        try {
            productService.updateProduct(product);
            var response = productService.getAllProducts();
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeProduct(@PathVariable("id") Integer id) {
        try {
            productService.deleteProduct(id);
            var response = productService.getAllProducts();
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

}
