import {  useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { deleteProductById } from '../services/ProductServices';

type ProductDetailProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    //console.log('desde action detail :: ', params.id)
    if(params.id !== undefined) {
        await deleteProductById(+params.id)
        return redirect('/')

    }
}
export default function ProductDetail({product}: ProductDetailProps) {
    
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = product.availability

    
    return (
        <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {product.name} 
                </td>
                <td className="p-3 text-lg text-gray-800">
                        {formatCurrency(product.price)}  
                </td>
                <td className="p-3 text-lg text-gray-800">
                    <fetcher.Form method='POST'>
                        <button
                            type='submit'
                            name='id'
                            value={product.id}
                            className={`${isAvailability ? 'text-green-600':'text-red-600'}
                            rounded-lg p-2 text-xs uppercase font-bold w-full
                            border border-black hover:cursor-pointer
                            `}
                        >
                            {isAvailability? 'Disponibles': 'No disponible'}
                        </button>
                        
                    </fetcher.Form>
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className='flex gap-2 items-center'>
                        {/* <Link 
                          className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                          text-center'
                            to={`productos/${product.id}/editar`}
                        >Editar</Link> */}

                        {/* <button
                            onClick={() => navigate(`productos/${product.id}/editar`,{
                                state: {
                                    product
                                }
                            }) }
                             className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                          text-center'
                        >
                            Editar
                        </button> */}
                        <button
                            onClick={() => navigate(`productos/${product.id}/editar`)}
                             className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                          text-center hover:bg-indigo-800'
                        >
                            Editar
                        </button>
                        <Form className='w-full' method='POST' action={`productos/${product.id}/eliminar`}
                        onSubmit={ (e) => {
                            if( !confirm('Eliminar?')){
                                e.preventDefault()
                            }
                        } }>
                            <input type='submit'
                            value= 'Eliminar'
                             className='bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                          text-center hover:bg-red-700' />
                        </Form>
                    </div>
                </td>
       </tr> 
    );
}
