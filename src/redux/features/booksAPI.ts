import publicAxios from "../../apis/publicAxios"

export const getBooks = async ()=>{
    const books = await publicAxios.get('/')
    return books.data;
}