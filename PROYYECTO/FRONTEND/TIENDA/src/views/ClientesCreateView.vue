<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>agregar clientes</h4>
        <div v-if="mensaje==1" class="alert alert-success" role="alert">
            Datos guardados con exito
        </div>
      </div>
      <div class="card-body">
        <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="md-3">
                        ID 
                        <Field name="id" id="id" class="form-control" type="number" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        Nombre 
                        <Field name="nombre" id="nombre" class="form-control" type="text" v-model="model.cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        Apellidos 
                        <Field name="apellido" id="apellido" class="form-control" type="text" v-model="model.cliente.apellido" />
                        <ErrorMessage name="apellido" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        Direccion 
                        <Field name="direccion" id="direccion" class="form-control" type="text" v-model="model.cliente.direccion" />
                        <ErrorMessage name="direccion" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        Telefono 
                        <Field name="delefono" id="telefono" class="form-control" type="text" v-model="model.cliente.telefono" />
                        <ErrorMessage name="telefono" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        RFC 
                        <Field name="rfc" id="rfc" class="form-control" type="text" v-model="model.cliente.rfc" />
                        <ErrorMessage name="rfc" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        CURP 
                        <Field name="curp" id="curp" class="form-control" type="text" v-model="model.cliente.curp" />
                        <ErrorMessage name="curp" class="errorValidation"/>
                    </div>
                    <div class="md-3">
                        CP
                        <Field name="cp" id="cp" class="form-control" type="text" v-model="model.cliente.cp" />
                        <ErrorMessage name="cp" class="errorValidation"/>
                    </div>
                    <p></p>
                    <div class="md-3">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </Form>    
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default{
    name: "ClientesCreate",
    components: { Field, Form, ErrorMessage},
    data(){
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i

        );
        const curpRegex = new RegExp(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9][12]\d|3[01])[HM](?:AS| B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]| VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g
        );
        const cpRegex = new RegExp(
            /^[0-9]{5}$/
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({message: 'Solo numero enteros'}).int(),
                nombre: zod.string().min(1,{message: 'Campo Requerido'}).min(1) ,
                apellido: zod.string().min(1,{message: 'Campo Requerido'}).min(1) ,
                direccion: zod.string().min(1,{message: 'Campo Requerido'}).min(1) ,
                telefono: zod.string().regex(phoneRegex,'Numero no valido').min(10,{message: 'minimo 10'}),
                rfc: zod.string().regex(rfcRegex,'rfc no valido'),
                curp: zod.string().regex(curpRegex,'curp no valido'),
                cp: zod.string().regex(cpRegex,'codigo postal no valido'),
            })
        )
        return{
            validationSchema,
            mensaje: 0,
            model:{
                cliente:{
                    id: '',
                    nombre:'',
                    apellido:'',
                    direccion:'',
                    telefono:'',
                    rfc:'',
                    curp:'',
                    cp:''
                }
            }
        }
    },
    methods: {
        onTodoBien(){
          this.guardarCliente();
        },
        guardarCliente() {
            axios.post('http://localhost:3000/api/clientes', 
            this.model.cliente).then(res => {
                if (res.data.affectedRows == 1) {// si inesetamos 1 registros
                    //limpiar el cuadro de textos
                    this.model.cliente = {
                        id: '',
                        nombre: '',
                        apellido: '',
                        direccion: '',
                        telefono: '',
                        rfc: '',
                        curp: '',
                        cp: ''
                    }
                    this.mensaje = 1;
                }
            });
        }
    }
}
</script>
<style scoped>
    .errorValidation{
        color: red;
        font-weight: bold;
    }
</style>