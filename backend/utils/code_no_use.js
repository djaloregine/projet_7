// Helpers ------------------------------------------
function checkEmail(email, res) {
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Adresse mail non valide" });
    }
}

function checkFirstname(fname, res) {
    if (fname.length > 21 || fname.length < 2) {
        return res.status(400).json({ error: 'Le prénom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!fname.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le prénom doit contenir que des lettres' });
    }
}

function checkLastname(lname, res) {
    if (lname.length >= 20 || lname.length < 3) {
        return res.status(400).json({ error: 'Le nom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!lname.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le nom doit contenir que des lettres' });
    }
}

function checkPassword(password, res) {
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: 'Le mot de passe est invalide. Il doit avoir une longueur de 4 à 16 caractères et contenir au moins 1 chiffre.' });
    }
}
