package co.edu.utp.misiontic.equipo8.inventario.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.utp.misiontic.equipo8.inventario.model.entity.User;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByEmailAndPasswordAndActiveIsTrue(String email, String password);

}
