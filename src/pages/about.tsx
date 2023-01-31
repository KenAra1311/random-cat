import { Routes } from 'common/enums'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import Link from 'next/link'

const AboutPage: NextPage = () => (
  <Layout title="About">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href={Routes.ROOT}>Go home</Link>
    </p>
  </Layout>
)

export default AboutPage
