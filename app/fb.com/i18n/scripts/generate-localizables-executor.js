const { generateLocalizableFiles } = require('./generate-localizables');
const fs = require('fs');
const yargs = require('yargs');

const args = {
  HELP: 'h',
  OUTPUT_DIR: 'outputDir',
  TRANSLATIONS_FILENAME: 'translationsFilename',
  TRANSLATION_OUTPUT: 'translationOutput',
};

const argv = yargs
  .usage(
    'Take translations output, and write individual JSON files for each ' +
      'locale:  raw-es_rES/localizable.json => {<hash>: translatedString}',
  )
  .string(args.TRANSLATION_OUTPUT)
  .default(args.TRANSLATION_OUTPUT, './i18n/fbt/translatedFbts.json')
  .describe(args.TRANSLATION_OUTPUT, `path to the translatedFbts`)
  .string(args.OUTPUT_DIR)
  .default(args.OUTPUT_DIR, './i18n/fbt/output')
  .describe(args.OUTPUT_DIR, `path to the output folder`)
  .string(args.TRANSLATIONS_FILENAME)
  .default(args.TRANSLATIONS_FILENAME, '')
  .describe(args.TRANSLATIONS_FILENAME, `name that json translation files should take`).argv;

if (argv[args.HELP]) {
  yargs.showHelp();
  process.exit(0);
}

generateLocalizableFiles(
  JSON.parse(fs.readFileSync(argv[args.TRANSLATION_OUTPUT], { encoding: 'utf8' })),
  argv[args.OUTPUT_DIR],
  argv[args.TRANSLATIONS_FILENAME],
);
