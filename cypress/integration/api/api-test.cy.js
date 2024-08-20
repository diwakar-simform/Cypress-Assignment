/// <reference types="cypress" />

// API Testing with: Reqres dummy api.

describe('API Testing - Get All Users', () => {
    it('Validate: It should return a list of users with correct data types', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.headers['content-type']).to.include('application/json; charset=utf-8');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.length).to.be.greaterThan(0);
            response.body.data.forEach((user) => {
                expect(user).to.have.property('id').that.is.a('number');
                expect(user).to.have.property('email').that.is.a('string').and.contains('@');
                expect(user).to.have.property('first_name').that.is.a('string');
                expect(user).to.have.property('last_name').that.is.a('string');
            });
        });
    });
});

describe('API Testing - Get Single User', () => {
    it('Validate: It should return details of a single user with expected status code and headers', () => {
        cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property('content-type').that.includes('application/json; charset=utf-8');
            expect(response.body.data.id).to.eq(2);
            expect(response.body.data.email).to.eq('janet.weaver@reqres.in');
            expect(response.body.data.first_name).to.eq('Janet');
            expect(response.body.data.last_name).to.eq('Weaver');
        });
    });
});


describe('API Testing - Create New User', () => {
    it('Validate: It should create a new user and validate response structure and types', () => {
        const newUser = {
            name: "Diwakar",
            job: "QA"
        };

        cy.request('POST', 'https://reqres.in/api/users', newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name').that.is.a('string').and.eq('Diwakar');
            expect(response.body).to.have.property('job').that.is.a('string').and.eq('QA');
            expect(response.body).to.have.property('id').that.is.a('string');
            expect(response.body).to.have.property('createdAt').that.is.a('string');
        });
    });
});

describe('API Testing - Update User', () => {
    it('Validate: It should update an existing user and validate response status and headers', () => {
        const updatedUser = {
            name: "Diwakar",
            job: "SDET"
        };

        cy.request('PUT', 'https://reqres.in/api/users/2', updatedUser).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json; charset=utf-8');
            expect(response.body.name).to.eq('Diwakar');
            expect(response.body.job).to.eq('SDET');
            expect(response.body.updatedAt).to.be.a('string');
        });
    });
});

describe('API Testing - Delete User', () => {
    it('Validate: It should delete a user and return the correct status code', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
            expect(response.status).to.eq(204);
            expect(response.body).to.be.empty;
        });
    });
});

