/*
This function should find the character that has
the maximum number of occurences in a string
*/
function maxOccurences(string) {
    let occurences = {};
    let countMaxOccurences = 0;
    let charMaxOccurences;
    for(let i = 0; i < string.length; i++) {
        const char = string[i];
        if(!/[a-zA-Z]/.test(char)) continue;
        occurences[char] = (occurences[char] || 0) + 1;
        if(occurences[char] > countMaxOccurences) {
            countMaxOccurences = occurences[char];
            charMaxOccurences = char;
        }
    }
    return { char: charMaxOccurences, occurences: countMaxOccurences };
}

const testString = "aaavxvsdcsdddd-Azfzafx;;;nezr";
const result = maxOccurences(testString);

console.info(`Max Occurences for string: ${testString}\nChar: ${result.char} - Occurences: ${result.occurences}`);