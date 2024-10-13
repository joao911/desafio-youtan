import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CardDash } from "./index";

describe("CardDash Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <CardDash icon={<div>Icon</div>} title={100} subtitle="Subtitle" />
    );
    expect(getByText("Subtitle")).toBeDefined();
  });
  it("renders the icon correctly", () => {
    const { container } = render(
      <CardDash
        icon={<div data-testid="icon">Icon</div>}
        title={100}
        subtitle="Test Subtitle"
      />
    );
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
  });

  it("renders the subtitle correctly", () => {
    const { getByText } = render(
      <CardDash icon={<div>Icon</div>} title={100} subtitle="My Subtitle" />
    );
    expect(getByText("My Subtitle")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <CardDash icon={<div>Icon</div>} title={100} subtitle="Snapshot Test" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with title as zero", () => {
    const { getByText } = render(
      <CardDash icon={<div>Icon</div>} title={0} subtitle="Test Subtitle" />
    );
    expect(getByText("0")).toBeInTheDocument();
  });
});
