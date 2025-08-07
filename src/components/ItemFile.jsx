import React from 'react'



const ItemFile = () => {
  return (
    <div>
      <h1>Subir File</h1>
      <input type="file" name='files' multiple />
      <br /><br />
      <a href="./PdfViewer" target="_blank" rel="noopener noreferrer">
        <button className="button">VER PDF</button>
      </a>
    </div>
  )
}

export default ItemFile
