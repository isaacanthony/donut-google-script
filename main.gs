/**
 * Simple Google Script to email Donut coffee-chat
 * pairings on a schedule. You will have to grant
 * this script Spreadsheet#read and Email#send
 * privileges.
 */

/**
 * Google Sheet ID of assignment pairings.
 * Three required columns with no header (order matters!):
 *   1. date: Date of assignment.
 *   2. email1: Email of first person in pairing.
 *   3. email2: Email of second person in pairing.
 */
const ASSIGNMENT_SHEET_ID = 'PLACEHOLDER';

/**
 * Main entrypoint. This function can be placed on a bi-weekly
 * timer to send at e.g. 9am ET every other Monday.
 */
function main() {
  let today = new Date().toLocaleDateString();

  let data = SpreadsheetApp
    .openById(ASSIGNMENT_SHEET_ID)
    .getActiveSheet()
    .getDataRange()
    .getValues();

  data.forEach((row) => {
    if (row[0].toLocaleDateString() == today) {
      Logger.log(row);

      MailApp.sendEmail(
        row.slice(1, 3).join(','),
        `${today} Donut Pairing`,
        'Hi! Welcome to your new Donut Pairing. ' +
        'Please schedule time to chat when you can.'
      );
    }
  });
}
