package com.manoj.pokedex.client;


import com.manoj.pokedex.exception.PokemonNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class PokeApiClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String speciesUrl;

    public PokeApiClient(
            RestTemplate restTemplate,
            @Value("${pokeapi.base-url}") String baseUrl,
             @Value("${pokeapi.species-url}") String speciesUrl
    ) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
        this.speciesUrl = speciesUrl;
    }

    public Map<String, Object> fetchPokemon(String name) {
        try {
            return restTemplate.getForObject(
                    baseUrl + name.toLowerCase(),
                    Map.class
            );
        } catch (HttpClientErrorException.NotFound ex) {
            throw new PokemonNotFoundException("Pokemon not found: " + name);
        }
    }

    public Map<String, Object> fetchPokemonSpecies(String name) {
        return restTemplate.getForObject(
                speciesUrl + name.toLowerCase(),
                Map.class
        );
    }

    public Map<String, Object> fetchPokemonList(int offset, int limit) {
        return restTemplate.getForObject(baseUrl + "?offset=" + offset + "&limit=" + limit, Map.class);
    }
}
