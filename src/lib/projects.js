class Project {
  #title;
  #subText;
  #href;
  #icon;

  constructor(title, subText, href, icon) {
    this.#title = title;
    this.#subText = subText;
    this.#href = href;
    this.#icon = icon;
  }

  get title() {
    return this.#title;
  }

  get subText() {
    return this.#subText;
  }

  get href() {
    return this.#href;
  }

  get icon() {
    return this.#icon;
  }
}

export const projects = [
  new Project('Zoeschinger', 'This website', '/'),
  new Project('Text to git', 'stuff', '/'),
  new Project('Salg', 'more stuff here', '/'),
  new Project('asdfasdf', 'more stuff here', '/'),
];
