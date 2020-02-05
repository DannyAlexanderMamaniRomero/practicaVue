<template>
    <v-layout wrap>
        <v-flex sm12>
            <v-tabs
            v-model="tab"
            color="primary"
            dark
            grow
            >
            <v-tabs-slider color="black"></v-tabs-slider>

            <v-tab>
                Agregar Códigos Individuales
            </v-tab>
            <v-tab>
                Códigos Individuales
            </v-tab>
            <v-tab>
                Agrupar Códigos
            </v-tab>
            </v-tabs>
            
        </v-flex>
        <v-flex sm12>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card flat>
                        <v-container
                        fluid
                        grid-list-md
                        >
                            <v-layout wrap>
                                <v-flex md4 xs12>    
                                     <v-text-field
                                        label="Codigo"
                                        v-model="formindividual.Codigo"
                                        hint="Ejemplo: IFEEP123"
                                        persistent-hint
                                        outline
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md4 xs12>
                                    <v-text-field
                                        label="Contraseña"
                                        v-model="formindividual.Contrasena"
                                        hint="Ejemplo: 123456A"
                                        persistent-hint
                                        outline
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md4 xs12>
                                    <v-text-field
                                        label="Tipo"
                                        v-model="formindividual.Tipo"
                                        hint="Ejemplo: ARB"
                                        persistent-hint
                                        outline
                                    ></v-text-field>
                                </v-flex>
                                <v-flex md12>
                                    <v-btn
                                        block
                                        color="primary"
                                        v-on:click="agregarUsuarioIndividual"
                                    >Agregar Código</v-btn>
                                </v-flex>
                            </v-layout>
                            <v-divider class="my-2"></v-divider>
                            <v-layout wrap>
                                <v-flex md12 xs12>
                                    <v-textarea
                                        auto-grow
                                        box
                                        outline
                                        label="Agregar Masivamente (usuario|contraseña|tipo):"
                                        hint="Ejemplo: usuario|contraseña|tipo cada linea es un nuevo usuario"
                                        rows="10"
                                        v-model="formgrupal.usuarios"
                                    ></v-textarea>
                                </v-flex>
                                <v-flex md12 xs12>
                                    <v-btn
                                        block
                                        color="primary"
                                        v-on:click="obtenerMultiplesUsuarios"
                                    >Agregar Masivamente</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <tabla-codigos-individuales/>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-container
                        fluid
                        grid-list-md
                        >
                            <v-layout wrap>
                                <v-flex md12 xs12>
                                    <p>Selecciona los codigos para agrupar :</p>
                                    <v-select2 multiple v-model="usuariosGrupo" :options="dataUsuariosSelect" class="mb-3"></v-select2>
                                </v-flex>
                                <v-flex md12 xs12>
                                    <v-btn
                                        block
                                        color="primary"
                                        v-on:click="agruparCodigos"
                                    >Agrupar Códigos</v-btn>
                                </v-flex>
                                <v-flex md12 xs12>
                                    <tabla-codigos-agrupados/>
                                </v-flex>
                                
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-flex>
    </v-layout>
</template>

<script>
import TablaCodigosIndividuales from '@/components/Codigos/TablaCodigosIndividuales';
import TablaCodigosAgrupados from '@/components/Codigos/TablaCodigosAgrupados';
import vSelect2 from 'vue-select'

export default {
  components: {
    TablaCodigosIndividuales,vSelect2,TablaCodigosAgrupados
  },
  data() {
    return {
        selects:[],
        tab:"1",
        formindividual: {
            Codigo: '',
            Contrasena: '',
            Tipo: ''
        },
        formgrupal:{
            usuarios:'',
        },
        usuariosGrupo:[]
    };
  },
  beforeMount(){
        this.$store.dispatch('codigosindividuales/openDBChannel').catch(console.error)
        this.$store.dispatch('codigosagrupados/openDBChannel').catch(console.error)
    },
  beforeDestroy() {
  },
  methods: {
        async agruparCodigos(){
            if(this.usuariosGrupo.length <= 0){
                console.log("No hay usuarios seleccionados")
                return
            }

            var isAgrupado = false

            for (let i = 0; i < this.usuariosGrupo.length; i++) {
                let usr = await this.$store.getters["codigosindividuales/getCodigoByID"](this.usuariosGrupo[i].value.id)

                if(usr.agrupado)
                {
                    console.log("El usuario ya esta agrupado")
                    isAgrupado = true
                }
                    
            }
            if(isAgrupado) return

            let arrcodigos =[]
            let arrusuarios = []
            for (let i = 0; i < this.usuariosGrupo.length; i++) {
                
                
                let id = this.usuariosGrupo[i].value.id
                arrusuarios.push(this.usuariosGrupo[i].label)
                arrcodigos.push(id)
                let usr = await this.$store.dispatch('codigosindividuales/patch',{id, agrupado: true})

            }

            var obj = {
                codigos: arrcodigos,
                usuarios: arrusuarios,
                alumno: ''
            }
            await this.$store.dispatch('codigosagrupados/insert',obj)
            this.usuariosGrupo = []
        },
        agregarUsuario(usuario,contra,tipo){
            const userData = {
                    'agrupado':false,
                    'contrasena': contra.toLowerCase(),
                    'mostrar':true,
                    'tipo':tipo,
                    'usuario':usuario.toLowerCase()
                }
            this.$store.dispatch('codigosindividuales/insert', userData)
            alert("Codigo ingresado correctamente")
        },

        codigoExists(codigo){
            if(this.$store.getters["codigosindividuales/userExists"](codigo).length > 0)
                return true

            console.log(this.$store.getters["codigosindividuales/userExists"](codigo))
            return false
        
         
        },
        isduplicatedarrayusersbyusuario(usuariosArray)
        {
            var usuariosTemp = usuariosArray.slice().sort( function ordenararrobj(a,b){
                return a.usuario.localeCompare(b.usuario);
                //return a.id - b.id;
            });
            for (var i = 0; i < usuariosTemp.length - 1; i++) {
                if (usuariosTemp[i + 1].usuario == usuariosTemp[i].usuario) {
                    return true;
                }
            }
            return false;
        },
        async agregarUsuarioIndividual(){

            let existecodigo = await this.codigoExists(this.formindividual.Codigo)

            if(!existecodigo)
                this.agregarUsuario(this.formindividual.Codigo,this.formindividual.Contrasena,this.formindividual.Tipo)
        },
        
        async obtenerMultiplesUsuarios(){
            var usuariosArray = [];

            //Removemos las lineas en blanco
            this.formgrupal.usuarios = this.formgrupal.usuarios.replace(/^\s*[\r\n]/gm, '');
            var splitEnter = this.formgrupal.usuarios.split("\n");

            for (let index = 0; index < splitEnter.length; index++) {
                var objeto = {};
                var splitObj = splitEnter[index].split(",");

                objeto.usuario = splitObj[0];
                objeto.contrasena = splitObj[1];
                objeto.tipo = splitObj[2];
                usuariosArray.push(objeto);
            }

            if(this.isduplicatedarrayusersbyusuario(usuariosArray)){
            
                console.log("Usuario Duplicado")

                return;
            }

            for (let index = 0; index < usuariosArray.length; index++) {
                let existecodigo = await this.codigoExists(usuariosArray[index].usuario)

                if(existecodigo){ 
                    console.log("El Usuario "+ usuariosArray[index].usuario+ " ya existe en la base de datos")
                    return;
                }
            }
            for (let index = 0; index < usuariosArray.length; index++) {

                this.agregarUsuario(usuariosArray[index].usuario,usuariosArray[index].contrasena,usuariosArray[index].tipo)
                
            }
            
            console.log(usuariosArray)
        }
  },
  computed:{
    dataUsuariosSelect(){
        var data = this.$store.getters["codigosindividuales/getCodigosSinAgrupar"];
        var objreturn = []
        data.forEach(element => {
            var obj = {value:{id:element.id,text:element.usuario},
                    label:element.usuario
            }
            objreturn.push(obj)
        });

        return objreturn;
    },
  }
};
</script>

<style>
</style>
