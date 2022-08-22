import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes o componente Footer', () => {
  it('Testes se o icone Food redireciona para a pagina Food', () => {
    const { history } = renderWithRouter(<App />)

    const email = screen.getByTestId('email-input')
    const senha = screen.getByTestId('password-input')
    const btn = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'test@test.com')
    userEvent.type(senha, '1234567')
    userEvent.click(btn)

    const btnFood = screen.getByRole('button', {
      name: /meal icon/i
      })

    console.log(btnFood)

    userEvent.click(btnFood)

    const text = screen.getByText('Componente de receitas')

    expect(text).toBeDefined()
    screen.logTestingPlaygroundURL()
}),
it('Testes se o icone Drink redireciona para a pagina Drink', () => {
  const { history } = renderWithRouter(<App />)

  const email = screen.getByTestId('email-input')
  const senha = screen.getByTestId('password-input')
  const btn = screen.getByTestId('login-submit-btn')

  userEvent.type(email, 'test@test.com')
  userEvent.type(senha, '1234567')
  userEvent.click(btn)

  const btnDrink = screen.getByRole('button', {
    name: /drink icon/i
    })

  console.log(btnDrink)

  userEvent.click(btnDrink)

  // const text = screen.getByText('Componente de receitas')

  // expect(text).toBeDefined()
  screen.logTestingPlaygroundURL()
})
})