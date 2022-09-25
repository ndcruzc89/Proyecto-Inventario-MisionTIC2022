package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
