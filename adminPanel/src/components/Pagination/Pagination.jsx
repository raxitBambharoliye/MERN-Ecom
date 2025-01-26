import React from 'react'

export default function Pagination({page,maxLimit,onClickHandler}) {
    return (
        <>
            <ul className=" d-flex align-items-center justify-content-end" >
            {/* pre button */}
            {(page > 1 && maxLimit > 4) && <li onClick={(e) => { onClickHandler(page - 1 > 1 ? page - 1 : 1) }} ><i className="fa-solid fa-angles-left " /></li>}
            {/* 1 */}
            <li id={`p${1}`} className='static1 active' onClick={(e) => { onClickHandler(1) }}>{1}</li>

            {/* first ...  */}
            {(maxLimit > 4 && page > 2) && <li className='first3d'>...</li>}

            {/* n-1 */}
            {(page + 1 == maxLimit && page - 1 != 1 && page - 1 > 0) &&
                <li className='n-1' id={`p${page - 1}`} onClick={(e) => { onClickHandler(page - 1) }}>{page - 1}</li>
            }

            {/*current */}
            {(page != maxLimit && page != 1) &&
                <li className='current' id={`p${page}`} onClick={(e) => { onClickHandler(page) }}>{page}</li>
            }

            {/*  current +1 */}
            {((page + 1 != maxLimit && page + 1 < maxLimit) && (page + 1 != maxLimit || page != maxLimit)) &&
                <li className='cp1' id={`p${page + 1}`} onClick={(e) => { onClickHandler(page + 1) }}>{page + 1}</li>
            }



            {/* current+2 */}
            {(maxLimit >= 4 && (page >= 3 || page == 1) && page + 2 != maxLimit && page + 2 < maxLimit) &&
                <li id={`p${page + 2}`} onClick={(e) => { onClickHandler(page + 2) }}>{page + 2}</li>
            }

            {/* last ... */}
            {(maxLimit > 4 && page < maxLimit - 3) && <li>...</li>}
            {(maxLimit > 4 && page < maxLimit - 2 && page == 2) && <li>...</li>}
            {/* n-2,n-1 */}
            {(page == maxLimit && maxLimit > 3) && (
                <>
                    <li id={`p${page - 2}`} onClick={(e) => { onClickHandler(page - 2) }}>{page - 2}</li>
                    <li id={`p${page - 1}`} onClick={(e) => { onClickHandler(page - 1) }}>{page - 1}</li>
                </>
            )}

            {(maxLimit == 3 && page == maxLimit) &&
                <li id={`p${page - 1}`} onClick={(e) => { onClickHandler(page - 1) }}>{page - 1}</li>
            }
            {/* last page  */}
            {(maxLimit > 1) &&
                <li className='max' id={`p${maxLimit}`} onClick={(e) => { onClickHandler(maxLimit) }}>{maxLimit}</li>}

            {/* next button */}
            {(maxLimit > 4 && (page + 2 != maxLimit || page + 1 != maxLimit || page != maxLimit)) &&
                <li onClick={(e) => { onClickHandler(page + 1 < maxLimit ? page + 1 : maxLimit) }} ><i className="fa-solid fa-angles-right " /></li>
            }

        </ul >
    </>
  )
}
