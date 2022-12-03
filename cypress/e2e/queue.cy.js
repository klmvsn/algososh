import { circles } from '../constants/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('test queue', () => {
  const addElem = (item) => {
    cy.get("input").type(item);
    cy.contains("Добавить").click();
    cy.get(circles).contains(item).parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.wait(SHORT_DELAY_IN_MS);
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/queue')
  })

  it('При пустом инпуте кнопка недоступна', () => {
    cy.get('input').should("have.value", "");
    cy.contains('Добавить').should('be.disabled');
  })

  it('Корректное добавление в очередь', () => {
    addElem('1');

    cy.get(circles).contains('1').parent().as('circle');
    cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get('@circle').siblings('div').contains('head');
    cy.get('@circle').siblings('div').contains('tail');

    cy.wait(SHORT_DELAY_IN_MS);

    addElem('2');

    cy.get(circles).then(item => {
      cy.get(item[0]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[0]).should('have.text', '1');
      cy.get(item[0]).siblings('div').contains('head');
      cy.get(item[1]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[1]).should('have.text', '2');
      cy.get(item[1]).siblings('div').contains('tail');
    })
  })

  it('Корректное удаление из очереди', () => {
    addElem('1');
    addElem('2');

    cy.contains('Удалить').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).then(item => {
      cy.get(item[1]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[1]).should('have.text', '2');
      cy.get(item[1]).siblings('div').contains('head');
      cy.get(item[1]).siblings('div').contains('tail');
    })
  })

  it('Корректное очищение очереди',() => {
    addElem('1');
    addElem('2');

    cy.contains('Очистить').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('1').should('not.exist');
    cy.get(circles).contains('2').should('not.exist');
  })
})