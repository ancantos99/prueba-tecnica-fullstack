package com.prueba.tecnica.service;


import java.util.List;

import com.prueba.tecnica.model.dto.ClienteDto;


public interface ClienteService {
    public ClienteDto crearCliente(ClienteDto request);

    public List<ClienteDto> listarClientes();

    public ClienteDto obtenerCliente(Long id);

    public ClienteDto actualizarCliente(Long id, ClienteDto request);

    public void eliminarCliente(Long id);    
}