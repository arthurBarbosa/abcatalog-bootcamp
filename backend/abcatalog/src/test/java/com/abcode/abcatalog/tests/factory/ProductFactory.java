package com.abcode.abcatalog.tests.factory;

import com.abcode.abcatalog.dto.ProductDTO;
import com.abcode.abcatalog.entities.Product;

import java.time.Instant;

public class ProductFactory {

    public static Product createProduct() {
        return new Product(null, "Phone", "Good Phone", 800.0, "http://img.com/img.png", Instant.parse("2021-10-20T03:00:00Z"));
    }

    public static ProductDTO createProductDTO() {
        return new ProductDTO(createProduct());
    }

}
