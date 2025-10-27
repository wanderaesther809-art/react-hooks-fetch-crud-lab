// src/setupTests.js
import { server } from "./mocks/server";
import "@testing-library/jest-dom";
import "whatwg-fetch";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up once the tests are done.
afterAll(() => server.close());
