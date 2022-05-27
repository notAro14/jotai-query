// PACKAGES
import Head from "next/head"
import { atom, useAtom } from "jotai"
import { atomWithQuery } from "jotai/query"
// TYPES & CONSTANTS
import type { NextPageWithLayout } from "src/types"
// COMPONENTS
import Heading from "src/shared/heading"
import Text from "src/shared/text"

const idAtom = atom(1)
const userAtom = atomWithQuery((get) => ({
  queryKey: ["users", get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return res.json()
  },
}))

const User = () => {
  const [data] = useAtom(userAtom)
  return <Text>{data.name}</Text>
}
const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Next starter code</title>
      </Head>

      <main>
        <Heading as="h1" css={{ mb: "$base" }}>
          Next Typescript Starter
        </Heading>
        <User />
      </main>
    </>
  )
}

export default IndexPage
