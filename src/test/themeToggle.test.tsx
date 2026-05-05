import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme }),
}));

describe("ThemeToggle", () => {
  it("expoe nome acessivel e alterna para tema escuro", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Ativar tema escuro" });
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
