// FreeCodeCamp Project #9: Tic Tac Toe Game
// Solution by Quinn James
// Version 1: September 19, 2016

$(document).ready(function(){

  console.log("underscore test:" +  removeElementFromArray([1,2,3],2));
  console.log("underscore test:" +  removeElementFromArray([1,2,3],2));
  var player_side;
  var computer_side;
  var values = [];
  var squares = [];
  var spans = [];
  var numbersToShuffle = [];
  for (var x = 0; x < 9; x++) {
    squares.push($("#square_" + x));
    spans.push($("#span_" + x));
    values.push("empty");
    numbersToShuffle.push(x);
  }

  console.log(values);
  console.log(numbersToShuffle);
  //console.log(squares);
  //console.log(spans[0]);

  function clearAllSquares()
  {
    values = [];
    numbersToShuffle = [];
    for (var x = 0; x < spans.length; x++)
      {
           values.push("empty");
           numbersToShuffle.push(x);
           spans[x].text(" ");
      }

    writeStatus("");
    if (player_side === 'o')
      {
        doComputerMove();
      }
  }

  function removeElementFromArray(array, element)
  {
    return _.filter(array, function(testee) { return testee !== element});
  }

  function shuffleArray(array)
  {
    return _.shuffle(array);
  }

  function containsAllThree(array,a,b,c)
  {
    if (_.contains(array, a) && _.contains(array, b) && _.contains(array, c))
      {
        return true;
      }
    return false;
  }

  function checkArrayForMatchingIds(array, value) {
    var matches = [];
    console.log(array);
    console.log(value);
    for (var x = 0; x < array.length; x++)
      {
        if (array[x] == value)
          {
            matches.push(x);
            console.log('a match!');
          }
      }
    return matches;
  }

  var winning_conditions = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]

  ]
  function checkForVictory()
  {

    var values_check_x = checkArrayForMatchingIds(values, 'x');
    console.log("values_check_x:" + values_check_x);
    for (var x = 0; x < winning_conditions.length; x++)
     {
       if (containsAllThree(values_check_x, winning_conditions[x][0], winning_conditions[x][1], winning_conditions[x][2]))
         {
           return 'x';
         }
     }


    values_check_o = checkArrayForMatchingIds(values, 'o');
    console.log("values_check_o:"+values_check_o);
    for (var o = 0; o < winning_conditions.length; o++)
     {
       if (containsAllThree(values_check_o, winning_conditions[o][0], winning_conditions[o][1], winning_conditions[o][2]))
         {
           return 'o';
         }
     }

    return false;
  }
  function writeStatus(message)
  {
    $("#wincheck").text(message);
  }
  function doVictory(winner)
  {
    writeStatus(winner + " won the game. Resetting...")
    setTimeout(clearAllSquares, 1500);
  }

  function checkForFullBoard()
  {

    // if the array is free of nulls
    if (_.every(values, function(num) { return num !== 'empty'}))
      {

        return true;
      }
    return false;
  }

  function doBoardFull()
  {
      writeStatus("Board full");
      setTimeout(clearAllSquares, 1500);
  }


  $("#x").click(function () {
    //todo:test to see if midgame, and if so, prohibit this
    player_side = "x";
    computer_side = "o";
    //console.log("clicky");
  });
  $("#o").click(function () {
    //todo:test to see if midgame, and if so, prohibit this
    player_side = "o";
    computer_side = "x";
    doComputerMove();
  });

  for (var x = 0; x < squares.length; x++)
    {
      $("#square_"+x).click(function () {
        // convert to number so for === comparisons when removing numbers
        // from numbersToShuffle, since we're getting x indirectly out of a string
        x = +$(this).attr('id').slice(-1);
        if (player_side && values[x] !== 'x' && values[x] !== 'o')
          {
            console.log("x:" + x);
            numbersToShuffle = removeElementFromArray(numbersToShuffle, x);
            numbersToShuffle = _.shuffle(numbersToShuffle);
            console.log("on player:"+numbersToShuffle);
            values[x] = player_side;
            $(spans[x]).text(player_side);
            var victory = checkForVictory();
            if (victory === player_side) {

              doVictory('Player'); }
            else if (victory) {
              doVictory('Computer')
            }
            if (checkForFullBoard()) { doBoardFull(); }
            doComputerMove();
          }
      })
    }

  function doComputerMove()
  {
      var y = shuffleArray(numbersToShuffle)[0]; // local array
      console.log("y:"+y);
      console.log("values:"+values);
      numbersToShuffle = removeElementFromArray(numbersToShuffle, y);
      numbersToShuffle = _.shuffle(numbersToShuffle);
      console.log("numbersToShuffle:"+numbersToShuffle);
      values[y] = computer_side;
      $(spans[y]).text(computer_side);

            var victory = checkForVictory();
    if (victory === player_side) {

              doVictory('Player'); }
            else if (victory) {
              doVictory('Computer')
            }
      if (checkForFullBoard()) { doBoardFull(); }

  }

  $("#reset").click(function () {
    clearAllSquares();
  });

});
