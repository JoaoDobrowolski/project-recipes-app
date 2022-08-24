import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RecipeAppProvider from '../context/RecipeAppProvider';
import renderWithRouter from './renderWithRouter';
import chickenMeals from './mockData/chikenMeals'
import soupMeals from './mockData/soupMeals'
import drinks from './mockData/drinks'

describe('Teste o componente Recipes', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
  //     json: () => Promise.resolve(mockAllData),
  //   }));
  // });
  // console.log(mockAllData)


  afterEach(() => jest.clearAllMocks());

  test('Teste a busca por ingredientes',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/foods')

    // console.log(mockAllData)


  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(chickenMeals),
  }))

  // console.log(chickenMeals)

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

        // screen.logTestingPlaygroundURL()
  }),

  test('Teste a busca por nome',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/foods')

    const {meals} = soupMeals

jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
  json: () => Promise.resolve(meals),
}))

console.log('soup meals', meals)

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

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup'))

  }),

  test('Teste a busca por ingredientes',async () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>)
    history.push('/drinks')

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
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

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'))

        // screen.logTestingPlaygroundURL()
  })
})