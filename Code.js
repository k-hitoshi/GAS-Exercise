function doGet(e) {

    if (!e.parameter.page) {
        return HtmlService.createTemplateFromFile('index1').evaluate();
    }

    let id = e.parameter.id;
    let enumber = e.parameter.enumber;

    let t = HtmlService.createTemplateFromFile(e.parameter.page);
    t.id = id;
    t.enumber = enumber;
    return t.evaluate();

}


function getScriptUrl() {
    return ScriptApp.getService().getUrl();
}


const DB_SHEET_ID = '1z3T1CXLfBidPufJMKSA_vzuunPN5Yo1SAbrrdCDcTe4';
const DB_SHEET_NAME1 = '登録者一覧';
const DB_SHEET_NAME2 = 'イベント一覧';
const DB_SHEET_NAME3 = 'イベント申込状況一覧';


function inputSheet(signID, signPASS, signName, signAddress, signPhoneNumber, signSchool) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME1);
    const idValues = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    let value = {};
    let count = idValues.length;
    for (let i = 0; i <= count - 1; i++) {
        value[i] = idValues[i]
        if (value[i] == signID) {
            throw new Error('IDが既に存在しています');
        }
    }

    let lastrow = sheet.getLastRow();
    sheet.getRange(lastrow + 1, 1).setValue(signID);
    sheet.getRange(lastrow + 1, 2).setValue(signPASS);
    sheet.getRange(lastrow + 1, 3).setValue(signName);
    sheet.getRange(lastrow + 1, 4).setValue(signAddress);
    sheet.getRange(lastrow + 1, 5).setValue(signPhoneNumber);
    sheet.getRange(lastrow + 1, 6).setValue(signSchool);
    return '登録が完了しました。';

}


function inputCheck(isloginID, isloginPASS) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME1);

    const data1 = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    const hasID = data1.some(function (array, i, data1) {
        return (array[0] === isloginID);
    });

    const data2 = sheet.getRange(2, 2, sheet.getLastRow() - 1).getValues();
    const hasPASS = data2.some(function (array, i, data2) {
        return (array[0] === isloginPASS);
    });

    if (hasID == false || hasPASS == false) {
        throw new Error('IDまたはパスワードが間違っています');
    }
    return
}


function getData1() {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME2);
    let values = sheet.getDataRange().getValues();
    values.shift();
    return values;
}


//◆◆◆◆◆◆◆
function inputSheet2(event, n, id) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME2);

    //ID無しの場合は配列でpush
    var row = [];

    //ID列取得
    const idValues = sheet.getRange('A3:A').getValues();
    const hasID = idValues.some(function (array, i, data1) {
        return (array[0] === id);
    });

    //id無しはキャンセル無し
    if (hasID == false) {
        row.push(id);
        if (event === 'exp' && n === 1) {
            row.push('〇');
            sheet.appendRow(row);
        } else if (event === 'inf' && n === 1) {
            row.push('', '〇');
            sheet.appendRow(row);
        } else if (event === 'tes' && n === 1) {
            row.push('', '', '〇');
            sheet.appendRow(row);
        }
    }

    //id有り exp
    if (hasID == true) {
        let key = id;
        let col = 'A';
        let row = getRow(key, col, sheet);
        if (event === 'exp' && n === 1) {
            sheet.getRange(row, 2).setValue('〇');
        } else if (event === 'exp' && n === 1) {
            sheet.getRange(row, 2).setValue('');
        }
    }
}


//inputSheet2　からの呼出
function get_row(key, col, sheet) {
    let array = get_array(sheet, col);
    var row = array.indexOf(key) + 1;
    return row;
}


function get_array(sheet, col) {
    var last_row = sheet.getLastRow();
    var range = sheet.getRange(col + "1:" + col + last_row)
    var values = range.getValues();
    var array = [];
    for (var i = 0; i < values.length; i++) {
        array.push(values[i][0]);
    }
    return array;
}

