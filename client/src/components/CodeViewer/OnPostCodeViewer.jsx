import React from 'react'

import { generatePreviewDocument } from './GeneratePreviewDocument.js'
import Code from './Code.jsx'

import useStyles from './styles.js'

const OnPostCodeViewer = ({ htmlCode, cssCode, openPostDetails }) => {

  const classes = useStyles()



  return (
    <div className={`${classes.onpost_code_viewer} ${classes.flex}`}>

      <button className={`${classes.buttonOverride}`} onClick={() => openPostDetails()} />

      {
        (htmlCode !== null && cssCode !== null) &&

        <Code generatePreviewDocument={generatePreviewDocument(htmlCode, cssCode)} />
      }
    </div>
  )
}



export default OnPostCodeViewer