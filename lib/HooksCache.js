class SerializableMap extends Map {
  toJSON() {
    return { __Map: [...this] };
  }

  static fromObject(obj) {
    return obj.__Map
      ? new Map(
          [...obj.__Map].map(([k, v]) => [k, SerializableMap.fromObject(v)])
        )
      : obj;
  }
}

export class HooksCache {
  constructor() {
    this.items = new SerializableMap();
  }

  get(key) {
    if (!key) {
      throw new Error("hooksCache.get() was called without a key.");
    }
    if (!this.items.has(key)) {
      this.items.set(key, new SerializableMap());
    }
    return this.items.get(key);
  }

  toJSON() {
    return this.items.toJSON();
  }

  fromObj(obj) {
    this.items = SerializableMap.fromObject(obj);
  }

  static instance() {
    if (!HooksCache._instance) {
      HooksCache._instance = new HooksCache();
    }
    return HooksCache._instance;
  }
}

if (typeof window !== "undefined") {
  console.log(window.__HOOKS_CACHE);
  HooksCache.instance().fromObj(window.__HOOKS_CACHE);
}
