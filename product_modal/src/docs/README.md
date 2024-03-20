# Project Structure

This document provides an overview of the project's directory structure. It explains the purpose of each folder and how they fit into the overall project.

## `src`

This is the source directory where our application's source code resides.

### `assets`

Contains static assets such as images, styles, and any other files that are imported into your project.

### `components`

Holds all the Vue components that are used across the application. Each component is a Vue instance with its template, script, and style.

### `composables`

Includes Vue 3 Composition API setup files. These are reusable composition functions that encapsulate reactive logic.

### `decorators`

Contains TypeScript decorators that add annotations and a meta-programming syntax for class declarations and members.

### `helpers`

This folder is a collection of utility functions that provide commonly needed functionality throughout the application.

### `mocks`

Includes mock data files that simulate the behavior of real data for testing purposes.

### `pages`

Stores Vue components that are routed and represent pages in the application. It's often used in combination with Vue Router.

### `plugins`

Contains Vue.js plugins that add global-level functionality to Vue. This can include directives, mixins, or components.

### `services`

This directory has service files that encapsulate business logic, making API calls, and processing data.

### `store`

Includes the Vuex store files. Vuex is a state management pattern + library for Vue.js applications.

### `types`

Holds TypeScript type definitions and interfaces that provide static type checking and code structuring
