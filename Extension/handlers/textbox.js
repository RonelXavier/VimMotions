
function handleTextbox(event, el) {
  if (event.key === "i" && normal) {
      event.preventDefault();
      console.log("You're in insert mode");
      switchin(el);
      normal = false;
  } else if (event.key === "`" && !normal){
      event.preventDefault();
      console.log("you're back in normal mode");
      switchnorm(el);
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
  } else if (event.key === "w" && normal && !delmode){
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
  } else if (event.key === "x" && normal){
	  event.preventDefault();
	  delx(el);
  } else if (event.key === "d" && normal && !delmode){
	  event.preventDefault();
	  delmode = true;
  } else if (event.key === "w" && normal && delmode){
	  event.preventDefault();
	  delword(el);
	  delmode = false;
  } else if (event.key === "d" && normal && delmode){
	  event.preventDefault();
	  delline(el);
  } else if (event.key === "g" && normal && !gmode){
	  event.preventDefault();
	  gmode = true;
  } else if (event.key === "g" && normal && gmode){
	  event.preventDefault();
	  jumptop(el);
  } else if (event.key === "G" && normal){
	  event.preventDefault();
	  jumpend(el);
  } else if (normal === true){
    event.preventDefault();
  }
}

// keybind functions
function switchnorm(input){
  const start = input.selectionStart;
  input.setSelectionRange(start-1, start);
}

function switchin(input){
  const start = input.selectionStart;
  input.setSelectionRange(start,start);
}

function movecursorleft(input){
    const pos = input.selectionStart;
    if (pos > 0) {
            input.setSelectionRange(pos-1, pos);
        }
    input.focus();
}

function movecursorright(input) {
  const start = input.selectionStart;
  const end = input.selectionEnd;

  if (end < input.value.length) {
    if (start !== end){
    input.setSelectionRange(start + 1, end + 1);
    }
    else {
      input.setSelectionRange(start + 1, end + 2);
    }
  }

  input.focus();
}


function append(input){
    const pos = input.selectionStart;
    const cline = input.value.substring(pos).split("\n")[0].length + pos;
  if (pos > 0) {
            input.setSelectionRange(pos + 1, pos+1);
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
  el.setSelectionRange(newpos,newpos+1);
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
  el.setSelectionRange(newpos, newpos+1);
}




function nextword(el) {
  const cpos = el.selectionEnd;
  const text = el.value.substring(cpos);
  
  let i = 0;
  while (i < text.length && /\s/.test(text[i])) {
    i++;
  }
  while (i < text.length && !/\s/.test(text[i])) {
    i++;
  }
  el.setSelectionRange(cpos + i - 1, cpos + i);
}

function goback(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(0, cpos);
  if (!text) return;
  let i = text.length - 1;
  while (i > 0 && /\s/.test(text[i])) {
    i--;
  }
  while (i > 0 && !/\s/.test(text[i - 1])) {
    i--;
  }
  el.setSelectionRange(i, i + 1);
}

function zero(el) {
  const cpos = el.selectionStart;
  console.log(el.value);
  const text = el.value.substring(0,cpos);
  const lines = text.split("\n");
  const newpos = cpos - lines[lines.length - 1].length;
  el.setSelectionRange(newpos,newpos+1);
}

function capA(el) {
  const cpos = el.selectionStart;
  const text = el.value.substring(cpos);
  const lines = text.split("\n")
  const newpos = cpos + lines[0].length;
  el.setSelectionRange(newpos,newpos);
}

function delx(el) {
  const cpos = el.selectionStart;
  el.value = el.value.substring(0,el.selectionStart) + el.value.substring(el.selectionEnd);
  el.setSelectionRange(cpos, cpos + 1);
}

function delword(el) {
  const cpos = el.selectionStart;
  const spaceIndex = el.value.substring(cpos).indexOf(" ");
  if (spaceIndex !== -1) {
    el.value = el.value.substring(0,cpos) + el.value.substring(cpos + spaceIndex);
  }
  else {
    el.value = el.value.substring(0,cpos);
  }
  el.setSelectionRange(cpos - 1, cpos);
  delmode = false;
}

function delline(el){
  const cpos = el.selectionStart;
  let before = el.value.substring(0,cpos).lastIndexOf("\n");
  let after = el.value.substring(cpos).indexOf("\n");
  if (after === -1){
  after = el.value.length
  }
  if (before === -1){
  before = 0
  }
  el.value = el.value.substring(0,before) + el.value.substring(cpos + after);
  delmode = false;
  el.setSelectionRange(before - 1,before);
}

function jumptop(el){
  el.setSelectionRange(0,1);
  gmode = false;
}

function jumpend(el){
  el.setSelectionRange(el.value.length - 1, el.value.length);
}
