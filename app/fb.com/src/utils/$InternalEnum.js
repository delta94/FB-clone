// Helper function to create a map of enum values to their names
function createEnumMap(enumObj) {
  const enumMap = new Map();
  Object.getOwnPropertyNames(enumObj).forEach((key) => {
    enumMap.set(enumObj[key], key);
  });
  return enumMap;
}

// Enum prototype object with utility methods
const enumPrototype = Object.freeze({
  isValid(value) {
    return this.getEnumMap().has(value);
  },
  cast(value) {
    return this.isValid(value) ? value : undefined;
  },
  members() {
    return Array.from(this.getEnumMap().keys());
  },
  getName(value) {
    return this.getEnumMap().get(value);
  },
  getEnumMap() {
    if (!this._enumMap) {
      this._enumMap = createEnumMap(this);
    }
    return this._enumMap;
  },
});

// Main function to create an enum
function createEnum(enumDefinition) {
  const enumObj = Object.create(enumPrototype);
  for (const key in enumDefinition) {
    if (Object.prototype.hasOwnProperty.call(enumDefinition, key)) {
      Object.defineProperty(enumObj, key, {
        value: enumDefinition[key],
        enumerable: true,
      });
    }
  }
  return Object.freeze(enumObj);
}

// Mirrored enum prototype object
const mirroredEnumPrototype = Object.freeze({
  isValid(value) {
    return typeof value === 'string' && Object.prototype.hasOwnProperty.call(this, value);
  },
  cast: enumPrototype.cast,
  members() {
    return Object.keys(this);
  },
  getName(value) {
    return value;
  },
});

// Function to create a mirrored enum
createEnum.Mirrored = function (values) {
  const enumObj = Object.create(mirroredEnumPrototype);
  values.forEach((value) => {
    Object.defineProperty(enumObj, value, {
      value: value,
      enumerable: true,
    });
  });
  return Object.freeze(enumObj);
};

// Export the createEnum function
export const InternalEnum = Object.freeze(createEnum);
