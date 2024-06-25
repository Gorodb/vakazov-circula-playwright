export default class DataHelper {
  // set js execution on pause for provided milliseconds
  static async delay(milliseconds: number) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds)
    });
  }

  // wait for provided event to be true or during timeout, 5s by default
  static async waitUntil(event: () => Promise<boolean>, timeout = 5000) {
    let currentTime = Date.now();
    const waitUntil = currentTime + timeout;
    let isEvent = false;

    while (!isEvent && currentTime < waitUntil) {
      try {
        isEvent = await event();
      } catch {
        isEvent = false;
      }
      await this.delay(500);
      currentTime = Date.now();
    }

    return isEvent;
  }

  // random integer value in provided range
  static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomItemFromArray(array: any[]) {
    return array[this.getRandomInt(0, array.length - 1)];
  }

  // clears string from new line symbols and replaces double spaces with one
  static clearString(text: string) {
    return text.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g," ");
  }
}
