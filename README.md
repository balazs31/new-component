## Create a new React component

Forked from https://github.com/joshwcomeau/new-component.
Added Storybook and basic testing.

### Usage

Install via NPM:

#### Globally for all projects

```bash
# Using Yarn:
$ yarn global add @balazs31/new-component

# or, using NPM
$ npm i -g @balazs31/new-component
```

#### Locally for a specific project

```bash
# Using Yarn:
$ yarn add @balazs31/new-component

# or, using NPM
$ npm i @balazs31/new-component
```

Then run:

```bash
$ cd PROJECT_DIRECTORY
$ new-component Button
```

### Packages included

### `clsx` for better class names

See https://www.npmjs.com/package/clsx for details.

### `i18next` for multi-language support

Will support the following languages / locales:

- Romanian (default): `ro-RO`
- Hungarian: `hu-HU`
- German: `de-DE`
- English: `en-US`

The locales / short codes were chosen from [this list](https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes).

See https://github.com/i18next/react-i18next for details.

#### Setup

You must have a `i18n.js` config file next to the `index.js` file in a CRA app.

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * Sets up translations
 *
 * - Every component manages it's own translations via namespaces
 * - Every component adds it's own translation items to `resources`
 *
 * @see https://github.com/i18next/react-i18next/issues/299
 * @see https://react.i18next.com/latest/usetranslation-hook#loading-namespaces
 *
 */
const resources = {};

/**
 * Sets up i18next
 *
 * @see https://react.i18next.com/latest/using-with-hooks
 */
i18n
  /**
   * Detects user language
   *
   * @see https://github.com/i18next/i18next-browser-languageDetector
   */
  .use(LanguageDetector)
  /**
   * Passes the i18n instance to react-i18next.
   */
  .use(initReactI18next)
  /**
   * Inits i18next
   *
   * @see https://www.i18next.com/overview/configuration-options
   */
  .init({
    resources,
    lng: "en-EN",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
```

In `index.js` you'll have to add this import statement:

```js
import "./i18n"; // See https://react.i18next.com/latest/using-with-hooks
```

### What you'll get

In `src/components/Button`:

```Javascript
// `Button/Button.js`
/**
 * Component short description
 *
 * @see Button.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import clsx from "clsx";

/**
 * Imports project specific components and hooks
 */

/**
 * Imports propTypes / component data requirements
 */
import { propTypes, defaultProps } from "./Button.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Button.lang.ro-ro";
import { hu_hu } from "./Button.lang.hu-hu";
import { en_us } from "./Button.lang.en-us";
import { de_de } from "./Button.lang.de-de";

i18n.addResourceBundle("ro-RO", "Button", ro_ro);
i18n.addResourceBundle("hu-HU", "Button", hu_hu);
i18n.addResourceBundle("en-US", "Button", en_us);
i18n.addResourceBundle("de-DE", "Button", de_de);

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    border: "1px solid"
  }
}));

/**
 * Displays the component
 */
const Button = props => {
  const { container } = useStyles(props);
  const { t } = useTranslation("Button");

  return (
    <Grid container>
      <Grid item xs={12} className={clsx(container, "Button")}>
        {t("Button")}
      </Grid>
    </Grid>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
export { propTypes as ButtonPropTypes, defaultProps as ButtonDefaultProps };
```

```Javascript
// `Button/Button.data.js`
/**
 * Defines the data requirements for the company
 */
import PropTypes from "prop-types";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

export { propTypes, defaultProps };
```

```Javascript
// `Button/Button.native.js`
/**
 * React Native specific code
 *
 * @see https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions
 */
```

```Markdown
// `Button/Button.md`
## Button
```

```Javascript
// `Button/Button.test.js`
import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

it("has a Button component", () => {
  const { getByText } = render(<Button />);
  expect(getByText("Button")).toBeInTheDocument();
});
```

```Javascript
// `Button/index.js`
export { default, ButtonPropTypes, ButtonDefaultProps } from "./Button";
```

```Javascript
// `Button/Button.lang.en-us.js`
const en_us = {
  Button: "Button"
};

export { en_us };
```

```Javascript
// `Button/Button.lang.de-de.js`
const de_de = {
  Button: "Button (de_de)"
};

export { de_de };
```

```Javascript
// `Button/Button.lang.ro-ro.js`
const ro_ro = {
  Button: "Button (ro_ro)"
};

export { ro_ro };
```

```Javascript
// `Button/Button.lang.hu-hu.js`
const hu_hu = {
  Button: "Button (hu_hu)"
};

export { hu_hu };
```

### Modify & test locally

You can easily fork this repo, modify, test, and publish on npm.

NOTE: Always start with changing the version number in `package.json` !!

#### Test locally

In this current repo:

```shell
npm pack
```

This will create a file like `new-component@0.0.1.tgz`.

In another folder:

```bash
npx create-react-app new-component-test
cd new-component-test
mkdir src/components
yarn add <path_to_new_component_repo>/metamn-new-component@0.0.1.tgz
./node_modules/.bin/new-component Button
# create the i18n.j file
# import and render <Button> in App.js
yarn start # run server and check the result
```

#### Update the changelog

NOTE: Always update the changelog

#### Publish

First push changes to Github. Then:

```bash
npm publish
```

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [0.4.3] - 2020-05-27

#### Changed

- The copy on some comments
- `import i18n from "../../../i18n";` - that 3 levels of nesting (changed from two) means in this project new components will mostly be added under a page subfolder. Ex: `src/components/pagename/Component`

### [0.4.2] - 2020-05-25

#### Added

- `clsx`, for better class names
- Material UI, as the default Design System

#### Removed

- `styled-components`, replaced with Material UI
- Storybook, never used in the previous few projects

### [0.3.0] - 2020-01-14

#### Added

- `styled-components`, re-added, because when a new component is added it's first purpose is to mockup. Also every new component has a border and padding added to serve mockuping.
- `react-i18next` with `addResourceBundle` loading translations from language files co-located to the component

### [0.2.0] - 2019-11-6

#### Added

- Default tests

#### Changed

- Storybook stories to follow the Component Story Format: https://storybook.js.org/docs/formats/component-story-format/

#### Removed

- `styled-components`, because many times components use another library, like `material-ui`

### [0.1.2] - 2018-08-17

#### Fixed

- Exporting default props

### [0.1.1] - 2018-08-17

#### Changed

- How default props are exported

### [0.1.0] - 2018-07-03

#### Added

- New templates for function components

### [0.0.4] - 2018-12-11

#### Fixed

- Markdown is not run through `prettify()`.

### [0.0.3] - 2018-12-11

#### Added

- Markdown documentation support.

### [0.0.2] - 2018-12-11

#### Added

- A CHANGELOG section in README.

#### Changed

- The install instructions in README.

### 0.0.1 - 2018-12-11

#### Added

- Initial release
