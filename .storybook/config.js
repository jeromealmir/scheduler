/**
 * Configures the Storybook environment to load the stories.
 * @param {function} loadStories - A function that loads the stories.
 * @param {object} module - The module object.
 * @returns None
 */
import { configure } from "@storybook/react";

function loadStories() {
  require("../stories");
}

configure(loadStories, module);
