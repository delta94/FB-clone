export interface FDSTextPairingProps {
  body?: React.ReactNode;
  bodyColor?: string;
  bodyId?: string;
  bodyLineLimit?: number;
  bodyRef?: React.Ref<any>;
  bodyTruncationTooltip?: React.ReactNode;
  dir?: 'auto' | 'ltr' | 'rtl';
  headline?: React.ReactNode;
  headlineAddOn?: React.ReactNode;
  headlineColor?: string;
  headlineId?: string;
  headlineLineLimit?: number;
  headlineRef?: React.Ref<any>;
  headlineTruncationTooltip?: React.ReactNode;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  level?: 1 | 2 | 3 | 4 | 'entityHeader1' | 'entityHeader2';
  meta?: React.ReactNode;
  metaColor?: string;
  metaLineLimit?: number;
  metaLocation?: 'above' | 'below';
  metaRef?: React.Ref<any>;
  metaTestID?: string;
  metaTruncationTooltip?: React.ReactNode;
  reduceEmphasis?: boolean;
  testid?: string;
  textAlign?: 'start' | 'center' | 'end';
}

export interface CometHeadlineWithAddOnPropTypes {
  color?: string; // TODO
  id?: string;
  headlineRef?: FDSTextPairingProps['headlineRef'];
  addOn?: React.ReactNode;
  children?: React.ReactNode;
  isPrimaryHeading?: FDSTextPairingProps['isPrimaryHeading'];
  isSemanticHeading?: FDSTextPairingProps['isSemanticHeading'];
  numberOfLines?: number;
  truncationTooltip?: any;
  type?: any;
}

export interface CometLineClampTypeProps {
  id?: string;
  children?: React.ReactNode;
  lines?: number;
  useAutomaticTextDirection?: boolean;
  testid?: any;
  truncationTooltip?: React.ReactNode;
  xstyle?: any;
}

export interface BaseHeadingProps {
  /**
   * The content to be rendered inside the heading.
   */
  children: React.ReactNode;

  /**
   * An optional ID for the heading element.
   */
  id?: string;

  /**
   * Determines if the heading is the primary heading (e.g., <h1>). Defaults to false.
   */
  isPrimaryHeading?: boolean;

  /**
   * A flag to suppress hydration warnings during server-side rendering.
   */
  suppressHydrationWarning?: boolean;

  /**
   * A test ID for testing purposes.
   */
  testid?: string;

  /**
   * Optional styles to apply to the heading.
   */
  xstyle?: unknown;
}

export interface FDSTextProps {
  align?: 'auto' | 'start' | 'center' | 'end';
  children?: React.ReactNode;
  color?: string; // Define as a specific color type or enum if available
  dir?: 'auto' | 'ltr' | 'rtl';
  hyphens?: 'none' | 'auto' | 'manual';
  id?: string;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  numberOfLines?: number;
  preserveNewLines?: boolean;
  suppressHydrationWarning?: boolean;
  truncationTooltip?: string | React.ReactNode;
  type:
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'bodyLink1'
    | 'bodyLink2'
    | 'bodyLink3'
    | 'bodyLink4'
    | 'button1'
    | 'button2'
    | 'entityHeaderHeadline1'
    | 'entityHeaderHeadline2'
    | 'entityHeaderMeta1'
    | 'entityHeaderMeta2'
    | 'headline3'
    | 'headline4'
    | 'headlineDeemphasized3'
    | 'headlineDeemphasized4'
    | 'headlineEmphasized1'
    | 'headlineEmphasized2'
    | 'headlineEmphasized3'
    | 'headlineEmphasized4'
    | 'meta1'
    | 'meta2'
    | 'meta3'
    | 'meta4';
}
