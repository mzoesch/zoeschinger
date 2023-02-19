class Link {
  #name;
  #href;
  #current;
  #isIcon;

  constructor(name, href, isIcon = false, current = false) {
    this.#isIcon = isIcon;
    this.#href = href;

    if (this.#isIcon === true) {
      return;
    }

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

  get isIcon() {
    return this.#isIcon;
  }

  get current() {
    return this.#current;
  }

  set current(value) {
    this.#current = value;
  }
}

export const navigation = [
  new Link('Dashboard', '/'),
  new Link('Projects', '/projects'),
];

// Switches if mobile
export const navigationDynamic = [new Link('ThemeIcon', '-1', true)];
