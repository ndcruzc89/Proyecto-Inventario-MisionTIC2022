package co.edu.utp.misiontic.equipo8.inventario.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InventarioController {
    
    @GetMapping("/registrarse")
    public String goToRegister(Model model) {
        return "registrarse";
    }
}
