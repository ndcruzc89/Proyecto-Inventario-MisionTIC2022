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

    @GetMapping
    public ResponseEntity<?> listProducts() {
        var response = productService.getAllProducts();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<?> searchKeyword(@PathVariable("keyword") String keyword) {
        var response = productService.getKeywordResult(keyword);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest product) {
        try {
            return ResponseEntity.ok().body(productService.createProduct(product));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> editProduct(@RequestBody ProductRequest product) {
        try {
            return ResponseEntity.ok().body(productService.updateProduct(product));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeProduct(@PathVariable("id") Integer id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

}
