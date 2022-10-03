package co.edu.utp.misiontic.equipo8.inventario.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserResponse;
import co.edu.utp.misiontic.equipo8.inventario.model.entity.User;
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
                    .id(user.getId())
                    .name(user.getName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .admin(user.getAdmin())
                    .active(user.getActive())
                    .build();
    }


    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .admin(user.getAdmin())
                        .active(user.getActive())
                        .build())
                .collect(Collectors.toList());
    }


    @Override
    public UserResponse getKeywordResult(String keyword) {
        var userOp = userRepository.findByName(keyword);
        if (userOp.isEmpty()) {
            throw new RuntimeException("El usuario no existe");
        }
        var user = userOp.get();
        return UserResponse.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .admin(user.getAdmin())
                    .active(user.getActive())
                    .build();
    }


    @Override
    public UserResponse getUserById(Integer id) {
        var userOp = userRepository.findById(id);
        if (userOp.isEmpty()) {
            throw new RuntimeException("El usuario no existe");
        }
        var user = userOp.get();
        return UserResponse.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .admin(user.getAdmin())
                    .active(user.getActive())
                    .build();
    }


    @Override
    public UserResponse createUser(UserRequest user) {
        var userOp = userRepository.findByEmail(user.getEmail()); 
        if(userOp.isPresent()){
            throw new RuntimeException("El usuario ya existe");
        }
        
        var userDb = new User();
        userDb.setName(user.getName());
        userDb.setLastName(user.getLastName());
        userDb.setEmail(user.getEmail());
        userDb.setPassword(user.getPassword());
        userDb.setAdmin(user.getAdmin());
        userDb.setActive(user.getActive());
        userDb = userRepository.save(userDb); 
        
        return getUserById(userDb.getId());
    }


    @Override
    public UserResponse updateUser(UserRequest user) {
        var userOp = userRepository.findById(user.getId());
        if(userOp.isEmpty()){
            throw new RuntimeException("El usuario no existe");
        }

        var userDb = userOp.get();
        userDb.setName(user.getName());
        userDb.setLastName(user.getLastName());
        userDb.setEmail(user.getEmail());
        userDb.setPassword(user.getPassword());
        userDb.setAdmin(user.getAdmin());
        userDb.setActive(user.getActive());
        userDb = userRepository.save(userDb); 
        
        return getUserById(userDb.getId());
    }


    @Override
    public void deleteUser(Integer id) {
        var userOp = userRepository.findById(id);
        if (userOp.isEmpty()) {
            throw new RuntimeException("El usuario no existe");
        }
        userRepository.delete(userOp.get());
        
    }


    
}
