import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const links = [{
  label:"Home",
  route:"/"
},
{
  label:"UserLogin",
  route:"/UserLogin"
}]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
          <ul>
          {links.map(({label,route})=>{
            return (
              <li key={route}>
                <Link href={route}>{label}
                </Link>
              </li>
            )
          })}
        </ul>
          </nav>
        </header>
        <main>
          <section>
            {children}
          </section>
        </main>
        </body>
    </html>
  )
}
