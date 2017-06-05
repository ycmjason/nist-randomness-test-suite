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
  var xor = (v1, v2) => v1.map((v, i) => v ^ v2[i]);
  var lm = this.clone();
  var pivotstartrow = 0;
  var pivotstartcol = 0;
  var M = lm.rowCount;
  var Q = lm.colCount;

  for(var i = 0; i < Q; i++){
    var pivotrow;
    var found = false;
    for(var k = pivotstartrow; k < Q; k++){
      if(lm.get(k, pivotstartcol) === 1){
        found = true;
        pivotrow = k;
        break;
      }
    }
    if(found){
      if(pivotrow !== pivotstartrow){
        lm = lm.swapRows(pivotrow, pivotstartrow);
      }
      for(var j = pivotstartrow + 1; j < Q; j++){
        if(lm.get(j, pivotstartcol) === 1){
          lm = lm.set(j, xor(lm.get(j), lm.get(pivotstartrow)));
        }
      }
      pivotstartcol += 1;
      pivotstartrow += 1;
    }else{
      pivotstartcol += 1;
    }
  }
  return lm;
};

BinaryMatrix.prototype.rank = function(){
  var isAllZeros = (arr) => arr.filter(v => v !== 0).length === 0;
  return this.toRREF().rows.filter(row => !isAllZeros(row)).length
};

BinaryMatrix.prototype.toString = function(){
  return this.rows.map(row => row.join(' ')).join('\n');
};

module.exports = BinaryMatrix;
