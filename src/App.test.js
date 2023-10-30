import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const header = screen.getByText("Find Word!");
  expect(header).toBeInTheDocument();
});

test("can enter text into the textarea and have correct word count", () => {
  const { getByText, getByPlaceholderText, getByDisplayValue } = render(<App />);

  const highlightWordInput = getByPlaceholderText("Enter a word to highlight");
  const textarea = getByPlaceholderText("Enter up to 200 words");

  fireEvent.change(highlightWordInput, { target: { value: "abcde" } });
  expect(highlightWordInput.value).toBe("abcde");

  fireEvent.change(textarea, { target: { value: "abcde abcde abcde" } });
  expect(getByDisplayValue("abcde abcde abcde")).toBeInTheDocument();

  fireEvent.click(getByText("Submit"));
  expect(screen.getByText("Word Count: 3/200")).toBeInTheDocument();
});
