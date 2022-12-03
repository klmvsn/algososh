describe('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('По умолчанию открывает главную страницу', () => {
    cy.contains('МБОУ АЛГОСОШ');
  })

  it('Страница строка', () => {
    cy.get("a[href*='recursion']").click();
    cy.contains('Строка');
  })

  it('Страница последовательность Фибоначчи', () => {
    cy.get("a[href*='fibonacci']").click();
    cy.contains('Последовательность Фибоначчи');
  })

  it('Страница сортировка массива', () => {
    cy.get("a[href*='sorting']").click();
    cy.contains('Сортировка массива');
  })

  it('Страница стек', () => {
    cy.get("a[href*='stack']").click();
    cy.contains('Стек');
  })

  it('Страница очередь', () => {
    cy.get("a[href*='queue']").click();
    cy.contains('Очередь');
  })

  it('Страница связный список',() => {
    cy.get("a[href*='list']").click();
    cy.contains('Связный список');
  })
})