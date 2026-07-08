<?php

// Publish with:  php artisan vendor:publish --tag="filament-hebrew-datepicker-config"
//
// These are the DEFAULTS applied to every HebrewDatePicker field. Any value you
// set on an individual field (e.g. ->rounded(false)) still overrides the value
// here for that field.
return [
    'defaults' => [
        // Primary calendar tab: 'hebrew' or 'gregorian'.
        'calendar' => 'hebrew',

        // Circular day cells (Filament-native look). Set false for square cells.
        'rounded' => true,

        // Border around the header nav arrows + month/year pills.
        // false = borderless header (blends into a Filament panel).
        'headerBorder' => false,

        // Highlights — keep the Jewish-calendar richness on by default.
        'holidays' => true,
        'shabbat' => true,
        'parasha' => true,

        // Close the popup as soon as a day is picked.
        'closeOnSelect' => true,

        // UI language: 'he', 'en', or null to use the package default ('he').
        'lang' => null,
    ],
];
