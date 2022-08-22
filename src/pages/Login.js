/* import React from 'react';

const Login = () => (
  <>
    <label htmlFor="email">
      <input
        type="email"
        id="email"
        name="email"
        data-testid="email-input"
        placeholder="seu email"
      />
    </label>
    <label htmlFor="password">
      <input
        type="password"
        id="password"
        name="password"
        data-testid="password-input"
        placeholder="sua senha"
      />
    </label>
    <button type="button" data-testid="login-submit-btn">Entre</button>
  </>
);

export default Login;
 */

import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  /* aula de resolução de exercício de formulário - 11.2 - Aula colocada no Slack */
  validation = (email) => /\S+@\S+\.\S+/.test(email);

  buttonDisabled = () => {
    const { email, senha } = this.state;
    const number = 6;
    /*  if (senha.length > number && this.validation(email)) {
      return false;
    }
    return true; */
    return !(senha.length > number && this.validation(email));
  }

  send = () => {
    const { email } = this.state;
    window.localStorage.setItem('user{ email}', email);
    window.localStorage.setItem('mealsToken', 1);
    window.localStorage.setItem('cocktailsToken', 1);
    const { /* sendEmail */ history } = this.props;
    history.push('/foods');
    // sendEmail(email);
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ senha }
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ this.buttonDisabled() }
          onClick={ this.send }
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </div>);
  }
}

Login.propTypes = {
  // sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default Login;
