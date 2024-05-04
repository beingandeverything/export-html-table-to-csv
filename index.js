function addData(rowIndex, columnIndex, data, csvRowAndColumns) {
  if (!csvRowAndColumns[rowIndex]) csvRowAndColumns[rowIndex] = [];
  csvRowAndColumns[rowIndex][columnIndex] = data.replace(",", "");
}

export function downloadHtmlTableToCSV(
  tableIds = [],
  filename = "Exported CSV",
  exportUntilId = ""
) {
  const csvRowAndColumns = [];
  let completeProcessing = false;
  let rowIndex = 0;
  for (let index = 0; index < tableIds.length; index++) {
    const tableId = tableIds[index];
    const selector = `#${tableId} tr`;
    const rows = document.querySelectorAll(selector);
    for (
      let currentRowIndex = 0;
      currentRowIndex < rows.length;
      currentRowIndex++
    ) {
      const row = rows[currentRowIndex];
      if (!row) continue;
      const cells = row.querySelectorAll("td, th");
      let columnIndex = 0;
      cells.forEach((cell) => {
        const rowspan = parseInt(cell.getAttribute("rowspan") || "1");
        const colspan = parseInt(cell.getAttribute("colspan") || "1");
        const data = cell.textContent;
        for (let j = 0; j < rowspan; j++) {
          while (csvRowAndColumns?.[rowIndex]?.[columnIndex] === "") {
            columnIndex++;
          }
          if (j === 0) addData(rowIndex, columnIndex, data, csvRowAndColumns);
          else addData(rowIndex + j, columnIndex, "", csvRowAndColumns);
        }
        for (let j = 0; j < colspan; j++) {
          if (j === 0) addData(rowIndex, columnIndex, data, csvRowAndColumns);
          else {
            addData(rowIndex, columnIndex, "", csvRowAndColumns);
          }
          columnIndex++;
        }
      });
      if (exportUntilId && row.id === exportUntilId) {
        completeProcessing = true;
        break;
      }
      rowIndex++;
    }

    rowIndex = rowIndex + 5;
    if (completeProcessing) break;
  }
  // Convert the rows to CSV format
  const csvContent = csvRowAndColumns
    .map((column) => column.join(","))
    .join("\n");

  // Trigger the download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".csv";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
