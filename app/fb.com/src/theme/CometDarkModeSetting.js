export const CometDarkModeSetting = {
  initialGuessForDarkModeOnClient: true,
  initialClientStateGuess: true,
  // initialSetting: "DISABLED", //  "ENABLED"
  initialSetting: localStorage.getItem('isDarkMode') === 'ENABLED' ? 'ENABLED' : 'DISABLED',
};
