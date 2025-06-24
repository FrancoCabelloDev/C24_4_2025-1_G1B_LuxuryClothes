package com.luxuryclothes.Luxuryclothes_project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "contraseña")
    private String contraseña;

    @Column(name = "celular")
    private String celular;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "dni")
    private String dni;

    // Constructor vacío
    public User() {}

    // Constructor con todos los campos
    public User(Long id, String email, String nombre, String contraseña, String celular, String direccion, String dni) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.celular = celular;
        this.direccion = direccion;
        this.dni = dni;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getContraseña() { return contraseña; }
    public void setContraseña(String contraseña) { this.contraseña = contraseña; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
}
