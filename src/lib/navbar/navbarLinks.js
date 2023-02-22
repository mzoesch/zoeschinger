class Link {
  #name;
  #href;
  #current;

  constructor(name, href) {
    this.#href = href;
    this.#name = name;
    this.#current = false;
  }

  get name() {
    return this.#name;
  }

  get href() {
    return this.#href;
  }

  get current() {
    return this.#current;
  }

  set current(value) {
    this.#current = value;
  }
}

export const navigation = [
  new Link('Home', '/'),
  new Link('Dashboard', '/dashboard'),
  new Link('Projects', '/projects'),
  new Link('About', '/about'),
];
