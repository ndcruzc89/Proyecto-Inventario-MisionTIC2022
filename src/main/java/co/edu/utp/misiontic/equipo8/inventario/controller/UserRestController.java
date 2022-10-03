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

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserRequest;
import co.edu.utp.misiontic.equipo8.inventario.service.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("api/user")
public class UserRestController {
    
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> listUsers() {
        var response = userService.getAllUsers();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<?> searchKeyword(@PathVariable("keyword") String keyword) {
        var response = userService.getKeywordResult(keyword);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody UserRequest user) {
        try {
            return ResponseEntity.ok().body(userService.createUser(user));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> editUser(@RequestBody UserRequest user) {
        try {
            return ResponseEntity.ok().body(userService.updateUser(user));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeUser(@PathVariable("id") Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted user");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }
}
