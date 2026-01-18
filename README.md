# 🚀 Prueba Técnica: Fullstack Angular & Spring Boot

Esta es una prueba técnica, el proyecto demuestra la integración de un backend robusto con Spring Boot y una interfaz dinámica con Angular 17.

## 🛠️ Tecnologías Utilizadas

### **Backend**
* **Java 17** con **Spring Boot 3.x**
* **Spring Data JPA** para la persistencia.
* **H2 / PostgreSQL** (Base de datos).
* **Maven** como gestor de dependencias.
* **JUnit 5 / Mockito** para pruebas unitarias.

### **Frontend**
* **Angular 17**
* **RxJS** para manejo de flujos asíncronos.
* **CSS** (No se utilizó Framework de diseño).
* **TypeScript**.

### **Infraestructura**
* **Docker & Docker Compose** para la orquestación de servicios.

## 📦 Estructura de Carpetas

El repositorio está organizado como un monorepo para facilitar la gestión del entorno:

```text
workspacePruebaTecnica/
├── backend/tecnica      # Lógica de negocio (Spring Boot)
├── frontend/tecnicaui   # Interfaz de usuario (Angular 17)
├── docker-compose.yml   # Configuración de contenedores
├── api_postman.json     # Configuración de contenedores
└── README.md            # Documentación del proyecto
```

## 🚀 Instrucciones de Ejecución
### Requisitos Previos
* **Docker Desktop - con Docker Compose incluido** (fué elaborado en Windows).
* **Git** instalado.
### Pasos para iniciar el proyecto
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/ancantos99/prueba-tecnica-fullstack.git
    cd workspace
    ```
2.  **Construir y levantar los contenedores:**
    Este comando descargará las imágenes necesarias, compilará el backend de Java y el frontend de Angular, y los pondrá en marcha:
    ```bash
    docker-compose up --build
    ```
3.  **Verificar el acceso:**
    * **Frontend (Angular):** [http://localhost:4200](http://localhost:4200)
    * **Backend (Spring Boot):** [http://localhost:8080](http://localhost:8080)

## 🖼️ Imágenes de Demostración

<img width="1069" height="532" alt="image" src="https://github.com/user-attachments/assets/03f7104d-4eac-4310-bcc7-5712ac9ca7f0" />

<img width="1061" height="585" alt="image" src="https://github.com/user-attachments/assets/bd10aac6-23be-4f76-9e3d-30f08f63ab11" />

<img width="1284" height="425" alt="image" src="https://github.com/user-attachments/assets/5e38bea2-e57c-4646-a0aa-5900d33fd9a5" />

<img width="1269" height="488" alt="image" src="https://github.com/user-attachments/assets/ca7899b7-4635-489f-b676-cc76e3fbbea0" />

---

## 👤 Autor

Desarrollado por **Andrés Cantos R.**

* **Email:** [mailto:ancantos99@gmail.com](mailto:ancantos99@gmail.com)

---
