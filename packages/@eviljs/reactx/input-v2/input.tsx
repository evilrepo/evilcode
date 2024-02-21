import {classes} from '@eviljs/react/classes.js'
import {displayName} from '@eviljs/react/display-name.js'
import {useMergeRefs} from '@eviljs/react/ref.js'
import type {VoidProps} from '@eviljs/react/type.js'
import {identity} from '@eviljs/std/fn.js'
import {forwardRef, useRef, useState} from 'react'

export function InputLabel(props: InputLabelProps) {
    const {children, className, labelClass, title, ...otherProps} = props

    return (
        <div
            {...otherProps}
            className={classes('InputLabel-5738', className)}
        >
            <label className={classes('label-b082 std-text-body2 std-color-fg2', labelClass)}>
                {title}
            </label>

            {children}
        </div>
    )
}

export const Input = displayName('Input', forwardRef(function Input(
    props: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const {className, decorate, hostClass, hostProps, hostStyle, onChange, ...otherProps} = props
    const inputRef = useRef<HTMLInputElement>(null)
    const render = decorate ?? identity

    return (
        <div
            {...hostProps}
            className={classes('Input-cc0a', hostClass, hostProps?.className)}
            style={{...hostStyle, ...hostProps?.style}}
            onClick={event => {
                inputRef.current?.focus()
                hostProps?.onClick?.(event)
            }}
        >
            {render(
                <input
                    {...otherProps}
                    ref={useMergeRefs(inputRef, ref)}
                    className={classes('input-2d2b', className)}
                    onChange={event => onChange?.(event.currentTarget.value)}
                />
            )}
        </div>
    )
}))

export const TextInput = displayName('TextInput', forwardRef(function TextInput(
    props: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const {className, ...otherProps} = props

    return (
        <Input
            type="text"
            {...otherProps}
            ref={ref}
            className={classes('TextInput-1330', className)}
        />
    )
}))

export const SecretInput = displayName('SecretInput', forwardRef(function SecretInput(
    props: SecretInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const {buttonClass, buttonProps, buttonStyle, className, decorate, hideIcon, showIcon, ...otherProps} = props
    const [visible, setVisible] = useState(false)

    return (
        <Input
            {...otherProps}
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={classes('SecretInput-b91c', className)}
            decorate={input => <>
                {decorate?.(input) ?? input}

                <button
                    tabIndex={-1}
                    {...buttonProps}
                    className={classes('button-2bdf', buttonClass, buttonProps?.className)}
                    style={{
                        ...buttonStyle,
                        ...buttonProps?.style,
                    }}
                    onClick={event => {
                        setVisible(! visible)
                        buttonProps?.onClick?.(event)
                    }}
                >
                    {visible
                        ? hideIcon
                        : showIcon
                    }
                </button>
            </>}
        />
    )
}))

export function decoratingStart(children: React.ReactNode) {
    return decoratingSides({start: children})
}

export function decoratingEnd(children: React.ReactNode) {
    return decoratingSides({end: children})
}

export function decoratingSides(sides: {start?: React.ReactNode, end?: React.ReactNode}) {
    function decorator(element: React.ReactNode) {
        return <>
            {sides?.start}
            {element}
            {sides?.end}
        </>
    }

    return decorator
}

// Types ///////////////////////////////////////////////////////////////////////

export interface InputLabelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'labelClass'> {
    title: React.ReactNode
    labelClass?: string
}

export interface InputProps extends VoidProps<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>> {
    decorate?: undefined | ((input: React.ReactNode) => React.ReactNode)
    hostClass?: undefined | string
    hostProps?: undefined | React.HTMLAttributes<HTMLElement>
    hostStyle?: undefined | React.CSSProperties
    onChange?: undefined | ((event: string) => void)
}

export interface TextInputProps extends InputProps {
}

export interface SecretInputProps extends InputProps {
    buttonClass?: undefined | string
    buttonStyle?: undefined | React.CSSProperties
    buttonProps?: undefined | VoidProps<React.ButtonHTMLAttributes<HTMLButtonElement>>
    showIcon: React.ReactNode
    hideIcon: React.ReactNode
}
