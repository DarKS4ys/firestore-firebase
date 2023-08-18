"use client"
import { app, database } from '../firebaseconfig'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore'

export default function Auth() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [array, setArray] = useState([])
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const auth = getAuth()
    const dbInstance = collection(database, 'users')

    const handleInputs = (event) => {
        let inputs = {[event.target.name] : event.target.value}

        setData({...data, ...inputs})
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password, data.name)
        .then((response) => {
            const user = response.user;
            setCurrentUser(user);
            return addDoc(dbInstance, { ...data, userId: user.uid }); // Add userId to the data
        })
        .then(() => {
            console.log("Data added successfully");
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setCurrentUser(null);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
            const user = response.user;
            console.log(user);
            setCurrentUser(user);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const getData = async () => {
        const data = await getDocs(dbInstance)
        setArray(data.docs.map((item => {
            return {...item.data(), id: item.id}
        })))
    }

    const updateData = (id) => {
        let dataToUpdate = doc(database, 'users', id)
        updateDoc(dataToUpdate, {
            password: "nsi@gmail.com"

        })
        .then(() => {
            alert('Data changed succesfully')
            getData()
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <section className="flex flex-col">
    <div className="App text-center flex flex-col justify-center items-center gap-4 bg-gray-100 rounded-lg border border-black/20 p-10">
        <h1 className="text-xl font-semibold mb-2">Login to your account</h1>
        <div className="relative">
            <FaUser className="text-gray-400 -left-6 translate-y-2/4 text-lg absolute" />
            <input onChange={event => handleInputs(event)} className="bg-gray-200 p-2 rounded-lg border border-black/10" placeholder="Name" name="name" type="text" />
        </div>
        <div className="relative">
            <MdEmail className="text-gray-400 -left-6 translate-y-2/4 text-lg absolute" />
            <input onChange={event => handleInputs(event)} className="bg-gray-200 p-2 rounded-lg border border-black/10" placeholder="Email" name="email" type="email" />
        </div>
        <div className="relative">
            <RiLockPasswordFill className="text-gray-400 -left-6 translate-y-2/4 text-lg absolute" />
            <input onChange={event => handleInputs(event)} className="bg-gray-200 p-2 rounded-lg border border-black/10" placeholder="Password" name="password" type="password" />
        </div>
            {currentUser ? (
            <button onClick={handleSignOut} className="p-3 rounded-md bg-gray-900 hover:bg-gray-950 hover:scale-110 active:scale-100 text-white transition">Sign Out</button>
        ) : (
            <div className="">
                <div className="flex gap-3">
                    <button onClick={handleSignUp} className="p-3 rounded-md bg-gray-900 hover:bg-gray-950 hover:scale-110 active:scale-100 text-white transition">Sign Up</button>
                    <button onClick={handleSignIn} className="p-3 rounded-md bg-gray-900 hover:bg-gray-950 hover:scale-110 active:scale-100 text-white transition">Sign In</button>
                </div>
            </div>
        )}

  </div>

  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-yellow-400 rounded-xl p-4 text-xl font-bold mt-4 transition hover:bg-yellow-300 hover:scale-110 active:scale-100">See Data</button>
  {isMenuOpen ? (
    array.map(item => (
        <div key={item.id} className="flex flex-col">
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.password}</p>
            <button onClick={() => updateData(item.id)} className="p-3 rounded-md bg-gray-900 hover:bg-gray-950 hover:scale-110 active:scale-100 text-white transition">Update Data</button>
        </div>
    ))
    ) : null}

    {currentUser && (
        <div className="user-details">
            <h2>User Details</h2>
            <p>Name: {currentUser.displayName}</p>
            <p>Email: {currentUser.email}</p>
            <p>Email: {currentUser.name}</p>
            {/* You can display other user information here */}
        </div>
    )}
  </section>
  )
}
