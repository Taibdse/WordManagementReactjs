class LocalStorageService{
  static saveDataToLocalStorage(arr){
    if(localStorage){
      localStorage.setItem('arrWords', JSON.stringify(arr));
    }
  }
  
  static getDataFromLocalStorage(){
    if(localStorage){
      let raw = localStorage.getItem('arrWords');
      if(!raw) return null;
      return JSON.parse(raw);
    }
    return null;
  }
}

export default LocalStorageService;

