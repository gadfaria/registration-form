import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the secondary style when secondary prop is passed", () => {
    render(<Button secondary>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("bg-white");
  });

  it("applies the disabled style when disabled prop is passed", () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("opacity-50");
    expect(buttonElement).toHaveClass("cursor-not-allowed");
  });
});
