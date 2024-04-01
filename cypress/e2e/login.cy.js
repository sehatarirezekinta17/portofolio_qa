
import { VALID_LOGIN } from '../data/login.data';
import { INVALID_LOGIN } from '../data/login.data';
import { NULL_EMAIL  } from '../data/login.data';
import { ROUTES } from '../const/routes';
import { BASE_URL } from '../const/routes';

describe('Verify Login feature', () => {
  it('should successfully log in with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: BASE_URL.baseUrl + ROUTES.login,
      body: {
        email: VALID_LOGIN.email,
        password: VALID_LOGIN.password 
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.equal('Welcome Ari');
      expect(response.body.status).to.equal('SUCCESS_LOGIN');
      expect(response.body.message).to.equal('Anda Berhasil Login');

    });
  })

  it('should fail log in with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: BASE_URL.baseUrl + ROUTES.login,
      body: {
        email: INVALID_LOGIN.email,
        password: INVALID_LOGIN.password 
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).to.equal(`User's not found`);
      expect(response.body.status).to.equal('FAILED_LOGIN');
      expect(response.body.message).to.equal('Email atau Password Anda Salah');

    });
  })

  it('should fail log in with null email', () => {
    cy.request({
        method: 'POST',
        url: BASE_URL.baseUrl + ROUTES.login,
        body: {
            email : NULL_EMAIL.email,
            password : NULL_EMAIL.password
        },
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data).to.equal(`Cek Formulir Anda`);
        expect(response.body.status).to.equal('FAILED_LOGIN');
        expect(response.body.message).to.equal('Email tidak boleh kosong');
    })
  })
});
