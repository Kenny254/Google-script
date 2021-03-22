function appendSignatureRow(e){
  
  //Since there could be a bunch of people submitting, we lock the script with each execution
  //with a 30 second timeout so nothing gets overwritten
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  //Here we read the variables from the form submission event
  const date = new Date(e.values[0]).toLocaleDateString();
  //of you can use toLocaleString method if you want the time in the doc
  const name = e.values[1];
  const department = e.values[2];

  //Next format those values as an array that corresponds to the table row layout
  //in your Google Doc
  const tableCells = [name, name, department, date]
  
  //Next we open the letter and get its body
  const letter = DocumentApp.openById('YOUR_DOC_ID_HERE')
  const body = letter.getBody();
  
  //Next we get the first table in the doc and append an empty table row
  const table = body.getTables()[0]
  const tableRow = table.appendTableRow()

  //Here we loop through our table cells from above and add
  // a table cell to the table row for each piece of data
  tableCells.forEach(function(cell, index){
    let appendedCell = tableRow.appendTableCell(cell)
  })
  
  //Once we've appended the table cells, we can format the font of the 
  //signature to look more legit
  const style = {}
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Yellowtail';
  const signatureCell = tableRow.getChild(0).asTableCell()
  signatureCell.setAttributes(style)
  
  //here we save and close our letter and then release a lock 
  letter.saveAndClose();  
  lock.releaseLock();
}
