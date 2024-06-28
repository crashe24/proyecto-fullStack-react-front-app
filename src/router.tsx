
import { createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import Products, {loader as  productsLoader, action as prodductsAction} from './views/Products'
import NewProduct, {action as newProductAction} from './views/NewProduct'
import EditProduct, {action as editProductAction, 
    loader as editProductLoader} from './views/EditProduct'
import { action as deleteProductAction} from './components/ProductDetail'

 

export const router = createBrowserRouter([
    { path: '/', element: <Layout />, children:[
        { index: true, element: <Products />, loader: productsLoader, action:prodductsAction},
        { path: 'productos/nuevo',  element: <NewProduct />, action: newProductAction},
        { path: 'productos/:id/editar', 
             element: <EditProduct />, action: editProductAction, loader: editProductLoader},
        { path: 'productos/:id/eliminar', // ROA pattern Resource oriented design 
              action: deleteProductAction},
    ]}
])  