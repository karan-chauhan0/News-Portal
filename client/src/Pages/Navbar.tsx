import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import axios from 'axios'
import logo from '../../public/logo.png'

const Navbar = () => {
    const [location, setLocation] = useState("Fetching...")
    const [currentDate, setCurrentDate] = useState("")
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const today = new Date()
        setCurrentDate(today.toDateString())

        const fetchLocationAndWeather = async () => {
            try {
                const token = import.meta.env.VITE_IPINFO_TOKEN

                const locRes = await axios.get(`https://ipinfo.io/json?token=${token}`)
                const { city, country, loc } = locRes.data
                const [latitude, longitude] = loc.split(",")

                setLocation(`${city}, ${country}`)

                const weatherRes = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                )

                const current = weatherRes.data.current_weather
                setWeather(current)

            } catch (error) {
                console.error("Location not Fetching", error)
                setWeather(null)
            }
        }
        fetchLocationAndWeather()
    }, [])

    return (
        <>
            <nav className='bg-white flex p-2 mx-0 flex-col text-black text-xl'>
                <div className="upper flex justify-between pl-40 pr-40">
                    {weather ? (
                        <p className="text-black-600 text-md mt-2">🌡️ {weather.temperature}°C 📍 {location}</p>
                    ) : (
                        <p className="text-gray-500 text-md mt-2">Fetching weather... 📍 {location}</p>
                    )}
                    <div className="title-header">
                        <h2 className='text-3xl'>News Portal</h2>
                    </div>
                    <div className="social_icons flex gap-5 text-2xl">
                        <p><FaInstagram /></p>
                        <p><FaFacebook /></p>
                        <p><FaTwitter /></p>
                        <p><FaLinkedin /></p>
                    </div>
                    <div className="date">
                        <h2>📅 {currentDate}</h2>
                    </div>
                </div>
                <div className="lower">
                    <img src={logo} alt="logo" className="w-18 h-18" />
                </div>
            </nav>
        </>
    )
}

export default Navbar
