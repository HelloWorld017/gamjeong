import nextMDX from '@next/mdx';

const svgrOptions = {
  loader: '@svgr/webpack',
  options: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    },
  },
};

const withMDX = nextMDX();

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    emotion: true,
  },

  experimental: {
    turbo: {
      rules: {
        '*.react.svg': { loaders: [svgrOptions], as: '*.js' },
      },
    },
  },

  pageExtensions: ['tsx', 'ts', 'mdx'],

  /** @param {{ externals: string[], module: { rules: { test: RegExp, use: unknown, exclude?: RegExp }[] } }} config */
  webpack: config => {
    config.externals.push('jsdom', 'canvas');

    const fileLoaderRuleIndex = config.module.rules.findIndex(rule => rule.test?.test?.('.svg'));
    const [fileLoaderRule] = config.module.rules.splice(fileLoaderRuleIndex, 1);
    config.module.rules.push({
      test: /\.react\.svg$/i,
      use: [svgrOptions],
    });

    config.module.rules.push({
      ...fileLoaderRule,
      exclude: /\.react\.svg$/i,
    });

    return config;
  },
};

export default withMDX(config);
