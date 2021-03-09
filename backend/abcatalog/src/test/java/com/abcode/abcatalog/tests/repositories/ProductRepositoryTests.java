package com.abcode.abcatalog.tests.repositories;

import com.abcode.abcatalog.entities.Category;
import com.abcode.abcatalog.entities.Product;
import com.abcode.abcatalog.repositories.ProductRepository;
import com.abcode.abcatalog.tests.factory.CategoryFactory;
import com.abcode.abcatalog.tests.factory.ProductFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@DataJpaTest
public class ProductRepositoryTests {

    @Autowired
    private ProductRepository productRepository;

    private long existingId;
    private long nonExistingId;
    private Long countToTalProducts;
    private Long countPCGamerProducts;
    private PageRequest pageRequest;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countToTalProducts = 25L;
        countPCGamerProducts = 21L;
        pageRequest = PageRequest.of(0, 10);
    }

    @Test
    public void deleteShouldDeleteObjectWhenIdExists() {

        productRepository.deleteById(existingId);

        Optional<Product> result = productRepository.findById(existingId);

        Assertions.assertFalse(result.isPresent());
    }

    @Test
    public void deleteShouldTrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {

        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
            productRepository.deleteById(nonExistingId);
        });

    }

    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
        Product product = ProductFactory.createProduct();
        product.setId(null);

        product = productRepository.save(product);
        Optional<Product> result = productRepository.findById(product.getId());

        Assertions.assertNotNull(product.getId());
        Assertions.assertEquals(countToTalProducts + 1L, product.getId());
        Assertions.assertTrue(result.isPresent());
        Assertions.assertSame(result.get(), product);
    }

    @Test
    public void findShouldReturnProductsWhenNameExists() {

        String name = "PC Gamer";

        Page<Product> result = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());

    }

    @Test
    public void findShouldReturnProductsWhenNameExistsIgnoreCase() {

        String name = "pc gAMer";

        Page<Product> result = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());

    }

    @Test
    public void findShouldReturnAllProductsWhenNameIsEmpty() {

        String name = "";

        Page<Product> result = productRepository.find(null, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countToTalProducts, result.getTotalElements());

    }

    @Test
    public void findShouldReturnAllProductsByCategoryWhenCategoriesIdNotNull() {

        String name = "";
        Category category = CategoryFactory.createCategory();

        List<Category> categories = CategoryFactory.getCategories(Arrays.asList(category));

        Page<Product> result = productRepository.find(categories, "", pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(1, result.getTotalElements());

    }
}
