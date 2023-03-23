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
import AddCar from "./components/AddCar";
import TrackListing from "./components/TrackListing";
import { useFetchUserQuery } from "./components/features/userSlice";
import { useFetchTrackQuery } from "./components/features/trackSlice";
import { useFetchPostQuery } from "./components/features/postSlice"

function App({Route}) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([])
  // const [trackArr, setTrackArr] = useState([])
  const [posts, setPosts] = useState([])
  const [faveTracks, setFaveTracks] = useState([])
  // const {data = null} = useFetchUserQuery()
  const { data = [] } = useFetchTrackQuery()
  const { data: postArr = [] } = useFetchPostQuery()

  console.log(postArr)

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
    // fetch('/tracks')
    //     .then((r) => r.json())
    //     .then((tracks) => setTrackArr(tracks))
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

  if (!user) return <Login onLogin={setUser}/>;

  const trackRoute = data?.map((track) => {
    const trackEndPoint = track.name.replace(/\W+/g, '-').toLowerCase();
    const endPoint = "/tracks/" + trackEndPoint
    return <Route path={endPoint} key={track.id} element={<TrackListing track={track} user={user} posts={posts} setPosts={setPosts}/>} />
  })

  function logout() {
    fetch("/logout", {method: "DELETE"})
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
                <img src={Logo}></img>
              </Link>
              <button onClick={dropdown}>{user.username}</button>
              {open ? 
              <ul>
                <Link to='/profile'>
                  <button>Profile</button>
                </Link>
                <>
                  <button onClick={logout}>Logout</button>
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
              <Route path='/' element={<Main />} />
              <Route path='/profile' element={<Profile user={user} cars={cars} setCars={setCars}/>} />
              <Route path='/friends' element={<FriendsList />} />
              <Route path='/tracks/*' element={<Tracks user={user} faveTracks={faveTracks} setFaveTracks={setFaveTracks} />} />
              <Route path='/favorite-tracks' element={<FavoriteTracks faveTracks={faveTracks} setFaveTracks={setFaveTracks} />} />
              <Route path='/find-tracks' element={<TracksNear track={data} />} />
              {trackRoute}
          </Routes>
          </div>
  );
}

export default App;
