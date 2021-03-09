package com.abcode.abcatalog.tests.factory;

import com.abcode.abcatalog.entities.Category;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CategoryFactory {

    public static Category createCategory() {
        return new Category(1L, "Eletronicos");
    }

    public static List<Category> getCategories(List<Category> categories) {
        return new ArrayList<>(Arrays.asList(createCategory()));
    }


}
