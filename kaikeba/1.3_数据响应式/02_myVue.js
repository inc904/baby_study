class Vue extends EventTarget {
  constructor(option) {
    super()
    this.option = option
    this._data = this.option.data
    this.el = document.querySelector(this.option.el)
    this.compileNode(this.el)
    this.observe(this._data)
  }
  observe(data){
    let _this = this
    this._data = new Proxy(data, {
      set(target, prop, newValue){
        console.log(newValue);
        let event = new CustomEvent(prop,{
          detail: newValue
        })
        _this.dispatchEvent(event)
        return Reflect.set(...arguments)
      }
    })
  }
  compileNode(el){
    let child = el.childNodes
    let childArr = [...child]
    // console.log( Array.isArray(childArr))
    // console.log( Array.isArray(child))

    childArr.forEach((item, i) => {
      if(item.nodeType === 3){
        // console.log('this is a text node ');
        let text = item.textContent
        // console.log(text);
        let reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/

        if(reg.test(text)){
          let $1 = RegExp.$1
          console.log($1);
          this._data[$1] && (item.textContent = text.replace(reg, this._data[$1]))
        }

      }else if(item.nodeType === 1) {
        // console.log('ele');
        let  attr = item.attributes
        console.log(attr);
        if(attr.hasOwnProperty('v-model')){
          console.log(111);
          let keyname =  attr['v-model'].nodeValue
          console.log(keyname);
          item.value = this._data[keyname]
          item.addEventListener('input', e=>{
            this._data[keyname] = item.value
          })
        }
        this.compileNode(item)
      }
    })

  }
}
// export default Vue
// module.export = Vue
