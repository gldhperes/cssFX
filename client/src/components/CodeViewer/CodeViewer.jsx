import React from 'react'

import { generatePreviewDocument } from './GeneratePreviewDocument.js';
import useStyles from './styles.js'
import Code from './Code.jsx';

const CodeViewer = ({ htmlCode, cssCode }) => {

  const classes = useStyles()


  return (
    <div id="code_viewer" className={`${classes.code_viewer} ${classes.flex}`} >

      {
        (htmlCode !== null && cssCode !== null) &&
        <Code generatePreviewDocument={generatePreviewDocument(htmlCode, cssCode)} />
      }

    </div>
  )
}



export default CodeViewer