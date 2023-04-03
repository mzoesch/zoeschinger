import styles from '@s/about/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import {
  Tools_CSS3,
  Tools_HTML5,
  Tools_Cpp,
  Tools_FastAPI,
  Tools_Git,
  Tools_GitHub,
  Tools_GitLab,
  Tools_Java,
  Tools_JavaScript,
  Tools_NextJS,
  Tools_Python3,
  Tools_React,
  Tools_Sass,
  Tools_TailwindCSS,
  Tools_TypeScript,
  Tools_UnrealEngine,
  Tools_Unity,
  Tools_Blender,
} from '@c/svg';

import { tools, Tools } from '@l/tools.js';

const About = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.tools}>
            <div className={text_styles.text}>
              <h1
                className={text_styles.subtitle}
                style={{ marginBottom: '3rem' }}
              >
                Tools
              </h1>
              <div className={styles.tools_list}>
                {tools.map((tool: Tools) => {
                  return (
                    <div key={tool.title}>
                      {tool.icon === 'HTML5Icon' && (
                        <Tools_HTML5 className={styles.tool_icon} />
                      )}
                      {tool.icon === 'CSS3Icon' && (
                        <Tools_CSS3 className={styles.tool_icon} />
                      )}
                      {tool.icon === 'CppIcon' && (
                        <Tools_Cpp className={styles.tool_icon} />
                      )}
                      {tool.icon === 'FastAPIIcon' && (
                        <Tools_FastAPI className={styles.tool_icon} />
                      )}
                      {tool.icon === 'GitIcon' && (
                        <Tools_Git className={styles.tool_icon} />
                      )}
                      {tool.icon === 'GitHubIcon' && (
                        <Tools_GitHub className={styles.tool_icon} />
                      )}
                      {tool.icon === 'JavaIcon' && (
                        <Tools_Java className={styles.tool_icon} />
                      )}
                      {tool.icon === 'JavaScriptIcon' && (
                        <Tools_JavaScript className={styles.tool_icon} />
                      )}
                      {tool.icon === 'NextJSIcon' && (
                        <Tools_NextJS className={styles.tool_icon} />
                      )}
                      {tool.icon === 'Python3Icon' && (
                        <Tools_Python3 className={styles.tool_icon} />
                      )}
                      {tool.icon === 'ReactIcon' && (
                        <Tools_React className={styles.tool_icon} />
                      )}
                      {tool.icon === 'SassIcon' && (
                        <Tools_Sass className={styles.tool_icon} />
                      )}
                      {tool.icon === 'TailwindCSSIcon' && (
                        <Tools_TailwindCSS className={styles.tool_icon} />
                      )}
                      {tool.icon === 'TypeScriptIcon' && (
                        <Tools_TypeScript className={styles.tool_icon} />
                      )}
                      {tool.icon === 'GitLabIcon' && (
                        <Tools_GitLab className={styles.tool_icon} />
                      )}
                      {tool.icon === 'UnrealEngineIcon' && (
                        <Tools_UnrealEngine className={styles.tool_icon} />
                      )}
                      {tool.icon === 'UnityIcon' && (
                        <Tools_Unity className={styles.tool_icon} />
                      )}
                      {tool.icon === 'BlenderIcon' && (
                        <Tools_Blender className={styles.tool_icon} />
                      )}

                      {tool.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
