import React, { useState } from "react";
import './register.css'
import { useNavigate } from "react-router-dom";
//components
import Navbar from "../../components/navbar/Navbar";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Footer from "../../components/footer/Footer"
//firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebase";
import { ref, set } from "firebase/database";

const Register = () => {

  //Estado del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    matricula: '',
    escuela: '',
    carrera: '',
    genero: '',
    password: '',
    passwordrepeat: '',
    rol: 'estudiante'
  })

  //Actualizando estado de usuario con evento change
  const handleChange = ({target: {name, value}}) =>{
    setUserData({...userData, [name] : value})
  }

  //definiendo navigate
  const navigate = useNavigate()

  //Estado de error
  const [error, setError] = useState()

  //Mandar datos extras del usuario a la base de datos
  function writeUserData(
    userId,
    nombre,
    apellidos,
    correo,
    matricula,
    escuela,
    carrera,
    genero,
    rol
  ){
    set(ref(database, 'users/' + userId),{
      nombre,
      apellidos,
      correo,
      matricula,
      escuela,
      carrera,
      genero,
      rol
    })
  }

  //Funcion de registro
  async function handleRegister (e){
    e.preventDefault()
    setError('')
    await createUserWithEmailAndPassword(auth, userData.correo, userData.password)
      .then((userCredential) => {
        // Signed in 
        const currentUser = userCredential.user
        console.log(currentUser)
        writeUserData(currentUser.uid,
          userData.nombre,
          userData.apellidos,
          userData.correo,
          userData.matricula,
          userData.escuela,
          userData.carrera,
          userData.genero,
          userData.rol
        )
        alert('┬íRegistro exitoso!')
        navigate('/estudiante')
      })
      .catch((error) => {
        setError(error.message)
        console.error(error)
      });
  }


  return(
    <>
      <Navbar/>
      <section className="section-padding">
      <Breadcrumbs/>
        <div className="form-container">
          <div className="register-title">
            <h1>Reg├şstrate</h1>
            <p>como estudiante</p>
          </div>
          <form className="formulario" onSubmit={handleRegister}>
            <p>
              <label>Nombre</label>
              <input type="text" name="nombre" required placeholder="Introduce tu nombre" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Apellidos</label>
              <input type="text" name="apellidos" required placeholder="Introduce tus apellidos" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Correo electr├│nico</label>
              <input type="email" name="correo" required placeholder="Introduce tu correo electr├│nico" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Matr├şcula</label>
              <input type="number" name="matricula" required placeholder="Introduce tu matr├şcula" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p className="full">
              <label>Escuela</label>
              <input type="text" name="escuela" required placeholder="Introduce el nombre de tu escuela" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p className="full">
              <label>Carrera</label>
              <input type="text" name="carrera" required placeholder="Introduce el nombre de tu carrera" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p className="full">
              <label>G├ęnero</label>
              <input type="text" name="genero" required placeholder="Seleccione su g├ęnero" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Contrase├▒a</label>
              <input type="password" name="password" required placeholder="Crea una contrase├▒a" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p>
              <label>Confirmar contrase├▒a</label>
              <input type="password" name="passwordrepeat" required placeholder="Vuelve a escribir tu contrase├▒a" autoComplete="off"
                onChange={handleChange}
              />
            </p>
            <p className="error full">{error}</p>
            <p className="full">
              <input className="submit" type="submit" name="submit" required value="Registrarse"/>
            </p>
          </form>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Register
