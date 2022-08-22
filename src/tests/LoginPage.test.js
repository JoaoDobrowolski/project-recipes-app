import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
// import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Testes para o componente de login', () => {
    it('Testes para verificar se há inpus na tela', () => {
        render(
            <Login />
        )
        const email = screen.getByTestId('email-input')
        expect(email).toBeInTheDocument();

        const senha = screen.getByTestId('email-input')
        expect(senha).toBeInTheDocument();

        const btn = screen.getByTestId('login-submit-btn')
        expect(btn).toBeInTheDocument();
    })

    it('Testes com digitação nos campos e habilitação de botão', () => {
        render(
            <Login />
        )
        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('email-input')
        const btn = screen.getByTestId('login-submit-btn')

        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '12345')

        expect(btn).toBeDisabled()
    })

    it('Teste com o clique no Enter', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        const email = screen.getByTestId('email-input')
        const senha = screen.getByTestId('email-input')
        const btn = screen.getByTestId('login-submit-btn')

        userEvent.type(email, 'test@test.com')
        userEvent.type(senha, '12345')
        userEvent.click(btn)

        const text = screen.getByText('Componente de receitas')
        expect(text).
    })
});
