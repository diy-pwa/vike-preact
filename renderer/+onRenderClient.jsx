// https://vike.dev/onRenderClient
export default onRenderClient

import { hydrate, render } from 'preact'
import { PageShell } from './PageShell'

async function onRenderClient(pageContext) {
  const { Page, pageProps } = pageContext
  document.title = getPageTitle(pageContext);
  document.querySelector("meta[name='description'" ).setAttribute("content", getPageDescription(pageContext));

  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )
  const container = document.querySelector('body')

  if (pageContext.isHydration) {
    hydrate(page, container)
  } else {
    render(page, container)
  }
}

function getPageTitle(pageContext) {
  const title = (pageContext.config.documentProps || {}).title || (pageContext.documentProps || {}).title || 'Demo'
  return title
}

function getPageDescription(pageContext) {
  // don't absolutely need this, but feel it would be confusing otherwise
  const description = (pageContext.config.documentProps || {}).description || (pageContext.documentProps || {}).description || 'no description found'
  return description
}
