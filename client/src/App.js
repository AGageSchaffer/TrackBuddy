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


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    
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
    return other.id === user.id ? null : <Route path={endpoint} key={other.id} element={<OtherProfiles {...other} />} />
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
            <div>
              <Link to='/'>
                <img src={Logo} alt='logo' ></img>
              </Link>
              <button onClick={dropdown}>{user.username}</button>
              {open ? 
              <ul>
                <Link to='/profile'>
                  <button>Profile</button>
                </Link>
                <>
                  <Link to='/' >
                    <button onClick={logout}>Logout</button>
                  </Link>
                </>
              </ul> : null}
               
            </div>
            <div>
              <Link to='/friends'>
                <button>Friends</button>
              </Link>
              <Link to='/tracks'>
                <button>Tracks</button>
              </Link>
              <Link to='/favorite-tracks'>
                <button>Favorite Tracks</button>
              </Link>
              <Link to='/find-tracks'>
                <button>Find Tracks</button>
              </Link>
            </div>
          <Routes>
              <Route path='/' element={<Main timescores={timeScoreArr} posts={posts} />} />
              <Route path='/profile' element={<Profile user={user} cars={cars} setCars={setCars}/>} />
              <Route path='/friends' element={<FriendsList />} />
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
