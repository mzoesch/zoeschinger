import Link from 'next/link';

import styles from '@s/about/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import profilePicture from '@p/profilePicture.png';

import {
  Tools_CSS3,
  Tools_HTML5,
  Tools_CMake,
  Tools_Cpp,
  Tools_FastAPI,
  Tools_Git,
  Tools_GitHub,
  Tools_GitLab,
  Tools_Java,
  Tools_C,
  Tools_Go,
  Tools_Wasm,
  Tools_JavaScript,
  Tools_NextJS,
  Tools_Python3,
  Tools_React,
  Tools_Sass,
  Tools_SqlLite,
  Tools_TailwindCSS,
  Tools_TypeScript,
  Tools_UnrealEngine,
  Tools_Unity,
  Tools_Blender,
  Tools_Nginx,
} from '@c/svg';

import { tools, Tools } from '@l/tools.js';

import Image from 'next/image';

const About = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.about_wrapper}>
            <div className={styles.side_about_wrapper}>
              <Image
                src={profilePicture}
                alt='Profile Picture'
                className={styles.profile_picture}
              />
              <div className={styles.side_about_info}>
                <div className={text_styles.text}>
                  <h2 className={styles.name}>Magnus Zoeschinger</h2>
                  <h3 className={styles.username}>mzoesch</h3>
                  <h4 className={styles.sub_info_desktop}>
                    Germany, Bavaria, Munich
                  </h4>
                  <h4 className={styles.sub_info_desktop}>
                    &#x6d;&#x61;&#x67;{/* Just some comment */}
                    &#x6e;&#x75;{/* @ Just some comment */}
                    &#x73;&#x2e;&#x7a;{/* @ Just some comment */}&#x6f;&#x65;
                    {/* @ Just some comment */}
                    &#x73;&#x63;&#x68;{/* @ Just some comment */}
                    &#x69;&#x6e;&#x67;
                    {/* @ Just some comment */}
                    &#x65;&#x72;{/* @ Just some comment */}&#x40;
                    {/* @ Just some comment */}&#x7a;
                    {/* @ Just some comment */}
                    &#x6f;&#x65;{/* @ Just some comment */}&#x73;&#x63;&#x68;
                    {/* @ Just some comment */}&#x69;&#x6e;
                    {/* @ Just some comment */}
                    &#x67;&#x65;&#x72;{/* @ Just some comment */}
                    &#x2e;&#x64;{/* @ Just some comment */}&#x65;
                  </h4>
                  <h4 className={styles.sub_info_desktop}>
                    <Link
                      href='https://www.linkedin.com/in/mzoesch'
                      className={styles.link}
                    >LinkedIn</Link>
                  </h4>
                  <h4 className={styles.sub_info_desktop}>
                    <Link
                      href='https://github.com/mzoesch'
                      className={styles.link}
                    >GitHub</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className={styles.sub_mobile_wrapper}>
              <div className={text_styles.text}>
                <h4 className={styles.sub_info_mobile}>
                  Germany, Bavaria, Munich
                </h4>
                <h4 className={styles.sub_info_mobile}>
                    &#x6d;&#x61;&#x67;{/* Just some comment */}
                    &#x6e;&#x75;{/* @ Just some comment */}
                    &#x73;&#x2e;&#x7a;{/* @ Just some comment */}&#x6f;&#x65;
                    {/* @ Just some comment */}
                    &#x73;&#x63;&#x68;{/* @ Just some comment */}
                    &#x69;&#x6e;&#x67;
                    {/* @ Just some comment */}
                    &#x65;&#x72;{/* @ Just some comment */}&#x40;
                    {/* @ Just some comment */}&#x7a;
                    {/* @ Just some comment */}
                    &#x6f;&#x65;{/* @ Just some comment */}&#x73;&#x63;&#x68;
                    {/* @ Just some comment */}&#x69;&#x6e;
                    {/* @ Just some comment */}
                    &#x67;&#x65;&#x72;{/* @ Just some comment */}
                    &#x2e;&#x64;{/* @ Just some comment */}&#x65;
                </h4>
                <h4 className={styles.sub_info_mobile}>
                    <Link
                      href='https://www.linkedin.com/in/mzoesch'
                      className={styles.link}
                    >LinkedIn</Link>
                  </h4>
                  <h4 className={styles.sub_info_mobile}>
                    <Link
                      href='https://github.com/mzoesch'
                      className={styles.link}
                    >GitHub</Link>
                  </h4>
              </div>
            </div>
            <div className={styles.side_text_wrapper}>
              <div className={text_styles.text}>
                <h1 className={styles.about_title}>About</h1>
                <div className={text_styles.paragraph}>
                  Hello there. I am Magnus Zoeschinger.
                </div>
                <div className={text_styles.paragraph}>
                  I am a Computer Science and Computer Linguistic student.
                  Currently pursuing a degree at the
                  Ludwig-Maximilians-Universität München.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tools}>
            <div className={text_styles.text}>
              <h1
                className={text_styles.title}
                style={{ marginBottom: '3rem' }}
              >
                Tools
              </h1>
              <div className={styles.tools_list}>
                {tools.map((tool: Tools) => {
                  return (
                    <div key={tool.title}>
                      {tool.icon === 'CMakeIcon' && (
                        <Tools_CMake className={styles.tool_icon} />
                      )}
                      {tool.icon === 'CIcon' && (
                        <Tools_C className={styles.tool_icon} />
                      )}
                      {tool.icon === 'GoIcon' && (
                        <Tools_Go className={styles.tool_icon} />
                      )}
                      {tool.icon === 'WasmIcon' && (
                        <Tools_Wasm className={styles.tool_icon} />
                      )}
                      {tool.icon === 'SqlLiteIcon' && (
                        <Tools_SqlLite className={styles.tool_icon} />
                      )}
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
                      {tool.icon === 'NginxIcon' && (
                        <Tools_Nginx className={styles.tool_icon} />
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
                      <div className={styles.tool_title}>{tool.title}</div>
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
