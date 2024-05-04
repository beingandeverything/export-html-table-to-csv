# export-html-table-to-csv

This is fast and lightweight module to export single or multiple html tables as it is to csv.

### Features

- Fast and lightweight
- Can export single or multiple html tables at once to single csv file.
- Can export part only part of the html table.

## Installation

### **NPM**

You can install export-html-table-to-csv as a dependency using NPM.

```bash
$ npm install export-html-table-to-csv --save
```

### **Yarn**

You can install export-html-table-to-csv as a dependency using Yarn.

```bash
$ yarn add export-html-table-to-csv
```

### Usage

```js
import { downloadHtmlTableToCSV } from "export-html-table-to-csv";

try {
  const tableIds = ["#tableId1"];
  const filename = "NewCsvFileName";
  const exportUntilRowId = "";
  downloadHtmlTableToCSV(tableIds, filename, exportUntilRowId);
} catch (err) {
  console.error(err);
}
```

#### Parameters

- tableIds (string[]): Provide multiple ids if you want to export multiple html table at once else provide one id in array
- filename (string): The desired filename for the exported CSV file.
- exportUntilRowId: If you only want to export table until certain row then provide its id else leave it empty to download full table
