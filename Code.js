function doGet(e) {
    if (!e.parameter.page) {
        return HtmlService.createTemplateFromFile('index1').evaluate();
    }
    return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}

function getScriptUrl() {
    return ScriptApp.getService().getUrl();
}

const DB_SHEET_ID = '1z3T1CXLfBidPufJMKSA_vzuunPN5Yo1SAbrrdCDcTe4';
const DB_SHEET_NAME = '登録者一覧';

function inputSheet1(isloginID, isloginPASS, isname, isaddress, isphoneNumber, isschool) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME);
    const idValues = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    var value = {};
    let count = idValues.length;
    for (var i = 0; i <= count-1; i++ ) {
    value[i] = idValues[i]
    if ( value[i] == isloginID ) {
      throw new Error('IDが既に存在しています');
    }
  }
  
  let lastrow = sheet.getLastRow();
  sheet.getRange(lastrow + 1,1).setValue(isloginID);
  sheet.getRange(lastrow + 1,2).setValue(isloginPASS);
  sheet.getRange(lastrow + 1,3).setValue(isname);
  sheet.getRange(lastrow + 1,4).setValue(isaddress);
  sheet.getRange(lastrow + 1,5).setValue(isphoneNumber);
  sheet.getRange(lastrow + 1,6).setValue(isschool);
  return '登録が完了しました。';

}

function inputCheck(isloginID, isloginPASS) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME);

    const data1 = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    const hasID = data1.some(function(array, i, data1) {
        return (array[0] === isloginID);
      });
      console.log(hasID);
    
    const data2 = sheet.getRange(2, 2, sheet.getLastRow() - 1).getValues();
    const hasPASS = data2.some(function(array, i, data2) {
          return (array[0] === isloginPASS);
      });
      console.log(hasPASS);
    
    if ( hasID == false || hasPASS == false) {
        throw new Error('IDまたはパスワードが間違っています');
    }
    
}

