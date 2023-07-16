/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/layouts/Footer';
import Nav from '../components/layouts/Nav';
import { supabase } from '../lib/supabaseClient';

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        let {data, error, status} = await supabase.from("post").select("*");

        // 406 = Results contain 0 rows, application/vnd.pgrst.object+json requires 1 row
        if (error && status !== 406) {
          console.log("error", error);
          throw error;
        }

        console.log(data);
        setData(data);
      }
      catch (error) {
        console.log(error.message);
      }
    }

    getPosts();
  },[]);

  return (
    <>
      <Nav />

      {/* <!-- Page Header--> */}
      <header className="masthead" style={{backgroundImage: "url('assets/img/home-bg.jpg')"}}>
          <div className="container position-relative px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5 justify-content-center">
                  <div className="col-md-10 col-lg-8 col-xl-7">
                      <div className="site-heading">
                          <h1>Pensamentos Assíncronos</h1>
                          <span className="subheading">Um Blog Sobre Minhas Ideias e Projetos</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      {/* <!-- Main Content--> */}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

            {
              data?.map(post => {
                return (
                  <div key={post.id}>
                    {/* <!-- Post preview--> */}
                    <div className="post-preview">
                      <Link to={`/singlepost/${post.id}`}>
                        <h2 className="post-title">{post.title}</h2>
                        <h3 className="post-subtitle">{post.description}</h3>
                      </Link>
                      <p className="post-meta">
                        {data && `Criado em ${new Date(post.created_at).toLocaleDateString()}`}
                      </p>
                    </div>

                    {/* <!-- Divider--> */}
                    <hr className="my-4" />
                  </div>
              )})
            }

            {/* <!-- Pager--> */}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">Posts mais Antigos →</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home;
