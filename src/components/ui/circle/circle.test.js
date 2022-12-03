import { Circle } from "./circle";
import React from "react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe('Тестирование компонента Circle', () => {
    it('Тест кружка без буквы', () => {
        const circle = renderer.create(<Circle />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с буквами', () => {
        const circle = renderer.create(<Circle letter="test" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с head', () => {
        const circle = renderer.create(<Circle head="test" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с react-элементом в head',() => {
        const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с tail', () => {
        const circle = renderer.create(<Circle tail="test" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с react-элементом в tail',() => {
        const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с index',() => {
        const circle = renderer.create(<Circle index="0" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка с пропом isSmall',() => {
        const circle = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка в состоянии default', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка в состоянии changing', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест кружка в состоянии modified', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
})