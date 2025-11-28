# Fix Tailwind CSS Linting Issues

## Goal Description
The IDE is reporting "Unknown at rule @tailwind" and "Unknown at rule @apply" in `globals.css`. This is because the standard CSS validator does not recognize Tailwind directives. We will configure the workspace to ignore these specific CSS warnings or associate CSS files with Tailwind to fix this.

## Proposed Changes
### Configuration
#### [NEW] [.vscode/settings.json](file:///c:/Apps/NEETrack/NEETrack/.vscode/settings.json)
- Create a `.vscode/settings.json` file to configure the editor settings.
- Add `files.associations` to treat `.css` files as `tailwindcss` to enable proper syntax highlighting and linting if the Tailwind CSS IntelliSense extension is installed.
- Add `css.lint.unknownAtRules: "ignore"` to suppress the warnings from the built-in CSS validator.

## Verification Plan
### Manual Verification
- The user should verify that the warnings in `globals.css` disappear after the file is created.
