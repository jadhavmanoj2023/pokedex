package com.manoj.pokedex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PokemonPageResponseDto {

    private int count;           // total pokemon count
    private int offset;
    private int limit;
    private boolean hasMore;
    private String next;
    private String previous;
    private List<PokemonListDto> data;
}
