package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import lombok.Data;

@Data
public class UserRequest {
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Boolean admin;
    private Boolean active;
}
