/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export',
    images: {
        loader: 'default',
        loaderFile: './app/image.ts',
        unoptimized: true,
      },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: 'ts-loader',
          },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

module.exports = nextConfig
