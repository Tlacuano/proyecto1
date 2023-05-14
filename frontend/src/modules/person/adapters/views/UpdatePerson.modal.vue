<template>
    <div>
        <b-modal id="modal-1" centered hide-footer hide-header title="BootstrapVue">
            <div class="row">
                <div class="col-md-12">
                    <header class="text-center">
                        <h3>Actualizar</h3>
                    </header>
                    <main>
                        <form>
                            <div class="mt-2">
                                <label for="name">Nombre</label>
                                <input type="text" class="form-control" id="name" placeholder="Nombre" v-model="personSelected.name">
                            </div>
                            <div class="mt-2">
                                <label for="lastname">Apellido</label>
                                <input type="text" class="form-control" id="lastname" placeholder="Apellido" v-model="personSelected.lastname">
                            </div>
                            <div class="mt-2">
                                <label for="email">email</label>
                                <input type="email" class="form-control" id="email" placeholder="Edad" v-model="personSelected.email">
                            </div>
                        </form>
                    </main>
                    <footer class="text-end mt-4">
                        <button class="btn btn-danger m-1" @click="close">Cancelar</button>
                        <button class="btn btn-primary m-1" @click="updatePerson">Actualizar</button>
                    </footer>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { PersonController } from '../people.controller';

    export default Vue.extend({
        name: 'UpdatePersonModal',
        props: {
            personSelected: {
                type: Object,
                required: true
            }
        },
        methods: {
            close() {
                this.$bvModal.hide('modal-1')
            },
            async updatePerson() {
                console.log(this.personSelected);
                const personController = new PersonController();
                await personController.updatePerson(this.personSelected);
                this.close();
                this.$emit("findAll");
            }
        },
    });
</script>