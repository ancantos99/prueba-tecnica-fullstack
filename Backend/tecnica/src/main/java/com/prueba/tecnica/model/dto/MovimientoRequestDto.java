package com.prueba.tecnica.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoRequestDto {

    private Long cuentaid;
    private String tipomovimiento; // CREDITO o DEBITO
    private BigDecimal valor;
    private LocalDateTime fecha;
}
