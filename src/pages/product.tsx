import Layout from '@/layout/layout';

const Product = () => {
  return (
    <>
      <Layout>
        <div className="flex">
          <div>
            <img />
          </div>
          <div>
            <p>name</p>
            <span>category:</span>
            {/* svg */}
            <span>subCategory</span>
            <p>price</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Product;
