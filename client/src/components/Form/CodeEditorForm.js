import React, { useEffect, useState } from 'react'

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
const CodeEditorForm = ({ post, postData, setPostData }) => {

    const classes = useStyles()
    const [htmlCode, setHtmlCode] = useState((post) ? post.htmlCode : '');
    const [cssCode, setCssCode] = useState((post) ? post.cssCode : '');
    const [backendCode, setBackendCode] = useState((post) ? post.backendCode : '');


    const onChangeHTML = (newValue) => {
        console.log(newValue);
        setHtmlCode(newValue.toString());
        setPostData({ ...postData, htmlCode: newValue.toString() });
    }

    const onChangeCSS = (newValue) => {
        console.log(newValue);
        setCssCode(newValue.toString())
        setPostData({ ...postData, cssCode: newValue.toString() });

    }

    const onChangeBACKEND = (newValue) => {
        console.log(newValue);
        setBackendCode(newValue.toString())
        setPostData({ ...postData, backendCode: newValue.toString() });
    }

    function onLoadCode(editor) {


        const editorMode = editor.getSession().getMode().$id;
        console.log(editorMode);
        if (editorMode === "ace/mode/html") {
            // log
            editor.setValue(htmlCode);
        }
        else if (editorMode === "ace/mode/css") {
            editor.setValue(cssCode)
        }
        else if (editorMode === "ace/mode/javascript") {
            editor.setValue(backendCode)
        }
    }


    const editorOptions = {
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        readOnly: false,
        highlightActiveLine: true,
        showGutter: true,
        showPrintMargin: true,
        fontSize: 14,
    };


    return (
        <div className={`${classes.codeContainer} ${classes.flex}`}>

            <div className={`${classes.editorContent} ${classes.flex}`}>
                <p className={`${classes.editorName}`}>
                    HTML
                </p>
                <AceEditor
                    // name={`${post._id}`}
                    name="htmlCode"
                    placeholder=''
                    mode="html"
                    // value={this.editor.onLoad}
                    defaultValue=''
                    height='300px'
                    width='350px'
                    theme="monokai"
                    // style={editorStyle}
                    onLoad={onLoadCode}
                    onChange={onChangeHTML}

                    editorProps={{ $blockScrolling: true }}
                    setOptions={editorOptions}
                />
            </div>

            <div className={`${classes.editorContent} ${classes.flex}`}>
                <p className={`${classes.editorName}`}>
                    CSS
                </p>
                <AceEditor
                    name="cssCode"
                    placeholder=''
                    mode="css"
                    theme="monokai"
                    // value={this.editor.onLoad}
                    defaultValue=''
                    height='300px'
                    width='350px'
                    // style={editorStyle}
                    onLoad={onLoadCode}
                    onChange={onChangeCSS}

                    editorProps={{ $blockScrolling: true }}
                    setOptions={editorOptions}
                />
            </div>

            <div className={`${classes.editorContent} ${classes.flex}`}>
                <p className={`${classes.editorName}`}>
                    Javascript
                </p>
                <AceEditor
                    name="backendCode"
                    placeholder=''
                    mode="javascript"
                    theme="monokai"
                    // value={this.editor.onLoad}
                    defaultValue=''
                    height='300px'
                    width='350px'
                    // style={editorStyle}
                    onLoad={onLoadCode}
                    onChange={onChangeBACKEND}

                    editorProps={{ $blockScrolling: true }}
                    setOptions={editorOptions}
                />
            </div>


        </div >
    )
}

export default CodeEditorForm