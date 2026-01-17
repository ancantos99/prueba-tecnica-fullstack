package com.prueba.tecnica.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextoCargaCorrectamente() throws Exception {
        mockMvc.perform( get("/api/clientes"))
               .andExpect( status().isOk());
    }
    
    @Test
    void listarClientes_retorna200() throws Exception {
        mockMvc.perform(get("/api/clientes"))
               .andExpect(status().isOk());
    }
}