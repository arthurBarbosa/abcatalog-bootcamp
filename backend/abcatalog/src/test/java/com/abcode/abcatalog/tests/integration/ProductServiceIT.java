package com.abcode.abcatalog.tests.integration;

import com.abcode.abcatalog.dto.ProductDTO;
import com.abcode.abcatalog.services.ProductService;
import com.abcode.abcatalog.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService service;

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
    public void deleteShouldDoNothingWhenIdExists() {

        Assertions.assertDoesNotThrow(() -> {
            service.delete(existingId);
        });

    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {

        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistingId);
        });

    }


    @Test
    public void findAllPagedShouldReturnNothingProductsWhenNameDoesNotExists() {

        String name = "Camera";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertTrue(result.isEmpty());
    }

    @Test
    public void findAllPagedShouldReturnProductsWhenNameExistsIgnoreCase() {

        String name = "pc gAMer";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
    }

    @Test
    public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {

        String name = "";

        Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countToTalProducts, result.getTotalElements());
    }



}
