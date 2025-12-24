package com.manoj.pokedex.util;

import com.manoj.pokedex.exception.BadRequestException;

public class PokemonValidator {

    private static final String NAME_REGEX = "^[a-z-]+$";

    public static String validateAndNormalizeName(String input) {

        if (input == null) {
            throw new BadRequestException("Pokemon name or id must not be null");
        }

        String trimmed = input.trim();

        if (trimmed.isEmpty()) {
            throw new BadRequestException("Pokemon name or id must not be empty");
        }

        // Case 1: Numeric ID
        if (trimmed.matches("^[0-9]+$")) {
            return trimmed;
        }

        // Case 2: Name (allow uppercase input)
        String normalized = trimmed.toLowerCase();

        if (normalized.matches("^[a-z-]+$")) {
            return normalized;
        }

        throw new BadRequestException(
                "Invalid pokemon identifier. Use a valid name or numeric id"
        );
    }

}
