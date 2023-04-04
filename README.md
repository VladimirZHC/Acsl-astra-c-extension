## ACSL ASTRA C Specification Language for Visual Studio Code

A Visual Studio Code расширение для поддержки яхыка ANSI/ISO C Specification Langage (ACSL).


# Features
- C / C++ подсветка синтаксиса;
- Навигатор по коду

# Installation

Требуется установка [Node.js](https://nodejs.org/) v10+

```sh
cd your project
npm install --save-dev vscode
npm install vsce package
vsce package
code --install-extension my-extension.vsix
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```