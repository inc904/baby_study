class Control {
  private state: any
}

interface SelectorContaol extends Control {
  select()
}

class Button extends Control implements SelectorContaol {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 报错 没有继承类 就没有state
class ImageC implements SelectorContaol {
  select() {}
}
