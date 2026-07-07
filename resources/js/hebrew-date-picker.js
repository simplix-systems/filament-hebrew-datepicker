import {
    DatePicker,
    parseISO,
    hebFullString,
    hebMonthYearLabel,
    hebYearGematriaFull,
    gregToHebParts,
} from '@simplix-systems/hebrew-date-picker'

/**
 * Filament Alpine component for the Hebrew date picker.
 * `state` is entangled with the Livewire property:
 *   - single mode: an ISO string "YYYY-MM-DD" (or "...THH:mm" with time)
 *   - range mode:  an object { start, end }
 */
export default function hebrewDatePicker({ state, config, isDisabled }) {
    return {
        state,
        display: '',
        picker: null,

        init() {
            this.render()
            this.$watch('state', () => this.render())
            if (config.inline) this.mountInline()

            // Tear the popup down if the component is removed from the DOM.
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
            const cal = config.displayCalendar || config.calendar || 'hebrew'
            const precision = config.precision || 'day'
            if (precision === 'year') {
                return cal === 'hebrew'
                    ? hebYearGematriaFull(gregToHebParts(d).year)
                    : String(d.getFullYear())
            }
            if (precision === 'month') {
                return cal === 'hebrew'
                    ? hebMonthYearLabel(d)
                    : d.toLocaleDateString(undefined, { month: '2-digit', year: 'numeric' })
            }
            if (cal === 'hebrew') return hebFullString(d)
            return d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
        },

        render() {
            if (this.isRange()) {
                const s = this.state || {}
                this.display = (s.start || s.end) ? `${this.fmtOne(s.start)} – ${this.fmtOne(s.end)}` : ''
            } else {
                this.display = this.fmtOne(this.state)
            }
        },

        commit(r) {
            this.state = 'iso' in r ? r.iso : { start: r.start, end: r.end }
            this.render()
        },

        applyDarkTheme(panel) {
            if (panel && document.documentElement.classList.contains('dark')) {
                panel.classList.add('hdp-dark')
            }
        },

        mountInline() {
            this.picker?.destroy()
            this.picker = new DatePicker({
                ...config,
                inline: true,
                value: this.currentValue(),
                onSelect: (r) => this.commit(r),
            }).mount(this.$refs.host)
            this.applyDarkTheme(this.$refs.host.querySelector('.hdp'))
        },

        open() {
            if (config.inline || isDisabled) return
            this.picker?.close()
            this.picker = new DatePicker({
                ...config,
                inline: false,
                value: this.currentValue(),
                onSelect: (r) => this.commit(r),
            }).open(this.$refs.input)
            requestAnimationFrame(() => this.applyDarkTheme(document.querySelector('.hdp-popup')))
        },

        clear() {
            this.state = this.isRange() ? null : ''
            this.render()
            this.picker?.close()
        },
    }
}
