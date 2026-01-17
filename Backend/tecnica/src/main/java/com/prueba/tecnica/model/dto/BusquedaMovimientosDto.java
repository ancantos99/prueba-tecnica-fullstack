package com.prueba.tecnica.model.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BusquedaMovimientosDto {
    private Long clienteid;
    private LocalDateTime fechainicio;
    private LocalDateTime fechafin;
}
