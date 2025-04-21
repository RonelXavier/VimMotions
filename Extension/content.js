let normal = false;
let delmode = false;
document.addEventListener("keydown", (event) => {
    const el = document.activeElement;
    if (!el) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
      handleTextbox(event, el);
    }
    else if (el.isContentEditable){
      handleContentEditable(event, el);
    }
}, true)
