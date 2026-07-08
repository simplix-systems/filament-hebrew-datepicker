import {
    DatePicker,
    parseISO,
    toISO,
    hebFullString,
    hebMonthYearLabel,
    hebYearGematriaFull,
    gregToHebParts,
} from '@simplix-systems/hebrew-date-picker'

// Masked DD/MM/YYYY (imask-style, no underscores): auto-insert "/" and clamp
// out-of-range day/month while typing.
function maskDate(text) {
    const dg = String(text).replace(/\D/g, '').slice(0, 8)
    let day = dg.slice(0, 2), mon = dg.slice(2, 4), yr = dg.slice(4, 8)
    if (day.length === 2) day = String(Math.min(31, Math.max(1, +day))).padStart(2, '0')
    if (mon.length === 2) mon = String(Math.min(12, Math.max(1, +mon))).padStart(2, '0')
    let s = day
    if (dg.length >= 2) s += '/' + mon
    if (dg.length >= 4) s += '/' + yr
    return s
}
function parseTyped(text) {
    const m = String(text).match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (!m) return ''
    const d = new Date(+m[3], +m[2] - 1, +m[1])
    if (d.getDate() !== +m[1] || d.getMonth() !== +m[2] - 1) return ''
    return toISO(d)
}

/**
 * Filament Alpine component for the Hebrew date picker.
 * `state` is entangled with the Livewire property:
 *   - single mode: an ISO string "YYYY-MM-DD" (or "...THH:mm" with time)
 *   - range mode:  an object { start, end }
 */
export default function hebrewDatePicker({ state, config, isDisabled }) {
    const cal = () => config.displayCalendar || config.calendar || 'hebrew'
    return {
        state,
        display: '',
        picker: null,
        isOpen: false,
        // Only a single Gregorian day is numerically editable (typed).
        editable:
            (config.displayCalendar || config.calendar) === 'gregorian' &&
            (config.precision || 'day') === 'day' &&
            config.mode !== 'range' &&
            !isDisabled,

        init() {
            this.render()
            this.$watch('state', () => this.render())
            if (config.inline) this.mountInline()
            this.$el.addEventListener('livewire:navigating', () => this.picker?.close())
        },

        isRange() {
            return config.mode === 'range'
        },
        hasValue() {
            if (this.isRange()) return !!(this.state && (this.state.start || this.state.end))
            return !!this.state
        },
        currentValue() {
            return this.state || null
        },

        fmtOne(iso) {
            if (!iso) return ''
            const d = parseISO(String(iso).split('T')[0])
            if (!d) return ''
            const precision = config.precision || 'day'
            if (precision === 'year') {
                return cal() === 'hebrew' ? hebYearGematriaFull(gregToHebParts(d).year) : String(d.getFullYear())
            }
            if (precision === 'month') {
                return cal() === 'hebrew'
                    ? hebMonthYearLabel(d)
                    : d.toLocaleDateString(undefined, { month: '2-digit', year: 'numeric' })
            }
            if (cal() === 'hebrew') return hebFullString(d)
            return d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
        },

        // The "other" calendar's date for the selected value — shown as a hint by
        // the label (Gregorian when the field shows Hebrew, and vice-versa).
        altHint() {
            const v = this.isRange() ? (this.state && this.state.start) : this.state
            if (!v) return ''
            const d = parseISO(String(v).split('T')[0])
            if (!d) return ''
            return cal() === 'hebrew'
                ? d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
                : hebFullString(d)
        },

        render() {
            // Don't clobber the field while the user is typing into it.
            if (this.editable && document.activeElement === this.$refs.input) return
            if (this.isRange()) {
                const s = this.state || {}
                this.display = (s.start || s.end) ? `${this.fmtOne(s.start)} – ${this.fmtOne(s.end)}` : ''
            } else {
                this.display = this.fmtOne(this.state)
            }
        },

        // Typed-input handling (Gregorian, single, day precision).
        onType(e) {
            const el = e.target
            const caret = el.selectionStart
            const before = el.value
            const masked = maskDate(before)
            this.display = masked
            el.value = masked
            if (masked !== before) {
                const digitsBefore = before.slice(0, caret).replace(/\D/g, '').length
                let idx = 0, seen = 0
                while (idx < masked.length && seen < digitsBefore) { if (/\d/.test(masked[idx])) seen++; idx++ }
                try { el.setSelectionRange(idx, idx) } catch (_) {}
            }
            const iso = parseTyped(masked)
            if (iso) {
                this.state = iso
                if (this.picker) this.picker.setValue(iso); else this.open()
            }
        },
        onEnter() {
            const iso = parseTyped(maskDate(this.display))
            if (iso) { this.state = iso; this.render(); this.picker?.close() }
        },

        commit(r) {
            this.state = 'iso' in r ? r.iso : { start: r.start, end: r.end }
            this.render()
        },

        applyDarkTheme(panel) {
            if (panel && document.documentElement.classList.contains('dark')) panel.classList.add('hdp-dark')
        },

        mountInline() {
            this.picker?.destroy()
            this.picker = new DatePicker({
                ...config, inline: true, value: this.currentValue(),
                onSelect: (r) => this.commit(r),
            }).mount(this.$refs.host)
            this.applyDarkTheme(this.$refs.host.querySelector('.hdp'))
        },

        open() {
            // Guard against the focus+click double-fire that made the popup flicker
            // (open → close → open). Set isOpen only AFTER .open() — it calls close()
            // internally once, which fires onClose.
            if (config.inline || isDisabled || this.isOpen) return
            this.picker = new DatePicker({
                ...config, inline: false, value: this.currentValue(),
                onClose: () => { this.isOpen = false },
                onSelect: (r) => this.commit(r),
            }).open(this.$refs.input)
            this.isOpen = true
            requestAnimationFrame(() => this.applyDarkTheme(document.querySelector('.hdp-popup')))
        },

        clear() {
            this.state = this.isRange() ? null : ''
            this.render()
            this.picker?.close()
        },
    }
}
