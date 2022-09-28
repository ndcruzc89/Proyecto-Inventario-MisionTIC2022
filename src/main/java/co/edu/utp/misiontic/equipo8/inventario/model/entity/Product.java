package co.edu.utp.misiontic.equipo8.inventario.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Producto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer id;

    @Column(name = "descripcion", nullable = false, length = 100)
    private String description;

    @Column(name = "categoria", nullable = false, length = 50)
    private String category;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "precio_unidad", nullable = false)
    private Double price_unit;

    @Column(name = "activo", nullable = false)
    private Boolean active;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_creacion", nullable = false)
    private Date date_creation;

    @ManyToOne
    private User user;
}
