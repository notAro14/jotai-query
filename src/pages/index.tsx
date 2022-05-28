// PACKAGES
import Head from "next/head"
import { atom, useAtom } from "jotai"
import { atomWithQuery } from "jotai/query"
// TYPES & CONSTANTS
import type { NextPageWithLayout } from "src/types"
// COMPONENTS
import Heading from "src/shared/heading"
import Text from "src/shared/text"

interface User {
  id: number
  name: string
  email: string
}

const usersAtom = atomWithQuery(() => ({
  queryKey: "users",
  queryFn: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return res.json() as Promise<User[]>
  },
}))
const usersCount = atom((get) => get(usersAtom).length)
const usersEmails = atom((get) => get(usersAtom).map(({ email }) => email))

const Users = () => {
  const [data] = useAtom(usersAtom)
  return (
    <>
      {data.map(({ id, name }) => (
        <Text key={id}>{name}</Text>
      ))}
    </>
  )
}
const IndexPage: NextPageWithLayout = () => {
  const [count] = useAtom(usersCount)
  const [emails] = useAtom(usersEmails)
  return (
    <>
      <Head>
        <title>Jotai and React Query</title>
      </Head>

      <main>
        <Heading as="h1" css={{ mb: "$base" }}>
          Jotai and React Query
        </Heading>
        <Text>There are {count} users.</Text>
        <br />
        <Users />
        <br />
        <Text>Their contact emails are</Text>
        <br />
        {emails.map((email) => (
          <Text key={email}>{email}</Text>
        ))}
      </main>
    </>
  )
}

export default IndexPage
