package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ProductRequest {
    private String description;
    private String category;
    private Integer stock;
    private Double price_unit;
    private Boolean active;
    private Date date_creation;
}
