const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;t.addEventListener("click",(()=>{a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.setAttribute("disabled","disabled")}),1e3)})),e.addEventListener("click",(()=>{clearInterval(a),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.51e614b7.js.map
