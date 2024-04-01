import { BASE_URL } from '../const/routes';
import { REGISTER } from '../const/routes';
import { REGISTER_EMAIL } from '../data/register.data';

describe('Registration', () => {  // Test Scenario
    let randomStrings = Math.random().toString(36).substring(7);

  it('should successfully register', () => { // Test Case
    cy.request({ // Data Actual Result
      method: 'POST',
      url: BASE_URL.baseUrl + REGISTER.register,
      body: {
        email: randomStrings + "@gmail.com",
        password: randomStrings,
        name: randomStrings
      },
    }).then((response) => { // Excpected result
      expect(response.status).to.equal(200);
      expect(response.body.data).to.equal('berhasil');
      expect(response.body.status).to.equal('SUCCESS_REGISTER');
      expect(response.body.message).to.equal('created user!');
    });
  })

  it('should fail register due to empty email address', () => {  // Test Case
    cy.request({
      method: 'POST',
      url: BASE_URL.baseUrl + REGISTER.register,
      body: {
        email: "",
        password: randomStrings,
        name: randomStrings
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(420);
      expect(response.body.data).to.equal('Email/Username/Password tidak boleh kosong');
      expect(response.body.status).to.equal('FAILED_REGISTER');
      expect(response.body.message).to.equal('Gagal Registrasi');
    });
  })

//   it.only('should fail register due to duplicate email address', () => {     ------> only digunakan untuk menjalankan script satu test case saja (npx cypress run --spec "cypress/e2e/register.cy.js")    
  it('should fail register due to duplicate email address', () => {  // Test Case
    cy.request({
      method: 'POST',
      url: BASE_URL.baseUrl + REGISTER.register,
      body: {
        email: REGISTER_EMAIL.email,
        password: randomStrings,
        name: randomStrings
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(420);
      expect(response.body.data).to.equal('Email sudah terdaftar, gunakan Email lain');
      expect(response.body.status).to.equal('FAILED_REGISTER');
      expect(response.body.message).to.equal('Gagal Registrasi');
    });
  })

});