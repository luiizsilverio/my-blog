/* eslint-disable no-unused-vars */
import { useState } from "react";
import {v4 as uuid} from "uuid";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/layouts/Nav";
import Footer from "../../components/layouts/Footer";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  let navigate = useNavigate();

  async function handleAddPost() {
    try {
      const post = {
        id: uuid(),
        title,
        description,
        content,
        image
      }

      let {error} = await supabase
        .from("post")
        .insert(post)
        .then(navigate("/"));

      if (error) {
        throw error;
      }
    }
    catch (error) {
      alert(error.message)
    }
  }

  async function uploadImage(event) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Selecione uma imagem");
      }

      setUploading(true);

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      let { data, error: uploadError } = await supabase.storage
      .from('postimage')
      .upload(filePath, file,
        {
          cacheControl: "3600",
          upsert: true, // sobrepõe a imagem, caso já exista com esse nome no Storage
        }
      );

      if (uploadError) {
        throw uploadError;
      }

      getURL(filePath);
    }
    catch(error) {
      alert(error.message);
    }
    finally {
      setUploading(false);
    }
  }

  async function getURL(url) {
    try {
      const { data } = supabase.storage
        .from('postimage')
        .getPublicUrl(url);

      setImage(data.publicUrl);
    }
    catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <Nav />
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Nova Publicação</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {user &&
        <article className="mb-4">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <form>
                  <div>
                    <div className="mb-3 pb-1">
                      <label className="form-label px-0">Título</label>
                      <input className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 pb-1">
                      <label className="form-label px-0">Descrição curta</label>
                      <input className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 pb-1">
                      <label className="form-label px-0">Conteúdo da publicação</label>
                      <textarea className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 pb-1">
                      <label className="form-label px-0">Imagem</label>
                      <input type="file" className="form-control"
                        accept="image/*"
                        onChange={uploadImage}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-primary shadow btn-sm mb-2"
                    type="button"
                    disabled={uploading}
                    onClick={handleAddPost}
                  >
                    {uploading ? "aguarde..." : "ADICIONAR"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </article>
      }
      <Footer />
    </>
  );
}

export default AddPost;
