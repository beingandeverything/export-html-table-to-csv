declare module "export-html-table-to-csv" {
  /**
   * @param {*} tableIds Provide multiple ids if you want to export multiple html table at once else provide one id in array
   * @param {*} filename The desired filename for the exported CSV file.
   * @param {*} exportUntilId If you only want to export table until certain row then provide its id else leave it empty to download full table
   */
  export function downloadHtmlTableToCSV(
    tableIds: string[],
    filename?: string,
    exportUntilRowId?: string
  ): void;
}
