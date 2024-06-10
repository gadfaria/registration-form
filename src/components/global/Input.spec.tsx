import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders without crashing", () => {
    render(<Input label="Test Input" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    render(<Input label="Test Input" />);
    const labelElement = screen.getByText(/Test Input/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("displays the error message when provided", () => {
    render(<Input label="Test Input" errorMessage="Test Error" />);
    const errorElement = screen.getByText(/Test Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
