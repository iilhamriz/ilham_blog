import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import { FeaturedPosts } from "../../sections/index";
import { getCategories, getCategoryPost } from '../../services';
import { PostWidget, PostCard, Categories, Loader, Pagination } from '../../components';

const CategoryPost = ({posts}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  // Get Current Posts
  const [postts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(posts) || [];
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postts.reverse().slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mx-auto px-10 mb-8">
      <title>Ilham Blog</title>
      <link rel="icon" href="/favicon.ico" />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {currentPosts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>

    // <div className="container mx-auto px-10 mb-8">
    //   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    //     <div className="col-span-1 lg:col-span-8">
    //       {posts.map((post, index) => (
    //         <PostCard key={index} post={post.node} />
    //       ))}
    //     </div>
    //     <div className="col-span-1 lg:col-span-4">
    //       <div className="relative lg:sticky top-8">
    //         <Categories />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
