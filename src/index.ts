/**
 * Ask AI chatbot integration for Astro, powered by Biel.ai.
 *
 * (c) 2024 - present Biel.ai
 * This code is licensed under MIT license (see LICENSE for details).
 */

export interface BielOptions {
  enable?: boolean
  project?: string
  version?: string

  // biel-button
  aiIcon?: string
  apiKey?: string
  bielButtonText?: string
  buttonPosition?: string
  buttonStyle?: string
  customFont?: boolean
  metadata?: string
  hideAvatars?: boolean
  hideIcon?: boolean

  // biel-bot
  disableInput?: boolean
  email?: string
  expandModal?: boolean
  hideCloseButton?: boolean
  hideConnectButton?: boolean
  hideExpandButton?: boolean
  hideRefreshButton?: boolean
  hideSettingsButton?: boolean
  hideFeedback?: boolean
  hideSources?: boolean
  hideTooltips?: boolean
  keepConversation?: boolean
  mcpServerUrl?: string
  modalPosition?: string
  showTermsModal?: boolean
  thinkModeEnabled?: boolean

  // biel-bot text
  assistantLabel?: string
  closeButtonText?: string
  collapseButtonText?: string
  connectButtonText?: string
  errorMessage403?: string
  errorMessage404?: string
  errorMessageDefault?: string
  expandButtonText?: string
  footerText?: string
  headerTitle?: string
  inputPlaceholderText?: string
  mcpClaudeDescription?: string
  mcpClaudeText?: string
  mcpCopiedText?: string
  mcpCopilotDescription?: string
  mcpCopilotText?: string
  mcpCursorDescription?: string
  mcpCursorText?: string
  mcpUrlCopiedDescription?: string
  mcpClaudeCopiedDescription?: string
  mcpUrlDescription?: string
  mcpUrlText?: string
  refreshButtonText?: string
  sendButtonText?: string
  settingsButtonText?: string
  sourcesText?: string
  suggestedQuestions?: string
  suggestedQuestionsTitle?: string
  termsCheckboxText?: string
  termsDescription?: string
  termsTitle?: string
  thinkModeAutoDescription?: string
  thinkModeAutoText?: string
  thinkModeFastDescription?: string
  thinkModeFastText?: string
  thinkModeThinkDescription?: string
  thinkModeThinkText?: string
  welcomeMessage?: string
}

export const DEFAULT_OPTIONS: BielOptions = {
  bielButtonText: 'Ask AI',
  modalPosition: 'bottom-right',
  buttonStyle: 'dark',
  buttonPosition: 'bottom-right',
  enable: true,
}

// Minimal structural types so the integration compiles without depending on
// astro at build time. Astro validates the real shapes at runtime.
interface ConfigSetupContext {
  injectScript(
    stage: 'head-inline' | 'before-hydration' | 'page' | 'page-ssr',
    content: string
  ): void
  logger: { warn(message: string): void }
}

export interface AstroBielIntegration {
  name: string
  hooks: {
    'astro:config:setup'(context: ConfigSetupContext): void
  }
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function escapeJs(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<\//g, '<\\/')
}

function generateBielScript(options: BielOptions): string {
  const { project, bielButtonText, enable, version, ...bielProps } = options
  const cdnBase = `https://cdn.jsdelivr.net/npm/biel-search@${version || 'latest'}/dist/biel-search`

  let attributeSetters = `bielButton.setAttribute('project', '${escapeJs(project || '')}');`
  Object.entries(bielProps).forEach(([key, value]) => {
    if (value !== undefined) {
      attributeSetters += `
      bielButton.setAttribute('${camelToKebab(key)}', '${escapeJs(value.toString())}');`
    }
  })

  return `
  (function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '${cdnBase}/biel-search.css';
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.type = 'module';
    script.src = '${cdnBase}/biel-search.esm.js';
    document.head.appendChild(script);

    function mountBielButton() {
      if (document.querySelector('biel-button')) {
        return;
      }
      var bielButton = document.createElement('biel-button');
      ${attributeSetters}
      bielButton.textContent = '${escapeJs(bielButtonText || DEFAULT_OPTIONS.bielButtonText!)}';
      document.body.appendChild(bielButton);
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', mountBielButton);
    } else {
      mountBielButton();
    }
    // Remount after client-side navigations when Astro's ClientRouter is used.
    document.addEventListener('astro:page-load', mountBielButton);
  })();
  `
}

export default function biel(userOptions: BielOptions = {}): AstroBielIntegration {
  const options: BielOptions = { ...DEFAULT_OPTIONS, ...userOptions }

  return {
    name: 'astro-biel',
    hooks: {
      'astro:config:setup'({ injectScript, logger }) {
        if (!options.enable) {
          return
        }
        if (!options.project) {
          logger.warn(
            "No 'project' set. Add your project ID from the Biel.ai dashboard."
          )
        }
        injectScript('head-inline', generateBielScript(options))
      },
    },
  }
}
