/** @OnlyCurrentDoc */
var maxNum = 999;


function lottery30() {
  for(var i = 0; i < 30; i++){
    Browser.msgBox(i);
    lottery();
  }
}

/*
  概要：抽選メイン処理
  備考：
*/
function lottery() {
  //　現在表示されているスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActive();
  
  var numLucky =　getNumList(spreadsheet);
  
  // 初期位置決定
  spreadsheet.getRange('C2').activate();
  
  // 完了ではないセルまで移動
  while(spreadsheet.getActiveCell().getValue() !== ''){
    spreadsheet.getActiveCell().offset(0, 1).activate();
  }
  
  
  lotteryCell(spreadsheet, numLucky);

  // ステータスを完了に設定  
  spreadsheet.getActiveCell().setValue('完了');

};

/*
  概要：累計ラッキー数取得
  備考：
*/
function getNumList(spreadsheet) {
  
  // 各人の累計ラッキー数を取得
  spreadsheet.getRange('B3').activate();
  var numLucky = [];
  
  while(spreadsheet.getActiveCell().getValue() !== ''){
    numLucky.push(spreadsheet.getActiveCell().getValue());
    spreadsheet.getActiveCell().offset(1, 0).activate();
  }
  
  return numLucky;

};

/*
  概要：抽選処理
  備考：
*/
function lotteryCell(spreadsheet, numList) {
  
  //ラッキーの最小数を取得
  var minNum = Math.min.apply(null, numList);
  
  for(var i = 0; i < numList.length; i++){
    spreadsheet.getActiveCell().offset(1, 0).activate();
    
    // ☓コマの場合
    if(spreadsheet.getActiveCell().getValue() !== ''){
      //　☓コマは絶対に選ばれないように1を追加
      numList[i] = maxNum + 1;
      
    //　最小数より多い場合
    }else if(numList[i] > minNum){
      numList[i] = maxNum;
    }else{
      numList[i] = getRandom(1, 100);
    }
  }
  
  minNum = Math.min.apply(null, numList);

  for(var i = 0; i < numList.length; i++){
    if(minNum === numList[i]){
      // 初期位置に戻す
      spreadsheet.getActiveCell().offset(-(numList.length), 0).activate();
      // 対象項目に情報入力
      spreadsheet.getActiveCell().offset(i + 1, 0).setValue("ラ");
      
    }
  }  
}

function getRandom( min, max ) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
    return random;
}
