import Image from 'next/image'
import Auth from './components/auth'

export default function Home() {
  return (
      <main className="my-12 h-full flex items-center justify-center">
        <Auth />
      </main>
  )
}
