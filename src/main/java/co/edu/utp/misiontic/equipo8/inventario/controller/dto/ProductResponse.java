package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductResponse {
    private Integer id;
    private String description;
    private String category;
    private Integer stock;
    private Double price_unit;
    private Boolean active;
    private Date date_creation;
}
