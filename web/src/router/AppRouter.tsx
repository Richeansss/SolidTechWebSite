import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './index'

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}></Route>
      ))}
      <Route path='*' element={<Navigate to='/' replace />}></Route>
    </Routes>
  )
}

export default AppRouter
