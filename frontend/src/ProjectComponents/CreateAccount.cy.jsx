import React from 'react'
import CreateAccount from './CreateAccount'

describe('<CreateAccount />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateAccount />)
  })
})