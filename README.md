# VimMotions

---

# Vim-like Keybindings for Browser Text Inputs (Alpha Version)

This Chrome extension provides Vim-like keybindings for navigating and editing text in various text input elements, such as standard text boxes, contenteditable fields, and virtual DOM-based text inputs (like Google Docs, VS Code, etc.). Currently in the alpha stage, this extension aims to bring a familiar and efficient text-editing experience to web-based text input fields.

## Current Features (Alpha)

- **Insert Mode (`i`)**: Press `i` to switch to insert mode.
- **Normal Mode (Backtick)**: Press the backtick (`` ` ``) to return to normal mode.
- **Cursor Navigation**:
  - Move Left (`h`): Move the cursor left by one character.
  - Move Right (`l`): Move the cursor right by one character.
  - Move Up (`k`): Move the cursor up by one line (works in contenteditable elements).
  - Move Down (`j`): Move the cursor down by one line (works in contenteditable elements).
  - Next Word (`w`): Move the cursor to the next word.
  - Move Right (`a`): A combination of normal mode, but moves right and switches to insert mode.

## Supported Input Types

- **Standard Text Inputs** (`<input>`, `<textarea>`)
- **Contenteditable Fields** (`<div contenteditable="true">`)
- **Virtual DOM-based Text Inputs** (e.g., Google Docs, VS Code-like inputs - coming soon)

## Known Issues

- **Contenteditable Issues**:
  - Blank lines cannot be traversed effectively.
  - After refreshing a page, the up and down cursor navigation may not work as intended.
  - Gmail, and possibly other complex contenteditable divs, may have issues where mixed `<div>` and `<br>` elements prevent the cursor from moving as expected.
  
These issues are known and will be addressed in future releases as the extension evolves.

## Future Releases

- **Keybindings to be added**:
  - `b` - Move the cursor back by one word.
  - `e` - Move the cursor forward to the end of the current word.
  - `0` - Move the cursor to the beginning of the line.
  - `A` - Append to the end of the current line.
  
- **Additional Input Types**:
  - Virtual DOM and other types of input fields will be supported in the future.

The goal is to include most or all of the classic Vim keybindings in future releases.

## Installation (for Development)

1. Clone or download the repository.
2. Navigate to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked**, and select the extension directory.
5. Once installed, the keybindings will be active on all supported text input elements.

## License

This project is in the early stages of development, and is available for use under the **MIT License**.


