import React from 'react'
import { SideNav } from './components'
import { Route, Routes } from 'react-router-dom'
import AccountScreen from './screens/account-screen/AccountScreen'
import HomeScreen from './screens/home-screen/HomeScreen'
import { UsersScreen } from './screens/users-screen/UsersScreen'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StudentsScreen } from './screens/students-screen/StudentScreen'
import EditScreen from './screens/edit-screen/EditScreen'
import { LibraryScreen } from './screens/library-screen/LibraryScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full  h-max min-h-screen text-zinc-900 bg-stock flex' >
        <div className='w-[24%] h-full bg-blue-500'>
          <SideNav />
        </div>
        <Routes >
          <Route path='/' element={<HomeScreen />} />
          <Route path='/account/screen' element={<AccountScreen />} />
          <Route path='/users/screen' element={<UsersScreen />} />
          <Route path='/students/screen' element={<StudentsScreen />} />
          <Route path='/library/screen' element={<LibraryScreen />} />
          <Route path='/edit/screen/:root/:id' element={<EditScreen />} />
        </Routes>
      </div>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
