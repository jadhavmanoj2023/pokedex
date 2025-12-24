package com.manoj.pokedex.service;

import com.manoj.pokedex.client.PokeApiClient;
import com.manoj.pokedex.dto.PokemonListDto;
import com.manoj.pokedex.dto.PokemonPageResponseDto;
import com.manoj.pokedex.dto.PokemonResponseDto;
import com.manoj.pokedex.util.PokemonValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PokemonService {

    private final PokeApiClient pokeApiClient;

    public PokemonService(PokeApiClient pokeApiClient) {
        this.pokeApiClient = pokeApiClient;
    }


     // Fetch single pokemon by name or id
    @Cacheable(value = "pokemon", key = "#nameOrId.toLowerCase()")
    public PokemonResponseDto getPokemonByName(String nameOrId) {

        // Validate & normalize name or id
        String identifier = PokemonValidator.validateAndNormalizeName(nameOrId);

        log.debug("Fetching pokemon from PokeAPI: {}", identifier);

        Map<String, Object> pokemonData =
                pokeApiClient.fetchPokemon(identifier);

        Map<String, Object> speciesData =
                pokeApiClient.fetchPokemonSpecies(identifier);

        String description = extractEnglishDescription(speciesData);

        return PokemonResponseDto.from(pokemonData, description);
    }

    // Safely extract English description
    private String extractEnglishDescription(Map<String, Object> speciesData) {

        Object entries = speciesData.get("flavor_text_entries");

        if (!(entries instanceof List<?> list)) {
            return "No description available.";
        }

        return list.stream()
                .filter(item -> item instanceof Map)
                .map(item -> (Map<String, Object>) item)
                .filter(entry -> {
                    Object lang = entry.get("language");
                    return lang instanceof Map &&
                            "en".equals(((Map<?, ?>) lang).get("name"));
                })
                .map(entry ->
                        ((String) entry.get("flavor_text"))
                                .replace("\n", " ")
                                .replace("\f", " ")
                )
                .findFirst()
                .orElse("No description available.");
    }

    // Paginated pokemon list
    @Cacheable(
            value = "pokemonList",
            key = "'offset:' + #offset + '-limit:' + #limit"
    )
    public PokemonPageResponseDto getPokemonPage(int offset, int limit) {

        Map<String, Object> response =
                pokeApiClient.fetchPokemonList(offset, limit);

        int count = (Integer) response.get("count");

        List<Map<String, Object>> results =
                (List<Map<String, Object>>) response.get("results");

        List<PokemonListDto> pokemons = results.stream().map(pokemon -> {

            String name = (String) pokemon.get("name");
            String url = (String) pokemon.get("url");

            int id = Integer.parseInt(
                    url.replaceAll(".*/pokemon/(\\d+)/", "$1")
            );

            String image =
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
                            + id + ".png";

            return new PokemonListDto(id, name, image, List.of());
        }).toList();

        boolean hasMore = offset + limit < count;

        String next = hasMore
                ? "/api/v1/pokemon/list?offset=" + (offset + limit) + "&limit=" + limit
                : null;

        String previous = offset > 0
                ? "/api/v1/pokemon/list?offset=" + Math.max(offset - limit, 0) + "&limit=" + limit
                : null;

        return new PokemonPageResponseDto(
                count,
                offset,
                limit,
                hasMore,
                next,
                previous,
                pokemons
        );
    }
}
