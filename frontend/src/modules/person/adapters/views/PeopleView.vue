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
                                <button class="btn btn-success m-1" @click="descargarExcel">Excel</button>
                                <button class="btn btn-danger m-1" @click="descargarPDF">PDF</button>
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
                            <div class="row">
                                <div class="col-md-2">
                                    <section>
                                        <b-form-input type="number" v-model="perPage" class="mb-3"></b-form-input>
                                    </section>
                                </div>
                            </div>
                            <b-table 
                                striped hover 
                                :fields="colums" 
                                :items="people"
                                :per-page="perPage" 
                                :current-page="currentPageMain"
                                >
                                <template #cell(actions)="data">
                                    <button class="btn btn-warning" @click="findPerson(data.item.id)" v-b-modal.modal-1>actualizar</button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="currentPageMain"
                                :total-rows="people.length"
                                :per-page="perPage"
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
    import pdfMake from 'pdfmake/build/pdfmake';
    import pdfFonts from 'pdfmake/build/vfs_fonts';

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    import exportFromJSON from 'export-from-json';

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
                perPage: 8, // Registros por página
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
            descargarPDF(){
                const contentTable = this.people.map((person) => {
                    return [person.name, person.lastname, person.email];
                });

                const docDefinition = {
                    content : [
                        {
                            text: 'Reporte de personas',
                            style: 'header'
                        },
                        {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    ['Nombre', 'Apellido', 'Email'],
                                    ...contentTable
                                ]
                            }
                        }
                    ]
                }
                const filenamePDF = `ReportePersonas${new Date()}.pdf`;

                pdfMake.createPdf(docDefinition).download(filenamePDF);

            },
            descargarExcel(){
                const data = this.people.map((person) => {
                    var obj = {
                        Nombre: person.name,
                        Apellido: person.lastname,
                        Email: person.email
                    }
                    return obj;
                });
                const fileName = `ReportePersonas${new Date()}.xls`;
                const exportType = exportFromJSON.types.xls;
                exportFromJSON({data, fileName, exportType});
            }
        },
        mounted() {
            this.findAll();
        },
    });
</script>