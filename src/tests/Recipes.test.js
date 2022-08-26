import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import App from '../App';
import RecipeAppProvider from '../context/RecipeAppProvider';
import renderWithRouter from './renderWithRouter';
import inicialFoods from './mockData/mockAllData';
import mealCategories from '../../cypress/mocks/mealCategories';
import chickenMeals from '../../cypress/mocks/chickenMeals';

describe('Teste o componente Recipes', () => {

  test('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/foods')

  global.fetch = jest.fn().mockImplementation((url) => {
    
      if(url === `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`) {
      return Promise.resolve({
        json: jest.fn().mockResolvedValueOnce(chickenMeals)
      })
    }

    if(url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: jest.fn().mockResolvedValueOnce(inicialFoods)
      })
    }

    if(url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: jest.fn().mockResolvedValueOnce(mealCategories),
      })
    }
  })  
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

        await waitFor(() => expect(global.fetch).toHaveBeenCalled())

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'))

        global.fetch.mockRestore()
  })
 })
