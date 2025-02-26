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

export const tools = [
  new Tools('CMake', 'CMakeIcon'),
  new Tools('C', 'CIcon'),
  new Tools('C++', 'CppIcon'),
  new Tools('Wasm', 'WasmIcon'),
  new Tools('SqlLite', 'SqlLiteIcon'),
  new Tools('Unreal Engine', 'UnrealEngineIcon'),
  new Tools('Go', 'GoIcon'),
  new Tools('Java', 'JavaIcon'),
  // new Tools('Blender', 'BlenderIcon'),
  new Tools('Python3', 'Python3Icon'),
  new Tools('FastAPI', 'FastAPIIcon'),
  new Tools('Nginx', 'NginxIcon'),
  // new Tools('Git', 'GitIcon'),
  // new Tools('GitHub', 'GitHubIcon'),
  // new Tools('GitLab', 'GitLabIcon'),
  new Tools('HTML5', 'HTML5Icon'),
  new Tools('CSS3', 'CSS3Icon'),
  // new Tools('Sass', 'SassIcon'),
  new Tools('JavaScript', 'JavaScriptIcon'),
  new Tools('TypeScript', 'TypeScriptIcon'),
  new Tools('React', 'ReactIcon'),
  new Tools('NextJS', 'NextJSIcon'),
  // new Tools('NLTK', 'Python3Icon'),
  // new Tools('TailwindCSS', 'TailwindCSSIcon'),
  // new Tools('Unity', 'UnityIcon'),
];

export { Tools };
