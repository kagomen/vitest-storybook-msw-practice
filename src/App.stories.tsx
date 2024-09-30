import App from "./App";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof App> = {
  component: App,
  args: {
    onSubmit: action("submit"),
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/options", () => {
          return HttpResponse.json({
            options: [
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ],
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};
