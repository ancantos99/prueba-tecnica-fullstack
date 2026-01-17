package com.prueba.tecnica.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter @Setter
public abstract class Persona {

    @Column(nullable = false)
    private String nombre;
    private String genero;
    private Integer edad;
    @Column(nullable = false, unique = true)
    private String identificacion;
    private String direccion;
    private String telefono;
}