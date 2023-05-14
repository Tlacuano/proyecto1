<template>
    <div>
        <b-modal id="modal-2" hide-footer hide-header centered>
            <div class="row">
                <div class="col-md-12">
                    <header class="text-center">
                        <h3>Agregar</h3>
                    </header>
                    <main>
                        <form>
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" class="form-control" id="name" placeholder="Nombre"  v-model="person.name">
                            </div>
                            <div class="form-group">
                                <label for="lastname">Apellido</label>
                                <input type="text" class="form-control" id="lastname" placeholder="lastname" v-model="person.lastname">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="email" placeholder="email" v-model="person.email">
                            </div>
                        </form>
                    </main>
                    <footer class="text-end mt-4">
                        <button class="btn btn-danger m-1" @click="close">Cancelar</button>
                        <button class="btn btn-primary m-1" @click="createPerson">Agregar</button>
                    </footer>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { CreatePersonDto } from '../dtos/create.dto';
    import { PersonController } from '../people.controller';

    export default Vue.extend({
        name: 'AddPersonModal',
        data() {
            return {
                person: {} as CreatePersonDto
            };
        },
        methods: {
            close() {
                this.$bvModal.hide('modal-2')
            },
            async createPerson() {
                console.log(this.person);
                const personController = new PersonController();
                await personController.savePerson(this.person);
                this.close();
                this.$emit("findAll");

            }

        },
    })
</script>