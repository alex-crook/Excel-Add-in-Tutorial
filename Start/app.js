/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';

(function () {

	Office.onReady()
		    .then(function() {
		        $(document).ready(function () {

            // TODO1: Determine if the user's version of Office supports all the
            //        Office.js APIs that are used in the tutorial.

                      if (!Office.context.requirements.isSetSupported('ExcelApi', 1.7)) {
                          console.log('Sorry. The tutorial add-in uses Excel.js APIs that are not available in your version of Office.');
                      }              

            // TODO2: Assign event handlers and other initialization logic.

                      $('#create-table').click(createTable);

        });
    });

    // TODO3: Add handlers and business logic functions here.
    function createTable() {
        Excel.run(function (context) {

            // TODO4: Queue table creation logic here.
            var currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
            var expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
            expensesTable.name = "ExpensesTable";

            // TODO5: Queue commands to populate the table with data.
            expensesTable.getHeaderRowRange().values =
                [["Date", "Merchant", "Category", "Amount"]];

            expensesTable.rows.add(null /*add at the end*/, [
                ["1/1/2017", "The Phone Company", "Communications", "120"],
                ["1/2/2017", "Northwind Electric Cars", "Transportation", "142.33"],
                ["1/5/2017", "Best For You Organics Company", "Groceries", "27.9"],
                ["1/10/2017", "Coho Vineyard", "Restaurant", "33"],
                ["1/11/2017", "Bellows College", "Education", "350.1"],
                ["1/15/2017", "Trey Research", "Other", "135"],
                ["1/15/2017", "Best For You Organics Company", "Groceries", "97.88"]
            ]);

            // TODO6: Queue commands to format the table.
            expensesTable.columns.getItemAt(3).getRange().numberFormat = [['�#,##0.00']];
            expensesTable.getRange().format.autofitColumns();
            expensesTable.getRange().format.autofitRows();

            return context.sync();
        })
            .catch(function (error) {
                console.log("Error: " + error);
                if (error instanceof OfficeExtension.Error) {
                    console.log("Debug info: " + JSON.stringify(error.debugInfo));
                }
            });
    }

})();