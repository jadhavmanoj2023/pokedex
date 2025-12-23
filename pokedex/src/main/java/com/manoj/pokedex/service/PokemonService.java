package com.manoj.pokedex.service;

import com.manoj.pokedex.client.PokeApiClient;
import com.manoj.pokedex.dto.PokemonListDto;
import com.manoj.pokedex.dto.PokemonPageResponseDto;
import com.manoj.pokedex.dto.PokemonResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PokemonService {
    @Autowired
    private PokeApiClient pokeApiClient;

    @Cacheable(value = "pokemon", key = "#name.toLowerCase()")
    public PokemonResponseDto getPokemonByName(String name) {
        log.info("Calling PokeAPI for pokemon: {}", name);

        Map<String, Object> pokemonData = pokeApiClient.fetchPokemon(name);
        Map<String, Object> speciesData = pokeApiClient.fetchPokemonSpecies(name);

        String description = extractEnglishDescription(speciesData);

        return PokemonResponseDto.from(pokemonData, description);
    }

    private String extractEnglishDescription(Map<String, Object> speciesData) {

        List<Map<String, Object>> flavorTexts =
                (List<Map<String, Object>>) speciesData.get("flavor_text_entries");

        return flavorTexts.stream()
                .filter(entry ->
                        ((Map<String, String>) entry.get("language"))
                                .get("name").equals("en")
                )
                .map(entry ->
                        ((String) entry.get("flavor_text"))
                                .replace("\n", " ")
                                .replace("\f", " ")
                )
                .findFirst()
                .orElse("No description available.");
    }

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
