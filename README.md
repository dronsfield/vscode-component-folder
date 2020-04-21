# Component Folder (VS Code Extension)

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

## Features

### New Component Folder

Adds a new context menu option for folders in the explorer. When selected it creates a new component folder within that folder using the name and file extension provided by the user.

![New Component Folder animation](images/NewComponentFolder.gif)

---

### Convert To Component Folder

Adds a new context menu option for `.ts` / `.tsx` / `.js` / `.jsx` fiiles in the explorer. Creates a new component folder, copying the name and content of the file and modifying `import` statements to work from within a folder.

![Convert To Component Folder animation](images/ConvertToComponentFolder.gif)
