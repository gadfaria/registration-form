import { fireEvent, render, screen } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

describe("PasswordInput component", () => {
  it("renders without crashing", () => {
    render(<PasswordInput label="Test Password Input" />);
    const inputElement = screen.getByLabelText(/Test Password Input/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    render(<PasswordInput label="Test Password Input" />);
    const labelElement = screen.getByText(/Test Password Input/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("displays the error message when provided", () => {
    render(
      <PasswordInput label="Test Password Input" errorMessage="Test Error" />
    );
    const errorElement = screen.getByText(/Test Error/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("toggles password visibility when the toggle button is clicked", () => {
    render(<PasswordInput label="Test Password Input" />);
    const inputElement = screen.getByLabelText(/Test Password Input/i);
    const toggleButton = screen.getByRole("button");

    // The password should be hidden by default
    expect(inputElement).toHaveAttribute("type", "password");

    // After clicking the toggle button, the password should be visible
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");

    // After clicking the toggle button again, the password should be hidden
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
