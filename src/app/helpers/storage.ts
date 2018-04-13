export class Storage {
  private store: any;

  constructor(private session?: boolean) {
    this.initialize();
  }

  initialize() {
    if (this.session) {
      this.store = window.sessionStorage;
    } else {
      this.store = window.localStorage;
    }
  }

  get(key: string) {
    let item = this.store.getItem(key);

    try {
      item = JSON.parse(item);
    } catch (e) {
    }

    return item;
  }

  set(key: string, value: any) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    this.store.setItem(key, value);
  }

  remove(key: string) {
    this.store.removeItem(key);
  }
}
