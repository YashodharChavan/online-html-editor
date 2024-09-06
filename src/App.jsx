import { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "./App.css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";


function App() {
  const [input, setInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const output = useRef();
  const [editorTheme, setEditorTheme] = useState("github");

  const configIsChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setEditorTheme(isChecked ? "monokai" : "github");
    document.body.style.backgroundColor = isChecked? "#272822" : "white";
    output.current.style.backgroundColor = !isChecked? "white" : "#FFFFCC";
  }, [isChecked])

  const handleClick = () => {
    output.current.innerHTML = input;
    output.current.style.border = "1px solid black";
    output.current.style.borderRadius = "4px";
  };

  return (
    <>
      <div className="outer h-[560px] flex sm:flex-row flex-col">
        <div className="left w-full sm:w-1/2 h-full">
          <AceEditor
            mode="html"
            theme={editorTheme} 
            name="code-editor"
            fontSize={16}
            width="100%"
            height="100%"
            value={input}
            onChange={(value) => setInput(value)}
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false }} 
          />
        </div>

        <div className="right w-full sm:w-1/2 h-full" ref={output}>
          <div className="output border border-black rounded p-2 w-full h-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-9">
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            onChange={configIsChecked}
            checked={isChecked}
            id="toggle"
          />
          <label htmlFor="toggle" className="slider absolute cursor-pointer left-[10px] right-0 top-[596px] bottom-[10px] bg-[#ccc] duration-300 rounded-full w-[60px] h-[34px]"></label>
        </div>
      <button
          onClick={handleClick}
          className="bg-blue-400 rounded cursor-pointer px-8 py-2"
        >
          Glance
      </button>
      </div>
    </>
  );
}

export default App;
