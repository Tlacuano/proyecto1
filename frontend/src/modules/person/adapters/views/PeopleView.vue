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
                                <button class="btn btn-success m-1" >Excel</button>
                                <button class="btn btn-danger m-1" >PDF</button>
                            </section>
                        </div>
                        <div class="col-md-6">
                            <section class="text-end">
                                <button class="btn btn-success m-1" v-b-modal.modal-3>Subida con Excel</button>
                                <button class="btn btn-primary m-1" v-b-modal.modal-2>agregar</button>
                            </section>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-12">
                            <b-table 
                                striped hover 
                                :fields="colums" 
                                :items="people"
                                :per-page="7" 
                                :current-page="currentPageMain"
                                >
                                <template #cell(actions)="data">
                                    <button class="btn btn-warning" @click="findPerson(data.item.id)" v-b-modal.modal-1>actualizar</button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="currentPageMain"
                                :total-rows="people.length"
                                :per-page="7"
                                aria-controls="my-table"
                            ></b-pagination>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <AddPersonModal @findAll="findAll"/>
        <UpdatePersonModal :personSelected="person" @findAll="findAll" />
        <ImportExcelModal @findAll="findAll"/>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import { Person } from '../../entities/person';
    import { PersonController } from '../people.controller';
    import UpdatePersonModal from './UpdatePerson.modal.vue';
    import AddPersonModal from './AddPerson.modal.vue';
    import ImportExcelModal from './ImportExcel.modal.vue';

    export default Vue.extend({
        name: 'home',
        components: {
            UpdatePersonModal, AddPersonModal, ImportExcelModal
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
                person: {} as Person,
                currentPageMain: 1, // Página actual

            };
        },
        methods: {
            async findAll() {
                const controller = new PersonController();
                const response = await controller.findAllPeople();
                this.people = response.entities;
            },
            async findPerson(payload: number) {
                const controller = new PersonController();
                const response = await controller.findOnePerson(payload);
                console.log(response);
                this.person = response.entity;
            },
        },
        mounted() {
            this.findAll();
        },
    });
</script>