import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../componentes/Header';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  test('', () => {
    const { history } = renderWithRouter(<Header />)
    const profileIcon = screen.getByTestId('profile-top-btn')
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn')
    expect(searchIcon).toBeInTheDocument();
    const foods = screen.getByTestId('page-title')
    expect(foods).toBeInTheDocument();
    const buttonProfile = screen.getByTestId('btn-profile')
    userEvent.click(buttonProfile)
    const path = history.location.pathname;
    expect(path).toBeDefined
  })
})