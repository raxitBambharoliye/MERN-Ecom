import { useEffect } from 'react'
import { Quality, Banner, Collections, Models, Interior, InteriorIdea, Subscribe } from '../../components'
import axiosClient from '../../utility/api/axiosClient'
import { getToken, setToken } from '../../utility/common';

function Home() {

  return (
      <>
      <Banner />
      <Quality />
      <Collections />
      <Models />
      <Interior />
      <InteriorIdea />
      <Subscribe />
      </>
  )
}

export default Home 
