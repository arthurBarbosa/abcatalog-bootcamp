package com.abcode.abcatalog.tests.factory;

import com.abcode.abcatalog.dto.ProductDTO;
import com.abcode.abcatalog.entities.Category;
import com.abcode.abcatalog.entities.Product;
import org.checkerframework.checker.units.qual.C;

import java.time.Instant;

public class ProductFactory {

    public static Product createProduct() {
        Product product = new Product(null, "Phone", "Good Phone", 800.0, "http://img.com/img.png", Instant.parse("2021-10-20T03:00:00Z"));
        product.getCategories().add(new Category(1L, null));
        return product;
    }

    public static ProductDTO createProductDTO() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }

    public static ProductDTO createProductDTO(Long id) {
        ProductDTO dto = createProductDTO();
        dto.setId(id);
        return dto;
    }

}
