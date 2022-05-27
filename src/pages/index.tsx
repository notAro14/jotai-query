// PACKAGES
import { FC } from "react"
import Head from "next/head"
import { useQuery, dehydrate, QueryClient } from "react-query"
// TYPES & CONSTANTS
import type { NextPageWithLayout } from "src/types"
// COMPONENTS
import Heading from "src/shared/heading"
import Text from "src/shared/text"

const ID = 2

const getUser = async (id: string | number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (res.ok) return res.json()
  throw new Error("Failed to fetch user")
}

const User: FC<{ id?: string | number }> = ({ id = 1 }) => {
  const { data } = useQuery<{ name: string }>(["user", id], async () =>
    getUser(id)
  )
  return <Text>{data?.name ?? "No name yet"}</Text>
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["user", ID], async () => getUser(ID))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Jotai and React Query</title>
      </Head>

      <main>
        <Heading as="h1" css={{ mb: "$base" }}>
          Jotai and React Query
        </Heading>
        <User id={ID} />
      </main>
    </>
  )
}

export default IndexPage
