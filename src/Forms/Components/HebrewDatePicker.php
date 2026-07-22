<?php

namespace SimplixSystems\HebrewDatePicker\Forms\Components;

use Closure;
use Filament\Forms\Components\Concerns\HasPlaceholder;
use Filament\Forms\Components\Field;
use Illuminate\Support\HtmlString;

class HebrewDatePicker extends Field
{
    use HasPlaceholder;

    protected string $view = 'filament-hebrew-datepicker::hebrew-date-picker';

    protected string | Closure $calendar = 'hebrew';
    protected bool | Closure $range = false;
    protected bool | Closure $time = false;
    protected bool | Closure $seconds = false;
    protected string | Closure $timeFormat = '24';
    protected string | Closure $timeStyle = 'native';
    protected bool | Closure $diaspora = false;
    protected bool | Closure $monthOnly = false;
    protected bool | Closure $yearOnly = false;
    protected bool | Closure $outsideDays = true;
    /** Circular day cells — on by default for the Filament field (config-overridable). */
    protected bool | Closure $rounded = true;
    /** Border around the header nav/pills — off by default (borderless, Filament-native). */
    protected bool | Closure $headerBorder = false;
    protected string | Closure | null $lang = null;
    protected string | Closure | null $displayCalendar = null;
    protected bool | Closure $holidays = true;
    protected bool | Closure $shabbat = true;
    protected bool | Closure $parasha = true;
    protected bool | Closure $compact = false;
    protected string | Closure $size = 'md';
    protected bool | Closure $closeOnSelect = true;
    /** Range mode: quick-range presets sidebar (today / last 7 days / this Hebrew year…). */
    protected bool | Closure $presets = false;
    protected bool | Closure $openOnInputClick = true;
    protected bool | Closure $inline = false;
    protected string | Closure | null $primaryColor = null;
    protected string | Closure | null $minDate = null;
    protected string | Closure | null $maxDate = null;
    /** Show the other-calendar date as a hint after the label. Off by default. */
    protected bool | Closure $showDateHint = false;

    /**
     * Apply package/config defaults. Values from the published config file
     * (config/filament-hebrew-datepicker.php) seed the field; any per-field
     * method call (e.g. ->rounded(false)) still overrides them afterwards.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $d = config('filament-hebrew-datepicker.defaults', []);
        foreach ([
            'calendar', 'range', 'time', 'seconds', 'timeFormat', 'timeStyle',
            'diaspora', 'monthOnly', 'yearOnly', 'outsideDays', 'rounded', 'headerBorder',
            'lang', 'displayCalendar', 'holidays', 'shabbat', 'parasha', 'compact',
            'size', 'closeOnSelect', 'presets', 'openOnInputClick', 'inline', 'primaryColor',
            'minDate', 'maxDate', 'showDateHint',
        ] as $key) {
            if (array_key_exists($key, $d) && property_exists($this, $key)) {
                $this->{$key} = $d[$key];
            }
        }

        // Native Filament hint (rendered after the label) showing the OTHER
        // calendar's date for the selection — off by default. Computed client-side
        // by the Alpine component (altHint), so it lives in that component's scope.
        if ($this->evaluate($this->showDateHint)) {
            $this->hint(new HtmlString(
                '<span x-show="hasValue()" x-text="altHint()" x-cloak class="tabular-nums"></span>'
            ));
        }
    }

    /** Which calendar is shown first: 'hebrew' (default) or 'gregorian'. */
    public function calendar(string | Closure $calendar): static
    {
        $this->calendar = $calendar;

        return $this;
    }

    /** Select a start–end range (two calendars). The state becomes ['start' => ..., 'end' => ...]. */
    public function range(bool | Closure $range = true): static
    {
        $this->range = $range;

        return $this;
    }

    /** Add a time picker. The committed value becomes "YYYY-MM-DDTHH:mm". */
    public function time(bool | Closure $time = true): static
    {
        $this->time = $time;

        return $this;
    }

    /** '12' or '24' hour clock. */
    public function timeFormat(string | Closure $timeFormat): static
    {
        $this->timeFormat = $timeFormat;

        return $this;
    }

    /** 'native' | 'dropdown' | 'stepper' | 'clock'. */
    public function timeStyle(string | Closure $timeStyle): static
    {
        $this->timeStyle = $timeStyle;

        return $this;
    }

    /** Also pick seconds (value becomes "YYYY-MM-DDTHH:mm:ss"). Requires time(). */
    public function seconds(bool | Closure $seconds = true): static
    {
        $this->seconds = $seconds;

        return $this;
    }

    /** Use the Diaspora (chutz la'aretz) custom: 2-day Yom Tov + Diaspora parashot. */
    public function diaspora(bool | Closure $diaspora = true): static
    {
        $this->diaspora = $diaspora;

        return $this;
    }

    /** Show the previous/next month's days in the grid (greyed, still selectable). */
    public function outsideDays(bool | Closure $outsideDays = true): static
    {
        $this->outsideDays = $outsideDays;

        return $this;
    }

    /** Round (circular) day cells instead of square. */
    public function rounded(bool | Closure $rounded = true): static
    {
        $this->rounded = $rounded;

        return $this;
    }

    /** Draw a border around the header nav arrows and month/year pills (off by default). */
    public function headerBorder(bool | Closure $headerBorder = true): static
    {
        $this->headerBorder = $headerBorder;

        return $this;
    }

    /** UI language: 'he' (default) or 'en'. */
    public function lang(string | Closure | null $lang): static
    {
        $this->lang = $lang;

        return $this;
    }

    /** Pick whole months only (hides the day grid). */
    public function monthOnly(bool | Closure $monthOnly = true): static
    {
        $this->monthOnly = $monthOnly;

        return $this;
    }

    /** Pick whole years only (shows just the year grid). Takes precedence over monthOnly(). */
    public function yearOnly(bool | Closure $yearOnly = true): static
    {
        $this->yearOnly = $yearOnly;

        return $this;
    }

    /** Calendar shown in the field after selection: 'hebrew' (default) or 'gregorian'. */
    public function displayCalendar(string | Closure | null $displayCalendar): static
    {
        $this->displayCalendar = $displayCalendar;

        return $this;
    }

    public function holidays(bool | Closure $holidays = true): static
    {
        $this->holidays = $holidays;

        return $this;
    }

    public function shabbat(bool | Closure $shabbat = true): static
    {
        $this->shabbat = $shabbat;

        return $this;
    }

    public function parasha(bool | Closure $parasha = true): static
    {
        $this->parasha = $parasha;

        return $this;
    }

    /** Minimal layout (hides the secondary date, subtitle and preview). */
    public function compact(bool | Closure $compact = true): static
    {
        $this->compact = $compact;

        return $this;
    }

    /** 'sm' | 'md' | 'lg'. */
    public function size(string | Closure $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function closeOnSelect(bool | Closure $closeOnSelect = true): static
    {
        $this->closeOnSelect = $closeOnSelect;

        return $this;
    }

    /** Range mode: show the quick-range presets sidebar (today, last 7 days, this Hebrew/civil year…). */
    public function presets(bool | Closure $presets = true): static
    {
        $this->presets = $presets;

        return $this;
    }

    /** Whether clicking the input opens the picker (Gregorian display only; Hebrew always opens). Off = open via the calendar icon. */
    public function openOnInputClick(bool | Closure $openOnInputClick = true): static
    {
        $this->openOnInputClick = $openOnInputClick;

        return $this;
    }

    /** Show the other-calendar date as a hint after the label (off by default). */
    public function showDateHint(bool | Closure $showDateHint = true): static
    {
        $this->showDateHint = $showDateHint;

        return $this;
    }

    /** Earliest selectable date, ISO "YYYY-MM-DD". */
    public function minDate(string | Closure | null $minDate): static
    {
        $this->minDate = $minDate;

        return $this;
    }

    /** Latest selectable date, ISO "YYYY-MM-DD". */
    public function maxDate(string | Closure | null $maxDate): static
    {
        $this->maxDate = $maxDate;

        return $this;
    }

    /** Render the calendar inline instead of in a popup. */
    public function inline(bool | Closure $inline = true): static
    {
        $this->inline = $inline;

        return $this;
    }

    /** Override the accent color (defaults to the Filament primary color). */
    public function primaryColor(string | Closure | null $primaryColor): static
    {
        $this->primaryColor = $primaryColor;

        return $this;
    }

    /** Configuration passed to the JS DatePicker. */
    public function getConfig(): array
    {
        return array_filter([
            'calendar' => $this->evaluate($this->calendar),
            'mode' => $this->evaluate($this->range) ? 'range' : 'single',
            'precision' => $this->evaluate($this->yearOnly) ? 'year' : ($this->evaluate($this->monthOnly) ? 'month' : 'day'),
            'time' => $this->evaluate($this->time),
            'seconds' => $this->evaluate($this->seconds),
            'timeFormat' => $this->evaluate($this->timeFormat),
            'timeStyle' => $this->evaluate($this->timeStyle),
            'diaspora' => $this->evaluate($this->diaspora),
            'outsideDays' => $this->evaluate($this->outsideDays),
            'rounded' => $this->evaluate($this->rounded),
            'headerBorder' => $this->evaluate($this->headerBorder),
            'lang' => $this->evaluate($this->lang),
            'displayCalendar' => $this->evaluate($this->displayCalendar) ?? $this->evaluate($this->calendar),
            'labels' => $this->resolveLabels(),
            'highlightHolidays' => $this->evaluate($this->holidays),
            'highlightShabbat' => $this->evaluate($this->shabbat),
            'showParasha' => $this->evaluate($this->parasha),
            'compact' => $this->evaluate($this->compact),
            'size' => $this->evaluate($this->size),
            'closeOnSelect' => $this->evaluate($this->closeOnSelect),
            'presets' => $this->evaluate($this->presets),
            'openOnInputClick' => $this->evaluate($this->openOnInputClick),
            'inline' => $this->evaluate($this->inline),
            'primaryColor' => $this->evaluate($this->primaryColor),
            'min' => $this->evaluate($this->minDate),
            'max' => $this->evaluate($this->maxDate),
        ], fn ($value) => $value !== null);
    }

    public function isInline(): bool
    {
        return (bool) $this->evaluate($this->inline);
    }

    /**
     * Resolve the picker labels for the current language from the (publishable)
     * translation file. Returns null when no translation array is available, so
     * the JS picker falls back to its built-in he/en preset.
     */
    protected function resolveLabels(): ?array
    {
        $lang = $this->evaluate($this->lang)
            ?? config('filament-hebrew-datepicker.defaults.lang')
            ?? 'he';

        $labels = trans('filament-hebrew-datepicker::picker.labels', [], $lang);

        return is_array($labels) ? $labels : null;
    }
}
