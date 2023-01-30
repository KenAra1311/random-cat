import Link from 'next/link'
import Layout from 'components/Layout'
import { Routes } from 'common/enums'
import { NextPage } from 'next'

const AboutPage: NextPage = () => (
  <Layout title="About">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href={Routes.ABOUT}>Go home</Link>
    </p>
  </Layout>
)

export default AboutPage
