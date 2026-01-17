package com.prueba.tecnica.exception;

public class SaldoNoDisponibleException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public SaldoNoDisponibleException(String message) {
        super(message);
    }
}
