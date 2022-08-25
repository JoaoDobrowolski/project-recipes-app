import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import RecipeAppProvider from '../context/RecipeAppProvider';

describe('Testes do componente Profile', () => {
    it('Testes de verificação de botões e email na tela', () => {
        const { history } = renderWithRouter( <RecipeAppProvider><App /></RecipeAppProvider>)

        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const btn = screen.getByTestId('login-submit-btn')
    
        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '1234567')
        userEvent.click(btn)

        history.push('/profile')

        const done = screen.getByTestId('profile-done-btn')
        const favorite = screen.getByTestId('profile-favorite-btn')
        const logout = screen.getByTestId('profile-logout-btn')
        const user = screen.getByRole('heading', {
            name: /email@example\.com/i
          })
          
          expect(user).toBeInTheDocument();
          expect(done).toBeInTheDocument();
          expect(favorite).toBeInTheDocument();
          expect(logout).toBeInTheDocument();
        expect(user).toBeInTheDocument();
        
    }),

    it('teste renderização para receitas feitas', () => {
        const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
        history.push('/profile')
        
        const done = screen.getByTestId('profile-done-btn')
        userEvent.click(done)
        
        screen.logTestingPlaygroundURL();
        const { pathname } = history.location;
        expect(pathname).toBe('/done-recipes')
        
    }),

    it('teste renderização para receitas favoritas', () => {
        const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
        history.push('/profile')
        
        const favorite = screen.getByTestId('profile-favorite-btn')
        userEvent.click(favorite)

        const { pathname } = history.location;
        expect(pathname).toBe('/favorite-recipes')
        
    }),
    
    it('teste renderização para tela de login', () => {
        const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
        history.push('/profile')

        const logout = screen.getByTestId('profile-logout-btn')
        userEvent.click(logout)

        const { pathname } = history.location;
        expect(pathname).toBe('/')

    })
    
});