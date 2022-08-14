import React, { useState, useEffect } from "react";
import useLocalStorage from "./hook/UseLocalStorage";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { initCss, initJs, initHtml } from "./Modules";
import { useRef } from "react";

export default function App() {
  const [Html, setHtml] = useLocalStorage("html", initHtml);
  const [Css, setCss] = useLocalStorage("css", initCss);
  const [Js, setJs] = useLocalStorage("js", initJs);
  const [srcDoc, setSrcDoc] = useState("");
  const [gradient, setgradient] = useState("");
  const [theme, setTheme] = useLocalStorage("theme", true);
  const [Dynamicolor, setDynamicolor] = useLocalStorage("dynamiccolor", "");
  const [holeThemes, setholeThemes] = useLocalStorage("holeTheme", true);

  const inputcolor = useRef("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${Html}</body>
          <style>${Css}</style>
          <script>${Js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [Html, Css, Js]);

  const onChangeJs = (value, viewUpdate) => {
    setJs(value);
  };
  const onChangehtml = (value, viewUpdate) => {
    setHtml(value);
  };
  const onChangecss = (value, viewUpdate) => {
    setCss(value);
  };

  const themeChanger = () => {
    setTheme(!theme);
    setholeThemes(!holeThemes);
    setDynamicolor("");
  };

  const GradientChanger = () => {
    setgradient(!gradient);
  };
  const onchangeColor = (e) => {
    setDynamicolor(e.target.value);
  };

  const dynamo = `
    .dynamo {
      --dark: ${Dynamicolor};
  }`;

  return (
    <>
      <style>{dynamo}</style>
      <div
        className={
          holeThemes === true && Dynamicolor === ""
            ? "dark"
            : holeThemes === false && Dynamicolor === ""
            ? "light"
            : "dynamo"
        }
      >
        <div className="pane top-pane">
          <header>
            <h1 aria-label="theme-btn" className={gradient ? "gradient" : ""}>
              <i
                style={{ marginRight: "10px" }}
                className="fa-solid fa-code"
              ></i>
              Live Code Editor
            </h1>
            <div style={{ display: "flex" }}>
              <input
                onChange={onchangeColor}
                // onInput={onchangeColor}
                ref={inputcolor}
                className="color-input"
                type="color"
                style={{ marginRight: "15px" }}
              />
              <button
                onDoubleClick={GradientChanger}
                onClick={themeChanger}
                className={gradient ? "gradient" : ""}
              >
                {holeThemes ? (
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
            </div>
          </header>
          <div className="editor-main">
            <div className="editor-container">
              <span className="head_custom" style={{ margin: 0 }}>
                <i
                  className={`fa-brands fa-html5 ${gradient ? "gradient" : ""}`}
                ></i>
              </span>
              <CodeMirror
                value={Html}
                height="200px"
                extensions={[html()]}
                onChange={onChangehtml}
                theme={theme ? githubDark : githubLight}
              />
            </div>
            <div className="editor-container">
              <span className="head_custom " style={{ margin: 0 }}>
                <i
                  className={`fa-brands fa-css3 ${gradient ? "gradient" : ""}`}
                ></i>
              </span>
              <CodeMirror
                value={Css}
                height="200px"
                extensions={[css()]}
                onChange={onChangecss}
                theme={theme ? githubDark : githubLight}
              />
            </div>
            <div className="editor-container">
              <span className="head_custom last" style={{ margin: 0 }}>
                <i
                  className={`fa-brands fa-js ${gradient ? "gradient" : ""}`}
                ></i>
              </span>
              <CodeMirror
                value={Js}
                height="200px"
                extensions={[javascript()]}
                onChange={onChangeJs}
                theme={theme ? githubDark : githubLight}
              />
            </div>
          </div>
        </div>
        <div className="pane frame">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="1"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
}
