package co.edu.utp.misiontic.equipo8.inventario.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.utp.misiontic.equipo8.inventario.model.entity.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    
    Optional<User> findByEmailAndPasswordAndActiveIsTrue(String email, String password);

    Optional<User> findById(Integer userId);

    Optional<User> findByName(String keyword);

    Optional<User> findByEmail(String email);


}
