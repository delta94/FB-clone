import { memoizeWithArgs } from '@fb-utils/memoizeWithArgs';

export const getFDSTextHierarchyStyle = memoizeWithArgs(
  /**
   *
   * @param {number | string} level
   * @param {boolean} withoutEmphasized
   * @returns
   */
  (level, withoutEmphasized) => {
    switch (level) {
      case 1:
        return {
          bodyType: 'body1',
          headlineType: 'headlineEmphasized1',
          metaType: 'meta1',
        };
      case 2:
        return {
          bodyType: 'body2',
          headlineType: 'headlineEmphasized2',
          metaType: 'meta2',
        };
      case 3:
        return {
          bodyType: 'body3',
          headlineType: withoutEmphasized ? 'headline3' : 'headlineEmphasized3',
          metaType: 'meta3',
        };
      // eslint-disable-next-line default-case-last
      default:
      case 4:
        return {
          bodyType: 'body4',
          headlineType: withoutEmphasized ? 'headline4' : 'headlineEmphasized4',
          metaType: 'meta4',
        };
      case 'entityHeader1':
        return {
          bodyType: 'body2',
          headlineType: 'entityHeaderHeadline1',
          metaType: 'entityHeaderMeta1',
        };
      case 'entityHeader2':
        return {
          bodyType: 'body2',
          headlineType: 'entityHeaderHeadline2',
          metaType: 'entityHeaderMeta2',
        };
    }
  },
  /**
   *
   * @param {number | string} level
   * @param {boolean} withoutEmphasized
   * @returns
   */
  (level, withoutEmphasized) => {
    return String(level) + (withoutEmphasized ? '' : 'e');
  },
);
