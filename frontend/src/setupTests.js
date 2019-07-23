// Enzyme configuration, reference:
// https://hackernoon.com/implementing-basic-component-tests-using-jest-and-enzyme-d1d8788d627a
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
Enzyme.configure({adapter: new EnzymeAdapter()});