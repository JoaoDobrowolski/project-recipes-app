import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RecipeAppProvider from '../context/RecipeAppProvider';

describe('Testes o componente Footer', () => {
  it('Testes se o icone Food redireciona para a pagina Food', () => {
    const { history } = renderWithRouter( <RecipeAppProvider><App /></RecipeAppProvider>)

    const email = screen.getByTestId('email-input')
    const senha = screen.getByTestId('password-input')
    const btn = screen.getByTestId('login-submit-btn')
    
    userEvent.type(email, 'test@test.com')
    userEvent.type(senha, '1234567')
    userEvent.click(btn)

    const btnDrink = screen.getByRole('button', {
      name: /drink icon/i
      })
  
    userEvent.click(btnDrink)
    
    const btnFood = screen.getByRole('button', {
      name: /meal icon/i
    })
    const text = screen.getByText('Drinks')
    
    expect(text).toBeDefined()
    userEvent.click(btnFood)
    
    expect(text).toBeDefined()
    
    screen.logTestingPlaygroundURL()
}),
it('Testes se o icone Drink redireciona para a pagina Drink', () => {
  const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)

  const email = screen.getByTestId('email-input')
  const senha = screen.getByTestId('password-input')
  const btn = screen.getByTestId('login-submit-btn')

  userEvent.type(email, 'test@test.com')
  userEvent.type(senha, '1234567')
  userEvent.click(btn)

  const btnDrink = screen.getByRole('button', {
    name: /drink icon/i
    })

  userEvent.click(btnDrink)

  // screen.logTestingPlaygroundURL()
})
})