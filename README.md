# AI assistant integration for Astro

AI assistant integration for [Astro](https://astro.build) sites, with an **Ask AI** button powered by [Biel.ai](https://biel.ai).

![AI assistant Astro](https://docs.biel.ai/assets/images/biel-widget-docs-bd28548cf26a37bcb7c496487280bbfe.png)

Add an AI assistant to any Astro site using Biel.ai's integration. The integration embeds the Ask AI button, works with any Astro template, and supports client-side navigation with Astro's ClientRouter. Configure the documentation search widget separately.

Building with [Starlight](https://starlight.astro.build)? Use the dedicated [starlight-biel](https://github.com/TechDocsStudio/starlight-biel) plugin instead.

*Note: A Biel.ai plan is required to use this integration. Try it free for 14 days—no credit card required.*

## Key features

- **Ask AI** button that opens an AI assistant to answer questions from your documentation.
- **Documentation search** to find matching pages from indexed docs with a separately configured search widget.
- Connect menu to link the same indexed docs to Claude Code, Codex, and other compatible AI clients via [Biel.ai's hosted MCP server](https://docs.biel.ai/integrations/mcp-server).
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

See the [Astro AI assistant integration guide](https://docs.biel.ai/installation/astro) for the full list of options and setup instructions.

## Support

Need assistance? [Contact us](https://docs.biel.ai/support) for help.

## License

Copyright (c) 2024 Biel.ai

Licensed under the [MIT License](LICENSE).
