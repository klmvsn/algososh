import { ElementStates } from "./element-states";

type TAdditionalElement = {
    item: string,
    state: ElementStates,
    action: 'add' | 'remove'
}

export type TListItem =
    {
        item: string;
        state: ElementStates;
        additionalElement?: TAdditionalElement | null
    };

export type TListInProgress = {
    append: boolean,
    prepend: boolean,
    deleteHead: boolean,
    deleteTail: boolean,
    addByIndex: boolean,
    deleteByIndex: boolean
}