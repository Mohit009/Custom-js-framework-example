let References: any = {};
let Values: any = {};

const setValue = (key: string, value: any) => {
  if (Values[key] !== value) {
    Values[key] = value;
    const elArr = References[key];
    if (elArr) {
      elArr.forEach((el: any) => {
        if (el.tagName === "INPUT") {
          el.value = Values[key];
        } else {
          el.innerHTML = Values[key];
        }
      });
    }
  }
};

const registerEventListener = (key: string) => {
  if (References[key] && Values[key]) {
    References[key].forEach((el: any) => {
      el.addEventListener("change", (event: Event) => {
        Values[key](event);
      });
    });
  }
};

const setEventListener = (key: string, callback: (event?: Event) => void) => {
  Values[key] = callback;
  registerEventListener(key);
};

export const initializeFw = (
  ApplicationContainerNode: HTMLElement,
  Application: () => any
) => {
  ApplicationContainerNode.innerHTML = Application();
  let initialReferences = ApplicationContainerNode.querySelectorAll(
    "[data-mo-bind], [data-mo-onChange]"
  );

  initialReferences.forEach((el) => {
    let key = el.getAttribute("data-mo-bind") as string;
    if (!References[key]) {
      References[key] = [el];
    } else {
      References[key].push(el);
    }

    if (el.hasAttribute("data-mo-onChange")) {
      let listenerKey = el.getAttribute("data-mo-onChange") as string;
      if (!References[listenerKey]) {
        References[listenerKey] = [el];
      } else {
        References[listenerKey].push(el);
      }
      registerEventListener(listenerKey);
    }

    if (el.hasAttribute("data-mo-bind")) {
      if (el.tagName === "INPUT") {
        el.value = Values[key] ? Values[key] : el.getAttribute("value");
      } else {
        el.innerHTML = Values[key];
      }
    }
  });
};

export const setState = (key: string, value: any) => {
  setValue(key, value);
  return (val: any) => {
    setValue(key, val);
  };
};

export const setOnChange = (key: string, callback: (event?: Event) => void) => {
  setEventListener(key, callback);
  return callback;
};
