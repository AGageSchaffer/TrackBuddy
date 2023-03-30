import React, { useEffect, useState } from "react";
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Logo from './images/Logo.png';
import { Link } from 'react-router-dom';
import Profile from "./components/Profile";
import { Routes } from "react-router-dom";
import FriendsList from "./components/FriendsList";
import Tracks from "./components/Tracks";
import FavoriteTracks from "./components/FavoriteTracks";
import TracksNear from "./components/TracksNear";
import TrackListing from "./components/TrackListing";
import { useFetchTrackQuery } from "./components/features/trackSlice";
import { useFetchOthersQuery } from "./components/features/othersSlice";
import OtherProfiles from "./components/OtherProfiles";

function App({Route}) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([])
  const [timeScoreArr, setTimeScoreArr] = useState([])
  // const [trackArr, setTrackArr] = useState([])
  const [posts, setPosts] = useState([])
  const [faveTracks, setFaveTracks] = useState([])
  const { data = [] } = useFetchTrackQuery()
  const { data: users = [] } = useFetchOthersQuery()
  const [friendArr, setFriendArr] = useState([])


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/friends")
    .then((r) => r.json())
    .then(friends => setFriendArr(friends))
    
   
    fetch("/racecars").then((r) => {
      if (r.ok) {
        r.json().then((racecars) => setCars(racecars));
      }
    });
    fetch('/timescores')
        .then((r) => r.json())
        .then((timescores) => setTimeScoreArr(timescores))
      fetch('/favorites')
        .then((r) => r.json())
        .then((tracks) => setFaveTracks(tracks))
    fetch("/posts").then((r) => {
      if (r.ok) {
      r.json().then((postsArr) => setPosts(postsArr));
      }
    })
  
  }, 
  []);

  function fetchUsersData() {
    fetch("/friends")
    .then((r) => r.json())
    .then(friends => setFriendArr(friends))
    
    fetch('/favorites')
        .then((r) => r.json())
        .then((tracks) => setFaveTracks(tracks))
    fetch("/racecars").then((r) => {
          if (r.ok) {
            r.json().then((racecars) => setCars(racecars));
          }
        })
  }

  if (!user) return <Login onLogin={setUser} fetchUsersData={fetchUsersData} />

  const trackRoute = data?.map((track) => {
    const trackEndPoint = track.name.replace(/\W+/g, '-').toLowerCase();
    const endPoint = "/tracks/" + trackEndPoint
    return <Route path={endPoint} key={track.id} element={<TrackListing track={track} posts={posts} setPosts={setPosts} user={user} timescores={timeScoreArr} setTimeScoreArr={setTimeScoreArr} />} />
  })

  const usersRoute = users?.map((other) => {
    const endpoint = "/" + other.username.toLowerCase()
    return other.id === user.id ? null : <Route path={endpoint} key={other.id} element={<Profile user={other} cars={other.racecars} loggedUser={user} friendArr={friendArr} setFriendArr={setFriendArr} />} />
  })
  
  function logout() {
    fetch("/logout", {method: "DELETE"})
    setCars([])
    setFaveTracks([])
    setUser(null)
    setOpen(false)
  }

  function dropdown(){
    setOpen(!open)
  }

  return (
          <div>
            <div class="ui grid">            
              <div class="eight wide column">

                <Link to='/'>
                  <img src={Logo} alt='logo' ></img>
                </Link>
              </div>
              <div class="eight wide column">
              <div class="ui right floated basic segment">
                <a className="ui yellow label" onClick={dropdown}>
                  <img className="ui right spaced avatar image" src="https://thumbs.dreamstime.com/b/car-racer-flat-icon-man-red-uniform-orange-background-79711583.jpg"/>
                  {user.username}</a>
                {open ? 
                <div>
                  <Link to='/profile'>
                    <button className="ui tiny green button">Profile</button>
                  </Link>
                  <div>
                    <Link to='/' >
                      <button onClick={logout} className="ui tiny red button">Logout</button>
                    </Link>
                  </div>
                </div> : null}
              </div>
              </div>
            </div>
            <div className="ui container">
              <div className="ui secondary menu centered horizontal">
                <Link to='/friends'>
                  <a className="item">Friends</a>
                </Link>
                <Link to='/tracks'>
                  <a className="item">Tracks</a>
                </Link>
                <Link to='/favorite-tracks'>
                  <a className="item">Favorite Tracks</a>
                </Link>
                <Link to='/find-tracks'>
                  <a className="item">Find Tracks</a>
                </Link>
              </div>
            </div>
            <Routes>
                <Route path='/' element={<Main timescores={timeScoreArr} posts={posts} />} />
                <Route path='/profile' element={<Profile user={user} cars={cars} setCars={setCars}/>} />
                <Route path='/friends' element={<FriendsList friendArr={friendArr}/>} />
                <Route path='/tracks/*' element={<Tracks timescores={timeScoreArr} setTimeScoreArr={setTimeScoreArr} user={user} faveTracks={faveTracks} setFaveTracks={setFaveTracks} />} />
                <Route path='/favorite-tracks' element={<FavoriteTracks faveTracks={faveTracks} setFaveTracks={setFaveTracks} />} />
                <Route path='/find-tracks' element={<TracksNear track={data} />} />
                {trackRoute}
                {usersRoute}
            </Routes>
          </div>
  );
}

export default App;
