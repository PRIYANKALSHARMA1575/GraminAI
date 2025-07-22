module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel' // ✅ NativeWind v4 preset-style
    ],
    plugins: []
  };
};
