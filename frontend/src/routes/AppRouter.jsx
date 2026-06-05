import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../views/Home/Home'
import Agriculture from '../views/Agriculture/Agriculture'
import AnimalCare from '../views/AnimalCare/AnimalCareDashboard'
import Health from '../views/Health/Health'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/animal-care" element={<AnimalCare/>} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </BrowserRouter>
  )
}
