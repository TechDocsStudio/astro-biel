# AI chatbot integration for Astro

Ask AI chatbot integration for [Astro](https://astro.build) sites, powered by [Biel.ai](https://biel.ai).

![AI chatbot Astro](https://docs.biel.ai/assets/images/biel-widget-docs-bd28548cf26a37bcb7c496487280bbfe.png)

Add an AI chatbot to any Astro site using Biel.ai's integration. The integration adds both chat and search capabilities, works with any Astro template, and supports client-side navigation with Astro's ClientRouter.

Building with [Starlight](https://starlight.astro.build)? Use the dedicated [starlight-biel](https://github.com/TechDocsStudio/starlight-biel) plugin instead.

*Note: A Biel.ai plan is required to use this integration. Try it free for 14 days—no credit card required.*

## Key features

- AI chatbot that provides instant responses to documentation queries.
- AI search engine for quick and relevant information retrieval.
- Native Astro integration, works with any template or UI framework.
- Survives client-side navigation (Astro ClientRouter / view transitions).
- Customizable to match your site's branding and user needs.

## Installation

```bash
npm install astro-biel
```

Add the integration to your `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import biel from 'astro-biel'

export default defineConfig({
  integrations: [
    biel({
      project: '<YOUR_PROJECT_ID>',
      headerTitle: 'Biel.ai chatbot',
    }),
  ],
})
```

Replace `<YOUR_PROJECT_ID>` with your project's ID from the [Biel.ai dashboard](https://app.biel.ai).

Run `npm run dev` and verify the chat button appears in the bottom-right corner.

## Configuration

All widget options are supported as camelCase keys, for example:

```js
biel({
  project: '<YOUR_PROJECT_ID>',
  bielButtonText: 'Ask AI',
  buttonPosition: 'bottom-right',
  modalPosition: 'bottom-right',
  buttonStyle: 'dark',
  headerTitle: 'Documentation AI',
})
```

Set `enable: false` to turn the widget off without removing the configuration.

## Get started

See the [Astro AI chatbot integration guide](https://docs.biel.ai/installation/astro) for the full list of options and setup instructions.

## Support

Need assistance? [Contact us](https://docs.biel.ai/support) for help.

## License

Copyright (c) 2024 Biel.ai

Licensed under the [MIT License](LICENSE).
