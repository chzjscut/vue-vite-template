
const utils = require('./utils');
const {
  getImportInsertBySelectorCode,
  getImportLinkContentCode,
  getImportLinkAPICode,
  getLinkHmrCode,
  getInsertOptionCode
} = utils;
const schema = require('./options.json');
// import {
//   //getImportInsertStyleElementCode,
//   getImportInsertBySelectorCode,
//   // getImportStyleContentCode,
//   // getImportStyleDomAPICode,
//   // getImportStyleAPICode,
//   getImportLinkContentCode,
//   getImportLinkAPICode,
//   //getStyleHmrCode,
//   getLinkHmrCode,
//   // getdomAPI,
//   // getImportIsOldIECode,
//   // getStyleTagTransformFn,
//   // getExportStyleCode,
//   // getExportLazyStyleCode,
//   // getSetAttributesCode,
//   getInsertOptionCode,
//   //getStyleTagTransformFnCode,
// } from "./utils";
//import schema from "./options.json";

const loader = function loader(content) {
  //const options = this.getOptions();
  
  // return `
  //   if (module.hot) {
  //     module.hot.accept(
  //       './styles/index.css',
  //       function() {
  //         ${
  //           `const linkElement = document.createElement("link");
  //           linkElement.rel = "stylesheet";`
  //         }
  //       }
  //     );

  //     module.hot.dispose(function() {
  //       update();
  //     });
  //   }`;

  // let str = `
  //       var style = document.createElement('style');
  //       style.innerHTML = ${JSON.stringify(content)};
  //       document.head.appendChild(style);
  // `
  // let str = `
  //   var style = document.createElement('style');
  //   style.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(style);
  // `;

  //return content;
}

loader.pitch = function pitch(request) {
  const options = this.getOptions(schema);
  //const injectType = options.injectType || "styleTag";
  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;
  
  const runtimeOptions = {};

  if (options.attributes) {
    runtimeOptions.attributes = options.attributes;
  }

  if (options.base) {
    runtimeOptions.base = options.base;
  }
  const insertType =
    options.insert && path.isAbsolute(options.insert)
      ? "module-path"
      : "selector";
  const hmrCode = this.hot ? getLinkHmrCode(esModule, this, request) : "";

  return `
    ${getImportLinkAPICode(esModule, this)}
    ${getImportInsertBySelectorCode(esModule, this, insertType, options)}
    ${getImportLinkContentCode(esModule, this, request)}
    ${
      esModule
        ? ""
        : `content = content.__esModule ? content.default : content;`
    }

    var options = ${JSON.stringify(runtimeOptions)};
    
    ${getInsertOptionCode(insertType, options)}

    var update = API(content, options);

    ${hmrCode}

    ${esModule ? "export default {}" : ""}`;

  return `
    ${`import content from "!!../node_modules/file-loader/dist/cjs.js!./index.css";`}
    if (module.hot) {
      module.hot.accept(
        '../styles/index.css',
        function() {
          ${
            `const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";`
          }
        }
      );

      
    }`;
}

module.exports = loader;