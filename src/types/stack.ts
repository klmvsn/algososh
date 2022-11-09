import { ElementStates } from "./element-states"

export type TStack = {
    item: string,
    state: ElementStates
}

export type TInProgress = {
    push: boolean,
    pop: boolean
}