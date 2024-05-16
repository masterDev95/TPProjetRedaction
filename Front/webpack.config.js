const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/scripts/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './', // Servir les fichiers depuis le dossier racine de frontend
        hot: true,    // Activer le hot reload
        port: 8080,   // Port personnalisé
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Chemin vers votre fichier HTML
        }),
    ],
};