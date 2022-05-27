// PACKAGES
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
// TYPES
import type { AppType } from "next/dist/shared/lib/utils"
import type { AppPropsWithLayout } from "src/types"
// CSS
import "src/styles/reset.css"
// COMPONENTS
import * as Layout from "src/shared/layouts"
import { useState } from "react"

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return <Layout.Global>{page}</Layout.Global>
    })

  const [client] = useState(() => new QueryClient())

  return getLayout(
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}) as AppType

export default MyApp
