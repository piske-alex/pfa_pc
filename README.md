# PFA React

## Development
Just run `yarn start`

## Production deployment
1. Run `yarn build`
2. Run `netlify deploy --prod` and choose build as build path. The `_redirects` file should be already copied.
3. Run `yarn transfer-to-cordova` to copy the build to the cordova app.
4. You have to manually patch `<script type="text/javascript" src="cordova.js"></script>` to the cordova app's 
   `index.html`. 
   Please take reference from `index-original.html`
5. Run `cordova <build|run> <android|ios>` to build/test your app in corresponding platforms.
6. Run `yarn transfer-to-chrome-ext` to copy the build to chrome extension.
7. You have to manually patch `<body>` to `<body style="width: 400px;height: 600px;">` in chrome extension's 
   `index.html`.
8. You can use chrome extensions's developer mode to load the unpacked extension.
9. Run `yarn pack-chrome-extension` to pack the extension into zip.