import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Core_Theme_Editor__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Theme_Editor__ShowQuery = { __typename?: 'Query', core_theme_editor__show: { __typename?: 'ShowCoreThemeEditorObj', colors?: { __typename?: 'ColorsShowCoreThemeEditor', background: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, primary: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, secondary: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, primary_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, secondary_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, destructive: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, destructive_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, cover: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, cover_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, muted: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, muted_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, accent: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, accent_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, card: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, border: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } } }, logos: { __typename?: 'LogoShowCoreThemeEditor', text: string, width: number, mobile_width: number, light?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, dark?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, mobile_dark?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, mobile_light?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number } } } };


export const Core_Theme_Editor__Show = gql`
    query Core_theme_editor__show {
  core_theme_editor__show {
    colors {
      background {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      card {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      border {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
    }
    logos {
      text
      width
      mobile_width
      light {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      dark {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      mobile_dark {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      mobile_light {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
    }
  }
}
    `;