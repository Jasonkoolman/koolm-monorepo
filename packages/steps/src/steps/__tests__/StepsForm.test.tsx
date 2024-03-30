import React from "react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { StepsForm } from "../StepsForm";

describe("StepsForm component", () => {
  const user = userEvent.setup();

  it("renders correctly", () => {
    const { getByText } = render(
      <StepsForm className="test-class" formRef={React.createRef()}>
        <div>Test Child</div>
      </StepsForm>,
    );
    const child = getByText("Test Child");
    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass("steps-form", "test-class");
  });

  it("prevents default form submission on Enter keypress in an input", async () => {
    const formRef = React.createRef<HTMLFormElement>();
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <StepsForm formRef={formRef} onSubmit={handleSubmit}>
        <input type="text" />
      </StepsForm>,
    );

    await user.tab();
    await user.keyboard("{Enter}");

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("does not prevent default form submission on Enter keypress", async () => {
    const formRef = React.createRef<HTMLFormElement>();
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <StepsForm formRef={formRef} onSubmit={handleSubmit}>
        <textarea />
        <button type="submit" />
      </StepsForm>,
    );

    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard("{Enter}");

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
