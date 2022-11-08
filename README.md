# Component Folder (VS Code Extension)

[![version badge](https://vsmarketplacebadge.apphb.com/version/dronz.vscode-component-folder.svg)](https://marketplace.visualstudio.com/items?itemName=dronz.vscode-component-folder)
[![installs badge](https://vsmarketplacebadge.apphb.com/installs/dronz.vscode-component-folder.svg)](https://marketplace.visualstudio.com/items?itemName=dronz.vscode-component-folder)


This extension adds some quality-of-life improvements when working with "component folders" - aka a file structure like this:

```
├── Button
│   ├── Button.spec.tsx
│   ├── Button.tsx
│   └── index.tsx
├── Card
│   ├── Card.spec.tsx
│   ├── Card.tsx
│   └── index.tsx
```

This is a common pattern for robust, fully-tested codebases in javascript, but it can make refactoring and creating new components tedious.

## Installation

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```sh
ext install dronz.vscode-component-folder
```

## Features

### New Component Folder

Adds a new context menu option for folders in the explorer. When selected it creates a new component folder within that folder using the name and file extension provided by the user.

![New Component Folder animation](images/NewComponentFolder.gif)

---

### Convert To Component Folder

Adds a new context menu option for `.ts` / `.tsx` / `.js` / `.jsx` fiiles in the explorer. Creates a new component folder, copying the name and content of the file and modifying `import` statements to work from within a folder.

![Convert To Component Folder animation](images/ConvertToComponentFolder.gif)

## Config

### Custom templates

You can set up custom template files for this extension to generate. Use the command palette to `Open User Settings (JSON)` and add something like this:

```
"componentFolder.templates": {
  "{{name}}.{{ext}}": "/Users/yourname/code/_templates/component.{{ext}}",
  "index.{{ext}}": "/Users/yourname/code/_templates/index.{{ext}}",
  "{{name}}.module.css": "/Users/yourname/code/_templates/component.module.css",
}
```

Create some template files at the paths you specify in the config, you can use `{{name}}` and it will be replaced by the name of the component during creation, eg here's a template for a component that imports a CSS module:

```
import React from 'react';
import styles from '{{name}}.module.css';

const {{name}} = props => {
  const {foo} = props;
  return <div className={styles.example}>{'{{name}}'}</div>;
};

export default {{name}};
```

You can add as many template files as you like.

### Default file extension

```
"componentFolder.fileExt": "tsx"
```

### Default file to open after creation

Only useful in addition to custom template config, the value for this should match a key from the `componentFolder.templates` config

```
"componentFolder.mainFile": "{{name}}.{{ext}}"
```

## Links

- [View this extension in the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dronz.vscode-component-folder&ssr=false#overview)
- [`file-structurer` package](https://www.npmjs.com/package/file-structurer)
