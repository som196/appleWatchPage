import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import WatchDetails from './components/WatchDetails'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/buy-watch/apple-watch" component={WatchDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
