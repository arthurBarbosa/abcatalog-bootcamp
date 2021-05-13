package com.abcode.abcatalog;

import com.abcode.abcatalog.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AbcatalogApplication implements CommandLineRunner {

    @Autowired
    private S3Service s3Service;

    public static void main(String[] args) {
        SpringApplication.run(AbcatalogApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        s3Service.uploadFile("/home/arthurbarbosa/Imagens/print.png");
    }
}
