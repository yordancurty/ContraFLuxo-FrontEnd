import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from "../../apis/index";

function ProfileEdit(props){

    const history = useHistory();

    const { id } = props.match.params;

    const [edit, setEdit] = useState({
        name: "",
        email: "",
        aboutMe: "",
        attachment: "",
        attachmentUrl: "",
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
    });

    const [isLoadingFetch, setIsLoadingFetch] = useState(false);
    const [isLoadingSend, setIsLoadingSend] = useState(false);

    useEffect(() => {
        setIsLoadingFetch(true);
        (async function(){
            try {

              
                const response = await api.get(`http://localhost:4000/api/profile/${id}`
                );

                console.log(response);
                setIsLoadingFetch(false);
                setEdit({...response.data});
            } catch(err){
                setIsLoadingFetch(false);
                setEdit({...edit, error: err.message});
            }
        })();
    }, [id]);

    const handleChange = (event) => {
        if (event.currentTarget.files){
            return setEdit({
                [event.currentTarget.name]: event.currentTarget.files[0],
            });
        }
       return setEdit({...edit,
        [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleFileUpload = async (file) => {
        try {
          const uploadData = new FormData();
          
          uploadData.append("attachment", file);

          const response = await api.post("/attachment-upload", uploadData);

          console.log(response.data.attachmentUrl);

          return response.data.attachmentUrl;
            } catch (err){
                console.error(err);
            }
    };

    const handleSubmit = async (event) => {
        setIsLoadingSend(true);

        try{
        event.preventDefault();

        const response = await api.patch(`http://localhost:4000/api/profile/${id}`,
        edit);

        const fileUrl = await handleFileUpload(edit.attachment);

        setEdit({attachmentUrl:fileUrl});

        console.log(response);

        setIsLoadingSend(false);

        history.push("/profile");

        } catch(err){
        console.error(err)
        setIsLoadingSend(false);
        setEdit({...edit, error: err.message});
        }
    }

   return (
       <div>
           <form onSubmit={handleSubmit}>
    <legend>Edite seu perfil</legend>
    <div className="form-group">
      <label htmlFor="profileEditNameInput">Name:</label>
      <input type="text" name="name" className="form-control" id="profileEditNameInput" placeholder="Insira seu nome" value={edit.name} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor="profileEditEmailInput">Email:</label>
      <input type="email" name="email" className="form-control" id="profileEditEmailInput" aria-describedby="emailHelp" placeholder="Enter email" value={edit.email} onChange={handleChange} />
      <small id="emailHelp" className="form-text text-muted">Nunca compartilhe seu email com alguém.</small>
    </div>
    <div className="form-group">
      <label htmlFor="profileEditAboutMeInput">Fale mais sobre você:</label>
      <textarea className="form-control" name="aboutMe" type="text" id="profileEditAboutMeInput" rows="3" value={edit.aboutMe} onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="profileEditFacebookInput">Inclua suas redes sociais aqui também:</label>
      <input type="text" name="facebook" className="form-control" id="profileEditFacebookInput" placeholder="Insira o link do facebook" value={edit.facebook} onChange={handleChange} />
      <label htmlFor="profileInstagramInput"></label>
      <input type="text" name="instagram" className="form-control" id="profileInstagramInput" placeholder="Insira o link do instagram" value={edit.instagram} onChange={handleChange} />
      <label htmlFor="profileTwitterInput"></label>
      <input type="text" name="twitter" className="form-control" id="profileTwitterInput" placeholder="Insira o link do twitter" value={edit.twitter} onChange={handleChange} />
      <label htmlFor="profileEditYoutubeInput"></label>
      <input type="text" name="youtube" className="form-control" id="profileEditYoutubeInput" placeholder="Insira o link do youtube" value={edit.youtube} onChange={handleChange} />
    </div>
    <div className="form-group">
    <div className="input-group mb-3">
      <div className="custom-file">
        <input type="file"  name="attachment" className="custom-file-input" id="attachmentProfileInput" onChange={handleChange}/>
        <label htmlFor="attachmentProfileInput" className="custom-file-label">Choose file</label>
      </div>
      <div className="input-group-append" />
        <span className="input-group-text" id="attachmentProfileInput">Upload</span>
      </div>
    </div>
    <button type="submit" className="btn btn-dark">Confirmar Alterações</button>
    </form>
       </div>
   ) 
};

export default ProfileEdit;