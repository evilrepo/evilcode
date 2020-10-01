import {isNil} from '@eviljs/std-lib/type.js'
import {minMax} from '@eviljs/std-lib/math.js'
import {times} from '@eviljs/std-lib/fn.js'

export function createNumberAxis(data: Array<number>, ticks: number) {
    const [min, max] = minMax(data)

    if (isNil(min) || isNil(max)) {
        return []
    }
    if (min === max) {
        return []
    }

    const gap = (max - min) / (ticks - 1)
    const items = times(ticks).map(idx =>
        min! + (gap * idx)
    )

    return items
}

export function createDateAxis(data: Array<Date>, ticks: number) {
    const dataTimes = data.map(it => it.getTime())
    const items = createNumberAxis(dataTimes, ticks).map(it =>
        new Date(it)
    )

    return items
}
