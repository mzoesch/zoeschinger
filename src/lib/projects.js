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
  new Project(
    'Zoeschinger',
    'Website for my projects and stuff. So you can run them in the web.',
    '/'
  ),
  new Project(
    'Text to git',
    'Allows you to place and display ASCII-Text at your GitHubs contributions overview.',
    '/'
  ),
  new Project('Salg', 'more stuff here', '/'),
  new Project('asdfasdf', 'more stuff here', '/'),
];
