import {defineShowcase} from '@eviljs/reactx/showcase'
import {resetState, setState} from '~/store-v3/apis'
import {useStore, useStoreDispatch, useStoreState} from '~/store-v3/hooks'
import {Theme} from '~/theme/apis'

export default defineShowcase('Store v3', (props) => {
    const [theme, dispatch] = useStore(state => state.theme)!

    return (
        <div className="std-flex std-gap6">
            <Comp1/>
            <Comp2/>

            {theme}
        </div>
    )
})

function Comp1() {
    const dispatch = useStoreDispatch()!

    return (
        <div>
            <button
                onClick={() => {
                    dispatch(resetState())
                }}
            >
                Reset
            </button>
        </div>
    )
}

function Comp2() {
    const [theme] = useStoreState(state => state.theme)!
    const dispatch = useStoreDispatch()!

    return (
        <div>
            <input
                type="checkbox"
                onChange={event => {
                    event.currentTarget.checked
                        ? dispatch(setState({theme: Theme.Dark}))
                        : dispatch(setState({theme: Theme.Light}))
                }}
            />
        </div>
    )
}
