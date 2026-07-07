<?php

namespace SimplixSystems\HebrewDatePicker;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class HebrewDatePickerServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-hebrew-datepicker';

    public function configurePackage(Package $package): void
    {
        $package
            ->name(static::$name)
            ->hasViews();
    }

    public function packageBooted(): void
    {
        // Built assets (run `npm run build` in the package directory).
        FilamentAsset::register([
            AlpineComponent::make(
                'hebrew-date-picker',
                __DIR__ . '/../resources/dist/hebrew-date-picker.js',
            ),
            Css::make(
                'hebrew-date-picker-styles',
                __DIR__ . '/../resources/dist/hebrew-date-picker.css',
            ),
        ], package: 'simplix-systems/filament-hebrew-datepicker');
    }
}
