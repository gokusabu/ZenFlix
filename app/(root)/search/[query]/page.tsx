import Navbar from "@components/Navbar";
const SearchPage = ({ params }: { params: { query: string } }) => {
  const search = params.query;
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam rem
        molestiae quos adipisci dolorem totam voluptates, sequi esse in incidunt
        blanditiis iusto velit aliquam quas placeat voluptas doloribus ad
        magnam.
      </div>
      <Navbar />
    </>
  );
};

export default SearchPage;
