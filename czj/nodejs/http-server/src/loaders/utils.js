const path = require('path');

function stringifyRequest(loaderContext, request) {
  return JSON.stringify(
    loaderContext.utils.contextify(loaderContext.context, request),
  );
}

function getImportLinkAPICode(esModule, loaderContext) {
  const modulePath = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/injectStylesIntoLinkTag.js")}`,
  );

  return esModule
    ? `import API from ${modulePath};`
    : `var API = require(${modulePath});`;
}

function getImportLinkContentCode(esModule, loaderContext, request) {
  //console.log(loaderContext)
  console.log(1,request,2)
  const modulePath = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `import content from ${modulePath};`
    : `var content = require(${modulePath});`;
}

function getImportStyleAPICode(esModule, loaderContext) {
  const modulePath = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/injectStylesIntoStyleTag.js")}`,
  );

  return esModule
    ? `import API from ${modulePath};`
    : `var API = require(${modulePath});`;
}

function getImportInsertBySelectorCode(
  esModule,
  loaderContext,
  insertType,
  options,
) {
  if (insertType === "module-path") {
    const modulePath = stringifyRequest(loaderContext, `${options.insert}`);

    loaderContext.addBuildDependency(options.insert);

    return esModule
      ? `import insertFn from ${modulePath};`
      : `var insertFn = require(${modulePath});`;
  }

  const modulePath = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/insertBySelector.js")}`,
  );

  return esModule
    ? `import insertFn from ${modulePath};`
    : `var insertFn = require(${modulePath});`;
}

function getInsertOptionCode(insertType, options) {
  if (insertType === "module-path") {
    return `options.insert = insertFn;`;
  }

  const insert = options.insert ? JSON.stringify(options.insert) : '"head"';

  return `options.insert = insertFn.bind(null, ${insert});`;
}


function getLinkHmrCode(esModule, loaderContext, request) {
  const modulePath = stringifyRequest(loaderContext, `!!${request}`);

  return `
if (module.hot) {
  module.hot.accept(
    ${modulePath},
    function() {
     ${
       esModule
         ? "update(content);"
         : `content = require(${modulePath});

           content = content.__esModule ? content.default : content;

           update(content);`
     }
    }
  );

  module.hot.dispose(function() {
    update();
  });
}`;
}



module.exports = {
  stringifyRequest,
  //getImportInsertStyleElementCode,
  getImportInsertBySelectorCode,
  //getImportStyleContentCode,
  //getImportStyleDomAPICode,
  getImportStyleAPICode,
  getImportLinkContentCode,
  getImportLinkAPICode,
  //getStyleHmrCode,
  getLinkHmrCode,
  // getdomAPI,
  // getImportIsOldIECode,
  // getStyleTagTransformFn,
  // getExportStyleCode,
  // getExportLazyStyleCode,
  // getSetAttributesCode,
  getInsertOptionCode,
  // getStyleTagTransformFnCode,
};