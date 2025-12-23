package com.manoj.pokedex.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/cache")
@Slf4j
public class CacheStatsController {

    @Autowired
    private CacheManager cacheManager;

    @GetMapping("/stats")
    public String getCacheStats() {
        CaffeineCache cache = (CaffeineCache) cacheManager.getCache("pokemon");

        if (cache == null) {
            return "Cache not found";
        }

        return cache.getNativeCache().stats().toString();
    }
}
