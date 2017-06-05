var cloneRows = (rows) => {
  return rows.slice(0).map(row => row.slice(0));
};


// !! important
// all functions indecies are 1 based!

function BinaryMatrix(rows){
  if(rows.reduce((bool, r) => bool && r.length !== rows[0].length, true)){
    throw "BinaryMatrix: Column Count are not consistant.";
  }
  this.rows = rows;
  this.rowCount = this.rows.length;
  this.colCount = this.rows[0].length;
}

BinaryMatrix.prototype.clone = function(){
  return new BinaryMatrix(cloneRows(this.rows));
};

BinaryMatrix.prototype.get = function(i, j){
  if(typeof j === "undefined") return this.rows[i]; 
  return this.get(i)[j];
};

BinaryMatrix.prototype.set = function(i, j, v){
  var bm = this.clone();
  if(typeof v === "undefined"){
    bm.rows[i] = j;
    return bm;
  }
  bm.rows[i][j] = v;
  return bm;
};

BinaryMatrix.prototype.swapRows = function(i, j){
  var rows = cloneRows(this.rows);
  var temp = rows[i];
  rows[i] = rows[j];
  rows[j] = temp;
  return new BinaryMatrix(rows);
};


BinaryMatrix.prototype.toRREF = function(){
  var bm = this;
  var lead = 0;
  var rowCount = bm.rowCount;
  var columnCount = bm.colCount;
  for(var r = 0; r < rowCount; r++){
    if(columnCount <= lead) return bm;
    var i = r;
    while(bm.get(i, lead) === 0){
      i += 1;
      if(rowCount === i){
        i = r;
        lead += 1;
        if(columnCount === lead) return bm;
      }
    }

    bm = bm.swapRows(i, r);

    if(bm.get(r, lead) !== 0){
      bm = bm.set(r, bm.get(r).map(v => v/bm.get(r, lead)));
    }

    for(var i = 0; i < rowCount; i++){
      if(i === r) continue;
      var val = bm.get(i, lead);
      for(var j = 0; j < columnCount; j++){
        bm = bm.set(i, j, bm.get(i, j) - val * bm.get(r, j));
      }
    }
    lead++;
  }
  return bm;
};

BinaryMatrix.prototype.rank = function(){
  var isAllZeros = (arr) => arr.filter(v => v !== 0).length === 0;
  return this.toRREF().rows.filter(row => !isAllZeros(row)).length
};

BinaryMatrix.prototype.toString = function(){
  return this.rows.map(row => row.join(' ')).join('\n');
};

module.exports = BinaryMatrix;
