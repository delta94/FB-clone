import { gkx } from './gkx';

// Function to check if the environment is FRL
function isFRLEnvironment() {
  return gkx[26340];
}

// Function to check if the environment is Instagram
function isInstagramEnvironment() {
  return gkx[22979];
}

// Function to check if the environment is MWA
function isMWAEnvironment() {
  return gkx[26341];
}

// Function to check if the environment is FBIG Native
function isFBIGNativeEnvironment() {
  return gkx[4008];
}

// Function to check if the environment is Imagine
function isImagineEnvironment() {
  return gkx[26342];
}

// Function that always returns true (for web environment check)
function isWeb() {
  return true;
}

export const XPlatReactEnvironment = {
  isFRLEnvironment: isFRLEnvironment,
  isInstagramEnvironment: isInstagramEnvironment,
  isMWAEnvironment: isMWAEnvironment,
  isFBIGNativeEnvironment: isFBIGNativeEnvironment,
  isImagineEnvironment: isImagineEnvironment,
  isWeb: isWeb,
};
