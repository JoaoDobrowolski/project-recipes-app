import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Header from '../componentes/Header';
import RecipeAppProvider from '../context/RecipeAppProvider';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente Header', () => {
  test('Teste as funcionalidades do componente Header', () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)

    const email = screen.getByTestId('email-input')
    const senha = screen.getByTestId('password-input')
    const btn = screen.getByTestId('login-submit-btn')

    userEvent.type(email, 'test@test.com')
    userEvent.type(senha, '1234567')
    userEvent.click(btn)

    const profileIcon = screen.getByTestId('profile-top-btn')
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn')
    userEvent.click(searchIcon)
    expect(searchIcon).toBeInTheDocument();

    const inputSearch = screen.getByTestId('search-input')
    expect(inputSearch).toBeDefined();

    userEvent.click(searchIcon)
    expect(inputSearch).not.toBeInTheDocument();
    
    userEvent.click(profileIcon)

    const headEmail = screen.getByRole('heading', {
      name: /test@test\.com/i
    })
    
    expect(headEmail).toBeInTheDocument();
    screen.logTestingPlaygroundURL()
  })
})