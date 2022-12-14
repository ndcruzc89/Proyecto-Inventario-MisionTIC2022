package co.edu.utp.misiontic.equipo8.inventario.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InventarioController {
    
    @GetMapping("/inicio")
    public String goToHome(Model model) {
        return "inicio";
    }

    @GetMapping("/productos")
    public String goToProducts(Model model) {
        return "productos";
    }

    @GetMapping("/usuarios")
    public String goToUsers(Model model) {
        return "usuarios";
    }

}
