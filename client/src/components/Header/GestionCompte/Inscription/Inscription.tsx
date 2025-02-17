import { useState } from "react";
import { UseBakOfficeContext } from "../../../../hooks/UseBakOffice";
import "./Inscription.css";

interface InscriptionProps {
  SetpageInscription: (value: boolean) => void;
}

const Inscription: React.FC<InscriptionProps> = ({ SetpageInscription }) => {
  //charger le contexte de bakoffice
  const { bakOffice, setBakOffice } = UseBakOfficeContext();

  //set les states
  const [prenom, setPrenom] = useState("");
  const [sexe] = useState("");
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motdePasse, setMotdePasse] = useState("");
  const [codePostal, SetCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");

  function verifDoubleMail() {
    return bakOffice?.compte
      ? bakOffice.compte.some((compte) => compte.mail === mail)
      : false;
  }

  function inscription() {
    if (mail !== "" && motdePasse !== "") {
      if (bakOffice) {
        // Vérifier si un compte avec cet email existe
        if (!verifDoubleMail()) {
          setBakOffice({
            ...bakOffice,
            compte: [
              ...bakOffice.compte,
              {
                mail: mail,
                password: motdePasse,
                sex: sexe,
                prenom: prenom,
                nom: nom,
                adresse: adresse,
                telephone: telephone,
                codePostal: Number.parseInt(codePostal),
                ville: ville,
                reservation: [],
                favorite: [],
              },
            ],
          });
          SetpageInscription(false);
        } else {
          alert("ce compte existe déjà");
        }
      }
    } else {
      alert("veuillez remplir toute les informations");
    }
  }

  return (
    <div className="inscription-container">
      <p>INSCRIPTION</p>
      <form>
        {/* sex */}
        {/* code suspendu provisoirement */}
        {/* <label>
          <input
            type="radio"
            name="gender"
            value="M"
            onChange={(e) => setSexe(e.target.value)}
          />
          M.
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Mme"
            onChange={(e) => setSexe(e.target.value)}
          />
          Mme
        </label> */}
        {/* prénom */}
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />

        {/* nom */}
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        {/* mail */}
        <input
          type="text"
          placeholder="Adresse mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        {/* telephone */}
        <input
          type="text"
          placeholder="Telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        {/* mot de passe */}
        <input
          type="text"
          placeholder="Mot de passe"
          value={motdePasse}
          onChange={(e) => setMotdePasse(e.target.value)}
        />

        {/* adresse */}
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />

        {/* code postal */}
        <input
          type="text"
          placeholder="Code postal"
          value={codePostal}
          onChange={(e) => SetCodePostal(e.target.value)}
        />

        {/* ville */}
        <input
          type="text"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />

        {/* bouton suivant */}
        <button
          className="btn-suivant"
          type="button"
          onClick={() => inscription()}
        >
          Suivant
        </button>
      </form>
      <button
        className="btn-annuler"
        type="button"
        onClick={() => SetpageInscription(false)}
      >
        Annuler
      </button>
    </div>
  );
};

export default Inscription;
