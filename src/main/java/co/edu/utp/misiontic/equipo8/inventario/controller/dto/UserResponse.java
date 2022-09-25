package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponse {
    private String name;
    private String lastName;
    private String email;
    private Boolean admin;
}
