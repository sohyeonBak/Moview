const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');

module.exports = withBundleAnalyzer({
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, { webpack }){
    const prod = process.env.NODE_ENV === 'production'
    const plugins = [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)
    ];
    
    return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool : prod ? 'hidden-source-map' : 'eval',
        plugins,
    }
}
});
