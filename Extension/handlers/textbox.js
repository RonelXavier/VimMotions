
function handleTextbox(event, el) {
  if (event.key === "i" && normal) {
      event.preventDefault();
      console.log("You're in insert mode");
      normal = false;
  } else if (event.key === "`" && !normal){
      event.preventDefault();
      console.log("you're back in normal mode");
      normal = true;
  } else if (event.key === "h" && normal){
      event.preventDefault();
      movecursorleft(el);
  } else if (event.key === "l" && normal){
      event.preventDefault();
      movecursorright(el);
  } else if (event.key === "k" && normal){
      event.preventDefault();
      moveCursorUp(el);
  } else if (event.key === "a" && normal){
      event.preventDefault();
      append(el);
  } else if (event.key === "j" && normal){
      event.preventDefault();
      moveCursorDown(el);
  } else if (event.key === "w" && normal){
      event.preventDefault();
      nextword(el);
  } else if (event.key === "b" && normal){
      event.preventDefault();
      goback(el);
  } else if (event.key === "0" && normal){
      event.preventDefault();
      zero(el);
  } else if (event.key === "A"&& normal){
      event.preventDefault();
      capA(el);
      normal = false;
  } else if (normal === true){
    event.preventDefault();
  }
}

// keybind functions

function movecursorleft(input){
    const pos = input.selectionStart;
    if (pos > 0) {
            input.setSelectionRange(pos-1, pos-1);
        }
    input.focus();
}

function movecursorright(input){
    const pos = input.selectionStart;
          input.setSelectionRange(pos+1,pos+1);
    input.focus();
  }

function append(input){
    const pos = input.selectionStart;
    if (pos > 0) {
            input.setSelectionRange(pos+1, pos+1);
        }
    input.focus();
  normal = false;
}

function moveCursorUp(el) {
  const cpos = el.selectionStart;
  const textbeforecursor = el.value.substring(0,cpos);
  const lines = textbeforecursor.split("\n");
  if (lines.length <= 0) return;
  const cline = lines.length - 1;
  const column = lines[cline].length;
  const pline = lines.length - 2;
  const newpos = Math.min(cpos - lines[pline].length - 1, cpos - column - 1);
  el.setSelectionRange(newpos,newpos);
}

function moveCursorDown(el) { 
  const cpos = el.selectionStart;
  const textbeforecursor = el.value.substring(0, cpos);
  const column = cpos - textbeforecursor.lastIndexOf("\n");
  const textaftercursor = el.value.substring(cpos);
  const linesaftercursor = textaftercursor.split("\n");
  if (linesaftercursor.length <= 1) return; 
  const skiptext = textaftercursor.indexOf("\n");
  let newpos;
  if (linesaftercursor[1].length <= 0) {
    newpos = cpos + linesaftercursor[0].length + 1; // Move to next line
  } else {
    newpos = Math.min(cpos + linesaftercursor[0].length + linesaftercursor[1].length, cpos + skiptext + column);
  }
  el.setSelectionRange(newpos, newpos);
}




function nextword(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(cpos);
  
  let i = 0;
  while (i < text.length && /\s/.test(text[i])) {
    i++;
  }
  while (i < text.length && !/\s/.test(text[i])) {
    i++;
  }
  el.setSelectionRange(cpos + i, cpos + i);
}

function goback(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(0, cpos);
  if (!text) return;
  // Start walking backward
  let i = text.length - 1;
  // Skip trailing spaces (like Vim does)
  while (i > 0 && /\s/.test(text[i])) {
    i--;
  }
  // Then skip backward until you hit the start of a word
  while (i > 0 && !/\s/.test(text[i - 1])) {
    i--;
  }
  el.setSelectionRange(i, i);
}

function zero(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(0,cpos);
  const lines = text.split("\n");
  const newpos = cpos - lines[lines.length - 1].length;
  el.setSelectionRange(newpos,newpos);
}

function capA(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(cpos);
  const lines = text.split("\n")
  const newpos = cpos + lines[0].length;
  el.setSelectionRange(newpos,newpos);
}
