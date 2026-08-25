const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const User = require('../src/models/User');
const { registerCustomer } = require('../src/controllers/authController');

const { expect } = chai;

describe('Customer Signup Function Test', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should sign up a user successfully', async () => {
      // Mock request data
      const req = {
        body: {
          email: 'customer@email.com',
          password: 'password123'
        }
      }

      // Mock existing user
      const createdUser = {
          id: '123',
          email: 'customer@email.com',        
          role: 'customer',
      };

      // Stub database lookup
      const findOneStub = sinon.stub(User, 'findOne')
        .resolves(null);
      // Stub password comparison
      const createStub = sinon.stub(User, 'create')
        .resolves(createdUser);

      // Stub token generation
      sinon.stub(jwt, 'sign').returns('test-token');

      // Mock response object
      const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy(),
      };

      // Call the sign-up function
      await registerCustomer(req, res);

      // Assertions
      expect(
        findOneStub.calledOnceWith({
          email: 'customer@email.com',
        })
      ).to.be.true;

      expect(
        createStub.calledOnceWith({
          email: 'customer@email.com',
          password: 'password123',
          role: 'customer',
        })
      ).to.be.true;

      expect(res.status.calledWith(201)).to.be.true;

      expect(
        res.json.calledWithMatch({
          id: '123',
          email: 'customer@email.com',
          role: 'customer',
          token: 'test-token',
        })
      ).to.be.true;
    });

    it('should return 400 when fields are empty', async () => {
        const req = {
            body: {
                email: '',
                password: '',
            },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
        };

        await registerCustomer(req, res);

        expect(res.status.calledWith(400)).to.be.true;

        expect(
            res.json.calledWithMatch({
                message: 'Email and password are required',
            })
        ).to.be.true;
    });

    it('should return 400 when the email is already registered', async () => {
        const req = {
            body: {
                email: 'customer@email.com',
                password: 'password123',
            },
        };

        sinon.stub(User, 'findOne').resolves({
            email: 'customer@email.com',
        });

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
        };

        await registerCustomer(req, res);

        expect(res.status.calledWith(400)).to.be.true;

        expect(
            res.json.calledWithMatch({
                message: 'User already exists',
            })
        ).to.be.true;
    });

    it('should return 500 if a database error occurs', async () => {
      const req = {
        body: {
          email: 'customer@email.com',
          password: 'password123',
        },
      };

      sinon.stub(User, 'findOne')
        .rejects(new Error('DB Error'));

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await registerCustomer(req, res);

      expect(res.status.calledWith(500)).to.be.true;

      expect(
        res.json.calledWithMatch({
          message: 'DB Error',
        })
      ).to.be.true;
    });
});