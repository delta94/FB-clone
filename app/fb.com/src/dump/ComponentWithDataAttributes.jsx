import React from 'react';

const ComponentWithDataAttributes = (props) => {
  const { children, dataAttributes } = props;
  const attributes = dataAttributes
    ? Object.keys(dataAttributes).reduce((acc, key) => {
        if (acc && key) {
          acc['data-' + key] = dataAttributes[key];
        }
        return acc;
      }, {})
    : null;

  return attributes ? <div {...attributes}>{children}</div> : children;
};

export { ComponentWithDataAttributes };
