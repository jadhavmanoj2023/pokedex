package com.manoj.pokedex.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager("pokemon","pokemonList");
        manager.setCaffeine(
                Caffeine.newBuilder()
                        .recordStats()
                        .expireAfterWrite(30, TimeUnit.MINUTES)
                        .maximumSize(200)
        );
        return manager;
    }


}
