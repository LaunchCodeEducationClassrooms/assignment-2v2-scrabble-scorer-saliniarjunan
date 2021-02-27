// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   return input.question("Enter a word to score: ");     
};

function simpleScore(word){
  return word.length;
}

let simpleScoreObj = {
  'name':'Simple Score',
  'description':'Each letter is worth 1 point.',
  'scoringFunction':function(word){return simpleScore(word);}
};

function vowelBonusScore(word)
{
  let vowelPoints = 0 ;
      let vowelBonusScoreList = ['A' ,'E' ,'I' ,'O' ,'U'];
      for(i=0; i<word.length; i++)
      {
        if(vowelBonusScoreList.includes(word[i].toUpperCase()))
        {      
          vowelPoints+=3;      
        }
        else
        {      
          vowelPoints+=1;
        }
      }
      return vowelPoints;
}

let vowelBonusScoreObj = {
  'name':'Bonus Vowels',
  'description':'Vowels are 3 pts, consonants are 1 pt.',
  'scoringFunction':function(word){
      return vowelBonusScore(word);
  }
};

function scrabbleScore(word)
{
  let scrabbleScorePoint=0;
  for(i=0; i<word.length ;i++)
  {
    scrabbleScorePoint += Number(newPointStructure[word[i].toLowerCase()]);
  }
  return scrabbleScorePoint;
}

let scrabbleScoreObj = {
  'name':'Scrabble',
  'description':'The traditional scoring algorithm.',
  'scoringFunction':function(word){
    return scrabbleScore(word);
  }
};

//const scoringAlgorithms = [simpleScoreObj,vowelBonusScoreObj,scrabbleScoreObj];

const scoringAlgorithms = [
{
  'name':'Simple Score',
  'description':'Each letter is worth 1 point.',
  'scoringFunction':function(word){return simpleScore(word);}
},
{
  'name':'Bonus Vowels',
  'description':'Vowels are 3 pts, consonants are 1 pt.',
  'scoringFunction':function(word){
      return vowelBonusScore(word);
  }
},
{
  'name':'Scrabble',
  'description':'The traditional scoring algorithm.',
  'scoringFunction':function(word){
    return scrabbleScore(word);
  }
}  
];

//const scoringAlgorithms = [];

/*const scoringAlgorithms = {
};

scoringAlgorithms[0] = simpleScoreObj;
scoringAlgorithms[1] = vowelBonusScoreObj;
scoringAlgorithms[2] = scrabbleScoreObj;*/


/*const scoringAlgorithms = [];
scoringAlgorithms.push(simpleScoreObj);
scoringAlgorithms.push(vowelBonusScoreObj);
scoringAlgorithms.push(scrabbleScoreObj);*/

/*console.log("type of : "+ typeof(scoringAlgorithms));
console.log(scoringAlgorithms);
console.log("length is : " + scoringAlgorithms.length);*/

function scorerPrompt() {
  const scoreInput =require('readline-sync');
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let promptInput =scoreInput.question("Enter 0, 1, or 2: ");
  let validInput = [0,1,2];
  while(!validInput.includes(Number(promptInput)))
  {    
    console.log("Invalid Input");
    promptInput =scoreInput.question("Enter 0, 1, or 2: ");
  }
  return scoringAlgorithms[promptInput];
}

function transform(objStructure)
{
  let newPointStruct = {};

  for (let iInd in objStructure)
  {
    for (let jInd=0; jInd < objStructure[iInd].length; jInd++)
    {      
      newPointStruct[(objStructure[iInd][jInd].toLowerCase())] = Number(iInd);
    } 
    //newPointStruct[' '] = 0;
  }
  return newPointStruct;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let userWord = initialPrompt();
   let selectedAlgorithm = scorerPrompt();   
   console.log(`Score for '${userWord}': ${selectedAlgorithm.scoringFunction(userWord)}\n`);   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

