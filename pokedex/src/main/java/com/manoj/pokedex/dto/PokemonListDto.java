package com.manoj.pokedex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PokemonListDto {
    private int id;
    private String name;
    private String image;
    private List<String> types;

}
