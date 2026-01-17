package com.prueba.tecnica.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prueba.tecnica.model.dto.ClienteDto;
import com.prueba.tecnica.service.ClienteService;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteDto> crearCliente(
            @RequestBody ClienteDto request) {
        return new ResponseEntity<>(
                clienteService.crearCliente(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ClienteDto>> listarClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDto> obtenerCliente(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.obtenerCliente(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDto> actualizarCliente(
            @PathVariable Long id,
            @RequestBody ClienteDto request) {
        return ResponseEntity.ok(clienteService.actualizarCliente(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}