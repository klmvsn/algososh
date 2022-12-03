import { circles, smallCircle } from '../constants/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('test list', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  it('При пустом инпуте кнопка недоступна', () => {
    cy.get('input').should("have.value", "");
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
    cy.contains('Удалить по индексу').should('be.disabled');
  })

  it('Корректная отрисовка дефолтного списка', () => {
    cy.get(circles).should('have.length', 4).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
  })

  it('Корректное добавление в head', () => {
    cy.get("input").first().type('head');
    cy.contains('Добавить в head').click();
    cy.get(smallCircle).contains('head').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).parent().siblings().contains('0');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('head').parent('div').siblings('p').contains('0');
    cy.get(circles).contains('head').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('head').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get(circles).should('have.length', 5);
  })

  it('Корректное добавление в tail', () => {
    cy.get("input").first().type('tail');
    cy.contains('Добавить в tail').click();
    cy.get(smallCircle).contains('tail').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).parent().siblings().contains('3');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('tail').parent('div').siblings('p').contains('4');
    cy.get(circles).contains('tail').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('tail').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get(circles).should('have.length', 5);
  })

  it('Корректное добавление по индексу', () => {
    cy.get("input").first().type('indx');
    cy.get("input").last().type('1');
    cy.contains('Добавить по индексу').click();
    cy.get(smallCircle).contains('indx').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).parent().siblings().contains('0');
    cy.get(circles).first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(smallCircle).parent().siblings().contains('1');
    cy.get(circles).eq(1).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('indx').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).contains('indx').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get(circles).should('have.length', 5);
  })

  it('Корректное удаление из head', () => {
    cy.contains('Удалить из head').click();
    cy.get(smallCircle).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).get('[class*=text_type_circle]').invoke('text').then((item) => { cy.get(circles).first().should('not.have.text', item) });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).first().siblings('p').contains('0');
    cy.get(circles).should('have.length', 3);
  })

  it('Корректное удаление из tail', () => {
    cy.contains('Удалить из tail').click();
    cy.get(smallCircle).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).get('[class*=text_type_circle]').invoke('text').then((item) => { cy.get(circles).last().should('not.have.text', item) });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).last().siblings('p').contains('2');
    cy.get(circles).should('have.length', 3);
  })

  it('Корректное удаление по индексу', () => {
    cy.get("input").last().type('1');
    cy.contains('Удалить по индексу').click();
    cy.get(circles).first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).eq(1).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(smallCircle).invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(smallCircle).get('[class*=text_type_circle]').invoke('text').then((item) => { cy.get(circles).last().should('not.have.text', item) });
    cy.get(circles).eq(2).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circles).should('have.length', 3);
  })
})