import React, { useState } from 'react'

// ACE IMPORTS
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/ext-language_tools"

// PRETTIER - ORGANIZADOR DE CODIGOS
import prettier from 'prettier/standalone';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import babelParser from 'prettier/parser-babel';



import useStyles from './styles.js'
const CodeEditorForm = ({ postData, setPostData }) => {

    const classes = useStyles()
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [backendCode, setBackendCode] = useState('');


    function onChangeHTML(newValue) {
        console.log(newValue);

        setHtmlCode(newValue.toString());
        setPostData({ ...postData, htmlCode: newValue.toString() });

    }

    function onChangeCSS(newValue) {
        console.log(newValue);

        setCssCode(newValue.toString())
        setPostData({ ...postData, cssCode: newValue.toString() });

    }

    function onChangeBACKEND(newValue) {
        console.log(newValue);

        setBackendCode(newValue.toString())
        setPostData({ ...postData, backendCode: newValue.toString() });

    }



    function onLoad(code) {
        let codeString = ''
        let pluginParser = ''
        let _code = ''

        if (code === "html") {
            // console.log(htmlCode);
            _code = 'html'
            codeString = htmlCode
            pluginParser = htmlParser
        }
        else if (code === "css") {
            _code = 'css'
            codeString = cssCode
            pluginParser = cssParser
        }
        else if (code === "javascript") {
            _code = 'babel'
            codeString = backendCode
            pluginParser = babelParser
        }

        let formattedCodeString = prettier.format(codeString, {
            parser: _code,
            plugins: [pluginParser],
        });

        return formattedCodeString
    }

    const EditorContent = ({ code, codeValue, onChangeCode }) => {
        // {console.log(onChangeCode )}
        return (
            <div className={`${classes.editorContent} ${classes.flex}`}>

                <p className={`${classes.editorName}`}>
                    {code}
                </p>
                <AceEditor
                    // name={`${post._id}`}
                    name="UNIQUE_ID"
                    placeholder=''
                    mode={code}
                    theme="monokai"
                    value={onLoad(code)}
                    defaultValue=''
                    height='300px'
                    width='350px'
                    // style={editorStyle}
                    fontSize={14}
                    showGutter={true}
                    showPrintMargin={true}
                    highlightActiveLine={true}
                    readOnly={false}
                    // onLoad={() => onLoad(code)}
                    // onBeforeLoad={onLoad(code)}

                    onChange={onChangeCode}

                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        // ativa o modo de análise sintática do editor
                        useWorker: false,
                        // ativa a quebra automática de linhas
                        wrapEnabled: true,
                        autoScrollEditorIntoView: true,
                        copyWithEmptySelection: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        )
    }

    return (
        <div className={`${classes.codeContainer} ${classes.flex}`}>

            <EditorContent code={"html"} codeValue={htmlCode} onChangeCode={onChangeHTML} />

            <EditorContent code={"css"} codeValue={cssCode} onChangeCode={onChangeCSS} />

            <EditorContent code={"javascript"} codeValue={backendCode} onChangeCode={onChangeBACKEND} />

        </div >
    )
}

export default CodeEditorForm