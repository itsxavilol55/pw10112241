<template>
    <section class="vh-100" style="background-color: #508bfc;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Registro de Usuario</h3>
            <div v-if="mensaje==1" class="alert alert-primary" role="alert">
              Usuario registrado con exito
            </div>

            <div data-mdb-input-init class="form-outline mb-4">
              <input v-model="correo" type="email" id="typeEmailX-2" class="form-control form-control-lg" />
              <label class="form-label" for="typeEmailX-2">Email</label>
            </div>

            <div data-mdb-input-init class="form-outline mb-4">
              <input v-model="password" type="password" id="typePasswordX-2" class="form-control form-control-lg" />
              <label class="form-label" for="typePasswordX-2">Password</label>
            </div>

            <button @click.prevent="registro()" data-mdb-button-init data-mdb-ripple-init 
            class="btn btn-primary btn-lg btn-block" type="submit">Registro</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
  export default{
    name: "RegistroView",
    data(){
      return{
        correo: '',
        password: '',
        mensaje: 0
      }
    },
    methods: {
      registro(){
        createUserWithEmailAndPassword(getAuth(), this.correo, this.password)
        .then((data) => {
          this.mensaje = 1;
          this.correo = '';
          this.password = '';
        }).catch((error) => {
          alert(error.message)
        })
      },
    },
  }
</script>