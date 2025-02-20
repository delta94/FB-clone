const invariant = require('invariant');
const fs = require('fs');
const path = require('path');

/**
 * Take translations output, and write individual JSON files for each locale
 */
function generateLocalizableFiles(translationOutput, outputDir, translationsFileName) {
  invariant(!translationsFileName.includes('.'), 'translationsFileName must not contain file extension');
  try {
    // eslint-disable-next-line guard-for-in
    for (const locale in translationOutput) {
      invariant(locale.split('_').length === 2, 'locale array must have two items');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      const fileName = translationsFileName ? `${translationsFileName}_${locale}.json` : `${locale}.json`;
      fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(translationOutput[locale]), { encoding: 'utf8' });
    }
  } catch (error) {
    console.error('An error occurred while generating the localizables');
    console.error(error);
    process.exit(1);
    throw error;
  }
}

module.exports = {
  generateLocalizableFiles,
};
