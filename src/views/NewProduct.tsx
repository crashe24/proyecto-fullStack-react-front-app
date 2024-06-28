import { ActionFunctionArgs, Form, Link, useActionData, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductServices";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
   // console.log('desde action', data) 
    let error = ''

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    //console.log('error', error)

    if (error.length) {
        return error
    }

    await addProduct(data)
    return  redirect('/')
}

export default function NewProduct() {
  
  const error = useActionData() as string
  //console.log('error', error)
  return (
    <>
      <div className='flex justify-between'>
          <h2 className='text-4xl font-black text-slate-500'>Nuevo Producto</h2>        
          <Link to={'/'}
              className = 'rounded-md bg-indigo-600 p-3 text- dsm font-bold text-white shadow-sm hover:bg-indigo-800'
          >
            Volver a productos
          </Link>
      </div>
    
        {error  && <ErrorMessage>{error}</ErrorMessage>}
      <Form  className="mt-10" method="POST" >
        <ProductForm />
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
          />
      </Form>
  </>
  )
}
