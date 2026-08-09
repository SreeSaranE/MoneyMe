import Navbar from './Components/Navbar/Navbar'
import ThemeService from './features/theme/services/theme.service';
import CategoryPage from './Pages/category/CategoryPage'


ThemeService().initializeTheme();
function App() {

  return<>
    <div className='appContent'>
      <Navbar />
      <CategoryPage />
    </div>
    </>  
}

export default App