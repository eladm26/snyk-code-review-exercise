import { NPMPackage } from "../../src/utils/types";

const reactMockedNpmPackage: NPMPackage = {
    name: 'react',
    description:
      'React is a JavaScript library for building user interfaces.',
    'dist-tags': {
      latest: '18.3.1',
    },
    versions: {
      ['16.13.0']: {
        name: 'react',
        version: '16.13.0',
        dependencies: {
          'loose-envify': '1.4.0',
          'object-assign': '4.1.1',
          'prop-types': '^15.6.2',
        },
      },
      ['15.5.3']: {
        name: 'react',
        version: '15.5.3',
        dependencies: {
          fbjs: '^0.8.9',
          'prop-types': '^15.5.2',
          'loose-envify': '^1.1.0',
          'object-assign': '^4.1.0',
        },
      },
    },
  };

  const looseEnvifyMockedNpmPackage: NPMPackage = {
    name: 'loose-envify',
    description:
      'Fast (and loose) selective `process.env` replacer using js-tokens instead of an AST',
    'dist-tags': {},
    versions: {
      ['1.4.0']: {
        name: 'loose-envify',
        version: '1.4.0',
        dependencies: {
          'js-tokens': '^3.0.0 || ^4.0.0',
        },
      },
      ['1.1.0']: {
        name: 'loose-envify',
        version: '1.1.0',
        dependencies: {
          'js-tokens': '^1.0.1',
        },
      },
    },
  };

  const propTypesMockedNpmPackage: NPMPackage = {
    name: 'prop-types',
    description: 'Runtime type checking for React props and similar objects.',
    'dist-tags': {},
    versions: {
      ['15.6.2']: {
        name: 'prop-types',
        version: '15.6.2',
        dependencies: {
          'loose-envify': '^1.3.1',
          'object-assign': '^4.1.1',
        },
      },
      ['15.8.1']: {
        name: 'prop-types',
        version: '15.8.1',
        dependencies: {
          'loose-envify': '^1.4.0',
          'object-assign': '^4.1.1',
          'react-is': '^16.13.1',
        },
      },
    },
  };

  const objectAssignMockedNpmPackage: NPMPackage = {
    name: 'object-assign',
    description: 'ES2015 `Object.assign()` ponyfill',
    'dist-tags': {
      latest: '4.1.1',
    },
    versions: {
      ['4.1.1']: {
        name: 'object-assign',
        version: '4.1.1',
        dependencies: {},
      },
    },
  };

  const reactIsMockedNpmPackage: NPMPackage = {
    name: 'react-is',
    description: 'ES2015 `Object.assign()` ponyfill',
    'dist-tags': {
      latest: '18.3.1',
    },
    versions: {
      ['15.3.4']: {
        name: 'react-is',
        version: '15.3.4',
        dependencies: {},
      },
      ['16.13.1']: {
        name: 'react-is',
        version: '16.13.1',
        dependencies: {},
      },
    },
  };

  const jsTokensMockedNpmPackage: NPMPackage = {
    name: 'js-tokens',
    description: 'A regex that tokenizes JavaScript.',
    'dist-tags': {},
    versions: {
      ['4.0.0']: {
        name: 'js-token',
        version: '4.0.0',
        dependencies: {},
      },
      ['5.0.0']: {
        name: 'js-token',
        version: '5.0.0',
        dependencies: {},
      },
    },
  };

  export const mockedNPMPackages: Record<string, NPMPackage> = {
    react: reactMockedNpmPackage,
    'loose-envify': looseEnvifyMockedNpmPackage,
    'prop-types': propTypesMockedNpmPackage,
    'object-assign': objectAssignMockedNpmPackage,
    'react-is': reactIsMockedNpmPackage,
    'js-tokens': jsTokensMockedNpmPackage,
  };

  export const reactMockedResponse = {
    dependencies: {
      'loose-envify': {
        version: '1.4.0',
        dependencies: {
          'js-tokens': {
            version: '4.0.0',
            dependencies: {},
          },
        },
      },
      'object-assign': {
        version: '4.1.1',
        dependencies: {},
      },
      'prop-types': {
        version: '15.8.1',
        dependencies: {
          'object-assign': {
            version: '4.1.1',
            dependencies: {},
          },
          'loose-envify': {
            version: '1.4.0',
            dependencies: {
              'js-tokens': {
                version: '4.0.0',
                dependencies: {},
              },
            },
          },
          'react-is': {
            version: '16.13.1',
            dependencies: {},
          },
        },
      },
    },
  };