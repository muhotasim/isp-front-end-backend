
import './App.css';
import {
  HashRouter, Route, Routes
} from "react-router-dom";
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import { Loader } from 'react-feather';

const Dashboard =lazy(()=>import('./components/page/dashboard'));
const Login = lazy(()=>import('./components/page/login'));
// user
const UserList = lazy(()=>import('./components/page/users'));
const ModifyUser = lazy(()=>import('./components/page/users/modify'));
// content
const ContentList = lazy(()=>import('./components/page/contents'));
const ModifyContent = lazy(()=>import('./components/page/contents/modify'));

// sections
const SectionList = lazy(()=>import('./components/page/sections'));
const ModifySection = lazy(()=>import('./components/page/sections/modify'));
// categories
// const CategoryList = lazy(()=>import('./components/page/categories'));
// const ModifyCategory = lazy(()=>import('./components/page/categories/modify'));
// tags
// const TagList = lazy(()=>import('./components/page/tags'));
// const ModifyTag = lazy(()=>import('./components/page/tags/modify'));
// pages
const PageList = lazy(()=>import('./components/page/pages'));
const ModifyPage = lazy(()=>import('./components/page/pages/modify'));
const NotFound = lazy(()=>import('./components/page/notfound'));

const FileList = lazy(()=>import('./components/page/files/FileList'));
const LogsList = lazy(()=>import('./components/page/settings/logs/LogsList'));
const MenuBuilder = lazy(()=>import('./components/page/settings/menu-builder/MenuBuilder'));
const FooterBuilder = lazy(()=>import('./components/page/settings/menu-builder/FooterBuilder'));
const SettingOther = lazy(()=>import('./components/page/settings/Global.settings'));



export const AppLoader = ()=>{
  return <div style={{position: 'fixed', top: '0', zIndex: 999, transform: 'translate(50%,50%)', width: '100%', height: '100%'}}>
      <Loader size={50} className="spiner" color='#353c48'/>
  </div>
}

const SuspanceWrapper = ({ children })=>{
  return  <Suspense fallback={<AppLoader/>}>
    {children}
  </Suspense>
}

function App() {
  return (<div>
    <HashRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoute  children={<SuspanceWrapper><Dashboard/></SuspanceWrapper>}/>}/>
          
          {/* users */}
          <Route path='/users' element={<ProtectedRoute  children={<SuspanceWrapper><UserList/></SuspanceWrapper>}/>}/>
          <Route path='/users/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyUser/></SuspanceWrapper>}/>}/>
          <Route path='/users/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyUser/></SuspanceWrapper>}/>}/>
          
          {/* contents */}
          <Route path='/contents' element={<ProtectedRoute  children={<SuspanceWrapper><ContentList/></SuspanceWrapper>}/>}/>
          <Route path='/contents/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyContent/></SuspanceWrapper>}/>}/>
          <Route path='/contents/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyContent/></SuspanceWrapper>}/>}/>
          
          {/* sections */}
          <Route path='/sections' element={<ProtectedRoute  children={<SuspanceWrapper><SectionList/></SuspanceWrapper>}/>}/>
          <Route path='/sections/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifySection/></SuspanceWrapper>}/>}/>
          <Route path='/sections/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifySection/></SuspanceWrapper>}/>}/>
          
          {/* categories */}
          {/* <Route path='/categories' element={<ProtectedRoute  children={<SuspanceWrapper><CategoryList/></SuspanceWrapper>}/>}/> */}
          {/* <Route path='/categories/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyCategory/></SuspanceWrapper>}/>}/> */}
          {/* <Route path='/categories/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyCategory/></SuspanceWrapper>}/>}/> */}
          
          {/* tags */}
          {/* <Route path='/tags' element={<ProtectedRoute  children={<SuspanceWrapper><TagList/></SuspanceWrapper>}/>}/> */}
          {/* <Route path='/tags/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyTag/></SuspanceWrapper>}/>}/> */}
          {/* <Route path='/tags/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyTag/></SuspanceWrapper>}/>}/> */}

          {/* pages */}
          <Route path='/pages' element={<ProtectedRoute  children={<SuspanceWrapper><PageList/></SuspanceWrapper>}/>}/>
          <Route path='/pages/create' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyPage/></SuspanceWrapper>}/>}/>
          <Route path='/pages/:id' element={<ProtectedRoute  children={<SuspanceWrapper><ModifyPage/></SuspanceWrapper>}/>}/>

          <Route path='/files' element={<ProtectedRoute  children={<SuspanceWrapper><FileList/></SuspanceWrapper>}/>}/>
          <Route path='/logs' element={<ProtectedRoute  children={<SuspanceWrapper><LogsList/></SuspanceWrapper>}/>}/>
          <Route path='/menu-builder' element={<ProtectedRoute  children={<SuspanceWrapper><MenuBuilder/></SuspanceWrapper>}/>}/>
          <Route path='/footer-builder' element={<ProtectedRoute  children={<SuspanceWrapper><FooterBuilder/></SuspanceWrapper>}/>}/>
          <Route path='/settings' element={<ProtectedRoute  children={<SuspanceWrapper><SettingOther/></SuspanceWrapper>}/>}/>
          
          

          
          <Route path='/*' element={<ProtectedRoute  children={<SuspanceWrapper><NotFound/></SuspanceWrapper>}/>}/>
        </Routes>
    </HashRouter>
    <ToastContainer/>
  </div>);
}

export default App;
