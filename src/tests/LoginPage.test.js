import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes para o componente de login', () => {
    it('Testes para verificar se há inpus na tela', () => {
        render(
            <Login />
        )
        const email = screen.getByTestId('email-input')
        expect(email).toBeInTheDocument();

        const senha = screen.getByTestId('password-input')
        expect(senha).toBeInTheDocument();

        const btn = screen.getByTestId('login-submit-btn')
        expect(btn).toBeInTheDocument();
    }),

    it('Testes com digitação nos campos e habilitação de botão', () => {
        render(
            <Login />
        )
        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const btn = screen.getByTestId('login-submit-btn')

        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '123456')

        expect(btn).toBeDisabled()

    }),

    it('Teste com o clique no Enter', async() => {
       const { history } = renderWithRouter(<App />)

        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('password-input')
        const btn = screen.getByTestId('login-submit-btn')

        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '1234567')
        userEvent.click(btn)
        screen.logTestingPlaygroundURL()


        const text = screen.getByText('Componente de receitas')

        expect(text).toBeDefined()

        screen.logTestingPlaygroundURL()
    })
});
