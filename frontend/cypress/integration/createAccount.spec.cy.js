describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/create'); // Adjust the path accordingly
    });
  
    it('should fill out the registration form', () => {
      cy.get('#fName').type('John');
      cy.get('#lName').type('Doe');
      cy.get('#dob').type('1990-01-01');
      cy.get('#email').type('john.doe@example.com');
      
      cy.get('button[type="submit"]').click();
    });
  
    // You can write more test cases for different scenarios
  });
  