import { test, expect, describe, vi, beforeAll, afterAll } from "vitest";
import Meta, * as Stories from "./App.stories";
import { composeStory } from "@storybook/react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@storybook/test";
import { setupServer } from "msw/node";

const server = setupServer();
beforeAll(() => server.listen());
afterAll(() => server.close());

describe("App", () => {
  test(
    "フォームが正しく動作する",
    server.boundary(async () => {
      server.use(...Stories.mockHandler);

      // Arrange
      const submitHandler = vi.fn();
      const App = composeStory(Stories.Default, Meta);
      render(<App onSubmit={submitHandler} />);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(3);
      }); // レンダーの処理を待つ

      const combobox = screen.getByRole("combobox");
      await userEvent.selectOptions(combobox, "option-3");

      const submitButton = screen.getByRole("button", { name: "Submit" });
      // screen.debug(submitButton);

      // Act
      await userEvent.click(submitButton);

      // Assert
      expect(submitHandler).toHaveBeenCalledWith({ option: "option-3" });
    })
  );
});
