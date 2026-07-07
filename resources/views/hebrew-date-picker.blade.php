@php
    use Filament\Support\Facades\FilamentAsset;

    $statePath = $getStatePath();
    $config = $getConfig();
    $isInline = $isInline();
    $isDisabled = $isDisabled();
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        wire:ignore
        x-load
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('hebrew-date-picker', 'simplix-systems/filament-hebrew-datepicker') }}"
        x-data="hebrewDatePicker({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            config: @js($config),
            isDisabled: @js($isDisabled),
        })"
        class="fi-hebrew-date-picker"
    >
        @if ($isInline)
            {{-- Inline calendar --}}
            <div x-ref="host" @class([
                'fi-hebrew-date-picker-inline rounded-lg ring-1 ring-gray-950/10 dark:ring-white/10 bg-white dark:bg-white/5 p-1 inline-block',
            ])></div>
        @else
            {{-- Popup, opened from a Filament-styled input. The clear ✕ is a plain
                 borderless overlay (no Filament suffix divider). --}}
            <div class="relative">
                <x-filament::input.wrapper
                    :disabled="$isDisabled"
                    :valid="! $errors->has($statePath)"
                    prefix-icon="heroicon-m-calendar-days"
                >
                    <x-filament::input
                        type="text"
                        readonly
                        x-ref="input"
                        x-model="display"
                        :placeholder="$getPlaceholder()"
                        :disabled="$isDisabled"
                        x-on:click="open()"
                        x-on:focus="open()"
                        class="cursor-pointer pe-8"
                    />
                </x-filament::input.wrapper>

                <button
                    type="button"
                    x-show="hasValue() && ! @js($isDisabled)"
                    x-on:click.stop="clear()"
                    class="absolute inset-y-0 end-2.5 my-auto flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
                    title="{{ __('Clear') }}"
                    x-cloak
                >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586 4.707 3.293 3.293 4.707 8.586 10l-5.293 5.293 1.414 1.414L10 11.414l5.293 5.293 1.414-1.414L11.414 10l5.293-5.293-1.414-1.414L10 8.586Z" clip-rule="evenodd" /></svg>
                </button>
            </div>
        @endif
    </div>
</x-dynamic-component>
