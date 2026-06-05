import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../views/Home/Home'
import Agriculture from '../views/Agriculture/Agriculture'
import AnimalCare from '../views/AnimalCare/AnimalCare'
import Health from '../views/Health/Health'
import Verify from '../views/Health/Verify'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/animal-care" element={<AnimalCare />} />
        <Route path="/health" element={<Health />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  )
}
