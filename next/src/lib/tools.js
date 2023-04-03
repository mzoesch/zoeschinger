class Tools {
  #title;
  #icon;

  constructor(title, icon) {
    this.#title = title;
    this.#icon = icon;
  }

  get title() {
    return this.#title;
  }

  get icon() {
    return this.#icon;
  }
}

// HTML5
// CSS3 TailwindCSS Sass
// JavaScript TypeScript
// React NextJS
//
// Git GitHub GitLab
//
// Python3 FastAPI
//
// C++ Unreal Engine
// Unity
//
// Java

export const tools = [
  new Tools('Blender', 'BlenderIcon'),
  new Tools('C++', 'CppIcon'),
  new Tools('CSS3', 'CSS3Icon'),
  new Tools('FastAPI', 'FastAPIIcon'),
  new Tools('Git', 'GitIcon'),
  new Tools('GitHub', 'GitHubIcon'),
  new Tools('GitLab', 'GitLabIcon'),
  new Tools('HTML5', 'HTML5Icon'),
  new Tools('Java', 'JavaIcon'),
  new Tools('JavaScript', 'JavaScriptIcon'),
  new Tools('NextJS', 'NextJSIcon'),
  new Tools('Python3', 'Python3Icon'),
  new Tools('React', 'ReactIcon'),
  new Tools('Sass', 'SassIcon'),
  new Tools('TailwindCSS', 'TailwindCSSIcon'),
  new Tools('TypeScript', 'TypeScriptIcon'),
  new Tools('Unity', 'UnityIcon'),
  new Tools('Unreal Engine', 'UnrealEngineIcon'),
];

export { Tools };
