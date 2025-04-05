
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
  const textaftercursor = el.value.substring(cpos);
  const linesaftercursor = textaftercursor.split("\n");
  const newpos = el.selectionStart + textaftercursor.indexOf(" ") + 1;
  const altpos = linesaftercursor[0].length + cpos
  if (!linesaftercursor[0].includes(" ")){
    el.setSelectionRange(altpos, altpos)
  } else {
    el.setSelectionRange(newpos,newpos);}
}


