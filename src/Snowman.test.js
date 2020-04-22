import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Snowman from "./Snowman";

it("renders without crashing", function () {
  render(<Snowman />);
});

// what other snapshot test could we write here, given only one component?
it("matches snapshot", function () {
  const { asFragment } = render(<Snowman words={["apple"]}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("expect the image to change upon an incorrect guess", function () {
  const { queryByText, container } = render(<Snowman words={["apple"]}/>);

  const ltrGuess = queryByText('w');

  // guess the wrong letter given set word of "apple"
  fireEvent.click(ltrGuess);

  // expect the page to contain the second image, not the first
  expect(container.querySelector(".Snowman")).toContainHTML("1.png")
  expect(container.querySelector(".Snowman")).not.toContainHTML("0.png")
});


it("expect the image to change upon a correct guess", function () {
  const { queryByText, container } = render(<Snowman words={["apple"]}/>);
  
  const ltrGuess = queryByText('a');
  
  // guess a right letter given set word of "apple"
  fireEvent.click(ltrGuess);
  
  // expect the page to contain the first image, not the second
  expect(container.querySelector(".Snowman")).toContainHTML("0.png")
  expect(container.querySelector(".Snowman")).not.toContainHTML("1.png")
});


it("expect the buttons to disappear and 'You lose' to appear after 6 incorrect guesses", function () {
  Snowman.defaultProps.words = ["apple"];
  const { queryByText, container } = render(<Snowman words={["apple"]}/>);

  // guess a series of 6 wrong letters given set word of "apple"
  let ltrGuess = queryByText('w');
  fireEvent.click(ltrGuess);
  
  ltrGuess = queryByText('t');
  fireEvent.click(ltrGuess);
  
  ltrGuess = queryByText('x');
  fireEvent.click(ltrGuess);
  
  ltrGuess = queryByText('r');
  fireEvent.click(ltrGuess);
  
  ltrGuess = queryByText('k');
  fireEvent.click(ltrGuess);
  
  ltrGuess = queryByText('j');
  fireEvent.click(ltrGuess);

  // expect the page to contain html including "You lose", but not the letter buttons
  expect(container.querySelector(".Snowman")).toContainHTML("You lose")
  expect(container.querySelector(".Snowman")).not.toContainHTML('<button value="a">')
  expect(container.querySelector(".Snowman")).not.toContainHTML('<button value="p">')
  expect(container.querySelector(".Snowman")).not.toContainHTML('<button value="x">')
});