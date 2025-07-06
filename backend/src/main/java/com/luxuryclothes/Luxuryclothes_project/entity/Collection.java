package com.luxuryclothes.Luxuryclothes_project.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "collection")
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // Relación opcional con productos
    @OneToMany(mappedBy = "collection")
    private Set<Product> products;

    // Constructor vacío
    public Collection() {}

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Product> getProducts() { return products; }
    public void setProducts(Set<Product> products) { this.products = products; }
}