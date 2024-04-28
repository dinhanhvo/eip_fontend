const path = require('path');
const fs = require('fs-extra');
const translate = require('@vitalets/google-translate-api');

const dir = __dirname;
// console.log('Project dir: ' + dir);

const langDir = path.resolve(dir, 'src', 'assets', 'i18n');
console.log('Language dir: ', langDir);

const buildDir = path.resolve(dir, 'build', 'translation');

const srcLang = 'en';
const toLangs = ['fr', 'de', 'es', 'ro'];

const filesInDir = async (dName, recursive = false) => {
  let files = await fs.readdir(dName);
  let res = [];
  for (let f of files) {
    let fPath = path.resolve(dName, f);
    let stats = await fs.stat(fPath);
    if (stats.isFile()) {
      res = [...res, fPath];
    } else {
      if (recursive) {
        let subPaths = await filesInDir(fPath, recursive);
        res = [...res, ...subPaths];
      }
    }
  }
  return res;
};

const scanLangModules = async (pModule = '') => {
  //console.log('pModule: ' + pModule);
  let srcDir = pModule === '' ? langDir : path.resolve(langDir, pModule);
  //console.log('srcDir: ' + srcDir);
  let files = await fs.readdir(srcDir);
  let res = [];
  for (let f of files) {
    let fPath = path.resolve(srcDir, f);
    let stats = await fs.stat(fPath);
    if (!stats.isDirectory()) {
      continue;
    }
    let subModule = pModule === '' ? f : `${pModule}/${f}`;
    res.push(subModule);
    let innerMods = await scanLangModules(subModule);
    //console.log('inner mods', innerMods);
    res = [...res, ...innerMods];
  }
  return res;
};

const scanFlatLangFiles = async srcDir => {
  // console.log('scan dir: ' + srcDir);
  let files = await fs.readdir(srcDir);
  let res = [];
  let validLangs = ['fr', 'de', 'ro', 'es'];
  for (let f of files) {
    let fPath = path.resolve(srcDir, f);
    let stats = await fs.stat(fPath);
    if (!stats.isFile()) {
      continue;
    }
    let ext = path.extname(f);
    let lang = path.basename(f, ext);
    if (ext === '.txt' && validLangs.includes(lang)) {
      res.push(f);
    }
  }
  return res;
};

const cleanTrans = async () => {
  await fs.remove(buildDir);
  return 'Done';
};

const exportLangs = async () => {
  let langMods = await scanLangModules('');
  let pms = [];
  for (let mod of langMods) {
    let pm = expLangFile(mod);
    pms.push(pm);
  }
  await Promise.all(pms);
  return 'Done';
};

const expLangFile = async modPath => {
  let modDir = path.resolve(langDir, modPath);
  let fPath = path.resolve(modDir, 'en.json');
  let outDir = path.resolve(buildDir, modPath);
  await fs.ensureDir(outDir);

  let json = await fs.readJson(fPath);
  let flatVals = [];

  flatJson(json, flatVals);

  let oPath = path.resolve(outDir, 'en.json');
  await fs.writeJson(oPath, json, { spaces: 2 });
  console.log('Exported lang file: ' + oPath);

  oPath = path.resolve(outDir, 'en.txt');
  let strData = flatVals.join('\n');
  await fs.writeFile(oPath, strData);
  console.log('Exported flat file: ' + oPath);

  return 'done';
};

const flatJson = (json, resArr = []) => {
  if (typeof json !== 'object') {
    return;
  }
  for (let [k, v] of Object.entries(json)) {
    if (typeof v === 'string') {
      json[k] = resArr.length;
      resArr.push(v);
    } else {
      flatJson(v, resArr);
    }
  }
};

const importLangs = async () => {
  let langMods = await scanLangModules('');
  console.log('Language modules', langMods);
  let pms = [];
  for (let mod of langMods) {
    let pm = impLangModule(mod);
    pms.push(pm);
  }
  await Promise.all(pms);
  return 'Done';
};

const impLangModule = async modPath => {
  // console.log('Importing lang module: ' + modPath);
  let srcDir = path.resolve(buildDir, modPath);
  let toDir = path.resolve(langDir, modPath);
  let files = await scanFlatLangFiles(srcDir);
  // console.log('Files of ', toDir, files);
  let pms = [];
  for (let f of files) {
    let pm = impLangToJson(f, srcDir, toDir);
    pms.push(pm);
  }
  await Promise.all(pms);
  // console.log('Imported lang module: ' + modPath);
  return 'Done';
};

const impLangToJson = async (file, srcDir, toDir) => {
  let jsonPath = path.resolve(srcDir, 'en.json');
  let json = await fs.readJson(jsonPath);
  let fPath = path.resolve(srcDir, file);
  let langData = await fs.readFile(fPath);
  let langStr = langData.toString();
  let flatArr = langStr.split('\n');
  // console.log('flatArr', flatArr);
  fillLang(json, flatArr);
  let ext = path.extname(file);
  let lang = path.basename(file, ext);
  fPath = path.resolve(toDir, lang + '.json');
  await fs.writeJson(fPath, json, { spaces: 2 });
  console.log('Translated file: ' + fPath);
  return 'done';
};

const fillLang = (json, flatArr) => {
  if (typeof json !== 'object') {
    return;
  }
  for (let [k, v] of Object.entries(json)) {
    if (typeof v === 'number') {
      json[k] = flatArr[v];
    } else {
      fillLang(v, flatArr);
    }
  }
};

const transFile = async fPath => {
  let json = await fs.readJson(fPath);
  let dir = path.dirname(fPath);
  for (let lang of toLangs) {
    let resultJson = await transJson(json, srcLang, lang);
    let toFile = path.resolve(dir, lang + '.json');
    await fs.writeJSON(toFile, resultJson, { spaces: 2 });
    console.log('Output file: ' + toFile);
  }
  return 'Translated: ' + fPath;
};

const transJson = async (json, from, to) => {
  if (typeof json === 'string') {
    return await trans(json, from, to);
  }
  let res = {};
  let pms = [];
  for (let [k, v] of Object.entries(json)) {
    let pm = transJson(v, from, to).then(data => {
      res[k] = data;
    });
    pms.push(pm);
  }
  await Promise.all(pms);
  return res;
};

const trans = async (txt, from, to) => {
  let res = await translate(txt, { from, to });
  return res.text;
};

// transFile(enFile).then(
//   val => {
//     console.log('transFile done', val);
//   },
//   err => {
//     console.log('transfile error', err);
//   }
// );

// const tunnel = require('tunnel');
// translate('Ik spreek Engels', {to: 'en'}, {
//     agent: tunnel.httpsOverHttp({
//     proxy: {
//       host: 'whateverhost',
//       proxyAuth: 'user:pass',
//       port: '8080',
//       headers: {
//         'User-Agent': 'Node'
//       }
//     }
//   }
// )}).then(res => {
//     // do something
// }).catch(err => {
//     console.error(err);
// });

const testTrans = () => {
  translate('I spea Dutch!', { from: 'en', to: 'nl' })
    .then(res => {
      console.log(res.text);
      //=> Ik spreek Nederlands!
      console.log(res.from.text.autoCorrected);
      //=> true
      console.log(res.from.text.value);
      //=> I [speak] Dutch!
      console.log(res.from.text.didYouMean);
      //=> false
    })
    .catch(err => {
      console.error(err);
    });
};

const main = async () => {
  let args = [...process.argv];
  args = args.slice(2);

  if (args.length < 1) {
    console.log('Missing command arguments');
    console.log('Usage: node translate [exp|imp|clean]');
    console.log('Example: node translate export');
    return;
  }

  let cmd = args[0];
  let validCmds = ['exp', 'imp', 'clean'];
  if (!validCmds.includes(cmd)) {
    console.log('Invalid translation command: ' + cmd);
    return;
  }

  if (cmd === 'exp') {
    await exportLangs();
    console.log('Exported language modules');
    return;
  }

  if (cmd === 'imp') {
    await importLangs();
    console.log('Imported language modules');
    return;
  }

  if (cmd === 'clean') {
    //clean build dir
    await cleanTrans();
    console.log('Cleaned translation');
  }

  // let toLang = args[2];
  // let modules = args.slice(3);

  // console.log('To lang: ' + toLang);
  // console.log('Modules: ', modules);

  // let langFiles = [];

  // for (let module of modules) {
  //   let dir = path.resolve(langDir, module);
  //   let files = await filesInDir(dir);
  //   let enFiles = files.filter(f => {
  //     let baseName = path.basename(f);
  //     let ext = path.extname(baseName);
  //     let lang = path.basename(baseName, ext);
  //     return lang === 'en';
  //   });
  //   langFiles = [...langFiles, ...enFiles];
  // }

  // //   console.log('Lang files: ', langFiles);

  // let pms = [];
  // for (let fPath of langFiles) {
  //   console.log('Language file: ' + fPath);
  //   let pm = transFile(fPath);
  //   pms.push(pm);
  //   // break;
  // }
  // await Promise.all(pms);

  return 'Translation done';
};

main().then(resp => {
  console.log('Translation completed.');
});
