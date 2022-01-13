// I: two strings, ring and key
// O: number (of steps)
// C:
// E:

var FreedomTrail = (ring, key) => {
  var steps = 0;
  var curIndex = 0
  for (var k=0;k<key.length;k++) {
    var indexArray = []
    //check the indexes of where the next key letter is and push to array
    for (var i =0;i<ring.length;i++){
      if (ring[i]===key[k]){
        indexArray.push(i)
      }
    }
    console.log(indexArray)
    var indexDif = Math.abs(indexArray[0] - curIndex)
    for (var j=1;j<indexArray.length;j++) {
      if (Math.abs(indexArray[i] - curIndex)<indexDif) {
        indexDif = Math.abs(indexArray[i] - k)
      }
    }
    curIndex = indexDif
    // console.log(indexDif)
    steps = steps + indexDif + 1
  }
  return steps
}
console.log(FreedomTrail("godding", "gd"))
  //counter for steps
  //prob want to do below in helper function
  //in arry of indexes, find the two closest ones fro mcurrent index (one from positive dir, one from negative direction)
  //get difference of indexes from current and closest next value index and add 1 for the button press
  //check next key letter with recursing the helper functio nor just doing for looop
  //return final steps