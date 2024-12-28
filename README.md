# Authentication Project


## Characteristics and functionalities

The Authentication Protect project is a React-based application that implements secure user authentication and route protection. It features a login system that validates user credentials and restricts access to specific routes based on authentication status, ensuring that only authorized users can view sensitive content. The project leverages React's state management and context API to handle user sessions effectively, providing a seamless and secure user experience. This repository demonstrates a strong understanding of authentication workflows, including token management, and highlights the ability to build robust front-end security mechanisms in modern web applications.


## Technologies


 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
 ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
 ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)


## Prerequisites
It is recommended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Postgress recomended)

## Execute the project

1. Clone the repository:
```bash
git clone [URL-del-repositorio]
```

2. Install python packages:
```bash
pipenv install
```

3. Create a .env file
```bash
 cp .env.example .env
```

4. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the values with your database information:
   
| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

5. Migrate the migrations:
```bash
 pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
```
6. Run the migrations:
```bash
 pipenv run upgrade
```
7. Run the application:
```bash
  pipenv run start
```

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages:
```bash
npm install
```
4. Start coding! start the webpack dev server
```bash
npm run start
```
