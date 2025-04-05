function handleContentEditable(event, el) {
    if (event.key === "i" && normal) {
      event.preventDefault();
      console.log("you're in insert mode");
      normal = false;
    }
    else if (event.key === "`" && !normal) {
      event.preventDefault();
      console.log("you're back in normal mode")
      normal = true;
    }
    else if (event.key === "h" && normal) {
      event.preventDefault();
      moveCursorLeftContentEditable();
    }
    else if (event.key === "l" && normal) {
      event.preventDefault();
      moveCursorRightContentEditable();
    }
    else if (event.key === "k" && normal) {
    event.preventDefault();
    moveCursorUpContentEditable();
    }
    else if (event.key === "j" && normal){
      event.preventDefault();
      moveCursorDownContentEditable();
    }
    else if (event.key === "w" && normal){
      event.preventDefault();
      nextwordContentEditable();
  } else if (event.key === "a" && normal){
      event.preventDefault();
      moveCursorRightContentEditable();
      normal = false;
  } else if (normal === true){
      event.preventDefault();
  }
}

// keybind functions
function moveCursorLeftContentEditable() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (range.startOffset > 0) {
        range.setStart(range.startContainer, range.startOffset - 1);
        range.setEnd(range.startContainer, range.startOffset);
        selection.addRange(range);
    }
}
function moveCursorRightContentEditable() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // selection.rangeCount counts the number of active ranges, should return zero (falsy)
    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    const textLength = node.textContent.length;
    if (range.startOffset >= textLength) return;
    range.setStart(range.startContainer, range.startOffset + 1);
    range.setEnd(range.startContainer, range.startOffset);
    selection.addRange(range);
}

function moveCursorDownContentEditable() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const column = range.startOffset;
  const nextline = getNextLineElement();
  if (!nextline) return;
  const textNode = nextline.firstChild;
  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    const offset = Math.min(column, textNode.length); // Avoid going past the line's length
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset);
    selection.addRange(range);
  } 
}

function moveCursorUpContentEditable() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const column = range.startOffset;
  const prevline = getPrevLineElement();
  if (!prevline) return;
  const textNode = prevline.firstChild;
  if (textNode && textNode.nodeType === Node.TEXT_NODE){
    const offset = Math.min(column, textNode.length);
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset);
    selection.addRange(range);
  }
}

function nextwordContentEditable() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const linetext = getCurrentLineText();
  const currentTextAfterCaret = linetext.substring(range.startOffset);
  const nextSpaceIndex = currentTextAfterCaret.indexOf(" ");
  const nextwordpos = (nextSpaceIndex === -1) ? linetext.length : range.startOffset + nextSpaceIndex + 1;

  range.setStart(range.startContainer, nextwordpos);
  range.setEnd(range.startContainer, nextwordpos);
  selection.addRange(range);
}


// helper functions

function getCurrentLineElement() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return null;
  let node = selection.getRangeAt(0).startContainer;
  // Traverse up to find the closest block element
  while (node && node !== document.body) {
    if (node.nodeType === Node.ELEMENT_NODE && (node.nodeName === "DIV" || node.nodeName === "P" || node.nodeName === "LI" || node.nodeName === "BR")) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}

function getCurrentLineText() {
  const lineNode = getCurrentLineElement();
  return lineNode?.innerText || "";
}

function getNextLineElement() {
  const currentLine = getCurrentLineElement();
  if (!currentLine) return null;
  let next = currentLine.nextSibling;
  // Skip non-element nodes (like text or comment nodes)
  while (next && next.nodeType !== Node.ELEMENT_NODE) {
    next = next.nextSibling;
  }
  return next;
}

function getPrevLineElement() {
  const currentLine = getCurrentLineElement();
  if (!currentLine) return null;
  let previous = currentLine.previousSibling;
  while (previous && previous.nodeType !== Node.ELEMENT_NODE) {
    previous = previous.previousSibling;
  }
  return previous;
}

