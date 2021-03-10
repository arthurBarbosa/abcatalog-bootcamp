package com.abcode.abcatalog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.OAuthBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableSwagger2
public class DocumentationConfiguration implements WebMvcConfigurer {

    /**
     * http://localhost:8080/swagger-ui.html#/ http://localhost:8080/v2/api-docs
     */

    private ApiInfo apiInfo() {
        return new ApiInfo("Catalog Products",
                "Catalog product API.",
                "1.0",
                "Terms of service",
                new Contact("Arthur Barbosa", "www.www.com", "arthurbruno@gmail.com"),
                "License of API",
                "API license URL",
                Collections.emptyList());
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(securityScheme()))
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                .paths(PathSelectors.any())
                .build();
    }

    private SecurityScheme securityScheme(){
        return new OAuthBuilder()
                .name("abcatalog")
                .grantTypes(grantTypes()).scopes(scopes()).build();
    }

    private List<AuthorizationScope> scopes(){
        return Arrays.asList(new AuthorizationScope("READ", "Read Access"),
                new AuthorizationScope("WRITE", "Write Access"));
    }

    private List<GrantType> grantTypes(){
        return Arrays.asList(new ResourceOwnerPasswordCredentialsGrant("/oauth/token"));
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("abcatalog", authorizationScopes));
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
