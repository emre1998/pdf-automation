const XLSX = require('xlsx');

function readCells(workbook, sheetName, cellAddresses) {
  const sheet = workbook.Sheets[sheetName];
  let cellValues = [];

  cellAddresses.forEach(address => {
    const cell = sheet[address];
    if (cell) {
      if (cell.t === 'n' && cell.z && XLSX.SSF.is_date(cell.z)) {
        const date = XLSX.SSF.parse_date_code(cell.v);
        cellValues.push(formatDate(new Date(Date.UTC(date.y, date.m - 1, date.d, date.H, date.M, date.S))));
      } else {
        cellValues.push(cell.w || cell.v);
      }
    } else {
      cellValues.push(null);
    }
  });

  return cellValues;
}

function formatDate(date) {
  const day = ('0' + date.getUTCDate()).slice(-2);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}

const workbook = XLSX.readFile('test.xlsx');
const sheetName = workbook.SheetNames[0];

const cellAddresses = ['A6','E6','F6','G6','H7','H8','L7','M7','L8','M8'];
let cellValues = readCells(workbook, sheetName, cellAddresses);

console.log(cellValues);

async function postData(url, requestData) {
  const { default: fetch } = await import('node-fetch');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'kizilatesemrecan@gmail.com_3y6C627YfV992iOE63qzv3s9Xg9wEtGIpD13o9k0J7HVB8JTLmrfqefFeZt8q7A7' 
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Hata:', error);
  }
}


const requestData = {
  url: "filetoken://a1730a307a23da89e24a5b8c2e7f3369a4834e77bf44c1707f",
  searchStrings: ["ŞİRKET ADI( D kolonu)", "Seren Hanım (E ve F kolonu)", "A kolunu", "G Kolonu", "M kolunu L kolu"],
  replaceStrings: [cellValues[1], cellValues[2] + ' ' + cellValues[3], cellValues[0], cellValues[4] + ' VE ' + cellValues[5], cellValues[6] + ' ' + cellValues[7] + ' VE' + cellValues[8] + ' ' + cellValues[9]],
  caseSensitive: true,
  replacementLimit: 1,
  pages: "",
  password: "",
  name: "TEKLIF",
};

postData('https://api.pdf.co/v1/pdf/edit/replace-text', requestData);

































