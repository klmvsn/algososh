import { ElementStates } from "./element-states"

export type TQueue = {
    item: string,
    state: ElementStates
}

export type TInProgress = {
    add: boolean,
    remove: boolean
}
