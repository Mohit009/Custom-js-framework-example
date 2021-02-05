import { initializeFw, setState, setOnChange } from "./framework";

function Application() {
  const setHelloWord = setState("helloWord", "Hello Word");
  setTimeout(() => setHelloWord("Hello World Async ... "), 3000);
  setTimeout(() => setHelloWord("Hello World"), 6000);
  const setInputWord = setState("inputHelloWord", "");

  setOnChange("onChange", (e: Event | undefined) => {
    setInputWord(e.target.value + new Date());
  });

  return `
  <h1>Hello Custom Fw</h1>
  <div data-mo-bind="helloWord">
  </div>
  <label>Dynamically bind Input: </label>
  <input 
    type="text" 
    value="" 
    data-mo-onChange="onChange"
   ></input>
   <br/>
   Display Value: 
   <div data-mo-bind="inputHelloWord"></div>
  `;
}

initializeFw(document.getElementById("app") as HTMLElement, Application);
