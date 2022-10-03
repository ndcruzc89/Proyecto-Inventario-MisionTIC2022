package co.edu.utp.misiontic.equipo8.inventario.service;

import java.util.List;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserRequest;
import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserResponse;

public interface UserService  {

    UserResponse validateUser(String email, String password);

    List<UserResponse> getAllUsers();

    UserResponse getKeywordResult(String keyword);

    UserResponse getUserById(Integer id);

    UserResponse createUser(UserRequest user);

    UserResponse updateUser(UserRequest user);

    void deleteUser(Integer id);
}
