class ValidationService{
  static checkNotEmpty(val){
    if(!val) return false;
    if(val.trim() === '') return false;
    return true;
  }
}

export default ValidationService;