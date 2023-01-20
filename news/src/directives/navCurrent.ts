// binding interface
interface IBinding {
  value: IConfig,
  oldValue: IConfig | undefined,
  [key: string]: any
}

// binding.value interface
interface IConfig {
  activeClass: string,
  className: string,
  curIdx: number
}

export default {
  // 掛載後
  mounted(el: HTMLElement, { value }: IBinding ) {
    const { activeClass, className, curIdx } = value;
    const oNavItems: HTMLCollection = el.getElementsByClassName(className);

    // 在目前元素上新增active樣式
    oNavItems[curIdx].className += ` ${activeClass}`
  },
  // 更新後
  updated(el: HTMLElement, { value, oldValue }: IBinding) {
    const { activeClass, className, curIdx } = value;
    const oNavItems: HTMLCollection = el.getElementsByClassName(className);
    // last index
    const oldCurIdx: number = oldValue!.curIdx;

    oNavItems[oldCurIdx].className = `${className}`;
    oNavItems[curIdx].className += ` ${activeClass}`;
  },
}