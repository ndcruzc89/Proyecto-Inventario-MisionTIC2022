package co.edu.utp.misiontic.equipo8.inventario.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.LoginRequest;
import co.edu.utp.misiontic.equipo8.inventario.service.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/login")
public class LoginRestController {
    
    private final UserService securityService;
    
    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest user) {
        try {
            var response = securityService.validateUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

}
