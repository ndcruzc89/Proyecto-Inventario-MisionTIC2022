package co.edu.utp.misiontic.equipo8.inventario;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

// import co.edu.utp.misiontic.equipo8.inventario.model.entity.User;
import co.edu.utp.misiontic.equipo8.inventario.model.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;

@SpringBootApplication
public class InventarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventarioApplication.class, args);
	}

	@Component
	@Data
	@AllArgsConstructor
	public static class DataLoader implements CommandLineRunner {

		private final UserRepository userRepository;
		
		@Override
		public void run(String... args) throws Exception {
			// TODO Auto-generated method stub
			
		}

		// private void loadUsers() {
		// 	userRepository.save(new User(0,"Alejandro", "García",
		// 			"alej45@gmail.com","Alejandro45", true, true));
		// }

		
	}
}
