package com.prueba.tecnica.controller;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prueba.tecnica.model.dto.BusquedaMovimientosDto;
import com.prueba.tecnica.model.dto.ClienteDto;
import com.prueba.tecnica.model.dto.ReporteEstadoCuentaDto;
import com.prueba.tecnica.service.MovimientoService;

@WebMvcTest(MovimientoController.class)
public class MovimientoControllerTest {
	@Autowired
    private MockMvc mockMvc;
    @MockBean
    private MovimientoService movimientoService;
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void obtenerEstadoCtaPdf_retorna200yJson() throws Exception {

        BusquedaMovimientosDto filtro = new BusquedaMovimientosDto();
        filtro.setClienteid(1L);
        filtro.setFechainicio(LocalDateTime.of(2026, 1, 1, 0, 0));
        filtro.setFechafin(LocalDateTime.of(2026, 1, 31, 23, 59));

        ReporteEstadoCuentaDto respuestaMock = new ReporteEstadoCuentaDto();
        respuestaMock.setCliente(ClienteDto.builder()
        		.clienteid(Long.valueOf("1"))
        		.nombre("A Cantos")
        		.build()
        		);
        respuestaMock.setTotalcredito(new BigDecimal("500"));
        respuestaMock.setTotaldebito(new BigDecimal("200"));
        respuestaMock.setPdfbase64("PDF_BASE64_MOCK");

        when(movimientoService.reporteEstadoCuenta(
                Long.valueOf("1"),
                filtro.getFechainicio(),filtro.getFechafin()
        )).thenReturn(respuestaMock);

        mockMvc.perform(post("/api/movimientos/reportes/pdf")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(filtro)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cliente.nombre").value("A Cantos"))
                .andExpect(jsonPath("$.totalcredito").value(500))
                .andExpect(jsonPath("$.totaldebito").value(200))
                .andExpect(jsonPath("$.pdfbase64").exists());
    }
}
