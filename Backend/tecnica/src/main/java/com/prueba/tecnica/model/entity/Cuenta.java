package com.prueba.tecnica.model.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cuentas")
@Getter @Setter
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cuentaid;

    @Column(unique = true, nullable = false)
    private String numerocuenta;
    private String tipocuenta;
    private BigDecimal saldoinicial;
    private Boolean estado;

    @ManyToOne
    @JoinColumn(name = "clienteid")
    private Cliente cliente;
}