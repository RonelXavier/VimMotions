function handleContentEditable(event, el) {
    if (event.key === "i" && normal) {
      event.preventDefault();
      console.log("you're in insert mode");
      const range = window.getSelection().getRangeAt(0);
      range.setStart(range.startContainer, range.startOffset);
      range.setEnd(range.startContainer, range.startOffset);
      window.getSelection().addRange(range)
      normal = false;
    }
    else if (event.key === "`" && !normal) {
      event.preventDefault();
      console.log("you're back in normal mode")
      const range = window.getSelection().getRangeAt(0);
      range.setStart(range.startContainer, range.startOffset - 1);
      range.setEnd(range.startContainer, range.startOffset + 1);
      window.getSelection().addRange(range);
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
    else if (event.key === "w" && normal && !delmode){
      event.preventDefault();
      nextwordContentEditable();
  } else if (event.key === "a" && normal){
      event.preventDefault();
      const range = window.getSelection().getRangeAt(0);
      range.setStart(range.startContainer, range.startOffset + 1);
      range.setEnd(range.startContainer, range.startOffset);
      window.getSelection().addRange(range);
      normal = false;
  } else if (event.key === "b" && normal){
      event.preventDefault();
      gobackContentEditable();
  } else if (event.key === "0" && normal){
      event.preventDefault();
      zerocont();
  } else if (event.key === "A" && normal){
      event.preventDefault();
      capacont();
      normal = false;
  } else if (event.key === "x" && normal){
	  event.preventDefault();
	  delxcont();
  } else if (event.key === "d" && normal && !delmode) {
	  event.preventDefault();
	  delmode = true;
  } else if (event.key === "w" && normal && delmode){
	  event.preventDefault();
	  delwordcont();
  }
    else if (normal === true){
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
        range.setEnd(range.startContainer, range.startOffset + 1);
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
    if (range.startOffset + 1 === textLength) return;
    range.setStart(range.startContainer, range.startOffset + 1);
    range.setEnd(range.startContainer, range.startOffset + 1);
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
    let offset = Math.min(column, textNode.length); // Avoid going past the line's length
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset + 1);
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
    range.setEnd(textNode, offset + 1);
    selection.addRange(range);
  }
}

function nextwordContentEditable() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const linetext = getCurrentLineText();
  const currentTextAfterCaret = linetext.substring(range.startOffset);
  const nextSpaceIndex = currentTextAfterCaret.indexOf(" ");
  let nextwordpos = (nextSpaceIndex === -1) ? linetext.length : range.startOffset + nextSpaceIndex + 1;
  if (nextwordpos === linetext.length){
    --nextwordpos;
  }
  range.setStart(range.startContainer, nextwordpos);
  range.setEnd(range.startContainer, nextwordpos + 1);
  selection.addRange(range);
}

function gobackContentEditable() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const linetext = getCurrentLineText();
  const currentTextBeforeCaret = linetext.substring(0, range.startOffset);
  const lastSpaceIndex = currentTextBeforeCaret.lastIndexOf(" ");
  const newpos = (lastSpaceIndex === -1) ? 0 : lastSpaceIndex;
 
  range.setStart(range.startContainer, newpos - 1);
  range.setEnd(range.startContainer, newpos);
  selection.addRange(range);
}

function zerocont() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.setStart(range.startContainer,0);
  range.setEnd(range.startContainer,1);
  selection.addRange(range);
}

function capacont() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.setStart(range.startContainer, getCurrentLineText().length);
  range.setEnd(range.startContainer, getCurrentLineText().length);
  selection.addRange(range);
}

function delxcont() {
	const selection = window.getSelection();
	const range = selection.getRangeAt(0);
	const startoff = range.startOffset;
	range.deleteContents();
	range.setStart(range.startContainer, startoff);
	range.setEnd(range.startContainer, startoff + 1);
	selection.addRange(range);
}

function delwordcont() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const cpos = range.startOffset;
  const text = range.startContainer.textContent;
  const spaceindex = text.substring(cpos).indexOf(" ") + cpos;

  if (text.substring(cpos).indexOf(" ") !== -1){
  range.setStart(range.startContainer,cpos);
  range.setEnd(range.startContainer,spaceindex);
  range.deleteContents();}
  else {
  range.setStart(range.startContainer,cpos);
  range.setEnd(range.startContainer,getCurrentLineText().length);
  selection.addRange(range);
  range.deleteContents();
  }
  delmode = false;
}

function dellinecont() {
  
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



