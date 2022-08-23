import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Profile', () => {
    it('Testes de verificação de botões e email na tela', () => {
        const { history } = renderWithRouter(<App />)

        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const btn = screen.getByTestId('login-submit-btn')
    
        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '1234567')
        userEvent.click(btn)

        history.push('/profile')

        const emailInput = screen.getByTestId('profile-email')
        const done = screen.getByTestId('profile-done-btn')
        const favorite = screen.getByTestId('profile-favorite-btn')
        const logout = screen.getByTestId('profile-logout-btn')
        const user = screen.getByText('test@test.com')

        expect(emailInput).toBeInTheDocument();
        expect(done).toBeInTheDocument();
        expect(favorite).toBeInTheDocument();
        expect(logout).toBeInTheDocument();
        expect(user).toBeInTheDocument();

    })

    it('teste renderização para receitas feitas', () => {
        const { history } = renderWithRouter(<Profile />)

        const done = screen.getByTestId('profile-done-btn')
        userEvent.click(done)

        const { pathname } = history.location;
        expect(pathname).toBe('/done-recipes')

    });

    it('teste renderização para receitas favoritas', () => {
        const { history } = renderWithRouter(<Profile />)

        const favorite = screen.getByTestId('profile-favorite-btn')
        userEvent.click(favorite)

        const { pathname } = history.location;
        expect(pathname).toBe('/favorite-recipes')

    });

    it('teste renderização para tela de login', () => {
        const { history } = renderWithRouter(<Profile />)

        const logout = screen.getByTestId('profile-logout-btn')
        userEvent.click(logout)

        const { pathname } = history.location;
        expect(pathname).toBe('/')

    });
    
});