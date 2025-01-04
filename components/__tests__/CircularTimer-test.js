import React from "react";
import { render, screen } from "@testing-library/react-native";
import CircularTimer from "../CircularTimer/CircularTimer";

describe("CircularTimer Component", () => {
  it("should render the initial time correctly", () => {
    render(<CircularTimer duration={10} />);

    expect(screen.getByText("0:10s")).toBeTruthy();
  });

  it("should update the time every second", () => {
    jest.useFakeTimers();

    render(<CircularTimer duration={10} />);
    expect(screen.getByText("0:10s")).toBeTruthy();
    jest.advanceTimersByTime(1000);

    expect(screen.getByText("0:10s")).toBeTruthy();
  });

  it("should pause the timer when isPaused is true", () => {
    jest.useFakeTimers();

    render(<CircularTimer duration={10} isPaused={true} />);

    expect(screen.getByText("0:10s")).toBeTruthy();

    jest.advanceTimersByTime(1000);

    expect(screen.getByText("0:10s")).toBeTruthy();
  });

  it("should resume the timer when isPaused changes to false", () => {
    jest.useFakeTimers();

    const { rerender } = render(
      <CircularTimer duration={10} isPaused={true} />
    );

    expect(screen.getByText("0:10s")).toBeTruthy();

    rerender(<CircularTimer duration={10} isPaused={false} />);

    jest.advanceTimersByTime(1000);

    expect(screen.getByText("0:10s")).toBeTruthy();
  });
});
