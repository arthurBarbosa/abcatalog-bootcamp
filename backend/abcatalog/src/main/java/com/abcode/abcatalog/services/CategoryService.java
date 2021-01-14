package com.abcode.abcatalog.services;

import com.abcode.abcatalog.dto.CategoryDTO;
import com.abcode.abcatalog.entities.Category;
import com.abcode.abcatalog.repositories.CategoryRepository;
import com.abcode.abcatalog.services.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Transactional(readOnly = true)
    public List<CategoryDTO> findAll() {
        List<Category> list = repository.findAll();
        return list.stream().map(CategoryDTO::new).collect(Collectors.toList());
    }

    public CategoryDTO findById(Long id) {
        var category = repository.findById(id);
        var entity = category.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        return new CategoryDTO(entity);
    }
}
