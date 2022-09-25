package co.edu.utp.misiontic.equipo8.inventario.service;

import co.edu.utp.misiontic.equipo8.inventario.controller.dto.UserResponse;

public interface UserService  {

    UserResponse validateUser(String email, String password);
}
