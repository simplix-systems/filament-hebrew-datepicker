# Changelog

All notable changes to `simplix-systems/filament-hebrew-datepicker` will be documented in this file.

## Unreleased

### Added
- `presets()` — range mode: quick-range sidebar (today, yesterday, last 7/30
  days, this/last month & year — Hebrew-calendar-aware on the Hebrew tab).
  Configurable via the published config (`defaults.presets`) and translatable
  labels (`preset*` keys in the picker translations).
- `yearOnly()` — pick whole years only (mirrors `monthOnly()`), backed by the core `precision: 'year'`.
- Precision-aware field display: year-only shows just the year, month-only shows month + year.
- Dark mode follows Filament's theme automatically.
- `headerBorder()` — frame the header nav/pills (off by default = borderless).
- Publishable **config** (`filament-hebrew-datepicker-config`) for project-wide defaults, and publishable **translations** (`filament-hebrew-datepicker-translations`) for the picker labels / custom languages.

### Removed / changed
- **Removed the `clean()` method / "clean skin".** The field now uses the core's normal look with `rounded` on and a borderless header by default — and it no longer drops the Shabbat tint or restyles holidays. Migrate `->clean(false)` → `->rounded(false)->headerBorder()`; drop `->clean()` (its look is now the default).

### Changed
- Rebranded to **Simplix Systems**: package `simplix-systems/filament-hebrew-datepicker`, namespace `SimplixSystems\HebrewDatePicker`.
- Core dependency renamed to `@simplix-systems/hebrew-date-picker`.
