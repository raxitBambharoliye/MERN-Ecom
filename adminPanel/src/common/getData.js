/*    {maxLimit > 4 && page > 1 && <li onClick={(e) => { setPage(page - 1 > 1 ? page - 1 : 1) }} ><i className="fa-solid fa-angles-left " /></li>}

            <li id={`p${1}`} className='static1' onClick={(e) => { setPage(1) }}>{1}</li>

              {/* first ...  */}
              {(maxLimit > 4 && page > 2) && <li className='first3d'>...</li>}

              {/*   n-2*/}
          {(page + 1 == maxLimit && page != maxLimit - 2 && page-1 > 0) &&
            <li className='nm2' id={`p${page - 1}`} onClick={(e) => { setPage(page - 1) }}>{page - 1}</li>
          }
          {/*current */}
          {(page != maxLimit && page!= 1  ) &&
            <li className='current' id={`p${page}`} onClick={(e) => { setPage(page) }}>{page}</li>
          }
          {/*  current +1 */}
          {!(page + 1 == maxLimit || page == maxLimit) &&
            <li id={`p${page + 1}`} onClick={(e) => { setPage(page + 1) }}>{page + 1}</li>
          }
        {/* current+2 */}
          {(maxLimit >= 4 && (page >= 3 || page == 1) && page + 2 != maxLimit && page + 2 < maxLimit) &&
            <li id={`p${page + 2}`} onClick={(e) => { setPage(page + 2) }}>{page + 2}</li>
          }

          {/* n-2,n-1 */}
          {(page == maxLimit && maxLimit>3) && (
            <>
              <li id={`p${page - 2}`} onClick={(e) => { setPage(page - 2) }}>{page - 2}</li>
              <li id={`p${page - 1}`} onClick={(e) => { setPage(page - 1) }}>{page - 1}</li>
            </>
          )}

          {/* last ... */}
          {(maxLimit > 4 && page <= maxLimit - 3) && <li>...</li>}

          {/* max  */}
          <li id={`p${maxLimit}`} onClick={(e) => { setPage(maxLimit) }}>{maxLimit}</li>

          {(maxLimit > 4 && page + 2 != maxLimit && page + 1 != maxLimit && page != maxLimit) &&
            <li onClick={(e) => { setPage(page + 1 < maxLimit ? page + 1 : maxLimit) }} ><i className="fa-solid fa-angles-right " /></li>
}
           * /