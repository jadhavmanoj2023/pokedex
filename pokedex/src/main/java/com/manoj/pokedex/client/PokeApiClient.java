package com.manoj.pokedex.client;

import com.manoj.pokedex.exception.BadRequestException;
import com.manoj.pokedex.exception.ExternalServiceException;
import com.manoj.pokedex.exception.PokemonNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
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


    // Fetch pokemon details
    public Map<String, Object> fetchPokemon(String identifier) {

        try {
            return restTemplate.getForObject(
                    baseUrl + identifier,
                    Map.class
            );

        } catch (HttpClientErrorException.NotFound ex) {
            throw new PokemonNotFoundException("Pokemon not found: " + identifier);

        } catch (HttpClientErrorException.BadRequest ex) {
            throw new BadRequestException("Invalid request sent to PokeAPI");

        } catch (HttpServerErrorException ex) {
            throw new ExternalServiceException("PokeAPI server error. Please try again later");

        } catch (ResourceAccessException ex) {
            throw new ExternalServiceException("PokeAPI is unreachable. Please try again later");
        }
    }


    // Fetch pokemon species (description)
    public Map<String, Object> fetchPokemonSpecies(String identifier) {

        try {
            return restTemplate.getForObject(
                    speciesUrl + identifier,
                    Map.class
            );

        } catch (HttpClientErrorException.NotFound ex) {
            throw new PokemonNotFoundException("Pokemon species not found: " + identifier);

        } catch (HttpServerErrorException | ResourceAccessException ex) {
            throw new ExternalServiceException(
                    "PokeAPI species service unavailable. Please try again later"
            );
        }
    }

    // Fetch paginated pokemon list
    public Map<String, Object> fetchPokemonList(int offset, int limit) {

        if (offset < 0 || limit <= 0) {
            throw new BadRequestException("Offset must be >= 0 and limit must be > 0");
        }

        try {
            return restTemplate.getForObject(
                    baseUrl + "?offset=" + offset + "&limit=" + limit,
                    Map.class
            );

        } catch (HttpServerErrorException | ResourceAccessException ex) {
            throw new ExternalServiceException("PokeAPI list service unavailable");
        }
    }
}
