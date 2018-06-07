/* eslint-disable */
const install = {
  debug: true,

  testPath: {
    url: '//m.haoyicn.cn/nb/m/dist/',
    api: '//m.haoyicn.cn/wx2test/',
  },
  
  rootPath: {
    url: '//m.haoyicn.cn/wx2/',
    api: '//m.haoyicn.cn/wx2s/',
  },

  get path() {
    if(!this.debug){
      return this.rootPath.url;
    }else{
      return this.testPath.url;
    }
  },

  get api() {
    if(!this.debug){
      return this.rootPath.api;
    }else{
      return this.testPath.api;
    }
  },

  install(vue, options){
    let $this = this;
    vue.prototype.log = (...arg)=>{
      if(!$this.debug) return;
      console.log(...arg);
    }

    Object.defineProperty(vue.prototype, '$path', {
      get(){
        return $this.path;
      }
    })

    Object.defineProperty(vue.prototype, '$api', {
      get(){
        return $this.api;
      }
    })

  }
}
export default install;
/* eslint-disable */
