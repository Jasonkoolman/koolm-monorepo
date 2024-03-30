import { render, screen } from "@testing-library/react";
import { StepNavbar } from "../StepNavbar";

describe("StepNavbar component", () => {
  it("renders its children correctly", () => {
    render(
      <StepNavbar>
        <div>Navigation Item</div>
      </StepNavbar>
    );
    expect(screen.getByText("Navigation Item")).toBeInTheDocument();
  });

  it("applies className correctly", () => {
    const customClassName = "custom-navbar-class";
    render(
      <StepNavbar className={customClassName}>
        <div>Navigation Item</div>
      </StepNavbar>
    );
    const navbar = screen.getByText("Navigation Item").parentElement;
    expect(navbar).toHaveClass("step-navbar");
    expect(navbar).toHaveClass(customClassName);
  });
});
