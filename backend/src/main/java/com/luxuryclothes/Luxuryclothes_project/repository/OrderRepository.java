package com.luxuryclothes.Luxuryclothes_project.repository;

import com.luxuryclothes.Luxuryclothes_project.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
