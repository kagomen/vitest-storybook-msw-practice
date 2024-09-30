import App from "./App";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { http, HttpResponse } from "msw";

export const mockHandler = [
  http.get("/api/options", () => {
    return HttpResponse.json({
      options: [
        { value: "option-1", label: "Option 1" },
        { value: "option-2", label: "Option 2" },
        { value: "option-3", label: "Option 3" },
      ],
    });
  }),
];

const meta: Meta<typeof App> = {
  component: App,
  args: {
    onSubmit: action("submit"),
  },
  parameters: {
    msw: {
      handlers: mockHandler,
    },
  },
  excludeStories: ["mockHandler"],
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};
