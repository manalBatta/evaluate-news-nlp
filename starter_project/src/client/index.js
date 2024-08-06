import { handleSubmit } from "./js/formHandler";
import { checkForUrl } from "./js/urlChecker";

alert("I EXIST");

document.getElementById("urlForm").addEventListener("submit", handleSubmit);

// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

export { checkForUrl, handleSubmit };
