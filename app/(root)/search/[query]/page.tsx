import Navbar from '@components/Navbar'


const SearchPage = ({ params } : {params : {query: string} }) => {
    const search = params.query
  return (
    <>
    <Navbar />
    </>
  )
}

export default SearchPage