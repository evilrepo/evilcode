import {className} from '../react'
import {createElement} from 'react'

export function ExampleIcon(props: ExampleIconProps) {
    return (
        <svg
            {...props}
            {...className('StdIcon', 'std-icon', props.className)}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                className="std-icon-color1"
                strokeWidth="0"
                d="M12 3.19L5 6.3V12h7v8.93c3.72-1.15 6.47-4.82 7-8.94h-7v-8.8z"
            />
            <path
                className="std-icon-color2"
                strokeWidth="0"
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19.93V12H5V6.3l7-3.11v8.8h7c-.53 4.12-3.28 7.79-7 8.94z"
            />
        </svg>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface ExampleIconProps {
    className?: string
}
