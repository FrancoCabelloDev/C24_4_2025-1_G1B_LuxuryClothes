package com.luxuryclothes.Luxuryclothes_project.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Double price;

    private Double originalPrice;

    // Cambia de String a Brand (relación ManyToOne)
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String color;

    private String size;

    // Cambia de String a Collection (relación ManyToOne)
    @ManyToOne
    @JoinColumn(name = "collection_id", nullable = true)
    private Collection collection;

    private String gender;

    private String image;

    private Double rating;

    // Si quieres relación con Tag, usa ManyToMany
    @ManyToMany
    @JoinTable(
        name = "product_tag",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    // Constructor vacío
    public Product() {}

    // Constructor con todos los campos
    public Product(Long id, String name, Double price, Double originalPrice, Brand brand, Category category, String color, String size, Collection collection, String gender, String image, Double rating, Set<Tag> tags) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.originalPrice = originalPrice;
        this.brand = brand;
        this.category = category;
        this.color = color;
        this.size = size;
        this.collection = collection;
        this.gender = gender;
        this.image = image;
        this.rating = rating;
        this.tags = tags;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public Brand getBrand() { return brand; }
    public void setBrand(Brand brand) { this.brand = brand; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public Collection getCollection() { return collection; }
    public void setCollection(Collection collection) { this.collection = collection; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
}