import './home.css'
import Header from '../header/Header'
import Body from './body/Body'

export default function Home({stars}) {
  return (
    <div className="home">
        <Header stars={stars} />
        <Body />
    </div>
  )
}

