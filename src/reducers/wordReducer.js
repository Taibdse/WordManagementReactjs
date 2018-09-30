import Word from '../models/word';
import LocalStorageService from '../services/local-storage.service';

const arrWords = [
  new Word('Car', 'Xe Hoi', false, Date.now()),
  new Word('House', 'Nha', false, Date.now() + 1),
  new Word('Window', 'Cua So', true, Date.now() + 2),
  new Word('Room', 'Can Phong', true, Date.now() + 3),
  new Word('Animal', 'Dong Vat', false, Date.now() + 4),
  new Word('Human', 'Loai Nguoi', true, Date.now() + 5)
];

const initialState = {
  arrWords: arrWords,
  word: {}
};

function removeWord(arr, id){
  return arr.filter(w => w.id !== id);
}

function updateWord(arr, newWord){
  let index = arr.findIndex(word => word.id === newWord.id);
  arr[index] = newWord;
  return arr.slice();
}

function getWords(){
  let arrWords = LocalStorageService.getDataFromLocalStorage();
  if(!arrWords) return initialState;
  return { arrWords, word: {} };
}

function addWord(state, action){
  let { word } = action;
  let arrTemp = LocalStorageService.getDataFromLocalStorage();
  let newArrWords = [...arrTemp, word];
  LocalStorageService.saveDataToLocalStorage(newArrWords);
  return {
    arrWords: newArrWords,
    word: { en: '', vn: '' },
  };
}

function remove(state, action){
  let id = action.id;
  let arrTemp = LocalStorageService.getDataFromLocalStorage();
  let newArrWords = removeWord(arrTemp, id);
  LocalStorageService.saveDataToLocalStorage(newArrWords);
  return { word: state.word, arrWords: newArrWords };
}

function update(state, action){
  let arrTemp = LocalStorageService.getDataFromLocalStorage();
  let newArrWords = updateWord(arrTemp, action.word);
  LocalStorageService.saveDataToLocalStorage(newArrWords);
  return {
    word: { en: '', vn: '' },
    arrWords: newArrWords
  };
}

function showWordEdit(state, action){
  return {
    word: action.word,
    arrWords: state.arrWords
  };
}

function switchMemorized(state, action){
  let { word } = action;
  let { arrWords } = state;
  let index = arrWords.findIndex(w => w.id === word.id);
  let obj = Object.assign({}, arrWords[index]);
  obj.memorized = !word.memorized;
  arrWords[index] = obj;
  let newArrWords = arrWords.slice();
  LocalStorageService.saveDataToLocalStorage(newArrWords);
  return { word: state.word, arrWords: newArrWords}
}

function filterWords(state, action){
  let { filterType } = action;
  let arrWords, word = {};
  let arrTemp = LocalStorageService.getDataFromLocalStorage();
  if(filterType == 'SHOW_ALL') {
    arrWords = arrTemp;
  }else if(filterType == 'SHOW_MEMORIZED'){
    arrWords = arrTemp.filter(w => w.memorized);
  }else if(filterType == 'SHOW_NOT_MEMORIZED'){
    arrWords = arrTemp.filter(w => !w.memorized);
  }
  return { arrWords, word };
}

export default function(state, action) {
  switch(action.type){
    case 'ADD_WORD': return addWord(state, action);
    case 'REMOVE': return remove(state, action);
    case 'UPDATE': return update(state, action);
    case 'SHOW_WORD_EDIT': return showWordEdit(state, action);
    case 'SWITCH_MEMORIZED': return switchMemorized(state, action);
    case 'FILTER_WORDS': return filterWords(state, action);
    // case 'GET_WORDS': return getWords();
    default: return getWords();
  }
}