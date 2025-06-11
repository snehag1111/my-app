describe('Counter component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('display initial count', () => {
        cy.get('.counter').should('contain', '0');
    });

    it('increament counter', () => {
        cy.get('.inc-btn').click();
        cy.get('.counter').should('contain', '1');
    });

    it('decrement counter', () => {
        cy.get('.dec-btn').click();
        cy.get('.counter').should('contain', '-1');
    });
})