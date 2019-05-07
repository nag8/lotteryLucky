/** 最大値 */
var maxNum = 999;


function doAllDays() {
  var num = Browser.inputBox("何日じっこうしますか？");
  for(var i = 0; i < num; i++){
    main();
  }
}

/*
  概要：抽選メイン処理
  備考：
*/
function main() {
  //　現在表示されているスプレッドシートを取得
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 累計ラッキー数を取得
  const numLucky =　getColumnList(sheet, 2);
  
  // 対象位置に移動
  moveInitCell(sheet);
  
  // 抽選
  doLottery(sheet, numLucky);

  // ステータスを完了に設定  
  sheet.getActiveCell().offset(-1, 0).setValue('完了');

}

/*
  概要：対象列を取得
  備考：
*/
function getColumnList(sheet, num) {
  
  // 列すべてを取得
  return sheet.getRange(3, num, sheet.getLastRow() - 2, 1).getValues();
}

/*
  概要：初期位置に移動
  備考：
*/
function moveInitCell(sheet) {
  
  // 状況行の情報を取得
  const statusList = sheet.getRange("2:2").getValues()[0];
  
  for(var i = 0; i < statusList.length; i++){

    if(statusList[i] === ''){

      sheet.getRange(3, i + 1).activate();
      break;
    }
  }  
}

/*
  概要：抽選処理
  備考：
*/
function doLottery(sheet, numLucky) {
 
  
  // 対象列の情報を取得
  var numList = getColumnList(sheet, sheet.getActiveCell().getColumn());
  
  for(var i = 0; i < numList.length; i++){
    if(numList[i] !== ''){
      
      // 絶対に選ばれないように最大数 + 1
      numLucky[i] = maxNum + 1;
    }
  }
  
  //ラッキーの最小数を取得
  var minNum = Math.min.apply(null, numList);
  
  for(var i = 0; i < numLucky.length; i++){
    
    if(numList[i] > minNum){
      numList[i] = maxNum;
    }else{
      numList[i] = getRandom(1, 100);
    }
  }
  
  // 最小数を取得
  minNum = Math.min.apply(null, numList);
  
  Logger.log(numList);
  
  for(var i = 0; i < numList.length; i++){
    
    if(numList[i] === minNum){
      sheet.getActiveCell().offset(i, 0).setValue("ラ");  
      break;
    }
  }
}

// 乱数を生成
function getRandom( min, max ) {
    const random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
    return random;
}
