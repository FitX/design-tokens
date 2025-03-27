import { formats, transformGroups } from 'style-dictionary/enums'
import { getReferences, usesReferences } from 'style-dictionary/utils'

const { cssVariables, jsonNested, scssVariables } = formats
const { css, js } = transformGroups;

/**
 *
 * @param {Config & LocalOptions} config
 * @param {string[]} items
 * @returns {*}
 */
const generateComponentFiles = ({ config, items, }) => {
  return items.map((item) => ({
    ...config,
    destination: `${item}.css`,
    // only include the tokens that are inside this component token group
    filter: (token) => token.path[0] === item,
  }));
}

export default {
  hooks: {
    formats: {
      // Adding a custom format to show how to get an alias's name.
      customFormat: function ({ dictionary, options }) {
        return dictionary.allTokens
          .map((token) => {
            let value = JSON.stringify(token.$value);
            if (options.outputReferences) {
              if (usesReferences(token.original.$value)) {
                const refs = getReferences(token.original.$value, dictionary.tokens, { usesDtcg: true });

                token.isNotAStringTemp = true;
                refs.forEach((ref) => {
                  value = value.replace(ref.$value, function () {
                    return ref.name;
                  })
                })
              }
            }
            return `export const ${token.name} = ${token?.isNotAStringTemp ? value.replaceAll('"', '') : value};`
          })
          .join(`\n`)
      },
    },
  },

  source: ['tokens/**/*.json'],
  platforms: {
    json: {
      buildPath: 'build/fitx/',
      files: [
        {
          destination: 'tokens.json',
          format: jsonNested,
        },
      ],
    },
    js: {
      buildPath: 'build/fitx/',
      transformGroup: js,
      files: [
        {
          destination: 'tokens.js',
          format: 'customFormat',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    css: {
      transformGroup: css,
      buildPath: 'build/fitx/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: cssVariables,
          options: {
            outputReferences: true,
          },
        },
        /*{
          destination: 'tokens.scss',
          format: scssVariables,
          options: {
            outputReferences: true,
          },
        },*/
        ...generateComponentFiles({
          items: ['color'],
          config: {
            format: cssVariables,
            // destination: 'color.css',
            options: {
              outputReferences: true,
            },
          }
        }),
      ],
    },
  },
}
