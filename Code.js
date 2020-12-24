function doGet(e) {
  //◆◆対応中 !e.parameter.page 頁指定無しは index1.html 呼出。以外は page 付きで html 呼出
  /*
    if (!e.parameter.page) {
        return HtmlService.createTemplateFromFile('index1').evaluate();
    }
    return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
  */
  
    if (!e.parameter.page) {
        return HtmlService.createTemplateFromFile('index1').evaluate();
    }
    return HtmlService.createTemplateFromFile(e.parameter['uname','enumber','page']).evaluate();
}

function getScriptUrl() {
    return ScriptApp.getService().getUrl();
}

const DB_SHEET_ID = '1z3T1CXLfBidPufJMKSA_vzuunPN5Yo1SAbrrdCDcTe4';
const DB_SHEET_NAME = '登録者一覧';
const DB_SHEET_NAME2 = 'イベント一覧';

function inputSheet(signID, signPASS, signName, signAddress, signPhoneNumber, signSchool) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME);
    const idValues = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    let value = {};
    let count = idValues.length;
    for (let i = 0; i <= count-1; i++ ) {
    value[i] = idValues[i]
    if ( value[i] == signID ) {
      throw new Error('IDが既に存在しています');
    }
  }
  
  let lastrow = sheet.getLastRow();
  sheet.getRange(lastrow + 1,1).setValue(signID);
  sheet.getRange(lastrow + 1,2).setValue(signPASS);
  sheet.getRange(lastrow + 1,3).setValue(signName);
  sheet.getRange(lastrow + 1,4).setValue(signAddress);
  sheet.getRange(lastrow + 1,5).setValue(signPhoneNumber);
  sheet.getRange(lastrow + 1,6).setValue(signSchool);
  return '登録が完了しました。';

}

function inputCheck(isloginID, isloginPASS) {
    const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME);

    const data1 = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    const hasID = data1.some(function(array, i, data1) {
        return (array[0] === isloginID);
      });
    
    const data2 = sheet.getRange(2, 2, sheet.getLastRow() - 1).getValues();
    const hasPASS = data2.some(function(array, i, data2) {
          return (array[0] === isloginPASS);
      });
    
    if ( hasID == false || hasPASS == false) {
        throw new Error('IDまたはパスワードが間違っています');
    }
    
  //◆対応中
  
  return isloginID;
  
  //◆◆対応中
}

function getData() {
  const sheet = SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName(DB_SHEET_NAME2);
  let values = sheet.getDataRange().getValues();
  values.shift();
  return values;
}

