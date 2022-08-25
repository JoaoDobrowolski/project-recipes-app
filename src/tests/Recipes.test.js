import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RecipeAppProvider from '../context/RecipeAppProvider';
import renderWithRouter from './renderWithRouter';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import { meals } from '../../cypress/mocks/meals';

describe('Teste o componente Recipes', () => {

  test('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/foods')

  const mockData = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(chickenMeals),
  }))

        const searchIcon = screen.getByTestId('search-top-btn')
        userEvent.click(searchIcon)

        const inputSearch = screen.getByTestId('search-input')

        userEvent.type(inputSearch, 'chicken')

        const searchButton = screen.getByRole('button', {
            name: /buscar/i
          })

          const radioIngredient = screen.getByLabelText(/ingredient/i)

        userEvent.click(radioIngredient)

        userEvent.click(searchButton)

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'))

        mockData.mockRestore()
  }),

  test('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/foods')


    const mockData = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }))

        const searchIcon = screen.getByTestId('search-top-btn')
        userEvent.click(searchIcon)

        const inputSearch = screen.getByTestId('search-input')
        
        userEvent.type(inputSearch, 'soup')
        
        const searchButton = screen.getByRole('button', {
          name: /buscar/i
        })
        
        const radioName = screen.getByTestId('name-search-radio')
        
        userEvent.click(radioName)
        
        userEvent.click(searchButton)

        screen.logTestingPlaygroundURL()

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        await waitFor(() => expect(global.fetch)
        .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup'))
        mockData.mockRestore()
  }),

  test('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/drinks')

    const mockData = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(drinks),
    }))

        const searchIcon = screen.getByTestId('search-top-btn')
        userEvent.click(searchIcon)

        const inputSearch = screen.getByTestId('search-input')

        userEvent.type(inputSearch, 'lemon')

        const searchButton = screen.getByRole('button', {
            name: /buscar/i
          })

          const radioIngredient = screen.getByLabelText(/ingredient/i)

        userEvent.click(radioIngredient)

        userEvent.click(searchButton)

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        await waitFor(() => expect(global.fetch)
        .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'))

        mockData.mockRestore()
  }),

  test('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/drinks')

    const mockData = jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(ginDrinks),
    }))

        const searchIcon = screen.getByTestId('search-top-btn')
        userEvent.click(searchIcon)

        const inputSearch = screen.getByTestId('search-input')

        userEvent.type(inputSearch, 'gin')

        const searchButton = screen.getByRole('button', {
            name: /buscar/i
          })

          const radioName = screen.getByTestId('name-search-radio')
        
          userEvent.click(radioName)

        userEvent.click(searchButton)

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());

        await waitFor(() => expect(global.fetch)
        .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin'))

        mockData.mockRestore()
  })


})