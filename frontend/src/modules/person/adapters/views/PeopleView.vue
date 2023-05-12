<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <div class="row text-center">
                        <div class="col-md-12 mt-1 mb-1">
                            <h2>Personas</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <section class="text-start">
                                <button class="btn btn-success m-1" v-b-modal.modal-2>Excel</button>
                                <button class="btn btn-danger m-1" v-b-modal.modal-2>PDF</button>
                            </section>
                        </div>
                        <div class="col-md-6">
                            <section class="text-end">
                                <button class="btn btn-success m-1" v-b-modal.modal-2>Subida con Excel</button>
                                <button class="btn btn-primary m-1" v-b-modal.modal-2>agregar</button>
                            </section>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-12">
                            <b-table striped hover :fields="colums" :items="people">
                                <template #cell(actions)="data">
                                    <button class="btn btn-primary " v-b-modal.modal-2>info</button>
                                    <button class="btn btn-warning " v-b-modal.modal-2>actualizar</button>
                                </template>
                                
                            </b-table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import { Person } from '../../entities/person';
    import { PersonController } from '../people.controller';

    export default Vue.extend({
        name: 'home',
        components: {
        },
        data() {
            return {
                colums: [
                    {key: 'name' , label: 'Nombre', field: 'name',  filterable: true},
                    {key: 'lastname' , label: 'Apellido', field: 'lastname', filterable: true},
                    {key: 'email' , label: 'Email', field: 'email',  filterable: true},
                    {key: 'actions' , label: 'Acciones', field: 'actions', filterable: false},

                ],
                people: [] as Person[],
                person: {} as Person
            };
        },
        methods: {
            async findAll() {
                const controller = new PersonController();
                const response = await controller.findAllPeople();
                this.people = response.data;
                
            }
        },
        mounted() {
            this.findAll();
        },
    });
</script>