package co.edu.utp.misiontic.equipo8.inventario.service.impl;

import org.springframework.stereotype.Service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserResponse;
import co.edu.utp.misiontic.equipo8.inventario.model.repository.UserRepository;
import co.edu.utp.misiontic.equipo8.inventario.service.UserService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse validateUser(String email, String password) {
        var userOp = userRepository.findByEmailAndPasswordAndActiveIsTrue(email, password);
        if (userOp.isEmpty()) {
            throw new RuntimeException("Credenciales inválidas");
        }
        
        var user = userOp.get();
        return UserResponse.builder()
                .name(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .admin(user.getAdmin())
                .build();
    }


    
}
