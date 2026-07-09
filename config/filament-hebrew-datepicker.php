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

        // Show the previous/next month's days in the grid (greyed, still selectable).
        'outsideDays' => true,

        // Highlights — keep the Jewish-calendar richness on by default.
        'holidays' => true,
        'shabbat' => true,
        'parasha' => true,

        // Close the popup as soon as a day is picked.
        'closeOnSelect' => true,

        // Whether clicking the input opens the picker (Gregorian display only;
        // Hebrew always opens). false = open only via the calendar icon.
        'openOnInputClick' => true,

        // UI language: 'he', 'en', or null to use the package default ('he').
        'lang' => null,
    ],
];
