import { safeParse } from 'valibot';
import { DraftProductSchema, ProductsSchema, ProductSchema } from '../types';
import axios from 'axios';
import {Product} from '../types';
import { toBoolean } from '../utils/helpers';

type ProductData = {
    [k: string]: FormDataEntryValue;
}
export async function addProduct (data: ProductData) {
    //console.log('desde add Product', data )
    // validar 
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name, price: +data.price
        })
        if (result.success ) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            //console.log('url ', url )
            //const { data } = await axios.post(url, {
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
           // console.log('data', data)
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log('error ->', error)
    }
}

export async function getProducts() {
    try {
          const url = `${import.meta.env.VITE_API_URL}/api/products`
          const { data } = await axios(url) 
          const result = safeParse(ProductsSchema, data.data)
          
          if(result.success) {
            return result.output
          } else {
            throw new Error('Hubo un error ')
          }
    } catch (error) {
        console.log('error: ', error)
    }
}
export async function getProductById(id : Product['id']) {
    try {
          const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
          const { data } = await axios(url) 
          const result = safeParse(ProductSchema, data.data)
          if(result.success) {
            return result.output
          } else {
            throw new Error('Hubo un error ')
          }
    } catch (error) {
        console.log('error: ', error)
    }
}

export async function editProductById(data: ProductData, id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      //  const numberSchema = coerce(number(), Number)
        const result = safeParse(ProductSchema, {
            id: Number(id),
            name:data.name,
            price: Number(data.price),//parse(numberSchema,data.price),
            availability: toBoolean(data.availability.toString())
        })
       if(result.success) {
            await axios.put(url, result.output)
       }
    } catch (error) {
        console.log('error', error)
    }
}

export async function deleteProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        console.log('id', id)
        await axios.delete(url)
    } catch (error) {
        console.log('error', error)
    }
}

export async function updateProducctAvailability( id:Product['id']) {
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log('error ', error )
    }
}