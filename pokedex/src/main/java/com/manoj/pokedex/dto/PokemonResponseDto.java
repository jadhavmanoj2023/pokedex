package com.manoj.pokedex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PokemonResponseDto {

    private int id;
    private String name;
    private String image;
    private List<String> types;
    private List<String> abilities;
    private Map<String, Integer> stats;
    private int height;
    private int weight;
    private String description;


    public static PokemonResponseDto from(Map<String, Object> data, String description) {

        int id = (Integer) data.get("id");
        String name = (String) data.get("name");

        Map<String, Object> sprites =
                (Map<String, Object>) data.get("sprites");

        Map<String, Object> other =
                (Map<String, Object>) sprites.get("other");

        Map<String, Object> officialArtwork =
                (Map<String, Object>) other.get("official-artwork");

        String image =
                (String) officialArtwork.get("front_default");


        List<Map<String, Object>> typesRaw =
                (List<Map<String, Object>>) data.get("types");
        List<String> types = typesRaw.stream()
                .map(t -> ((Map<String, String>)
                        t.get("type")).get("name"))
                .toList();

        List<Map<String, Object>> abilitiesRaw =
                (List<Map<String, Object>>) data.get("abilities");
        List<String> abilities = abilitiesRaw.stream()
                .map(a -> ((Map<String, String>)
                        a.get("ability")).get("name"))
                .toList();

        List<Map<String, Object>> statsRaw =
                (List<Map<String, Object>>) data.get("stats");
        Map<String, Integer> stats = new HashMap<>();
        for (Map<String, Object> s : statsRaw) {
            stats.put(
                    ((Map<String, String>) s.get("stat")).get("name"),
                    (Integer) s.get("base_stat")
            );
        }

        int height = (Integer) data.get("height");
        int weight = (Integer) data.get("weight");

        return new PokemonResponseDto(
                id, name, image, types, abilities, stats, height, weight,description
        );
    }
}
