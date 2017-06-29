const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['last 2 versions', 'ie >= 9'],
        },
        useBuiltIns: true,
        include: ['es6.array.find']
      },
    ],
  ],
};
