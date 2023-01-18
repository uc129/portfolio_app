// import ListView from "./ListView";
import Papa from "papaparse";
import {useEffect, useState} from "react";
import RowCardSlider from "../../../utils/RowCardSlider";
import ColumnSlider from "../../../utils/ColumnSlider";


const BooksLibrary=()=>{

    const [state, setState] = useState()

    const fetchCsv=()=> {
        return fetch('/assets/data/goodreads_library_export_2.csv').then(function (response) {
            let reader = response.body?.getReader();
            let decoder = new TextDecoder('utf-8');
            return reader?.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }
    const getCsvData=async ()=> {
        let csvData = await fetchCsv();
        // @ts-ignore
        Papa.parse(csvData, {
            complete: getData
        });
    }
    const  getData=(result:any)=> {
        // @ts-ignore
        setState({data: result.data});
    }
useEffect(() => {
    !(state) && getCsvData()
},[])

    const LibSidebar=()=>{
        return <>
            <div className={'lib-sidebar'}>
                <div className={'flex flex-col '}>
                    <h1 className={'font-bold text-sm'}>Bookshelves</h1>
                    <a href={'interests/library/user/shelf/all'}>All</a>
                    <a href={'interests/library/user/shelf/read'}>Read</a>
                    <a href={'interests/library/user/shelf/currently_reading'}>Currently Reading</a>
                    <a href={'interests/library/user/shelf/want_to_read'}>Want To Read</a>
                    <button className={'w-max'}>Add A New Shelf</button>
                    <hr/>
                </div>

                <div className={'flex flex-col'}>
                    <h1> Reading Activity </h1>
                    <a href={'interests/library/user/review/drafts'}>Review Drafts</a>
                    <a href={'interests/library/user/notes/'}>Notes and Highlights</a>
                    <a href={'interests/library/user/year_in_books'}>Year in Books</a>
                    <a href={'interests/library/user/reading_stats'}>Reading Stats</a>
                    <hr/>
                </div>

                <div className={'flex flex-col'}>
                    <h1> My Lists </h1>
                    <a href={'interests/library/user/lists/mystery'}>Mystery,Crime </a>
                    <a href={'interests/library/user/lists/mythology'}>Mythology</a>
                    <a href={'interests/library/user/lists/fantasy'}>Fantasy</a>
                    <a href={'interests/library/user/lists/sci-fi'}>Science Fiction</a>
                    <a href={'interests/library/user/lists/non-fiction'}>Non-fiction</a>
                    <a href={'interests/library/user/lists/classics'}>Classics</a>
                    <a href={'interests/library/user/lists/graphic-novels'}>Graphic Novels</a>
                    <a href={'interests/library/user/lists/psychology'}>Psychology</a>
                    <hr/>
                </div>

            </div>
        </>
    }

    // @ts-ignore
    const headers= state && state?.data[0];
    // @ts-ignore
    const data = state && state?.data.slice(1);

    console.log('headers',headers)
    // 3. Authors l-f
    // 4.Additional Authors
    // 6.ISBN13
    // 7.My Rating
    // 10. Binding
    // 13.Original Publication Year
    // 17. Bookshelves with positions
    // 18. Exclusive Shelf
    // 20. Spoiler
    // 22. Read Count
    // 23. Owned Copies
    const remove_headers=[0,4,5,7,8,11,14,18,19,21,23,24]
    const booksTable= (headers && data) && <div className={'text-xs'}>
        <table className={'h-fit'}>
            <thead className={'border-collapse '}>
            <tr className={'border-b border-amber-700 '}>
                {/*<th className={'px-4'}>cover</th>*/}
                {/*// @ts-ignore*/}
                {headers.map((header: any, index:any) => {
                    if (remove_headers.includes(index)) return null
                  return  <th className={'px-4'} >{header}</th>
                })}
            </tr>
            </thead>

            <tbody>
            {/*// @ts-ignore*/}
            {data.map((book: any,index:number) => {
                return (
                    <tr key={index}>
                        {/*<td className={'px-4 py-2 border-b border-amber-700'}> <img src={''}/> </td>*/}
                        {book.map((item: any,index:number) => {
                            if (index===1) return <td key={index}><img src={item} alt={'book cover image'}/></td>
                            if (remove_headers.includes(index)) return null
                            return <td key={index} className={'px-4 py-2 border-b border-amber-700'}>{item}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>


    // @ts-ignore
    // const column sliderData={height:'h-96',totalItems:state?.data.length,user:{name:'Utkarsh'}}

    return (

        <>

        <div className={'wrapper w-full'}>
            <div className={'header flex justify-between px-6 py-2'}>
                <h1>My Books</h1>
                <p>Toolbar</p>
            </div>

            <div className={'wrapper flex'}>
                <div className={'flex flex-col gap-4 w-1/6 bg-blue-400 text-xs'}>
                    <LibSidebar/>
                </div>
                <div className={'flex flex-col gap-4 w-5/6 bg-blue-300'}>
                    <RowCardSlider>
                        <ColumnSlider>
                        {/*// @ts-ignore*/}
                        {booksTable&& booksTable}
                        </ColumnSlider>
                    </RowCardSlider>

                </div>
            </div>



        </div>

        </>
    )
}

export default BooksLibrary




// Headers:

// 0. Book Id,
// 1. cover,
// 2. Title,
// 3. Author,
// 4. Author l-f, (removed)
// 5. Additional Authors,  (removed)
// 6. ISBN,
// 7. ISBN13,(removed)
// 8. My Rating,(removed)
// 9. Average Rating,
// 10. Publisher,
// 11. Binding,
// 12. Number of Pages,
// 13. Year
// 14. Published,
// 15. Original Publication Year,
// 16. Date Read,
// 17. Date Added,
// 18. Bookshelves,
// 19. Bookshelves with positions,
// 20. ExclusiveShelf,
// 21. My Review,
// 22. Spoiler,
// 23. Private Notes,
// 24. Read Count,
// 25. Owned Copies
