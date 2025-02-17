import { useState } from "react";
import { UseBakOfficeContext } from "../../../../hooks/UseBakOffice";
import "./SeConnecter.css";

interface SeConnecterProps {
  SetpageInscription: (value: boolean) => void;
  setmodalConnection: (value: boolean) => void;
}

const SeConnecter: React.FC<SeConnecterProps> = ({
  SetpageInscription,
  setmodalConnection,
}) => {
  //state de email et du mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //charger le contexte de bakoffice
  const { bakOffice, setBakOffice } = UseBakOfficeContext();

  //fonction de connection
  function connection() {
    if (bakOffice) {
      // Vérifier si un compte avec cet email existe
      const compteTrouve = bakOffice.compte.find(
        (compte: { mail: string }) => compte.mail === email,
      );

      if (!compteTrouve) {
        // Si aucun compte avec cet email n'est trouvé
        alert("Adresse e-mail non trouvée.");
        return;
      }

      // Vérifier si le mot de passe correspond
      if (compteTrouve.password !== password) {
        // Si le mot de passe est incorrect
        alert("Mot de passe incorrect.");
        return;
      }

      // Si tout est correct, connecter le compte
      const index = bakOffice.compte.indexOf(compteTrouve);
      setBakOffice({ ...bakOffice, compteConnecter: index });
      setmodalConnection(false);
    }
  }

  return (
    <div className="se-connecter-container">
      <p>SE CONNECTER</p>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn-connexion"
          type="button"
          onClick={() => connection()}
        >
          Se connecter
        </button>
      </form>
      <button
        className="btn-creer"
        type="button"
        onClick={() => SetpageInscription(true)}
      >
        Créer un compte
      </button>
      <button
        className="btn-annuler"
        type="button"
        onClick={() => setmodalConnection(false)}
      >
        Annuler
      </button>
    </div>
  );
};

export default SeConnecter;
