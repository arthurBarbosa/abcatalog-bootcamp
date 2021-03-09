package com.abcode.abcatalog.tests.services;

import com.abcode.abcatalog.repositories.ProductRepository;
import com.abcode.abcatalog.services.ProductService;
import com.abcode.abcatalog.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    private long existingId;
    private long nonExistingId;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;

        Mockito.doNothing().when(repository).deleteById(existingId);

        Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists(){

        Assertions.assertDoesNotThrow(() -> {
            service.delete(existingId);
        });

        Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);

    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists(){

        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistingId);
        });

        Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
    }
}
