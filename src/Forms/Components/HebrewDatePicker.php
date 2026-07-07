<?php

namespace SimplixSystems\HebrewDatePicker\Forms\Components;

use Closure;
use Filament\Forms\Components\Concerns\HasPlaceholder;
use Filament\Forms\Components\Field;

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
    protected bool | Closure $outsideDays = false;
    protected bool | Closure $rounded = false;
    /** The clean, Filament-native skin is ON by default for the Filament field. */
    protected bool | Closure $clean = true;
    protected string | Closure | null $lang = null;
    protected string | Closure | null $displayCalendar = null;
    protected bool | Closure $holidays = true;
    protected bool | Closure $shabbat = true;
    protected bool | Closure $parasha = true;
    protected bool | Closure $compact = false;
    protected string | Closure $size = 'md';
    protected bool | Closure $closeOnSelect = true;
    protected bool | Closure $inline = false;
    protected string | Closure | null $primaryColor = null;

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

    /** Use the clean / Filament-native skin (on by default). Pass false for the package's richer default look. */
    public function clean(bool | Closure $clean = true): static
    {
        $this->clean = $clean;

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
            'clean' => $this->evaluate($this->clean),
            'lang' => $this->evaluate($this->lang),
            'displayCalendar' => $this->evaluate($this->displayCalendar) ?? $this->evaluate($this->calendar),
            'highlightHolidays' => $this->evaluate($this->holidays),
            'highlightShabbat' => $this->evaluate($this->shabbat),
            'showParasha' => $this->evaluate($this->parasha),
            'compact' => $this->evaluate($this->compact),
            'size' => $this->evaluate($this->size),
            'closeOnSelect' => $this->evaluate($this->closeOnSelect),
            'inline' => $this->evaluate($this->inline),
            'primaryColor' => $this->evaluate($this->primaryColor),
        ], fn ($value) => $value !== null);
    }

    public function isInline(): bool
    {
        return (bool) $this->evaluate($this->inline);
    }
}
