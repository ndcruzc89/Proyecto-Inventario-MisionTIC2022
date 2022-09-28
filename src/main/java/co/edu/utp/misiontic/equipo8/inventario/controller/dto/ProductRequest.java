package co.edu.utp.misiontic.equipo8.inventario.controller.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProductRequest {
    private Integer id;
    private String description;
    private String category;
    private Integer stock;
    private Double price_unit;
    private Boolean active;
    
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date_creation;
}
