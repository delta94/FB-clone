import React from 'react';

const dummy = {};

export function BaseTooltipMultilineContent({ children }) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < children.length - 1 && (
              <>
                <span className="xzpqnlu x1hyvwdk xjm9jq1 x6ikm8r x10wlt62 x10l6tqk x1i1rx1s">, </span>
                <br aria-hidden="true" />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }
  return children;
}

BaseTooltipMultilineContent.displayName = `BaseTooltipMultilineContent`;
