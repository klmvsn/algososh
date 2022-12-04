import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circles } from "../constants/constants";

describe('fibonacci test', () => {
  beforeEach(() => {
    cy.visit('fibonacci')
  })

  it('При пустом инпуте кнопка недоступна', () => {
    cy.get('input').should("have.value","");
    cy.contains('Рассчитать').should('be.disabled');
  })

  it('Числа генерируются корректно', () => {
    cy.clock();

    cy.get('input').type('5');
    cy.contains('Рассчитать').click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','1').should('have.text','0');

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','2').should('have.text','01'); 

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','3').should('have.text','011');

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','4').should('have.text','0112');

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','5').should('have.text','01123');

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).children().should('have.length','6').should('have.text','011235');
     
  })
})