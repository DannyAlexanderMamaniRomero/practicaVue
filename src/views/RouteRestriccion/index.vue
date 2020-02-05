<template>
    <v-container grid-list-md text-xs-center>
        <FingerprintLabel />
        <AsyncRouteSelector />
        <RoleSelector/>
        <v-layout justify-center row wrap>
            <v-flex xs10>
                <v-text-field
                    label="Fingerprint"
                    placeholder="Restricción de fingerprint"
                    outlined
                    v-model="fingerprint"
                    
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
                <v-btn 
                    color="primary"
                    v-on:click="agregarFingerprint"
                    > Agregar </v-btn>
            </v-flex>
            <v-flex xs12>
 
                <v-chip
                    v-for="item in actualFingerprints"
                    class="ma-2"
                    close
                    @click:close='alert("asd")'
                >
                    {{item}}
                </v-chip>
            </v-flex>
        </v-layout>
        <v-layout justify-center row wrap>
            <v-flex xs12>
                <v-btn 
                    color="primary"
                    v-on:click="agregarRestriccion"
                    > Guardar </v-btn>
            </v-flex>
        </v-layout>
        finger: {{listarFingerprints}}
    </v-container>
    
</template>

<script>
import FingerprintLabel from '@/components/Fingerprint/FingerprintLabel.vue';
import AsyncRouteSelector from '@/components/Route/AsyncRouteSelector.vue';
import RoleSelector from '@/components/Utils/RoleSelector.vue'
export default {
    data() {
        return {
            fingerprint: "",
            actualFingerprints : []
        };
    },
    components: {
        FingerprintLabel,
        AsyncRouteSelector,
        RoleSelector
    },
    beforeMount(){
        let that = this
        this.$store.dispatch('routers/openDBChannel').catch(console.error);
    },
    methods:{
        agregarFingerprint(){
            if(this.actualFingerprints.includes(this.fingerprint)){
                alert("Ya existe esa restricción de fingerprint")
                return
            }
            this.actualFingerprints = [...this.actualFingerprints, this.fingerprint]
        },
        async agregarRestriccion(){
            const tempData = {id:this.$store.state.app.routeSelector, 'fingerprint':this.actualFingerprints}
            await this.$store.dispatch('routers/insert', tempData)
            alert("Restricción Agregada")
        },
        
        /*datas(){
            var datitos = this.$store.state.users.data;
            console.log(this.$store.state.users.data);
            return datitos;
        }*/
    },
    computed:{
        
        listarFingerprints(){
            let tempFinger = this.$store.getters["routers/getFingerprintByName"](this.$store.state.app.routeSelector)
            if(tempFinger) {
                this.actualFingerprints = [...tempFinger]
                return tempFinger
            }
            else {
                this.actualFingerprints = []
                return []
            }
            //return this.$store.getters["routers/getFingerprintByName"](this.$store.state.app.routeSelector);
        },
        selectedChange(){
            let asd = this.$store.state.app.routeSelector
            console.log(asd)
        }
    }
};
</script>