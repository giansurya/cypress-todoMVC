import settings from "../support/settings";
import { input, labelActive, labelCompleted, logo, todoCount } from "../support/utils";

describe('TO DO LIST TEST', () => {

  before('', () => {
    cy.clearLocalStorage()
  })
  it('TASK 1: Visit Website', () => {
    cy.visit(settings.BASE_URL)
    //Assert the URL is correct
    cy.url().should('include', '/examples/react/#/')
    //Assert the page is loaded successfully
    cy.get(logo).should('be.visible')
    cy.get(logo).should('contain', 'todos')
  });
  it('TASK 2: Add Task', () => {
    //Add New Task
    cy.get(input).type('Go to H Club SCBD{enter}')
    cy.get(input).type('Buy a bottle of Singleton{enter}')
    cy.get(input).type('Dance the night out!{enter}')

    //Verify the task is correctly added to the list
    cy.contains('label', 'Go to H Club SCBD').should('exist')
    cy.contains('label', 'Buy a bottle of Singleton').should('exist')
    cy.contains('label', 'Dance the night out!').should('exist')

    //Verify the task added count is correct
    cy.get(todoCount).as('totalTodo')
    cy.get('@totalTodo').should('contain', '3')
  });

  it('TASK 3: Complete Task', () => {
    //Mark a task as Completed
    cy.get('.view > input.toggle[type="checkbox"]')
      .should('exist')
      .eq(0)
      .click()

    //Verify the task is visually marked as Completed
    cy.get('.completed > .view > label')
      .eq(0)
      .should('be.visible')

    //Verify the remaining task count is correct
    cy.get(todoCount).as('totalTodo')
    cy.get('@totalTodo').should('contain', '2')
  });

  it('TASK 4: Delete Task', () => {
    //Delete a Task
    cy.get('button.destroy').should('exist')
      .eq(1)
      .click({force: true})
    
    //Verify the task is removed from the list
    cy.contains('label', 'Buy a bottle of Singleton').should('not.exist')

    //Verify the remaining task count is correct
    cy.get(todoCount).as('totalTodo')
    cy.get('@totalTodo').should('contain', '1')
  });

  it('TASK 5: Filter Task', () => {
    //Filter Active and verify task
    cy.get(labelActive).should('contain', 'Active').click()
    cy.contains('label', 'Go to H Club SCBD').should('not.exist')
    cy.contains('label', 'Buy a bottle of Singleton').should('not.exist')
    cy.contains('label', 'Dance the night out!').should('exist')
    
    //Filter Completed and verify task
    cy.get(labelCompleted).should('contain', 'Completed').click()
    cy.contains('label', 'Go to H Club SCBD').should('exist')
    cy.contains('label', 'Buy a bottle of Singleton').should('not.exist')
    cy.contains('label', 'Dance the night out!').should('not.exist')
  });
});