package co.edu.utp.misiontic.equipo8.inventario.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_usuario")
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 50)
    private String name;

    @Column(name = "apellido", nullable = false, length = 50)
    private String lastName;

    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "contrasena", nullable = false, length = 50)
    private String password;

    @Column(name = "activo", nullable = false, length = 20)
    private Boolean active;

    @Column(name = "administrador", nullable = false, length = 20)
    private Boolean admin;
}
