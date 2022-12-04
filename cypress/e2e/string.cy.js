import { circles } from '../constants/constants';
import {DELAY_IN_MS} from '../../src/constants/delays'

describe('String test', () => {
  beforeEach(() => {
    cy.visit('recursion')
  })

  it('При пустом инпуте кнопка недоступна', () => {
    cy.get('input').should('have.value','');
    cy.contains('Развернуть').should('be.disabled');
  })

  it('Тестирование разворачивания строки', () => {

    cy.get('input').type('abcd');
    cy.contains('Развернуть').click();
    
    cy.get(circles).then((item) => {
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[0]).children().should('have.text','a');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'))
      cy.get(item[1]).children().should('have.text','b');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'))
      cy.get(item[2]).children().should('have.text','c');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[3]).children().should('have.text','d');
    })

    cy.wait(DELAY_IN_MS);

    cy.get(circles).then(item => {
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[0]).children().should('have.text','d');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[1]).children().should('have.text','b');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[2]).children().should('have.text','c');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[3]).children().should('have.text','a');
    })

    cy.wait(DELAY_IN_MS);

    cy.get(circles).then(item => {
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[0]).children().should('have.text','d');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[1]).children().should('have.text','c');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[2]).children().should('have.text','b');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'))
      cy.get(item[3]).children().should('have.text','a');
    })

    cy.get('input').should('have.value','');
    cy.contains('Развернуть').should('be.disabled');
  })
})