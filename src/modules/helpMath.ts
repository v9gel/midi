class HelpMath {
  private static lastIndex = -1;
  static arrayRandElement(arr: string[], repeatControl = false) {
    if (repeatControl) {
      let rand = Math.floor(Math.random() * arr.length);
      while (rand === HelpMath.lastIndex) {
        rand = Math.floor(Math.random() * arr.length);
      }
      HelpMath.lastIndex = rand;
      return arr[rand];
    } else {
      const rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    }
  }

  static resetLastIndex() {
    HelpMath.lastIndex = -1;
  }
}

export default HelpMath;
