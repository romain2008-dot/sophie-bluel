# Portfolio Architecte Sophie Bluel

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📌 Objectifs

- Création d'une galerie de projets d'architecture
- Système d'authentification pour l'administrateur
- Interface de gestion des projets (ajout, modification, suppression)
- Système de filtrage par catégories
- Modal de visualisation des projets
- Gestion des images avec upload

---

## ⚙️ Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Git](https://git-scm.com/)
- [Node.js v16+](https://nodejs.org/en/)
- Un éditeur de code (VS Code recommandé)

---

## 📦 Dépendances principales

### Backend
- [Express.js](https://expressjs.com/): `^4.18.0`
- [Sequelize](https://sequelize.org/): `^6.19.0`
- [SQLite3](https://www.sqlite.org/): `^5.0.5`
- [JWT](https://jwt.io/): `^8.5.1`
- [Multer](https://github.com/expressjs/multer): `^1.4.4`
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express): `^4.3.0`

### Frontend
- HTML5 et CSS3
- JavaScript ES6+
- API Fetch

---

## 🚀 Installation

### 🔧 Cloner le projet

```bash
git clone https://github.com/votre-username/sophie-bluel-p5
cd sophie-bluel-p5
```

### 🔙 Backend

Aller dans le dossier Backend :

```bash
cd Backend
```

Vérifier votre version de Node.js :

```bash
node --version
```

Installer les dépendances :

```bash
npm install
```

Démarrer le serveur backend :

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:5678`

### 💻 Frontend

Aller dans le dossier Frontend :

```bash
cd Frontend
```

Lancer l'application avec Live Server de votre IDE ou ouvrir `index.html` dans votre navigateur.

L'application sera accessible sur `http://localhost:5500` (ou le port configuré par votre serveur local)

---

## 🔐 Compte de test

| Email | Mot de passe |
| :---------------: | :---------------: |
| sophie.bluel@test.tld | S0phie |

---

## 📚 Documentation API

Accéder à la documentation Swagger :

[Documentation Swagger](http://localhost:5678/api-docs/)

**Note :** Utilisez Chrome ou Firefox pour lire la documentation

---

## 🏗️ Architecture

Ce projet est composé de deux parties principales :

- **Backend** : API REST avec Express.js et base de données SQLite
- **Frontend** : Interface utilisateur en HTML/CSS/JavaScript

---

## 🎯 Fonctionnalités

- ✅ Galerie de projets responsive
- ✅ Système d'authentification sécurisé
- ✅ Interface d'administration
- ✅ Gestion des catégories
- ✅ Upload et gestion d'images
- ✅ Filtrage dynamique
- ✅ Modal de visualisation
- ✅ Documentation API avec Swagger
