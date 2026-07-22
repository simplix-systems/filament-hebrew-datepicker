<?php

// Publish with:
//   php artisan vendor:publish --tag="filament-hebrew-datepicker-config"
//
// These are the DEFAULTS applied to every HebrewDatePicker field. Anything you
// set on an individual field (e.g. ->rounded(false)) overrides the value here for
// that field. Remove a key to fall back to the package default shown in [ ].
return [
    'defaults' => [
        // --- calendar & mode ---
        'calendar' => 'hebrew',        // 'hebrew' | 'gregorian'                [hebrew]
        'displayCalendar' => null,     // calendar shown after selection; null = same as `calendar`
        'range' => false,              // start–end range                       [false]
        'monthOnly' => false,          // pick whole months only                [false]
        'yearOnly' => false,           // pick whole years only                 [false]
        'inline' => false,             // render inline (no input popup)         [false]

        // --- look & feel ---
        'rounded' => true,             // circular day cells                    [true]
        'headerBorder' => false,       // border around the header nav/pills     [false]
        'outsideDays' => true,         // show prev/next month days (greyed)     [true]
        'compact' => false,            // minimal layout                        [false]
        'size' => 'md',                // 'sm' | 'md' | 'lg'                     [md]
        'primaryColor' => null,        // accent color; null = Filament primary

        // --- highlights (Jewish calendar) ---
        'holidays' => true,            // highlight religious holidays          [true]
        'shabbat' => true,             // highlight Saturdays                    [true]
        'parasha' => true,             // Parashat HaShavua on Shabbat           [true]
        'diaspora' => false,           // 2-day Yom Tov + Diaspora parashot      [false]

        // --- time ---
        'time' => false,               // add a time picker                     [false]
        'seconds' => false,            // also pick seconds (needs time)         [false]
        'timeFormat' => '24',          // '12' | '24'                            [24]
        'timeStyle' => 'native',       // native | dropdown | stepper | clock    [native]

        // --- behaviour ---
        'closeOnSelect' => true,       // close the popup on pick                [true]
        'presets' => false,            // range mode: quick-range sidebar        [false]
        'openOnInputClick' => true,    // input click opens (Gregorian); false = icon only [true]
        'showDateHint' => false,       // show the other-calendar date by label  [false]

        // --- limits (ISO "YYYY-MM-DD" or null) ---
        'minDate' => null,             // earliest selectable date
        'maxDate' => null,             // latest selectable date

        // --- language ---
        'lang' => null,                // 'he' | 'en' | null (package default 'he')
    ],
];
