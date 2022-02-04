import {hslFromRgb, rgbFromHexString, rgbFromHsl, rgbToHexString, Hsl} from '@eviljs/std/color.js'
import {classes, times} from '@eviljs/react/react.js'
import {CSSProperties, useEffect, useRef, useState} from 'react'
import {ExampleIcon as Icon} from './icon-example/v2.js'

import './theme-view.css'

export function ThemeView(props: ThemeViewProps) {
    const {className, head, children} = props
    const [primaryAccent, setPrimaryAccent] = useState<Hsl>([0, 0, 0])
    const [secondaryAccent, setSecondaryAccent] = useState<Hsl>([0, 0, 0])
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    return (
        <div
            {...props}
            className={classes('ThemeView-t2eb', `std theme-${theme} bg`, className)}
            style={{
                '--std-color-primary-h': primaryAccent[0] * 360 + 'deg',
                '--std-color-primary-s': primaryAccent[1] * 100 + '%',
                '--std-color-primary-l': primaryAccent[2] * 100 + '%',
                '--std-color-secondary-h': secondaryAccent[0] * 360 + 'deg',
                '--std-color-secondary-s': secondaryAccent[1] * 100 + '%',
                '--std-color-secondary-l': secondaryAccent[2] * 100 + '%',
            } as CSSProperties}
        >
            {head}

            <Picker
                onPrimaryChange={(it) => setPrimaryAccent(it)}
                onSecondaryChange={(it) => setSecondaryAccent(it)}
                onThemeChange={(it) => setTheme(it)}
            />

            <i className="std-space-v s5"/>

            <div className="grid-1c73 std-flex center wrap">
                <Colors/>
                <Typography/>
                <Gutters/>
                <Contrast/>
                <Icons/>
                <Radiuses/>
                <Shadows/>
                <Transitions/>
                <Buttons/>
            </div>

            {children}
        </div>
    )
}

export function Picker(props: PickerProps) {
    const {onPrimaryChange, onSecondaryChange, onThemeChange} = props
    const primaryRef = useRef<HTMLInputElement | null>(null)
    const secondaryRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const primaryAccent = readThemeColor('std-color-primary')
        const secondaryAccent = readThemeColor('std-color-secondary')
        primaryRef.current!.value = computeHexFromHslColor(primaryAccent)
        secondaryRef.current!.value = computeHexFromHslColor(secondaryAccent)

        onPrimaryChange(primaryAccent)
        onSecondaryChange(secondaryAccent)
    }, [])

    return (
        <h1 className="std-flex align-center std-text-overline">
            <input
                ref={primaryRef}
                className="picker-t8c2"
                type="color"
                onChange={(event) => onPrimaryChange(computeHslFromHexColor(event.target.value))}
            />
            <i className="std-space-h s5"/>
            <label>Theme</label>
            <i className="std-space-h s5"/>
            <input
                ref={secondaryRef}
                className="picker-t8c2"
                type="color"
                onChange={(event) => onSecondaryChange(computeHslFromHexColor(event.target.value))}
            />

            <i className="std-space-h s5"/>

            <label className="std-flex column align-center">
                <input
                    type="checkbox"
                    onChange={(event) => onThemeChange(
                        event.target.checked
                            ? 'dark'
                            : 'light'
                    )}
                />
                <i className="std-space-v s1"/>
                <b>Dark</b>
            </label>
        </h1>
    )
}

export function Colors() {
    return (
        <div className="std-flex column center">
            <div className="std-flex">
                <label className="std-text-h6 std-color-primary-accent">Primary</label>
                <div className="std-grow"/>
            </div>

            <i className="std-space-v s4"/>

            <div className="std-flex">
                <label>Accent</label>
                <div className="std-grow"/>
                <span
                    className="color-t75a"
                    title="Primary accent"
                    style={{backgroundColor: 'var(--std-color-primary-accent)'}}
                />
            </div>

            <i className="std-space-v s4"/>

            <div className="std-flex">
                <label>Tint</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary tint ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-primary-tint${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Shade</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary shade ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-primary-shade${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Tone</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary tone ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-primary-tone${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Fg</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(5).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary fg ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-primary-fg${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Bg</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(4).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary bg ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-primary-bg${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <i className="std-space-v s5"/>

            <div className="std-flex">
                <label className="std-text-h6 std-color-secondary-accent">Secondary</label>
                <div className="std-grow"/>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Accent</label>
                <div className="std-grow"/>
                <span
                    className="color-t75a"
                    title="Secondary Accent"
                    style={{backgroundColor: 'var(--std-color-secondary-accent)'}}
                />
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Tint</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary tint ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-secondary-tint${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Shade</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary shade ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-secondary-shade${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Tone</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(6).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Primary tone ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-secondary-tone${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Fg</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(5).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Secondary fg ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-secondary-fg${idx+1})`}}
                        />
                    ))}
                </div>
            </div>

            <div className="std-space-v s4"/>

            <div className="std-flex">
                <label>Bg</label>
                <div className="std-grow"/>
                <div className="std-flex row-reverse">
                    {times(4).map((idx) => (
                        <span
                            key={idx}
                            className="color-t75a"
                            title={`Secondary bg ${idx+1}`}
                            style={{backgroundColor: `var(--std-color-secondary-bg${idx+1})`}}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function Typography() {
    return (
        <div className="std-flex column align-start">
            <label className="text-8fa3 std-text-display1 std-color-primary-fg1">Display 1</label>
            <label className="text-8fa3 std-text-display2 std-color-primary-fg1">Display 2</label>
            <label className="text-8fa3 std-text-h1 std-color-primary-fg2">Headline 1</label>
            <label className="text-8fa3 std-text-h2 std-color-primary-fg2">Headline 2</label>
            <label className="text-8fa3 std-text-h3 std-color-primary-fg2">Headline 3</label>
            <label className="text-8fa3 std-text-h4 std-color-primary-fg2">Headline 4</label>
            <label className="text-8fa3 std-text-h5 std-color-primary-fg2">Headline 5</label>
            <label className="text-8fa3 std-text-h6 std-color-primary-fg2">Headline 6</label>
            <label className="text-8fa3 std-text-subtitle1 std-color-primary-fg3">Subtitle 1</label>
            <label className="text-8fa3 std-text-subtitle2 std-color-primary-fg3">Subtitle 2</label>
            <label className="text-8fa3 std-text-overline">Overline</label>
            <label className="text-8fa3 std-text-caption">Caption</label>
            <label className="text-8fa3 std-text-button">Button</label>
            <label className="text-8fa3 std-text-body1">Body 1</label>
            <label className="text-8fa3 std-text-body2">Body 2</label>
            <label className="text-8fa3 std-text-small">Small</label>
        </div>
    )
}

export function Gutters() {
    return (
        <div className="std-flex center column">
            <label className="gutter-t1d3 std-flex column"><span>Gap 1</span><i className="std-space-h s1"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 2</span><i className="std-space-h s2"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 3</span><i className="std-space-h s3"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 4</span><i className="std-space-h s4"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 5</span><i className="std-space-h s5"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 6</span><i className="std-space-h s6"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 7</span><i className="std-space-h s7"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 8</span><i className="std-space-h s8"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 9</span><i className="std-space-h s9"/></label>
            <i className="std-space-v s3"/>
            <label className="gutter-t1d3 std-flex column"><span>Gap 10</span><i className="std-space-h s10"/></label>
            <i className="std-space-v s3"/>
        </div>
    )
}

export function Contrast() {
    return (
        <div className="std-flex column center align-center">
            <div className="std-flex wrap">
                <label className="contrast-td08 std-color-bg1">
                    <div className="std-color-fg1 std-text-weight1">Bg 1</div>
                    <div className="std-color-fg1">Fg 1</div>
                    <div className="std-color-fg2">Fg 2</div>
                    <div className="std-color-fg3">Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-bg2">
                    <div className="std-color-fg1 std-text-weight1">Bg 2</div>
                    <div className="std-color-fg1">Fg 1</div>
                    <div className="std-color-fg2">Fg 2</div>
                    <div className="std-color-fg3">Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-bg3">
                    <div className="std-color-fg1 std-text-weight1">Bg 3</div>
                    <div className="std-color-fg1">Fg 1</div>
                    <div className="std-color-fg2">Fg 2</div>
                    <div className="std-color-fg3">Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-bg4">
                    <div className="std-color-fg1 std-text-weight1">Bg 4</div>
                    <div className="std-color-fg1">Fg 1</div>
                    <div className="std-color-fg2">Fg 2</div>
                    <div className="std-color-fg3">Fg 3</div>
                </label>
            </div>

            <i className="std-space-v s4"/>

            <div className="std-flex wrap">
                <label className="contrast-td08 std-color-primary-bg1">
                    <div className="std-color-fg1 std-text-weight1">Primary Bg 1</div>
                    <div className="std-color-primary-fg1">Primary Fg 1</div>
                    <div className="std-color-primary-fg2">Primary Fg 2</div>
                    <div className="std-color-primary-fg3">Primary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-primary-bg2">
                    <div className="std-color-fg1 std-text-weight1">Primary Bg 2</div>
                    <div className="std-color-primary-fg1">Primary Fg 1</div>
                    <div className="std-color-primary-fg2">Primary Fg 2</div>
                    <div className="std-color-primary-fg3">Primary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-primary-bg3">
                    <div className="std-color-fg1 std-text-weight1">Primary Bg 3</div>
                    <div className="std-color-primary-fg1">Primary Fg 1</div>
                    <div className="std-color-primary-fg2">Primary Fg 2</div>
                    <div className="std-color-primary-fg3">Primary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-primary-bg4">
                    <div className="std-color-fg1 std-text-weight1">Primary Bg 4</div>
                    <div className="std-color-primary-fg1">Primary Fg 1</div>
                    <div className="std-color-primary-fg2">Primary Fg 2</div>
                    <div className="std-color-primary-fg3">Primary Fg 3</div>
                </label>
            </div>

            <i className="std-space-v s4"/>

            <div className="std-flex wrap">
                <label className="contrast-td08 std-color-secondary-bg1">
                    <div className="std-color-fg1 std-text-weight1">Secondary Bg 1</div>
                    <div className="std-color-secondary-fg1">Secondary Fg 1</div>
                    <div className="std-color-secondary-fg2">Secondary Fg 2</div>
                    <div className="std-color-secondary-fg3">Secondary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-secondary-bg2">
                    <div className="std-color-fg1 std-text-weight1">Secondary Bg 2</div>
                    <div className="std-color-secondary-fg1">Secondary Fg 1</div>
                    <div className="std-color-secondary-fg2">Secondary Fg 2</div>
                    <div className="std-color-secondary-fg3">Secondary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-secondary-bg3">
                    <div className="std-color-fg1 std-text-weight1">Secondary Bg 3</div>
                    <div className="std-color-secondary-fg1">Secondary Fg 1</div>
                    <div className="std-color-secondary-fg2">Secondary Fg 2</div>
                    <div className="std-color-secondary-fg3">Secondary Fg 3</div>
                </label>
                <label className="contrast-td08 std-color-secondary-bg4">
                    <div className="std-color-fg1 std-text-weight1">Secondary Bg 4</div>
                    <div className="std-color-secondary-fg1">Secondary Fg 1</div>
                    <div className="std-color-secondary-fg2">Secondary Fg 2</div>
                    <div className="std-color-secondary-fg3">Secondary Fg 3</div>
                </label>
            </div>
        </div>
    )
}

export function Buttons() {
    return (
        <div className="buttons-45cb std-flex column center align-center wrap">
            <div>
                <button className="std-text-button std-button dye">Dye</button>
                <button className="std-text-button std-button flat">Flat</button>
                <button className="std-text-button std-button halo">Halo</button>
                <button className="std-text-button std-button plain">Plain</button>
            </div>

            <div className="std-space-v s3"/>

            <div>
                <button className="std-text-button std-button dye" disabled>Dye</button>
                <button className="std-text-button std-button flat" disabled>Flat</button>
                <button className="std-text-button std-button halo" disabled>Halo</button>
                <button className="std-text-button std-button plain" disabled>Plain</button>
            </div>
        </div>
    )
}

export function Transitions() {
    return (
        <div className="std-flex center align-center wrap">
            <label className="duration-t347" style={{transitionDuration: 'var(--std-duration1)'}}>Duration 1</label>
            <label className="duration-t347" style={{transitionDuration: 'var(--std-duration2)'}}>Duration 2</label>
            <label className="duration-t347" style={{transitionDuration: 'var(--std-duration3)'}}>Duration 3</label>
            <label className="duration-t347" style={{transitionDuration: 'var(--std-duration4)'}}>Duration 4</label>
            <label className="duration-t347" style={{transitionDuration: 'var(--std-duration5)'}}>Duration 5</label>
        </div>
    )
}

export function Icons() {
    return (
        <div className="std-flex center align-end wrap">
            <div className="icon-e43c">
                <Icon className="std-icon9"/>
                <div className="std-space-h s3"/>
                <label>9</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon8"/>
                <div className="std-space-h s3"/>
                <label>8</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon7"/>
                <div className="std-space-h s3"/>
                <label>7</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon6"/>
                <div className="std-space-h s3"/>
                <label>6</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon5"/>
                <div className="std-space-h s3"/>
                <label>5</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon4"/>
                <div className="std-space-h s3"/>
                <label>4</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon3"/>
                <div className="std-space-h s3"/>
                <label>3</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon2"/>
                <div className="std-space-h s3"/>
                <label>2</label>
            </div>
            <div className="icon-e43c">
                <Icon className="std-icon1"/>
                <div className="std-space-h s3"/>
                <label>1</label>
            </div>
        </div>
    )
}

export function Radiuses() {
    return (
        <div className="std-flex center align-center wrap">
            <label className="radius-75ca std-radius1">Radius 1</label>
            <label className="radius-75ca std-radius2">Radius 2</label>
            <label className="radius-75ca std-radius3">Radius 3</label>
            <label className="radius-75ca std-radius4">Radius 4</label>
        </div>
    )
}

export function Shadows() {
    return (
        <div className="std-flex center align-center wrap std-viewport m">
            <label className="shadow-t9a2 std-shadow soft">Soft</label>
            {times(12).map((idx) => (
                <label key={idx} className={`shadow-t9a2 std-shadow z${idx}`}>{idx}</label>
            ))}
            {times(25).map((nil, idx) => idx).slice(12).map(idx => (
                <label key={idx} className={`shadow-t9a2 std-shadow primary-accent z${idx}`}>{idx}</label>
            ))}
        </div>
    )
}

export function readThemeColor(type: string): Hsl {
    const el = document.body
    const hProp = window.getComputedStyle(el).getPropertyValue(`--${type}-h`)
    const sProp = window.getComputedStyle(el).getPropertyValue(`--${type}-s`)
    const lProp = window.getComputedStyle(el).getPropertyValue(`--${type}-l`)
    const h = Number(hProp) / 360
    const s = Number(sProp.replace('%', '')) / 100
    const l = Number(lProp.replace('%', '')) / 100
    return [h, s, l]
}

export function computeHslFromHexColor(hex: string) {
    const rgb = rgbFromHexString(hex)
    const hsl = hslFromRgb(...rgb)
    return hsl
}

export function computeHexFromHslColor(hsl: Hsl) {
    const rgb = rgbFromHsl(...hsl)
    const hex = rgbToHexString(...rgb)
    return hex
}

// Types ///////////////////////////////////////////////////////////////////////

export interface ThemeViewProps extends React.HTMLAttributes<HTMLDivElement> {
    head?: React.ReactNode
}

export interface PickerProps {
    onPrimaryChange(hsl: Hsl): void
    onSecondaryChange(hsl: Hsl): void
    onThemeChange(theme: 'light' | 'dark'): void
}
