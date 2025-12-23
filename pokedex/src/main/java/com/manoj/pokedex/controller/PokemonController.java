package com.manoj.pokedex.controller;

import com.manoj.pokedex.dto.PokemonListDto;
import com.manoj.pokedex.dto.PokemonPageResponseDto;
import com.manoj.pokedex.dto.PokemonResponseDto;
import com.manoj.pokedex.service.PokemonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/pokemon")
public class PokemonController {
    @Autowired
    public PokemonService pokemonService;

    @GetMapping("/{name}")
    public ResponseEntity<PokemonResponseDto> getPokemon(@PathVariable String name){
        return ResponseEntity.ok(
                pokemonService.getPokemonByName(name)
        );
    }

    @GetMapping("/list")
    public ResponseEntity<PokemonPageResponseDto> getPokemonList(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "20") int limit
    ) {
        return ResponseEntity.ok(
                pokemonService.getPokemonPage(offset, limit)
        );
    }


}
