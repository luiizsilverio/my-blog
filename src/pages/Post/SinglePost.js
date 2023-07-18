import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Nav from "../../components/layouts/Nav";
import Footer from "../../components/layouts/Footer";
import { supabase } from '../../lib/supabaseClient';

function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data, error, status } = await supabase.from("post")
          .select("*")
          .eq("id", id);

        // 406 = Results contain 0 rows
        if (error && status !== 406) {
          console.log("error", error);
          throw error;
        }

        setData(data[0]);
      }
      catch (error) {
        console.log(error.message);
      }
    }

    getPost();
  }, [id])

  return (
    <>
      <Nav />
      <header
        className="masthead"
        style={{ backgroundImage: `url('assets/img/home-bg.jpg')` }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <img
                  src={data?.image} alt="Imagem"
                  style={{objectFit: "cover", maxHeight: 400}}
                />
                <h1>
                  {data?.title}
                </h1>
                <h2 className="subheading">
                  {data?.description}
                </h2>
                <span className="meta">
                  {data && (
                    `Criado em ${new Date(data?.created_at).toLocaleDateString()}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>
                {data?.content}
              </p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

export default SinglePost;
