import { DashboardIcon } from '@c/svg';

class Project {
  #title;
  #subText;
  #href;
  #source;
  #readMore;
  #icon;

  constructor(title, subText, href, source, readMore, icon) {
    this.#title = title;
    this.#subText = subText;
    this.#href = href;
    this.#source = source;
    this.#readMore = readMore;
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

  get source() {
    return this.#source;
  }

  get readMore() {
    return this.#readMore;
  }

  get icon() {
    return this.#icon;
  }
}

export const projects = [
  new Project(
    'Zoeschinger',
    'Website for my projects and stuff. So you can run them in the web.',
    'https://www.zoeschinger.com/',
    'https://github.com/mzoesch/zoeschinger',
    '/projects/zoeschinger',
    'DashboardIcon'
  ),
  new Project(
    'Text to git',
    'Allows you to place and display ASCII-Text at your GitHubs contributions overview.',
    '-1',
    'https://github.com/mzoesch/TxtToGit',
    '/projects/txttogit',
    'TextIcon'
  ),
  new Project(
    'Space Inv.',
    'Just some Python game. 2D shooter stuff thingy, idk.',
    '-1',
    'https://github.com/mzoesch/Planet_Attacked',
    '/projects/spaceinv',
    'ShuttleIcon'
  ),
  new Project(
    'SAlg',
    'more stuff here',
    '-1',
    '-1',
    '/projects/salgo',
    'SortIcon'
  ),
];
